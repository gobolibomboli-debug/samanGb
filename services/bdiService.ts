import { BDIScores, BDIScoreLevel } from '../types';

export interface BDIQuestion {
  id: number;
  textKey: string;
}

// Beck Depression Inventory-II (BDI-II)
export const BDI_QUESTIONS: BDIQuestion[] = Array.from({ length: 21 }, (_, i) => ({
    id: 301 + i,
    textKey: `bdi_q_${i + 1}`
}));


export const calculateBDIScores = (answers: Record<number, number>): BDIScores => {
    const score = Object.values(answers).reduce((sum, val) => sum + val, 0);

    let level: BDIScoreLevel;
    if (score <= 13) {
        level = 'minimal';
    } else if (score <= 19) {
        level = 'mild';
    } else if (score <= 28) {
        level = 'moderate';
    } else {
        level = 'severe';
    }

    return { score, level };
};
