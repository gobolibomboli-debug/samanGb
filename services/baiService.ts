import { BAIScores, BAIScoreLevel } from '../types';

export interface BAIQuestion {
  id: number;
  textKey: string;
}

// Beck Anxiety Inventory (BAI)
export const BAI_QUESTIONS: BAIQuestion[] = Array.from({ length: 21 }, (_, i) => ({
    id: 401 + i,
    textKey: `bai_q_${i + 1}`
}));


export const calculateBAIScores = (answers: Record<number, number>): BAIScores => {
    const score = Object.values(answers).reduce((sum, val) => sum + val, 0);

    let level: BAIScoreLevel;
    if (score <= 9) {
        level = 'minimal';
    } else if (score <= 18) {
        level = 'mild';
    } else if (score <= 29) {
        level = 'moderate';
    } else {
        level = 'severe';
    }

    return { score, level };
};
