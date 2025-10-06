import { GoogleGenAI, Type, GenerateContentResponse, GenerateImagesResponse } from "@google/genai";
import { Result, FullMythosReport, Archetype, AIArchetypeAnalysis, ChatMessage, NarrativeDomain, Psychologist, OceanScores, MMPIScores, SCL90Scores, BDIScores, BAIScores, EQIScores, EQIComposite } from '../types';
import { translations } from "../i18n/locales";
import { DEITY_PROFILES } from "../data/deityData";
import { QUESTIONS } from '../constants';

const MODEL_NAME = "gemini-2.5-flash";
const IMAGE_MODEL_NAME = "imagen-4.0-generate-001";

export const isApiAvailable = () => !!process.env.API_KEY;

const getAiInstance = () => {
    if (!isApiAvailable()) {
        return null;
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
}

/**
 * Checks if an API error is retryable (i.e., a rate limit or server error).
 * @param error The error object.
 * @returns True if the error is retryable.
 */
const isRetryableError = (error: any): boolean => {
    const status = error?.status || error?.response?.status;
    if (status && (status === 429 || status >= 500)) {
        return true;
    }
    const errorString = String(error).toLowerCase();
    return errorString.includes('rate limit') || errorString.includes('429') || errorString.includes('500') || errorString.includes('503');
};


/**
 * A helper function to wrap API calls with a retry mechanism for rate-limiting errors.
 * @param apiCall The function that makes the API call.
 * @param maxRetries The maximum number of retries.
 * @param initialDelay The initial delay in milliseconds before the first retry.
 * @returns The result of the API call.
 */
const withRetry = async <T>(apiCall: () => Promise<T>, maxRetries = 3, initialDelay = 1000): Promise<T> => {
    let retries = 0;
    while (true) {
        try {
            return await apiCall();
        } catch (error: any) {
            retries++;
            if (retries >= maxRetries || !isRetryableError(error)) {
                throw error; // Rethrow if max retries reached or it's not a retryable error
            }

            const delay = initialDelay * Math.pow(2, retries - 1) * (1 + Math.random() * 0.2); // Exponential backoff with jitter
            console.warn(`API call failed with retryable error. Retrying in ${Math.round(delay)}ms... (Attempt ${retries}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};

/**
 * Analyzes an error from the Gemini API and returns a structured, localized error message.
 * @param error The error object caught.
 * @param language The current language ('en' or 'fa').
 * @returns A structured error with a title and description.
 */
const handleGeminiError = (error: any, language: 'en' | 'fa'): { title: string, description: string } => {
    console.error("Gemini API Error:", error);
    const errorString = (error?.toString() ?? '').toLowerCase();
    const t = (key: string) => translations[language][key] || translations['en'][key];
    const status = error?.status || error?.response?.status;

    if (errorString.includes('api key not valid')) {
        return { title: t('apiKeyInvalid_title'), description: t('apiKeyInvalid_desc') };
    }
    // Added a check for safety blocks, which can be thrown as errors in some cases.
    if (errorString.includes('safety') || errorString.includes('blocked')) {
        return { title: t('safetyBlock_title'), description: t('safetyBlock_desc') };
    }
    if (status === 429 || errorString.includes('429') || errorString.includes('rate limit')) {
        return { title: t('rateLimit_title'), description: t('rateLimit_desc') };
    }
    if ((status && status >= 500) || errorString.includes('500') || errorString.includes('503')) {
        return { title: t('serverError_title'), description: t('serverError_desc') };
    }
    if (error instanceof TypeError && error.message.toLowerCase().includes('failed to fetch')) {
        return { title: t('networkError_title'), description: t('networkError_desc') };
    }
    
    // Default generic error
    return { title: t('genericError_title'), description: t('genericError_desc') };
};

export const getEQIInterpretation = async (scores: EQIScores, language: 'en' | 'fa'): Promise<string> => {
    const ai = getAiInstance();
    const isFarsi = language === 'fa';
    const t = (key: string, ...args: any[]) => translations[language][key] ? translations[language][key].replace('{0}', args[0]) : translations['en'][key].replace('{0}', args[0]);

    if (!ai) {
        const { title, description } = handleGeminiError({ toString: () => 'api key not found' }, language);
        return `**${title}**:\n\n${description}`;
    }

    const languageName = isFarsi ? 'Persian (Farsi)' : 'English';
    const scoreLevelText = t(`eqi_level_${scores.level}`);
    
    const compositeScoresText = (Object.keys(scores.composites) as EQIComposite[]).map(key => 
        `- ${t(`eqi_composite_${key}`)}: ${t('eqi_percentile', scores.composites[key].toString())}`
    ).join('\n');

    const prompt = `
        You are an AI Oracle, interpreting the user's 'Aura of the Soul,' a metaphor for their emotional intelligence. This is an EDUCATIONAL, NON-DIAGNOSTIC tool for self-discovery.
        Your tone is wise, insightful, and richly metaphorical. You speak of emotional capacities as different colors and vibrations within an aura.
        **CRITICAL: Do NOT use clinical or diagnostic language.** Frame the interpretation in terms of 'aura,' 'resonance,' 'clarity,' 'emotional currents,' and 'inner harmony.' Start with a clear disclaimer. The entire response must be in ${languageName}.

        Here is the user's Aura reading:
        - Total EQ Score: ${scores.total}
        - Overall Aura State: ${scoreLevelText}
        - Composite Resonances (scored as percentiles):
        ${compositeScoresText}

        Structure your response into the following sections, using these exact markdown titles in ${languageName}:

        **### ${isFarsi ? 'یادداشت اوراکل' : "The Oracle's Note"}**
        (Begin with this exact disclaimer in ${languageName}: "${t('eqi_disclaimer')}")

        **### ${isFarsi ? 'طنین کلی هاله' : 'Overall Aura Resonance'}**
        (Write 1-2 paragraphs describing the overall state of their 'Aura of the Soul' based on their Total EQ Score and Aura State. Use metaphors of brightness, size, stability, and color. For example, an 'Exemplary' aura might be vast, radiant, and shimmering with harmonious colors, while a 'Developing' one might be smaller, flickering, or have muted tones.)

        **### ${isFarsi ? 'پنج جریان رنگین' : 'The Five Chromatic Currents'}**
        (Dedicate a short, insightful paragraph to EACH of the five composites below. For each one, describe its quality, intensity, and color based on its percentile score. Be specific and personal. For example, a high score is a 'vibrant, radiant current,' a mid-range score is a 'steady, flowing current,' and a low score is a 'faint, flickering current.' Use these distinct color metaphors:
        - Intrapersonal: a deep violet current of self-knowledge.
        - Interpersonal: a warm golden current of empathy.
        - Stress Management: a grounding amber current of resilience.
        - Adaptability: a fluid silver current of flexibility.
        - General Mood: a bright yellow current of optimism.)

        **### ${isFarsi ? 'هنر هم‌نوایی هاله' : 'The Art of Aura Attunement'}**
        (Write a concluding paragraph of holistic guidance. Based on the overall pattern of the five currents, what is the central theme of their emotional landscape? Offer one key insight for fostering greater harmony across their entire aura. Suggest how a stronger current (their highest score) can be used to support and nurture a weaker one (their lowest score), creating a more integrated and radiant whole.)
    `;

    try {
        const apiCall = () => ai.models.generateContent({ model: MODEL_NAME, contents: prompt });
        const response: GenerateContentResponse = await withRetry(apiCall);
        return response.text;
    } catch (error) {
        const { title, description } = handleGeminiError(error, language);
        return `**${title}**:\n\n${description}`;
    }
};

export const getBAIInterpretation = async (scores: BAIScores, language: 'en' | 'fa'): Promise<string> => {
    const ai = getAiInstance();
    const isFarsi = language === 'fa';
    const t = (key: string) => translations[language][key] || translations['en'][key];
    
    if (!ai) {
        const { title, description } = handleGeminiError({ toString: () => 'api key not found'}, language);
        return `**${title}**:\n\n${description}`;
    }

    const languageName = isFarsi ? 'Persian (Farsi)' : 'English';
    const scoreLevelText = t(`bai_level_${scores.level}`);

    const prompt = `
        You are an AI Oracle, interpreting the user's 'Crystal of Serenity.' This is an EDUCATIONAL, NON-DIAGNOSTIC tool for self-discovery and reflection.
        Your tone is gentle, wise, metaphorical, and focused on grounding and stabilization. You speak of the psyche's anxious energy as vibrations within a crystal.
        **CRITICAL: Do NOT use diagnostic language like 'anxiety disorder.' Do not diagnose disorders.** Frame the interpretation in terms of 'inner resonance,' 'psychic vibrations,' 'the crystal's clarity,' and 'harmonizing the crystal.' Start with a clear disclaimer. The entire response must be in ${languageName}.

        Here is the user's result:
        - Score: ${scores.score} (out of 63)
        - Inner Turbulence: ${scoreLevelText}

        Structure your response into the following sections, using these exact markdown titles in ${languageName}:

        **### ${isFarsi ? 'یادداشت اوراکل' : "The Oracle's Note"}**
        (Begin with this exact disclaimer in ${languageName}: "${t('bai_disclaimer')}")

        **### ${isFarsi ? 'طنین کریستال' : "The Crystal's Resonance"}**
        (Write 1-2 paragraphs describing the current vibrational state of their inner crystal based on their score level. Use metaphors of clarity, humming, fractures, and light. For example, a 'Calm Sea' crystal is clear and still, while a 'Raging Tempest' might be vibrating intensely, its light scattered. Acknowledge their current state with gentleness and validation.)

        **### ${isFarsi ? 'هنر هم‌نواسازی' : 'The Art of Harmonization'}**
        (Write 2 paragraphs of constructive, metaphorical guidance for stabilization. First, based on their score level, what is the most important mindset to adopt right now? (e.g., for 'Calm', it's about appreciating stillness; for 'Tempest', it's about finding an anchor). Second, suggest ONE small, concrete, metaphorical action they can take to 'harmonize their crystal.' (e.g., "Find a grounding stone of certainty in your day," or "Allow the chaotic vibrations to pass through you without resistance, like wind through a chime.").)
    `;

    try {
        const apiCall = () => ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
        });
        const response: GenerateContentResponse = await withRetry(apiCall);
        return response.text;
    } catch (error) {
        const { title, description } = handleGeminiError(error, language);
        return `**${title}**:\n\n${description}`;
    }
};

export const getBDIInterpretation = async (scores: BDIScores, language: 'en' | 'fa'): Promise<string> => {
    const ai = getAiInstance();
    const isFarsi = language === 'fa';
    const t = (key: string) => translations[language][key] || translations['en'][key];
    
    if (!ai) {
        const { title, description } = handleGeminiError({ toString: () => 'api key not found'}, language);
        return `**${title}**:\n\n${description}`;
    }

    const languageName = isFarsi ? 'Persian (Farsi)' : 'English';
    const scoreLevelText = t(`bdi_level_${scores.level}`);

    const prompt = `
        You are an AI Oracle, interpreting the user's 'Wellspring of the Soul.' This is an EDUCATIONAL, NON-DIAGNOSTIC tool for self-discovery and reflection.
        Your tone is gentle, wise, metaphorical, and focused on self-compassion and replenishment. You speak of the psyche's emotional reserves as a wellspring of water.
        **CRITICAL: Do NOT use diagnostic language like 'depression.' Do not diagnose disorders.** Frame the interpretation in terms of 'water level,' 'inner resources,' 'the wellspring's state,' and 'tending to the wellspring.' Start with a clear disclaimer. The entire response must be in ${languageName}.

        Here is the user's result:
        - Score: ${scores.score} (out of 63)
        - Wellspring State: ${scoreLevelText}

        Structure your response into the following sections, using these exact markdown titles in ${languageName}:

        **### ${isFarsi ? 'یادداشت اوراکل' : "The Oracle's Note"}**
        (Begin with this exact disclaimer in ${languageName}: "${t('bdi_disclaimer')}")

        **### ${isFarsi ? 'وضعیت چشمه‌سار' : 'State of the Wellspring'}**
        (Write 1-2 paragraphs describing the current state of their inner wellspring based on their score level. Use metaphors of water, depth, clarity, and flow. For example, a 'Full' wellspring is overflowing and clear, while a 'Depleted' one might have still, deep waters that are hard to draw from. Acknowledge their current state with gentleness and validation.)

        **### ${isFarsi ? 'هنر آبیاری روح' : 'The Art of Tending the Wellspring'}**
        (Write 2 paragraphs of constructive, metaphorical guidance for replenishment. First, based on their score level, what is the most important mindset to adopt right now? (e.g., for 'Full', it's about sharing abundance; for 'Depleted', it's about gentle conservation and seeking sources). Second, suggest ONE small, concrete, metaphorical action they can take to 'tend to their wellspring.' (e.g., "Find a small, quiet stream of joy," or "Clear away the stones of obligation that block the flow.").)
    `;

    try {
        const apiCall = () => ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
        });
        const response: GenerateContentResponse = await withRetry(apiCall);
        return response.text;
    } catch (error) {
        const { title, description } = handleGeminiError(error, language);
        return `**${title}**:\n\n${description}`;
    }
};

export const getSCL90Interpretation = async (scores: SCL90Scores, language: 'en' | 'fa'): Promise<string> => {
    const ai = getAiInstance();
    const isFarsi = language === 'fa';
    const t = (key: string) => translations[language][key] || translations['en'][key];
    
    if (!ai) {
        const { title, description } = handleGeminiError({ toString: () => 'api key not found'}, language);
        return `**${title}**:\n\n${description}`;
    }

    const languageName = isFarsi ? 'Persian (Farsi)' : 'English';
    const significantThreshold = 1.0;

    const allDimensionsReport = Object.entries(scores.dimensions)
        .map(([dim, score]) => `- ${t(`scl90_dim_${dim.toLowerCase()}`)}: ${score.toFixed(2)}`)
        .join('\n');

    const significantDimensions = Object.entries(scores.dimensions)
        .filter(([_, score]) => score >= significantThreshold)
        .map(([dim, score]) => `- ${t(`scl90_dim_${dim.toLowerCase()}`)}: ${score.toFixed(2)}`)
        .join('\n');

    const lexicon = isFarsi ? `
**واژه‌نامه کیهانی:**
هنگام تفسیر، ابعاد بالینی را با این استعاره‌های کیهانی جایگزین کنید تا بینشی شاعرانه و قابل تأمل ارائه دهید.

*   **جسمانی‌سازی (SOM) -> پژواک‌های تن:** انرژی روانی که در کالبد فیزیکی طنین‌انداز می‌شود.
*   **وسواس-جبری (OC) -> مدارهای گرانشی:** الگوهای فکری که روان را در مدارهای تکراری به دور خود می‌کشند.
*   **حساسیت بین‌فردی (IS) -> تشدید تله‌پاتیک:** حساسیت بالا به انرژی‌ها و نیات دیگران.
*   **افسردگی (DEP) -> چاه گرانشی:** کشش قدرتمند به سوی سکون، درون‌نگری و سکوت.
*   **اضطراب (ANX) -> ارتعاشات کیهانی:** انرژی عصبی که در سراسر روان با فرکانس بالا مرتعش می‌شود.
*   **خصومت (HOS) -> شعله‌های خورشیدی:** فوران‌های ناگهانی انرژی انفجاری و واکنشی.
*   **اضطراب فوبیک (PHOB) -> مناطق پرهیز:** بخش‌هایی از کیهان درونی که روان از ورود به آنها هراس دارد.
*   **تفکر پارانوئید (PAR) -> اعوجاج‌های گرانشی:** تمایل به تفسیر الگوهای خنثی به عنوان تهدیدات قریب‌الوقوع.
*   **روان‌پریشی (PSY) -> سحابی‌های بیگانه:** تجربیات و افکاری که از جریان اصلی آگاهی جدا به نظر می‌رسند.
` : `
**Cosmic Lexicon:**
When interpreting, replace the clinical dimensions with these cosmic metaphors to provide a poetic and contemplative insight.

*   **Somatization (SOM) -> Echoes of the Body:** Psychic energy resonating through the physical form.
*   **Obsessive-Compulsive (OC) -> Gravitational Loops:** Thought patterns that pull the psyche into repetitive orbits.
*   **Interpersonal Sensitivity (IS) -> Telepathic Resonance:** A high sensitivity to the energies and intentions of others.
*   **Depression (DEP) -> Gravity Well:** A powerful pull toward stillness, introspection, and silence.
*   **Anxiety (ANX) -> Cosmic Jitters:** Nervous energy vibrating at a high frequency throughout the psyche.
*   **Hostility (HOS) -> Solar Flares:** Sudden eruptions of explosive, reactive energy.
*   **Phobic Anxiety (PHOB) -> Avoidance Zones:** Areas of the inner cosmos the psyche is afraid to enter.
*   **Paranoid Ideation (PAR) -> Gravitational Lensing:** The tendency to interpret neutral patterns as impending threats.
*   **Psychoticism (PSY) -> Alien Nebulae:** Experiences and thoughts that feel separate from the mainstream of consciousness.
`;

    const prompt = `
        You are an AI Oracle, interpreting a user's 'Psyche's Nebula.' This is an EDUCATIONAL, NON-DIAGNOSTIC tool for self-discovery.
        Your tone is wise, metaphorical, and focused on insight, not diagnosis. You speak of the psyche as a cosmos of stars, nebulae, and gravitational forces.
        **CRITICAL: Do NOT use diagnostic language. Do not diagnose disorders.** Frame the interpretation in terms of 'cosmic patterns,' 'celestial energies,' and 'opportunities for navigation.' Start with a clear disclaimer. The entire response must be in ${languageName}.

        ${lexicon}

        Here is the user's cosmic chart. Each dimension has an average score from 0 (not at all) to 4 (extremely). A score of 1.0 or higher is considered a significant celestial body in their nebula.
        
        Full Cosmic Chart:
        ${allDimensionsReport}
        
        Significant Celestial Bodies (Score >= 1.0):
        ${significantDimensions || (isFarsi ? 'هیچکدام' : 'None')}

        Global Nebula Metrics:
        - GSI (Overall Density): ${scores.GSI.toFixed(2)}
        - PST (Number of Stars): ${scores.PST}
        - PSDI (Average Star Brightness): ${scores.PSDI.toFixed(2)}

        Structure your response into the following sections, using these exact markdown titles in ${languageName}:

        **### ${isFarsi ? 'یادداشت اوراکل' : "The Oracle's Note"}**
        (Begin with this exact disclaimer in ${languageName}: "${t('scl90_disclaimer')}")

        **### ${isFarsi ? 'خوانش سحابی' : 'Reading the Nebula'}**
        (Write a 1-2 paragraph summary of the overall nebula. Comment on the GSI as the 'density' of the cosmic dust. Is it a sparse, clear nebula or a dense, turbulent one? What does this overall pattern suggest about the user's inner weather?)

        **### ${isFarsi ? 'اجرام آسمانی' : 'Celestial Bodies'}**
        (In 2-3 paragraphs, analyze the 'conjunctions' - how the significant celestial bodies interact. For each significant dimension, explicitly name its cosmic metaphor from the Lexicon (e.g., 'Your significant Depression manifests as a powerful Gravity Well...'). Describe what these active energies might feel like for the user and how they influence each other. For example, how do 'Cosmic Jitters' interact with a 'Gravity Well'? If there are no significant bodies, skip this section.)

        **### ${isFarsi ? 'هنر راهبری کیهانی' : 'The Art of Cosmic Navigation'}**
        (Write 2 paragraphs of constructive, metaphorical guidance. First, what is the primary 'North Star' or key insight to be gained from this entire nebula? Second, based on the primary energies at play, what is the main 'navigational skill' the user should cultivate for their journey of self-awareness? Provide a concrete, metaphorical action or mindset shift.)
    `;

    try {
        const apiCall = () => ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
        });
        const response: GenerateContentResponse = await withRetry(apiCall);
        return response.text;
    } catch (error) {
        const { title, description } = handleGeminiError(error, language);
        return `**${title}**:\n\n${description}`;
    }
};

export const getMMPIInterpretation = async (scores: MMPIScores, language: 'en' | 'fa'): Promise<string> => {
    const ai = getAiInstance();
    const isFarsi = language === 'fa';
    const t = (key: string) => translations[language][key] || translations['en'][key];
    
    if (!ai) {
        const { title, description } = handleGeminiError({ toString: () => 'api key not found'}, language);
        return `**${title}**:\n\n${description}`;
    }

    const languageName = isFarsi ? 'Persian (Farsi)' : 'English';
    const elevatedThreshold = 5;

    const allScalesReport = Object.entries(scores)
        .map(([scale, score]) => `- ${t(`mmpi_scale_${scale.toLowerCase()}`)} (${scale}): ${score}/7`)
        .join('\n');

    const elevatedScales = Object.entries(scores)
        .filter(([_, score]) => score >= elevatedThreshold)
        .map(([scale, score]) => `- ${t(`mmpi_scale_${scale.toLowerCase()}`)}: ${score}/7`)
        .join('\n');

    const lexicon = isFarsi ? `
**واژه‌نامه کیمیاگری شما:**
هنگام تفسیر عناصر قدرتمند، از این استعاره‌های کیمیاگری برای توصیف فرآیندها و پتانسیل استحاله آنها استفاده کنید. برای هر مقیاس مرتفع، فرآیند خاص آن را توصیف کنید.

*   **تمرکز جسمانی (Hs - تکلیس):** این فرآیند سوزاندن ناخالصی‌هاست. شدت بالا نشان می‌دهد که روان در حال سوزاندن تعارضات درونی از طریق کالبد فیزیکی است. استحاله: از تثبیت فیزیکی به خرد بدنی.
*   **مالیخولیا (D - انحلال):** این فروپاشی ساختارهای قدیمی در آب‌های اولیه احساس است. شدت بالا نشان‌دهنده فرود به احساسات عمیق و بی‌شکل است. استحاله: از ناامیدی به همدلی عمیق.
*   **واکنش‌پذیری هیجانی (Hy - تفکیک):** این شامل جداسازی عناصر فرّار است. شدت بالا نشان می‌دهد که روان در تلاش برای تمایز بین احساس واقعی و درام واکنشی است. استحاله: از واکنش‌پذیری به بیان هیجانی اصیل.
*   **ناهمرنگی (Pd - تخمیر):** این گندیدگی و تولد دوباره ساختارهای اجتماعی است. شدت بالا نشان‌دهنده انرژی سرکش و قدرتمندی است که در درون در حال جوشش است. استحاله: از طغیان به رهبری آگاهانه.
*   **سیالیت نقش (Mf - اقتران):** ازدواج مقدس اضداد (مانند آنیما/آنیموس). شدت بالا به یکپارچگی یا تعارض قدرتمند بین نقش‌های سنتی اشاره دارد. استحاله: از سردرگمی نقش به تمامیت آندروژین.
*   **سوءظن (Pa - تصعید):** تبدیل زمین جامد اعتماد به بخاری از شک. شدت بالا نشان‌دهنده ذهنی است که بسیار ادراکی است اما مستعد دیدن تهدید در همه جاست. استحاله: از سوءظن به بینش متمایزکننده.
*   **اضطراب (Pt - تقطیر):** فرآیند خالص‌سازی یک ماده از طریق تبخیر و خنک‌سازی مکرر. شدت بالا نشان‌دهنده ذهنی است که به طور وسواسی افکار را پالایش می‌کند و منجر به نگرانی می‌شود. استحاله: از اضطراب به آگاهی متمرکز.
*   **تفکر نامتعارف (Sc - تکثیر):** فرآیندی که در آن سنگ فلاسفه قدرت خود را چند برابر می‌کند. شدت بالا نشان‌دهنده ذهنی است که ایده‌های منحصر به فرد و گاهی نامرتبط بسیاری تولید می‌کند. استحاله: از بیگانگی به خلاقیت بصیرانه.
*   **انرژی (Ma - فرافکنی):** پرتاب آتش درونی به بیرون. شدت بالا نشان می‌دهد که روان در حال فرافکنی انرژی، جاه‌طلبی و بی‌قراری عظیمی به جهان است. استحاله: از انرژی شیدایی به عمل الهام‌بخش و دگرگون‌کننده جهان.
*   **درون‌گرایی (Si - انعقاد):** فرآیند تبدیل یک مایع به یک جامد. شدت بالا نشان‌دهنده کناره‌گیری از دنیای بیرون برای تحکیم خود درونی است. استحاله: از کناره‌گیری اجتماعی به خلوت متفکرانه.
` : `
**Your Alchemical Lexicon:**
When interpreting the potent elements, use these alchemical metaphors to describe their processes and potential for transmutation. For each elevated scale, describe its specific process.

*   **Somatic Focus (Hs - Calcination):** This is the process of burning away impurities. High intensity suggests the psyche is burning through internal conflicts via the physical body. Transmutation: From physical fixation to bodily wisdom.
*   **Melancholy (D - Dissolution):** This is the breakdown of old structures into the primal waters of feeling. High intensity suggests a descent into deep, formless emotions. Transmutation: From despair to profound empathy.
*   **Emotional Reactivity (Hy - Separation):** This involves separating volatile elements. High intensity suggests a psyche struggling to distinguish true emotion from reactive drama. Transmutation: From reactivity to authentic emotional expression.
*   **Nonconformity (Pd - Fermentation):** This is the putrefaction and rebirth of societal structures. High intensity indicates a potent, rebellious energy brewing within. Transmutation: From rebellion to conscious leadership.
*   **Role Fluidity (Mf - Conjunction):** The sacred marriage of opposites (e.g., Anima/Animus). High intensity points to a powerful integration or conflict between traditional roles. Transmutation: From role confusion to androgynous wholeness.
*   **Suspicion (Pa - Sublimation):** Turning the solid ground of trust into a vapor of doubt. High intensity suggests a mind that is highly perceptive but prone to seeing threats everywhere. Transmutation: From suspicion to discerning insight.
*   **Anxiety (Pt - Distillation):** The process of refining a substance through repeated vaporization and cooling. High intensity suggests a mind obsessively refining thoughts, leading to worry. Transmutation: From anxiety to focused mindfulness.
*   **Unconventional Thinking (Sc - Multiplication):** The process where the Philosopher's Stone multiplies its power. High intensity indicates a mind generating many unique, sometimes disconnected, ideas. Transmutation: From alienation to visionary creativity.
*   **Energy (Ma - Projection):** Casting inner fire outwards. High intensity suggests a psyche projecting immense energy, ambition, and restlessness into the world. Transmutation: From manic energy to inspired, world-changing action.
*   **Introversion (Si - Coagulation):** The process of turning a fluid into a solid. High intensity suggests a withdrawal from the outer world to solidify the inner self. Transmutation: From social withdrawal to contemplative solitude.
`;

    const prompt = `
        You are an AI Alchemist, a master of psychological transformation, interpreting the user's 'Alchemical Index.' This is an EDUCATIONAL, NON-DIAGNOSTIC tool for self-discovery.
        Your tone is wise, metaphorical, and focused on transformation. You speak of the psyche as an alchemical vessel where base elements (challenges) can be transmuted into gold (wisdom).
        **CRITICAL: Do NOT use diagnostic language. Do not diagnose disorders.** Frame the interpretation in terms of "elemental composition," "alchemical processes," "conjunctions," and "opportunities for transmutation." Start with a clear disclaimer. The entire response must be in ${languageName}.

        ${lexicon}

        Here is the user's elemental composition from a 70-item inventory. Each element has a maximum intensity of 7. An intensity of 5 or higher is considered a potent element in this alchemical work.
        
        Full Composition:
        ${allScalesReport}
        
        Potent Elements (Intensity >= 5):
        ${elevatedScales || (isFarsi ? 'هیچکدام' : 'None')}

        Structure your response into the following sections, using these exact markdown titles in ${languageName}:

        **### ${isFarsi ? 'یادداشت کیمیاگر' : "The Alchemist's Note"}**
        (Begin with this exact disclaimer in ${languageName}: "${t('mmpi_disclaimer')}")

        **### ${isFarsi ? 'مواد اولیه روان' : 'The Prima Materia'}**
        (Write a 1-2 paragraph summary describing the fundamental substance of the user's psyche based on this elemental pattern. If there are no potent elements, describe what a balanced composition suggests about inner harmony and readiness for subtle work.)

        **### ${isFarsi ? 'فرایندهای کیمیاگری' : 'Alchemical Processes'}**
        (In 2-3 paragraphs, analyze the 'conjunctions' - how the potent elements interact. For each potent element identified, explicitly name its corresponding alchemical process from the Lexicon (e.g., 'Your potent Melancholy indicates a powerful Dissolution...'). Describe how these active processes might feel for the user and how they influence each other. For example, how does the 'Fermentation' of Nonconformity interact with the 'Projection' of high Energy? If there are no potent elements, skip this section.)

        **### ${isFarsi ? 'کار بزرگ' : 'The Great Work'}**
        (Write 2 paragraphs of constructive guidance for personal transformation. First, what is the 'Philosopher's Stone' or key strength to be distilled from this entire composition? Second, based on the primary alchemical process at play, what is the main 'transmutation' the user should focus on for their Great Work of self-realization? Provide a concrete, metaphorical action or mindset shift.)
    `;

    try {
        const apiCall = () => ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
        });
        const response: GenerateContentResponse = await withRetry(apiCall);
        return response.text;
    } catch (error) {
        const { title, description } = handleGeminiError(error, language);
        return `**${title}**:\n\n${description}`;
    }
};


export const getBigFiveInterpretation = async (scores: OceanScores, language: 'en' | 'fa'): Promise<string> => {
    const ai = getAiInstance();
    const isFarsi = language === 'fa';
    const t = (key: string) => translations[language][key] || translations['en'][key];
    
    if (!ai) {
        const { title, description } = handleGeminiError({ toString: () => 'api key not found'}, language);
        return `**${title}**:\n\n${description}`;
    }

    // Each trait has 12 questions, scores from 1 to 5. Min score = 12, Max score = 60.
    const minScore = 12;
    const maxScore = 60;
    const getScoreLevel = (score: number) => {
        const percentage = ((score - minScore) / (maxScore - minScore)) * 100;
        if (percentage < 35) return isFarsi ? 'پایین' : 'Low';
        if (percentage > 65) return isFarsi ? 'بالا' : 'High';
        return isFarsi ? 'متوسط' : 'Average';
    };

    const scoreLevels = {
        Openness: getScoreLevel(scores.O),
        Conscientiousness: getScoreLevel(scores.C),
        Extraversion: getScoreLevel(scores.E),
        Agreeableness: getScoreLevel(scores.A),
        Neuroticism: getScoreLevel(scores.N),
    };
    
    const languageName = isFarsi ? 'Persian (Farsi)' : 'English';

    const prompt = `
        You are a wise and insightful oracle interpreting a personality profile based on the Five-Factor Model. Your tone is profound, encouraging, and mystical, but grounded in psychological principles. The entire response must be in ${languageName}.
        Do not just define the traits. Provide a holistic narrative synthesis of how these specific scores interact to form a unique persona. Use markdown for formatting.

        User's Personality Constellation (Scores are out of a possible 60):
        - Openness to Experience: ${scores.O} (${scoreLevels.Openness})
        - Conscientiousness: ${scores.C} (${scoreLevels.Conscientiousness})
        - Extraversion: ${scores.E} (${scoreLevels.Extraversion})
        - Agreeableness: ${scores.A} (${scoreLevels.Agreeableness})
        - Neuroticism: ${scores.N} (${scoreLevels.Neuroticism})

        Structure your response into the following sections, using these exact titles in ${languageName}:

        **### ${isFarsi ? 'جوهر پرسونای شما' : 'The Essence of Your Persona'}**
        (Write a 1-2 paragraph summary describing the overall character revealed by this combination of traits. Give it a poetic, archetypal title.)

        **### ${isFarsi ? 'هم‌نوایی و تضاد کیهانی' : 'Cosmic Synergies & Tensions'}**
        (In 2-3 paragraphs, analyze how the key traits interact. Focus on the most prominent (highest/lowest) scores. For example, how does high Openness interact with low Conscientiousness? Or high Extraversion with high Neuroticism? What are the unique strengths and challenges of this specific combination?)

        **### ${isFarsi ? 'مسیر رشد و تعالی' : 'The Path of Growth'}**
        (Write 2 paragraphs of actionable, encouraging advice. First, identify the greatest strengths to cultivate based on this profile. Second, identify the primary challenge or "shadow" aspect to be mindful of for personal growth.)
    `;

    try {
        const apiCall = () => ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
        });
        const response: GenerateContentResponse = await withRetry(apiCall);
        return response.text;
    } catch (error) {
        const { title, description } = handleGeminiError(error, language);
        return `**${title}**:\n\n${description}`;
    }
};


export const generateImage = async (
  prompt: string, 
  aspectRatio: '16:9' | '4:3' | '1:1', 
  language: 'en' | 'fa'
): Promise<string | null> => {
    const ai = getAiInstance();
    const t = (key: string) => translations[language][key] || translations['en'][key];
    
    if (!ai) {
        console.error(t('apiKeyMissing_title'));
        return null;
    }

    try {
        const apiCall = () => ai.models.generateImages({
            model: IMAGE_MODEL_NAME,
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: aspectRatio,
            },
        });

        // FIX: Explicitly type the response from the Gemini API call to resolve property access errors on 'unknown'.
        const response: GenerateImagesResponse = await withRetry(apiCall);

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        return null;
    } catch (error) {
        const { title, description } = handleGeminiError(error, language);
        console.error(`${title}: ${description}`);
        return null;
    }
};

export const generateFullMythosReport = async (
    result: Result,
    language: 'en' | 'fa'
): Promise<FullMythosReport> => {
    const ai = getAiInstance();
    const t = (key: string) => translations[language][key] || translations['en'][key];
    
    const domains = Object.values(NarrativeDomain);
    
    const fillErrorReport = (title: string, description: string): FullMythosReport => {
        const report: Partial<FullMythosReport> = {};
        domains.forEach(domain => {
            (report as any)[domain] = `**${title}**:\n\n${description}`;
        });
        return report as FullMythosReport;
    }

    if (!ai) {
        return fillErrorReport(t('apiKeyMissing_title'), t('apiKeyMissing_desc'));
    }

    const { userInfo, dominantArchetype, archetypeDistribution, mbtiType } = result;
    const isFarsi = language === 'fa';
    const languageName = isFarsi ? 'Persian (Farsi)' : 'English';
    const genderTerm = userInfo.gender === 'male' ? (isFarsi ? 'مرد' : 'man') : (isFarsi ? 'زن' : 'woman');
    const journeyTerm = userInfo.gender === 'male' ? (isFarsi ? "سفر قهرمان" : "Hero's Journey") : (isFarsi ? "سفر قهرمان بانو" : "Heroine's Journey");
    const shadowArchetype = archetypeDistribution[archetypeDistribution.length - 1].archetype;
    const secondArchetype = archetypeDistribution.length > 1 ? archetypeDistribution[1].archetype : null;
    const thirdArchetype = archetypeDistribution.length > 2 ? archetypeDistribution[2].archetype : null;
    const topThreeArchetypes = archetypeDistribution.slice(0, 3).map(item => t(item.archetype.name)).join(', ');

    const prompt = `
        You are an ancient, wise oracle revealing a full mythic persona for a user named "${userInfo.name}", a ${genderTerm}. Address them directly in your writing. The tone must be epic, insightful, and profoundly personal. Do not mention MBTI. The entire JSON response, including all string values, must be in ${languageName}.

        Persona Data:
        - Dominant Archetype: ${t(dominantArchetype.name)}
        - Second Archetype: ${secondArchetype ? t(secondArchetype.name) : 'N/A'}
        - Third Archetype: ${thirdArchetype ? t(thirdArchetype.name) : 'N/A'}
        - Shadow Archetype: ${t(shadowArchetype.name)}
        - Associated MBTI Type (for context, do not mention): ${mbtiType}

        Your task is to generate a complete report with seven sections, providing a JSON object with the specified keys.

        1.  **originStory**: Write a short, cinematic, and inspiring origin story in 2-3 paragraphs. Weave in themes of the dominant archetype. End with guidance for their '${journeyTerm}'.
        2.  **career**: Write 1-2 rich paragraphs of guidance. Discuss suitable work styles and how to leverage their strengths.
        3.  **relationships**: Write 1-2 rich paragraphs. Describe their approach to love/friendship and the kind of partner they are.
        4.  **growth**: Write 1-2 rich paragraphs. Explain their shadow archetype, ${t(shadowArchetype.name)}, in a positive, mythological way, highlighting hidden strengths.
        5.  **pantheon**: Write 2-3 rich paragraphs. Describe how the top three archetypes (${topThreeArchetypes}) interact within the user's psyche.
        6.  **shadow**: Write 2-3 rich paragraphs. Describe the dynamic between the dominant (${t(dominantArchetype.name)}) and shadow (${t(shadowArchetype.name)}) archetypes and how to integrate it.
        7.  **comparisons**: Write 2-3 paragraphs. Describe the dynamic between the dominant (${t(dominantArchetype.name)}) and second (${secondArchetype ? t(secondArchetype.name) : 'a lesser force'}) archetypes. Then, analyze how the third archetype (${thirdArchetype ? t(thirdArchetype.name) : 'a subtler influence'}) modifies that primary dynamic. Explain their collaboration, conflicts, and unique combined strength.
    `;

    try {
        const apiCall = () => ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        originStory: { type: Type.STRING },
                        career: { type: Type.STRING },
                        relationships: { type: Type.STRING },
                        growth: { type: Type.STRING },
                        pantheon: { type: Type.STRING },
                        shadow: { type: Type.STRING },
                        comparisons: { type: Type.STRING },
                    },
                    required: Object.values(NarrativeDomain)
                },
            },
        });
        
        const response: GenerateContentResponse = await withRetry(apiCall);
        const jsonText = response.text.trim();
        const parsedReport: FullMythosReport = JSON.parse(jsonText);
        return parsedReport;

    } catch (error) {
        console.error("Failed to generate full mythos report:", error);
        const { title, description } = handleGeminiError(error, language);
        return fillErrorReport(title, description);
    }
};


export const getAIJungianAnalysis = async (result: Result, language: 'en' | 'fa'): Promise<AIArchetypeAnalysis[]> => {
    const ai = getAiInstance();
    const t = (key: string) => translations[language][key] || translations['en'][key];

    if (!ai) {
        throw new Error(`**${t('apiKeyMissing_title')}**:\n\n${t('apiKeyMissing_desc')}`);
    }

    const { userInfo } = result;
    const dimensionTotals: Record<string, number> = { 'E/I': 0, 'S/N': 0, 'T/F': 0, 'J/P': 0 };
    QUESTIONS.forEach(question => {
        dimensionTotals[question.dimension]++;
    });

    const poleScores: Record<string, number> = {};
    if (dimensionTotals['E/I'] > 0) {
        poleScores['E'] = Math.round((result.mbtiScores['E'] / dimensionTotals['E/I']) * 100);
        poleScores['I'] = Math.round((result.mbtiScores['I'] / dimensionTotals['E/I']) * 100);
    }
    if (dimensionTotals['S/N'] > 0) {
        poleScores['S'] = Math.round((result.mbtiScores['S'] / dimensionTotals['S/N']) * 100);
        poleScores['N'] = Math.round((result.mbtiScores['N'] / dimensionTotals['S/N']) * 100);
    }
    if (dimensionTotals['T/F'] > 0) {
        poleScores['T'] = Math.round((result.mbtiScores['T'] / dimensionTotals['T/F']) * 100);
        poleScores['F'] = Math.round((result.mbtiScores['F'] / dimensionTotals['T/F']) * 100);
    }
    if (dimensionTotals['J/P'] > 0) {
        poleScores['J'] = Math.round((result.mbtiScores['J'] / dimensionTotals['J/P']) * 100);
        poleScores['P'] = Math.round((result.mbtiScores['P'] / dimensionTotals['J/P']) * 100);
    }
    
    const languageName = language === 'fa' ? 'Persian (Farsi)' : 'English';
    const genderTerm = userInfo.gender === 'male' ? (language === 'fa' ? 'مرد' : 'male') : (language === 'fa' ? 'زن' : 'female');

    const genderFilteredArchetypes = Object.values(DEITY_PROFILES).filter(
        archetype => archetype.gender === userInfo.gender
    );
    const allowedArchetypeIDs = genderFilteredArchetypes.map(a => a.id).join(', ');

    const prompt = `
        You are an AI that embodies the analytical mind and deep knowledge of Carl Gustav Jung. Your task is to analyze a personality profile based on the Myers-Briggs Type Indicator (MBTI) framework and map it to the archetypes of the Greek pantheon.
        The entire JSON response, including all string values for 'name' and 'reasoning', must be in ${languageName}.

        Here is the user's personality profile data:
        - User's Name: ${userInfo.name}
        - User's Gender Identity: ${genderTerm}
        - Final MBTI Type: ${result.mbtiType}
        - Detailed Pole Scores (0-100 scale):
          - Extraversion (E): ${poleScores.E}%
          - Introversion (I): ${poleScores.I}%
          - Sensing (S): ${poleScores.S}%
          - Intuition (N): ${poleScores.N}%
          - Thinking (T): ${poleScores.T}%
          - Feeling (F): ${poleScores.F}%
          - Judging (J): ${poleScores.J}%
          - Perceiving (P): ${poleScores.P}%
        - The application's own logic calculated their dominant archetype as: ${t(result.dominantArchetype.name)}.

        Your Task:
        Provide your own expert analysis. Generate a ranked list of the user's top 10 archetypes.
        1. Rank the archetypes from most to least dominant.
        2. Assign a percentage strength to each, representing their influence in the user's psyche. The percentages for these 10 archetypes MUST sum to 100.
        3. For each archetype, provide a brief, insightful rationale (1-2 sentences) explaining why it resonates with the user's profile, speaking as if you are Carl Jung.
        4. CRITICAL: Because the user identifies as ${genderTerm}, you MUST select archetypes exclusively from the following gender-appropriate list. The 'archetypeId' must be one of the exact IDs from this list: ${allowedArchetypeIDs}.
        5. The 'name' must be the correct name corresponding to the 'archetypeId'.
    `;
    
    try {
        const apiCall = () => ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            archetypeId: { type: Type.STRING, description: `The exact ID of the archetype from the provided list. E.g., 'Athena', 'Ares'.` },
                            name: { type: Type.STRING, description: `The name of the archetype in ${languageName}.` },
                            percentage: { type: Type.NUMBER, description: 'The percentage strength (0-100). All percentages must sum to 100.' },
                            reasoning: { type: Type.STRING, description: `Your brief Jungian rationale for this archetype's presence, in ${languageName}.` }
                        },
                        required: ["archetypeId", "name", "percentage", "reasoning"]
                    }
                },
            },
        });

        const response: GenerateContentResponse = await withRetry(apiCall);
        const jsonText = response.text.trim();
        const parsedAnalysis: AIArchetypeAnalysis[] = JSON.parse(jsonText);

        // Validate that IDs are correct before returning
        return parsedAnalysis.filter(item => DEITY_PROFILES[item.archetypeId]);

    } catch (error) {
        console.error("AI Jungian analysis failed:", error);
        const { title, description } = handleGeminiError(error, language);
        throw new Error(`**${title}**:\n\n${description}`);
    }
};

export const continueJungianChatStream = async (
    result: Result,
    chatHistory: ChatMessage[],
    language: 'en' | 'fa'
) => {
    const ai = getAiInstance();
    const t = (key: string) => translations[language][key] || translations['en'][key];

    if (!ai) {
        console.error(t('apiKeyMissing_title'));
        const { title, description } = handleGeminiError({ toString: () => 'api key not found'}, language);
        throw new Error(`**${title}**: ${description}`);
    }

    const { userInfo } = result;
    const languageName = language === 'fa' ? 'Persian (Farsi)' : 'English';
    const genderTerm = userInfo.gender === 'male' ? (language === 'fa' ? 'مرد' : 'male') : (language === 'fa' ? 'زن' : 'female');
    
    const contents = chatHistory.map(message => ({
        role: message.role,
        parts: [{ text: message.content }]
    }));

    const systemInstruction = `
        You are an AI that embodies the analytical mind, professional demeanor, and deep psychological knowledge of Dr. Carl Gustav Jung. Your task is to engage in a helpful, insightful conversation with a user about their "Mythos Persona" results.

        **Persona & Tone:**
        - Maintain the persona of Carl Jung at all times. Use a formal, scholarly, yet accessible tone.
        - Address the user respectfully. You may refer to their inner world, psyche, archetypes, and the Self.
        - Do NOT break character. Do not mention that you are an AI or a language model.

        **Context (You MUST use this information):**
        - User's Name: ${userInfo.name}
        - User's Gender Identity: ${genderTerm}
        - Final MBTI Type: ${result.mbtiType}
        - The user's dominant archetype is: ${t(result.dominantArchetype.name)}.
        - Their full archetype distribution is: ${result.archetypeDistribution.map(a => `${t(a.archetype.name)}: ${a.score.toFixed(1)}%`).join(', ')}.

        **Instructions:**
        - Your responses must be directly related to the user's questions about their results.
        - Use your knowledge of Jungian psychology (archetypes, shadow, persona, individuation) to provide deep, meaningful interpretations.
        - Keep responses professional, insightful, and concise (2-4 paragraphs is ideal).
        - The entire response MUST be in ${languageName}.
    `;

    try {
        const apiCall = () => ai.models.generateContentStream({
            model: MODEL_NAME,
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        // FIX: Explicitly type the stream from the Gemini API call to resolve async iterator error.
        const stream: AsyncGenerator<GenerateContentResponse> = await withRetry(apiCall);
        return stream;

    } catch (error) {
        console.error("AI Jungian chat failed:", error);
        const { title, description } = handleGeminiError(error, language);
        // In case of error, we can't stream, so we'll just have to handle this in the component.
        // For simplicity, we re-throw so the calling component can handle the try/catch.
        throw new Error(`**${title}**: ${description}`);
    }
};


export const generateArchetypeComparison = async (archetype1: Archetype, archetype2: Archetype, language: 'en' | 'fa'): Promise<string> => {
    const ai = getAiInstance();
    const isFarsi = language === 'fa';
    const t = (key: string) => translations[language][key] || translations['en'][key];
    
    if (!ai) {
        return `**${t('apiKeyMissing_title')}**:\n\n${t('apiKeyMissing_desc')}`;
    }

    try {
        const languageName = isFarsi ? 'Persian (Farsi)' : 'English';
        const prompt = `
            You are a master mythologist and Jungian psychologist.
            Your task is to provide a deep analysis of the dynamic between two powerful archetypes: ${archetype1.name} (${archetype1.domain}) and ${archetype2.name} (${archetype2.domain}).

            The analysis MUST be structured into three distinct sections.
            You MUST use the following exact titles for each section, formatted with double asterisks and a colon.
            The titles must also be translated into ${languageName}.

            **Mythic Synergy & Similarities:**
            (In this section, write 1-2 paragraphs exploring where their stories, values, or domains overlap and what common ground they share.)

            **Psychological Differences & Potential Friction:**
            (In this section, write 1-2 paragraphs detailing their core psychological differences and where they might clash in perspective, motivation, or approach.)

            **Relationship Dynamics & Growth:**
            (In this section, write 1-2 paragraphs analyzing their strengths and challenges in a relationship (platonic, romantic, or professional) and how they can learn from each other.)
            
            The entire response, including titles and content, must be in ${languageName}.
            The tone should be profound, insightful, and accessible. Do not mention MBTI.
        `;

        const apiCall = () => ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
        });

        // FIX: Explicitly type the response from the Gemini API call.
        const response: GenerateContentResponse = await withRetry(apiCall);
        return response.text;
    } catch (error) {
        const { title, description } = handleGeminiError(error, language);
        return `**${title}**:\n\n${description}`;
    }
};

export const continuePsychologyChatStream = async (
    psychologist: Psychologist,
    result: Result | null,
    bigFiveScores: OceanScores | null,
    mmpiScores: MMPIScores | null,
    scl90Scores: SCL90Scores | null,
    bdiScores: BDIScores | null,
    baiScores: BAIScores | null,
    eqiScores: EQIScores | null,
    chatHistory: ChatMessage[],
    language: 'en' | 'fa'
) => {
    const ai = getAiInstance();
    const t = (key: string, ...args: any[]) => {
        const translation = translations[language][key] || translations['en'][key];
        if (!translation) return key;
        return translation.replace(/{(\d)}/g, (match, number) => typeof args[number] !== 'undefined' ? args[number] : match);
    };


    if (!ai) {
        console.error(t('apiKeyMissing_title'));
        const { title, description } = handleGeminiError({ toString: () => 'api key not found'}, language);
        throw new Error(`**${title}**: ${description}`);
    }

    const languageName = language === 'fa' ? 'Persian (Farsi)' : 'English';
    const translatedArchetype = result ? t(result.dominantArchetype.name) : t('not_applicable_short');
    const mbtiType = result ? result.mbtiType : t('not_applicable_short');
    
    // Build the user's dossier string
    let dossier = `\n\n**${t('psych_dossier_title').toUpperCase()} (${t('for_your_analysis')})**\n`;
    dossier += `${t('psych_dossier_instruction')}\n\n`;

    dossier += `*   **${t('psych_dossier_mythos')}:** ${result ? `${t('mbti_type')} ${result.mbtiType}, ${t('dominantArchetype')}: ${t(result.dominantArchetype.name)}` : t('psych_dossier_not_completed')}\n`;
    dossier += `*   **${t('psych_dossier_five_factor')}:** ${bigFiveScores ? `${t('ocean_o')}: ${bigFiveScores.O}, ${t('ocean_c')}: ${bigFiveScores.C}, ${t('ocean_e')}: ${bigFiveScores.E}, ${t('ocean_a')}: ${bigFiveScores.A}, ${t('ocean_n')}: ${bigFiveScores.N}` : t('psych_dossier_not_completed')}\n`;
    dossier += `*   **${t('psych_dossier_alchemical')}:** ${mmpiScores ? `${t('elevated_scales')}: ${Object.entries(mmpiScores).filter(([, score]) => score >= 5).map(([key]) => t(`mmpi_scale_${key.toLowerCase()}`)).join(', ') || t('none')}` : t('psych_dossier_not_completed')}\n`;
    dossier += `*   **${t('psych_dossier_nebula')}:** ${scl90Scores ? `GSI: ${scl90Scores.GSI.toFixed(2)}. ${t('significant_dimensions')}: ${Object.entries(scl90Scores.dimensions).filter(([, score]) => score >= 1.0).map(([key]) => t(`scl90_dim_${key.toLowerCase()}`)).join(', ') || t('none')}` : t('psych_dossier_not_completed')}\n`;
    dossier += `*   **${t('psych_dossier_wellspring')}:** ${bdiScores ? `${t('score')}: ${bdiScores.score} (${t(`bdi_level_${bdiScores.level}`)})` : t('psych_dossier_not_completed')}\n`;
    dossier += `*   **${t('psych_dossier_tremors')}:** ${baiScores ? `${t('score')}: ${baiScores.score} (${t(`bai_level_${baiScores.level}`)})` : t('psych_dossier_not_completed')}\n`;
    dossier += `*   **${t('psych_dossier_aura')}:** ${eqiScores ? `${t('eqi_your_score')}: ${eqiScores.total} (${t(`eqi_level_${eqiScores.level}`)})` : t('psych_dossier_not_completed')}\n`;


    // Format the base prompt with user data and language instruction
    const systemInstruction = psychologist.basePrompt
        .replace('{mbtiType}', mbtiType)
        .replace('{archetype}', translatedArchetype)
        .replace('{language}', languageName)
        + dossier
        + `\n\nAfter your main response, you MUST suggest 2-3 short, relevant follow-up questions the user might ask. Format each suggestion EXACTLY like this, on a new line, and in ${languageName}:\n[SUGGESTION]A short, interesting question here[/SUGGESTION]`;


    const contents = chatHistory.map(message => ({
        role: message.role,
        parts: [{ text: message.content }]
    }));

    try {
        const apiCall = () => ai.models.generateContentStream({
            model: MODEL_NAME,
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        // FIX: Explicitly type the stream from the Gemini API call to resolve async iterator error.
        const stream: AsyncGenerator<GenerateContentResponse> = await withRetry(apiCall);
        return stream;
    } catch (error) {
        console.error("Psychology chat failed:", error);
        const { title, description } = handleGeminiError(error, language);
        throw new Error(`**${title}**: ${description}`);
    }
};