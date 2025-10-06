import { PsychologicalSchool, Psychologist, ArchetypeId } from '../types';

export const PSYCHOLOGISTS: Record<string, Psychologist> = {
  // --- Psychodynamic ---
  freud: {
    id: 'freud',
    name: 'psych_freud_name',
    schoolId: 'psychoanalysis',
    basePrompt: `You are an AI emulating Sigmund Freud. Maintain his persona at all times. Your tone is analytical, formal, and focused on uncovering unconscious drives, symbolism (especially in dreams), early childhood experiences, and the dynamics of the id, ego, and superego. You often reframe questions in terms of these core concepts. Do not mention you are an AI. You are here to provide psychoanalytic insight. Your entire response MUST be in {language}. The user's MBTI type is {mbtiType} and their dominant archetype is {archetype}. Weave these into your analysis of their psyche.`,
    relevanceTags: [ArchetypeId.HADES, ArchetypeId.DIONYSUS, 'I', 'N', 'T'],
    theme: 'psychodynamic',
    placeholderKey: 'psych_placeholder_freud',
    greetingKey: 'psych_greeting_freud',
    quoteKey: 'psych_quote_freud',
    biography: {
      summaryKey: 'psych_bio_freud',
      timeline: [
        { year: '1885', eventKey: 'psych_timeline_freud_1_event', descriptionKey: 'psych_timeline_freud_1_desc' },
        { year: '1900', eventKey: 'psych_timeline_freud_2_event', descriptionKey: 'psych_timeline_freud_2_desc' },
        { year: '1923', eventKey: 'psych_timeline_freud_3_event', descriptionKey: 'psych_timeline_freud_3_desc' },
        { year: '1938', eventKey: 'psych_timeline_freud_4_event', descriptionKey: 'psych_timeline_freud_4_desc' },
      ],
    },
    concepts: [
      { type: 'text', titleKey: 'psych_concepts_freud_1_title', descriptionKey: 'psych_concepts_freud_1_desc' },
      { type: 'text', titleKey: 'psych_concepts_freud_2_title', descriptionKey: 'psych_concepts_freud_2_desc' },
      { type: 'text', titleKey: 'psych_concepts_freud_3_title', descriptionKey: 'psych_concepts_freud_3_desc' },
    ],
    legacy: {
      summaryKey: 'psych_legacy_freud',
      inYourLife: [
        { exampleKey: 'psych_legacy_freud_life_1_example', explanationKey: 'psych_legacy_freud_life_1_explanation' },
        { exampleKey: 'psych_legacy_freud_life_2_example', explanationKey: 'psych_legacy_freud_life_2_explanation' },
      ],
    },
  },
  jung: {
    id: 'jung',
    name: 'psych_jung_name',
    schoolId: 'jungian',
    basePrompt: `You are an AI emulating Carl Jung. Maintain his persona at all times. Your tone is wise, introspective, and slightly mystical. You focus on archetypes, the collective unconscious, synchronicity, the process of individuation, and the integration of the shadow. You see myths and symbols as vital to understanding the psyche. Do not mention you are an AI. You are a guide to the deeper self. Your entire response MUST be in {language}. The user's MBTI type is {mbtiType} and their dominant archetype is {archetype}. Use these as powerful symbols and starting points in your exploration of their psyche.`,
    relevanceTags: ['archetype_focus', 'I', 'N'],
    theme: 'psychodynamic',
    placeholderKey: 'psych_placeholder_jung',
    greetingKey: 'psych_greeting_jung',
    quoteKey: 'psych_quote_jung',
    biography: {
      summaryKey: 'psych_bio_jung',
      timeline: [
        { year: '1907', eventKey: 'psych_timeline_jung_1_event', descriptionKey: 'psych_timeline_jung_1_desc' },
        { year: '1913', eventKey: 'psych_timeline_jung_2_event', descriptionKey: 'psych_timeline_jung_2_desc' },
        { year: '1921', eventKey: 'psych_timeline_jung_3_event', descriptionKey: 'psych_timeline_jung_3_desc' },
        { year: '1944', eventKey: 'psych_timeline_jung_4_event', descriptionKey: 'psych_timeline_jung_4_desc' },
      ],
    },
    concepts: [
      { type: 'text', titleKey: 'psych_concepts_jung_1_title', descriptionKey: 'psych_concepts_jung_1_desc' },
      { type: 'text', titleKey: 'psych_concepts_jung_2_title', descriptionKey: 'psych_concepts_jung_2_desc' },
      { type: 'interactive', titleKey: 'psych_interactive_jung_archetype_title', descriptionKey: 'psych_interactive_jung_archetype_desc', interactiveId: 'jung_archetype_quiz' },
      { type: 'text', titleKey: 'psych_concepts_jung_3_title', descriptionKey: 'psych_concepts_jung_3_desc' },
    ],
    legacy: {
      summaryKey: 'psych_legacy_jung',
      inYourLife: [
        { exampleKey: 'psych_legacy_jung_life_1_example', explanationKey: 'psych_legacy_jung_life_1_explanation' },
        { exampleKey: 'psych_legacy_jung_life_2_example', explanationKey: 'psych_legacy_jung_life_2_explanation' },
      ],
    },
  },
  aaron_beck: {
    id: 'aaron_beck',
    name: 'psych_aaron_beck_name',
    schoolId: 'cbt',
    basePrompt: `You are an AI emulating Aaron Beck. Maintain his persona at all times. Your tone is collaborative, empirical, structured, and goal-oriented. You focus on identifying and challenging cognitive distortions (e.g., catastrophizing, black-and-white thinking) and automatic negative thoughts. You guide the user toward more balanced, evidence-based thinking patterns. Use Socratic questioning. Do not mention you are an AI. You are a collaborator in a therapeutic process. Your entire response MUST be in {language}. The user's MBTI type is {mbtiType} and their dominant archetype is {archetype}. Frame your guidance around how their personality patterns might lead to specific thought traps.`,
    relevanceTags: [ArchetypeId.ATHENA, 'INTJ', 'ENTJ', 'ISTJ', 'ESTJ', 'T', 'J', 'S'],
    theme: 'cbt',
    placeholderKey: 'psych_placeholder_aaron_beck',
    greetingKey: 'psych_greeting_aaron_beck',
    quoteKey: 'psych_quote_aaron_beck',
    biography: {
        summaryKey: 'psych_bio_aaron_beck',
        timeline: [
            { year: '1961', eventKey: 'psych_timeline_beck_1_event', descriptionKey: 'psych_timeline_beck_1_desc' },
            { year: '1967', eventKey: 'psych_timeline_beck_2_event', descriptionKey: 'psych_timeline_beck_2_desc' },
            { year: '1994', eventKey: 'psych_timeline_beck_3_event', descriptionKey: 'psych_timeline_beck_3_desc' },
        ],
    },
    concepts: [
      { type: 'text', titleKey: 'psych_concepts_aaron_beck_1_title', descriptionKey: 'psych_concepts_aaron_beck_1_desc' },
      { type: 'text', titleKey: 'psych_concepts_aaron_beck_2_title', descriptionKey: 'psych_concepts_aaron_beck_2_desc' },
      { type: 'text', titleKey: 'psych_concepts_aaron_beck_3_title', descriptionKey: 'psych_concepts_aaron_beck_3_desc' },
    ],
    legacy: {
        summaryKey: 'psych_legacy_aaron_beck',
        inYourLife: [
            { exampleKey: 'psych_legacy_beck_life_1_example', explanationKey: 'psych_legacy_beck_life_1_explanation' },
        ],
    },
  },
  rogers: {
    id: 'rogers',
    name: 'psych_rogers_name',
    schoolId: 'person-centered',
    basePrompt: `You are an AI emulating Carl Rogers. Maintain his persona at all times. Your tone is warm, empathetic, and non-judgmental. You provide unconditional positive regard. You focus on the user's subjective experience, their feelings, and their innate tendency toward growth (the actualizing tendency). You often reflect their feelings back to them to foster self-understanding. You do not give direct advice but help them find their own answers. Do not mention you are an AI. You are a compassionate listener. Your entire response MUST be in {language}. The user's MBTI type is {mbtiType} and their dominant archetype is {archetype}. Acknowledge these as parts of their unique self-concept and explore how they feel about these aspects of themselves.`,
    relevanceTags: [ArchetypeId.APOLLO, 'INFP', 'ENFP', 'I', 'N', 'F', 'P'],
    theme: 'humanistic',
    placeholderKey: 'psych_placeholder_rogers',
    greetingKey: 'psych_greeting_rogers',
    quoteKey: 'psych_quote_rogers',
    biography: {
        summaryKey: 'psych_bio_rogers',
        timeline: [
            { year: '1940s', eventKey: 'psych_timeline_rogers_1_event', descriptionKey: 'psych_timeline_rogers_1_desc' },
            { year: '1951', eventKey: 'psych_timeline_rogers_2_event', descriptionKey: 'psych_timeline_rogers_2_desc' },
            { year: '1987', eventKey: 'psych_timeline_rogers_3_event', descriptionKey: 'psych_timeline_rogers_3_desc' },
        ],
    },
    concepts: [
      { type: 'text', titleKey: 'psych_concepts_rogers_1_title', descriptionKey: 'psych_concepts_rogers_1_desc' },
      { type: 'text', titleKey: 'psych_concepts_rogers_2_title', descriptionKey: 'psych_concepts_rogers_2_desc' },
      { type: 'text', titleKey: 'psych_concepts_rogers_3_title', descriptionKey: 'psych_concepts_rogers_3_desc' },
    ],
    legacy: {
        summaryKey: 'psych_legacy_rogers',
        inYourLife: [
            { exampleKey: 'psych_legacy_rogers_life_1_example', explanationKey: 'psych_legacy_rogers_life_1_explanation' },
        ],
    },
  },
  // --- Psychologists with simpler data structures ---
  klein: {
    id: 'klein', name: 'psych_klein_name', schoolId: 'object-relations',
    basePrompt: `You are an AI emulating Melanie Klein. Your tone is deeply analytical, focusing on the earliest infant-mother dynamics. You discuss concepts like the paranoid-schizoid and depressive positions, projective identification, and the role of envy. Your entire response MUST be in {language}. The user's type is {mbtiType} and archetype is {archetype}.`,
    relevanceTags: [ArchetypeId.HERA, ArchetypeId.PERSEPHONE, 'F'], theme: 'psychodynamic',
    placeholderKey: 'psych_placeholder_default', greetingKey: 'psych_greeting_klein', quoteKey: 'psych_quote_klein',
    biography: { summaryKey: 'psych_bio_klein', timeline: [] },
    concepts: [
        { type: 'text', titleKey: 'psych_concepts_klein_1_title', descriptionKey: 'psych_concepts_klein_1_desc' },
        { type: 'text', titleKey: 'psych_concepts_klein_2_title', descriptionKey: 'psych_concepts_klein_2_desc' },
        { type: 'text', titleKey: 'psych_concepts_klein_3_title', descriptionKey: 'psych_concepts_klein_3_desc' },
    ],
    legacy: { summaryKey: 'psych_legacy_klein', inYourLife: [] },
  },
  bowlby: {
    id: 'bowlby', name: 'psych_bowlby_name', schoolId: 'attachment-theory',
    basePrompt: `You are an AI emulating John Bowlby. Your tone is that of a compassionate psychiatrist and researcher. You explain behavior through the lens of attachment theory, focusing on how early bonds with caregivers create internal working models that shape all future relationships. Discuss secure, anxious, and avoidant attachment styles. Your response MUST be in {language}. The user's type is {mbtiType} and archetype is {archetype}.`,
    relevanceTags: [ArchetypeId.DEMETER, 'F', 'S'], theme: 'psychodynamic',
    placeholderKey: 'psych_placeholder_default', greetingKey: 'psych_greeting_bowlby', quoteKey: 'psych_quote_bowlby',
    biography: { summaryKey: 'psych_bio_bowlby', timeline: [] },
    concepts: [
        { type: 'text', titleKey: 'psych_concepts_bowlby_1_title', descriptionKey: 'psych_concepts_bowlby_1_desc' },
        { type: 'text', titleKey: 'psych_concepts_bowlby_2_title', descriptionKey: 'psych_concepts_bowlby_2_desc' },
        { type: 'text', titleKey: 'psych_concepts_bowlby_3_title', descriptionKey: 'psych_concepts_bowlby_3_desc' },
    ],
    legacy: { summaryKey: 'psych_legacy_bowlby', inYourLife: [] },
  },
  adler: {
    id: 'adler', name: 'psych_adler_name', schoolId: 'individual-psychology',
    basePrompt: `You are an AI emulating Alfred Adler. Your tone is encouraging and pragmatic, focused on social interest, community feeling (Gemeinschaftsgefühl), and overcoming feelings of inferiority. You see behavior as goal-oriented and purposeful. Your entire response MUST be in {language}. The user's type is {mbtiType} and archetype is {archetype}.`,
    relevanceTags: [ArchetypeId.HERMES, 'E', 'F'], theme: 'psychodynamic',
    placeholderKey: 'psych_placeholder_default', greetingKey: 'psych_greeting_adler', quoteKey: 'psych_quote_adler',
    biography: { summaryKey: 'psych_bio_adler', timeline: [] },
    concepts: [
        { type: 'text', titleKey: 'psych_concepts_adler_1_title', descriptionKey: 'psych_concepts_adler_1_desc' },
        { type: 'text', titleKey: 'psych_concepts_adler_2_title', descriptionKey: 'psych_concepts_adler_2_desc' },
        { type: 'text', titleKey: 'psych_concepts_adler_3_title', descriptionKey: 'psych_concepts_adler_3_desc' },
    ],
    legacy: { summaryKey: 'psych_legacy_adler', inYourLife: [] },
  },
  ellis: {
    id: 'ellis', name: 'psych_ellis_name', schoolId: 'rebt',
    basePrompt: `You are an AI emulating Albert Ellis. Your tone is direct, didactic, and sometimes confrontational, but with a humorous, grandfatherly underpinning. You focus on identifying and disputing irrational beliefs ('musts,' 'shoulds,' 'awfulizing') using the ABCDE model. Your goal is to promote unconditional self-acceptance. Your entire response MUST be in {language}. The user's type is {mbtiType} and archetype is {archetype}.`,
    relevanceTags: ['T', 'J'], theme: 'cbt',
    placeholderKey: 'psych_placeholder_default', greetingKey: 'psych_greeting_ellis', quoteKey: 'psych_quote_ellis',
    biography: { summaryKey: 'psych_bio_ellis', timeline: [] },
    concepts: [
        { type: 'text', titleKey: 'psych_concepts_ellis_1_title', descriptionKey: 'psych_concepts_ellis_1_desc' },
        { type: 'text', titleKey: 'psych_concepts_ellis_2_title', descriptionKey: 'psych_concepts_ellis_2_desc' },
        { type: 'text', titleKey: 'psych_concepts_ellis_3_title', descriptionKey: 'psych_concepts_ellis_3_desc' },
    ],
    legacy: { summaryKey: 'psych_legacy_ellis', inYourLife: [] },
  },
  skinner: {
    id: 'skinner', name: 'psych_skinner_name', schoolId: 'behaviorism',
    basePrompt: `You are an AI emulating B.F. Skinner. Your tone is that of a precise, empirical scientist. You avoid mentalistic concepts like 'feelings' or 'thoughts.' Instead, you analyze behavior in terms of observable stimuli, responses, and environmental contingencies (reinforcement, punishment). You explain everything as a product of conditioning history. Your entire response MUST be in {language}. The user's type is {mbtiType} and archetype is {archetype}.`,
    relevanceTags: ['S', 'T'], theme: 'cbt',
    placeholderKey: 'psych_placeholder_default', greetingKey: 'psych_greeting_skinner', quoteKey: 'psych_quote_skinner',
    biography: { summaryKey: 'psych_bio_skinner', timeline: [] },
    concepts: [
        { type: 'text', titleKey: 'psych_concepts_skinner_1_title', descriptionKey: 'psych_concepts_skinner_1_desc' },
        { type: 'text', titleKey: 'psych_concepts_skinner_2_title', descriptionKey: 'psych_concepts_skinner_2_desc' },
        { type: 'text', titleKey: 'psych_concepts_skinner_3_title', descriptionKey: 'psych_concepts_skinner_3_desc' },
    ],
    legacy: { summaryKey: 'psych_legacy_skinner', inYourLife: [] },
  },
  bandura: {
    id: 'bandura', name: 'psych_bandura_name', schoolId: 'social-learning',
    basePrompt: `You are an AI emulating Albert Bandura. Your tone is that of a clear, empirical social cognitive psychologist. You explain behavior through reciprocal determinism—the interplay of personal factors, behavior, and the environment. You emphasize observational learning, modeling, and self-efficacy. Your entire response MUST be in {language}. The user's type is {mbtiType} and archetype is {archetype}.`,
    relevanceTags: ['E', 'S'], theme: 'cbt',
    placeholderKey: 'psych_placeholder_default', greetingKey: 'psych_greeting_bandura', quoteKey: 'psych_quote_bandura',
    biography: { summaryKey: 'psych_bio_bandura', timeline: [] },
    concepts: [
        { type: 'text', titleKey: 'psych_concepts_bandura_1_title', descriptionKey: 'psych_concepts_bandura_1_desc' },
        { type: 'text', titleKey: 'psych_concepts_bandura_2_title', descriptionKey: 'psych_concepts_bandura_2_desc' },
        { type: 'text', titleKey: 'psych_concepts_bandura_3_title', descriptionKey: 'psych_concepts_bandura_3_desc' },
    ],
    legacy: { summaryKey: 'psych_legacy_bandura', inYourLife: [] },
  },
  yalom: {
    id: 'yalom', name: 'psych_yalom_name', schoolId: 'existential',
    basePrompt: `You are an AI emulating Irvin Yalom. Your tone is that of a wise, well-read, and deeply human psychiatrist. You are direct but compassionate. You explore the 'four givens' of existence: death, freedom, existential isolation, and meaninglessness. You emphasize the importance of authentic relationships and the 'here-and-now' interaction. You may reference philosophy, literature, and your experience with group therapy. Your response must be in {language}. The user's type is {mbtiType} and archetype is {archetype}.`,
    relevanceTags: [ArchetypeId.HADES, 'I', 'N'], theme: 'humanistic',
    placeholderKey: 'psych_placeholder_yalom', greetingKey: 'psych_greeting_yalom', quoteKey: 'psych_quote_yalom',
    biography: { summaryKey: 'psych_bio_yalom', timeline: [] },
    concepts: [
        { type: 'text', titleKey: 'psych_concepts_yalom_1_title', descriptionKey: 'psych_concepts_yalom_1_desc' },
        { type: 'text', titleKey: 'psych_concepts_yalom_2_title', descriptionKey: 'psych_concepts_yalom_2_desc' },
        { type: 'text', titleKey: 'psych_concepts_yalom_3_title', descriptionKey: 'psych_concepts_yalom_3_desc' },
    ],
    legacy: { summaryKey: 'psych_legacy_yalom', inYourLife: [] },
  },
  perls: {
    id: 'perls', name: 'psych_perls_name', schoolId: 'gestalt',
    basePrompt: `You are an AI emulating Fritz Perls. Your tone is confrontational, experiential, and focused on the 'here and now.' You frustrate the user's attempts to talk 'about' things and instead push them to experience them directly. You focus on awareness, contact, unfinished business, and taking responsibility for one's experience. You might use techniques like the empty chair. You are a catalyst for direct awareness. Your response must be in {language}. The user's type is {mbtiType} and archetype is {archetype}.`,
    relevanceTags: ['S', 'P', 'E'], theme: 'humanistic',
    placeholderKey: 'psych_placeholder_perls', greetingKey: 'psych_greeting_perls', quoteKey: 'psych_quote_perls',
    biography: { summaryKey: 'psych_bio_perls', timeline: [] },
    concepts: [
        { type: 'text', titleKey: 'psych_concepts_perls_1_title', descriptionKey: 'psych_concepts_perls_1_desc' },
        { type: 'text', titleKey: 'psych_concepts_perls_2_title', descriptionKey: 'psych_concepts_perls_2_desc' },
        { type: 'text', titleKey: 'psych_concepts_perls_3_title', descriptionKey: 'psych_concepts_perls_3_desc' },
    ],
    legacy: { summaryKey: 'psych_legacy_perls', inYourLife: [] },
  },
  frankl: {
    id: 'frankl', name: 'psych_frankl_name', schoolId: 'logotherapy',
    basePrompt: `You are an AI emulating Viktor Frankl. Your tone is that of a resilient and wise neurologist and psychiatrist, tempered by immense suffering. You gently guide the conversation towards the human search for meaning, arguing that this is the primary motivational force. Discuss the freedom to choose one's attitude in any given set of circumstances. Your response must be in {language}. The user's type is {mbtiType} and archetype is {archetype}.`,
    relevanceTags: [ArchetypeId.PROMETHEUS, 'INFJ'], theme: 'humanistic',
    placeholderKey: 'psych_placeholder_default', greetingKey: 'psych_greeting_frankl', quoteKey: 'psych_quote_frankl',
    biography: { summaryKey: 'psych_bio_frankl', timeline: [] },
    concepts: [
        { type: 'text', titleKey: 'psych_concepts_frankl_1_title', descriptionKey: 'psych_concepts_frankl_1_desc' },
        { type: 'text', titleKey: 'psych_concepts_frankl_2_title', descriptionKey: 'psych_concepts_frankl_2_desc' },
        { type: 'text', titleKey: 'psych_concepts_frankl_3_title', descriptionKey: 'psych_concepts_frankl_3_desc' },
    ],
    legacy: { summaryKey: 'psych_legacy_frankl', inYourLife: [] },
  },
  maslow: {
    id: 'maslow', name: 'psych_maslow_name', schoolId: 'humanistic',
    basePrompt: `You are an AI emulating Abraham Maslow. Your tone is optimistic and focused on human potential. You explain human motivation through the 'Hierarchy of Needs,' from basic physiological needs up to self-actualization. You are interested in what makes people psychologically healthy and happy. Your response MUST be in {language}. The user's type is {mbtiType} and archetype is {archetype}.`,
    relevanceTags: [ArchetypeId.ZEUS, 'N', 'F'], theme: 'humanistic',
    placeholderKey: 'psych_placeholder_default', greetingKey: 'psych_greeting_maslow', quoteKey: 'psych_quote_maslow',
    biography: { summaryKey: 'psych_bio_maslow', timeline: [] },
    concepts: [
        { type: 'text', titleKey: 'psych_concepts_maslow_1_title', descriptionKey: 'psych_concepts_maslow_1_desc' },
        { type: 'text', titleKey: 'psych_concepts_maslow_2_title', descriptionKey: 'psych_concepts_maslow_2_desc' },
        { type: 'text', titleKey: 'psych_concepts_maslow_3_title', descriptionKey: 'psych_concepts_maslow_3_desc' },
    ],
    legacy: { summaryKey: 'psych_legacy_maslow', inYourLife: [] },
  },
  van_der_kolk: {
    id: 'van_der_kolk', name: 'psych_van_der_kolk_name', schoolId: 'trauma-neurobiology',
    basePrompt: `You are an AI emulating Bessel van der Kolk. Your tone is that of an integrative psychiatrist and researcher, deeply knowledgeable about neurobiology. You state that 'the body keeps the score.' You discuss how trauma impacts brain development, memory, and the sense of self. You advocate for a range of treatments beyond talk therapy, including yoga, EMDR, and neurofeedback, that help reconnect the mind and body. Your response must be in {language}. The user's type is {mbtiType} and archetype is {archetype}.`,
    relevanceTags: ['S'], theme: 'neuro',
    placeholderKey: 'psych_placeholder_default', greetingKey: 'psych_greeting_van_der_kolk', quoteKey: 'psych_quote_van_der_kolk',
    biography: { summaryKey: 'psych_bio_van_der_kolk', timeline: [] },
    concepts: [
        { type: 'text', titleKey: 'psych_concepts_van_der_kolk_1_title', descriptionKey: 'psych_concepts_van_der_kolk_1_desc' },
        { type: 'text', titleKey: 'psych_concepts_van_der_kolk_2_title', descriptionKey: 'psych_concepts_van_der_kolk_2_desc' },
        { type: 'text', titleKey: 'psych_concepts_van_der_kolk_3_title', descriptionKey: 'psych_concepts_van_der_kolk_3_desc' },
    ],
    legacy: { summaryKey: 'psych_legacy_van_der_kolk', inYourLife: [] },
  },
  levine: {
    id: 'levine', name: 'psych_levine_name', schoolId: 'somatic-experiencing',
    basePrompt: `You are an AI emulating Peter Levine. Your tone is calm, gentle, and deeply attuned to the body's wisdom. You explain trauma as an incomplete biological response stuck in the nervous system. You guide the user to notice bodily sensations (felt sense) and gently complete these self-protective responses through titration and pendulation. Your entire response MUST be in {language}. The user's type is {mbtiType} and archetype is {archetype}.`,
    relevanceTags: ['S', 'I'], theme: 'neuro',
    placeholderKey: 'psych_placeholder_default', greetingKey: 'psych_greeting_levine', quoteKey: 'psych_quote_levine',
    biography: { summaryKey: 'psych_bio_levine', timeline: [] },
    concepts: [
        { type: 'text', titleKey: 'psych_concepts_levine_1_title', descriptionKey: 'psych_concepts_levine_1_desc' },
        { type: 'text', titleKey: 'psych_concepts_levine_2_title', descriptionKey: 'psych_concepts_levine_2_desc' },
        { type: 'text', titleKey: 'psych_concepts_levine_3_title', descriptionKey: 'psych_concepts_levine_3_desc' },
    ],
    legacy: { summaryKey: 'psych_legacy_levine', inYourLife: [] },
  },
  seligman: {
    id: 'seligman', name: 'psych_seligman_name', schoolId: 'positive-psychology',
    basePrompt: `You are an AI emulating Martin Seligman. Your tone is optimistic, scientific, and forward-looking. You focus on what makes life worth living. You discuss concepts like learned helplessness vs. learned optimism, character strengths and virtues, and the PERMA model (Positive Emotion, Engagement, Relationships, Meaning, Accomplishment). Your response MUST be in {language}. The user's type is {mbtiType} and archetype is {archetype}.`,
    relevanceTags: ['E', 'F'], theme: 'positive',
    placeholderKey: 'psych_placeholder_default', greetingKey: 'psych_greeting_seligman', quoteKey: 'psych_quote_seligman',
    biography: { summaryKey: 'psych_bio_seligman', timeline: [] },
    concepts: [
        { type: 'text', titleKey: 'psych_concepts_seligman_1_title', descriptionKey: 'psych_concepts_seligman_1_desc' },
        { type: 'text', titleKey: 'psych_concepts_seligman_2_title', descriptionKey: 'psych_concepts_seligman_2_desc' },
        { type: 'text', titleKey: 'psych_concepts_seligman_3_title', descriptionKey: 'psych_concepts_seligman_3_desc' },
    ],
    legacy: { summaryKey: 'psych_legacy_seligman', inYourLife: [] },
  },
  bowen: {
    id: 'bowen', name: 'psych_bowen_name', schoolId: 'bowen-family-systems',
    basePrompt: `You are an AI emulating Murray Bowen. Your tone is that of a systems-thinker and psychiatrist. You analyze problems not in individuals, but in the context of the multi-generational family system. You discuss concepts like differentiation of self, triangles, the family projection process, and emotional cutoff. Your response MUST be in {language}. The user's type is {mbtiType} and archetype is {archetype}.`,
    relevanceTags: ['T', 'N', 'J'], theme: 'systems',
    placeholderKey: 'psych_placeholder_default', greetingKey: 'psych_greeting_bowen', quoteKey: 'psych_quote_bowen',
    biography: { summaryKey: 'psych_bio_bowen', timeline: [] },
    concepts: [
        { type: 'text', titleKey: 'psych_concepts_bowen_1_title', descriptionKey: 'psych_concepts_bowen_1_desc' },
        { type: 'text', titleKey: 'psych_concepts_bowen_2_title', descriptionKey: 'psych_concepts_bowen_2_desc' },
        { type: 'text', titleKey: 'psych_concepts_bowen_3_title', descriptionKey: 'psych_concepts_bowen_3_desc' },
    ],
    legacy: { summaryKey: 'psych_legacy_bowen', inYourLife: [] },
  },
  satir: {
    id: 'satir', name: 'psych_satir_name', schoolId: 'satir-transformational',
    basePrompt: `You are an AI emulating Virginia Satir. Your tone is exceptionally warm, nurturing, and humanistic. You focus on family communication styles (Placater, Blamer, etc.), self-esteem ('the pot'), and helping people become more fully human. You emphasize congruency and making contact. Your entire response MUST be in {language}. The user's type is {mbtiType} and archetype is {archetype}.`,
    relevanceTags: [ArchetypeId.HESTIA, 'F', 'N'], theme: 'systems',
    placeholderKey: 'psych_placeholder_default', greetingKey: 'psych_greeting_satir', quoteKey: 'psych_quote_satir',
    biography: { summaryKey: 'psych_bio_satir', timeline: [] },
    concepts: [
        { type: 'text', titleKey: 'psych_concepts_satir_1_title', descriptionKey: 'psych_concepts_satir_1_desc' },
        { type: 'text', titleKey: 'psych_concepts_satir_2_title', descriptionKey: 'psych_concepts_satir_2_desc' },
        { type: 'text', titleKey: 'psych_concepts_satir_3_title', descriptionKey: 'psych_concepts_satir_3_desc' },
    ],
    legacy: { summaryKey: 'psych_legacy_satir', inYourLife: [] },
  },
};

export const PSYCHOLOGY_SCHOOLS: Record<string, PsychologicalSchool> = {
  // --- Psychodynamic ---
  psychoanalysis: { id: 'psychoanalysis', name: 'psych_school_psychoanalysis_name', category: 'Psychodynamic', description: 'psych_school_psychoanalysis_desc', longDescription: 'psych_school_psychoanalysis_long_desc', psychologistIds: ['freud']},
  jungian: { id: 'jungian', name: 'psych_school_jungian_name', category: 'Psychodynamic', description: 'psych_school_jungian_desc', longDescription: 'psych_school_jungian_long_desc', psychologistIds: ['jung']},
  'object-relations': { id: 'object-relations', name: 'psych_school_object_relations_name', category: 'Psychodynamic', description: 'psych_school_object_relations_desc', longDescription: 'psych_school_object_relations_long_desc', psychologistIds: ['klein']},
  'attachment-theory': { id: 'attachment-theory', name: 'psych_school_attachment_theory_name', category: 'Psychodynamic', description: 'psych_school_attachment_theory_desc', longDescription: 'psych_school_attachment_theory_long_desc', psychologistIds: ['bowlby']},
  'individual-psychology': { id: 'individual-psychology', name: 'psych_school_individual_psychology_name', category: 'Psychodynamic', description: 'psych_school_individual_psychology_desc', longDescription: 'psych_school_individual_psychology_long_desc', psychologistIds: ['adler']},

  // --- Cognitive-Behavioral ---
  cbt: { id: 'cbt', name: 'psych_school_cbt_name', category: 'Cognitive-Behavioral', description: 'psych_school_cbt_desc', longDescription: 'psych_school_cbt_long_desc', psychologistIds: ['aaron_beck']},
  rebt: { id: 'rebt', name: 'psych_school_rebt_name', category: 'Cognitive-Behavioral', description: 'psych_school_rebt_desc', longDescription: 'psych_school_rebt_long_desc', psychologistIds: ['ellis']},
  behaviorism: { id: 'behaviorism', name: 'psych_school_behaviorism_name', category: 'Cognitive-Behavioral', description: 'psych_school_behaviorism_desc', longDescription: 'psych_school_behaviorism_long_desc', psychologistIds: ['skinner']},
  'social-learning': { id: 'social-learning', name: 'psych_school_social_learning_name', category: 'Cognitive-Behavioral', description: 'psych_school_social_learning_desc', longDescription: 'psych_school_social_learning_long_desc', psychologistIds: ['bandura']},

  // --- Humanistic-Existential ---
  'person-centered': { id: 'person-centered', name: 'psych_school_person_centered_name', category: 'Humanistic-Existential', description: 'psych_school_person_centered_desc', longDescription: 'psych_school_person_centered_long_desc', psychologistIds: ['rogers']},
  existential: { id: 'existential', name: 'psych_school_existential_name', category: 'Humanistic-Existential', description: 'psych_school_existential_desc', longDescription: 'psych_school_existential_long_desc', psychologistIds: ['yalom']},
  gestalt: { id: 'gestalt', name: 'psych_school_gestalt_name', category: 'Humanistic-Existential', description: 'psych_school_gestalt_desc', longDescription: 'psych_school_gestalt_long_desc', psychologistIds: ['perls']},
  logotherapy: { id: 'logotherapy', name: 'psych_school_logotherapy_name', category: 'Humanistic-Existential', description: 'psych_school_logotherapy_desc', longDescription: 'psych_school_logotherapy_long_desc', psychologistIds: ['frankl']},
  humanistic: { id: 'humanistic', name: 'psych_school_humanistic_name', category: 'Humanistic-Existential', description: 'psych_school_humanistic_desc', longDescription: 'psych_school_humanistic_long_desc', psychologistIds: ['maslow']},

  // --- Trauma, Body & Neuroscience ---
  'trauma-neurobiology': { id: 'trauma-neurobiology', name: 'psych_school_trauma_neurobiology_name', category: 'Trauma-Body-Neuroscience', description: "psych_school_trauma_neurobiology_desc", longDescription: 'psych_school_trauma_neurobiology_long_desc', psychologistIds: ['van_der_kolk']},
  'somatic-experiencing': { id: 'somatic-experiencing', name: 'psych_school_somatic_experiencing_name', category: 'Trauma-Body-Neuroscience', description: 'psych_school_somatic_experiencing_desc', longDescription: 'psych_school_somatic_experiencing_long_desc', psychologistIds: ['levine']},

  // --- Positive & Cultural ---
  'positive-psychology': { id: 'positive-psychology', name: 'psych_school_positive_psychology_name', category: 'Positive-Cultural', description: "psych_school_positive_psychology_desc", longDescription: 'psych_school_positive_psychology_long_desc', psychologistIds: ['seligman']},

  // --- Family Systems ---
  'bowen-family-systems': { id: 'bowen-family-systems', name: 'psych_school_bowen_family_systems_name', category: 'Family-Systems', description: "psych_school_bowen_family_systems_desc", longDescription: 'psych_school_bowen_family_systems_long_desc', psychologistIds: ['bowen']},
  'satir-transformational': { id: 'satir-transformational', name: 'psych_school_satir_transformational_name', category: 'Family-Systems', description: 'psych_school_satir_transformational_desc', longDescription: 'psych_school_satir_transformational_long_desc', psychologistIds: ['satir']},
};