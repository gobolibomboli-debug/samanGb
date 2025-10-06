import { EQIScores, EQIScoreLevel, EQIComposite } from '../types';

export interface EQIQuestion {
  id: number;
  textKey: string;
  composite: EQIComposite;
  keyed: 1 | -1; // 1 for positive, -1 for reverse-scored
}

export const EQI_QUESTIONS: EQIQuestion[] = [
    // Intrapersonal (Self-Awareness, Self-Regard, Assertiveness)
    { id: 501, textKey: 'eqi_q_1', composite: 'intrapersonal', keyed: 1 },
    { id: 502, textKey: 'eqi_q_2', composite: 'intrapersonal', keyed: 1 },
    { id: 503, textKey: 'eqi_q_3', composite: 'intrapersonal', keyed: -1 },
    { id: 504, textKey: 'eqi_q_4', composite: 'intrapersonal', keyed: 1 },
    { id: 505, textKey: 'eqi_q_5', composite: 'intrapersonal', keyed: -1 },
    { id: 506, textKey: 'eqi_q_6', composite: 'intrapersonal', keyed: 1 },
    // Interpersonal (Empathy, Social Responsibility)
    { id: 507, textKey: 'eqi_q_7', composite: 'interpersonal', keyed: 1 },
    { id: 508, textKey: 'eqi_q_8', composite: 'interpersonal', keyed: -1 },
    { id: 509, textKey: 'eqi_q_9', composite: 'interpersonal', keyed: 1 },
    { id: 510, textKey: 'eqi_q_10', composite: 'interpersonal', keyed: 1 },
    { id: 511, textKey: 'eqi_q_11', composite: 'interpersonal', keyed: -1 },
    { id: 512, textKey: 'eqi_q_12', composite: 'interpersonal', keyed: 1 },
    // Stress Management (Stress Tolerance, Impulse Control)
    { id: 513, textKey: 'eqi_q_13', composite: 'stressManagement', keyed: 1 },
    { id: 514, textKey: 'eqi_q_14', composite: 'stressManagement', keyed: -1 },
    { id: 515, textKey: 'eqi_q_15', composite: 'stressManagement', keyed: 1 },
    { id: 516, textKey: 'eqi_q_16', composite: 'stressManagement', keyed: -1 },
    { id: 517, textKey: 'eqi_q_17', composite: 'stressManagement', keyed: 1 },
    { id: 518, textKey: 'eqi_q_18', composite: 'stressManagement', keyed: -1 },
    // Adaptability (Problem Solving, Flexibility)
    { id: 519, textKey: 'eqi_q_19', composite: 'adaptability', keyed: 1 },
    { id: 520, textKey: 'eqi_q_20', composite: 'adaptability', keyed: -1 },
    { id: 521, textKey: 'eqi_q_21', composite: 'adaptability', keyed: 1 },
    { id: 522, textKey: 'eqi_q_22', composite: 'adaptability', keyed: -1 },
    { id: 523, textKey: 'eqi_q_23', composite: 'adaptability', keyed: 1 },
    { id: 524, textKey: 'eqi_q_24', composite: 'adaptability', keyed: -1 },
    // General Mood (Optimism, Happiness)
    { id: 525, textKey: 'eqi_q_25', composite: 'generalMood', keyed: 1 },
    { id: 526, textKey: 'eqi_q_26', composite: 'generalMood', keyed: -1 },
    { id: 527, textKey: 'eqi_q_27', composite: 'generalMood', keyed: 1 },
    { id: 528, textKey: 'eqi_q_28', composite: 'generalMood', keyed: -1 },
    { id: 529, textKey: 'eqi_q_29', composite: 'generalMood', keyed: 1 },
    { id: 530, textKey: 'eqi_q_30', composite: 'generalMood', keyed: -1 },
];

const COMPOSITE_ITEM_COUNT: Record<EQIComposite, number> = {
    intrapersonal: 6,
    interpersonal: 6,
    stressManagement: 6,
    adaptability: 6,
    generalMood: 6,
};

export const calculateEQIScores = (answers: Record<number, number>): EQIScores => {
    const compositeRawScores: Record<EQIComposite, number> = {
        intrapersonal: 0,
        interpersonal: 0,
        stressManagement: 0,
        adaptability: 0,
        generalMood: 0,
    };

    EQI_QUESTIONS.forEach(q => {
        const answer = answers[q.id];
        if (answer) {
            const score = q.keyed === 1 ? answer : 6 - answer;
            compositeRawScores[q.composite] += score;
        }
    });

    const compositePercentiles: Record<EQIComposite, number> = {
        intrapersonal: 0,
        interpersonal: 0,
        stressManagement: 0,
        adaptability: 0,
        generalMood: 0,
    };

    let totalScore = 0;

    (Object.keys(compositeRawScores) as EQIComposite[]).forEach(key => {
        const minScore = COMPOSITE_ITEM_COUNT[key] * 1;
        const maxScore = COMPOSITE_ITEM_COUNT[key] * 5;
        const percentile = ((compositeRawScores[key] - minScore) / (maxScore - minScore)) * 100;
        compositePercentiles[key] = Math.round(percentile);
        totalScore += compositeRawScores[key];
    });

    const totalMinScore = EQI_QUESTIONS.length * 1;
    const totalMaxScore = EQI_QUESTIONS.length * 5;
    const totalPercentile = Math.round(((totalScore - totalMinScore) / (totalMaxScore - totalMinScore)) * 100);

    let level: EQIScoreLevel;
    if (totalPercentile < 40) {
        level = 'developing';
    } else if (totalPercentile < 60) {
        level = 'functional';
    } else if (totalPercentile < 80) {
        level = 'proficient';
    } else {
        level = 'exemplary';
    }

    return { 
        total: totalPercentile,
        composites: compositePercentiles,
        level,
    };
};