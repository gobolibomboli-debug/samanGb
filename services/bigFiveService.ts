import { QUESTIONS } from '../constants';

export interface BigFiveQuestion {
  id: number;
  textKey: string;
  trait: 'N' | 'E' | 'O' | 'A' | 'C'; // Neuroticism, Extraversion, Openness, Agreeableness, Conscientiousness
  keyed: 1 | -1; // 1 for positive, -1 for reverse-scored
}

export const BIG_FIVE_QUESTIONS: BigFiveQuestion[] = [
  // Extraversion
  { id: 1, textKey: 'bfq_1', trait: 'E', keyed: 1 },
  { id: 2, textKey: 'bfq_2', trait: 'E', keyed: -1 },
  { id: 3, textKey: 'bfq_3', trait: 'E', keyed: 1 },
  { id: 4, textKey: 'bfq_4', trait: 'E', keyed: -1 },
  { id: 5, textKey: 'bfq_5', trait: 'E', keyed: 1 },
  { id: 6, textKey: 'bfq_6', trait: 'E', keyed: -1 },
  { id: 7, textKey: 'bfq_7', trait: 'E', keyed: 1 },
  { id: 8, textKey: 'bfq_8', trait: 'E', keyed: -1 },
  { id: 9, textKey: 'bfq_9', trait: 'E', keyed: 1 },
  { id: 10, textKey: 'bfq_10', trait: 'E', keyed: -1 },
  { id: 11, textKey: 'bfq_11', trait: 'E', keyed: 1 },
  { id: 12, textKey: 'bfq_12', trait: 'E', keyed: -1 },
  // Agreeableness
  { id: 13, textKey: 'bfq_13', trait: 'A', keyed: -1 },
  { id: 14, textKey: 'bfq_14', trait: 'A', keyed: 1 },
  { id: 15, textKey: 'bfq_15', trait: 'A', keyed: -1 },
  { id: 16, textKey: 'bfq_16', trait: 'A', keyed: 1 },
  { id: 17, textKey: 'bfq_17', trait: 'A', keyed: -1 },
  { id: 18, textKey: 'bfq_18', trait: 'A', keyed: 1 },
  { id: 19, textKey: 'bfq_19', trait: 'A', keyed: -1 },
  { id: 20, textKey: 'bfq_20', trait: 'A', keyed: 1 },
  { id: 21, textKey: 'bfq_21', trait: 'A', keyed: -1 },
  { id: 22, textKey: 'bfq_22', trait: 'A', keyed: 1 },
  { id: 23, textKey: 'bfq_23', trait: 'A', keyed: -1 },
  { id: 24, textKey: 'bfq_24', trait: 'A', keyed: 1 },
  // Conscientiousness
  { id: 25, textKey: 'bfq_25', trait: 'C', keyed: 1 },
  { id: 26, textKey: 'bfq_26', trait: 'C', keyed: -1 },
  { id: 27, textKey: 'bfq_27', trait: 'C', keyed: 1 },
  { id: 28, textKey: 'bfq_28', trait: 'C', keyed: -1 },
  { id: 29, textKey: 'bfq_29', trait: 'C', keyed: 1 },
  { id: 30, textKey: 'bfq_30', trait: 'C', keyed: -1 },
  { id: 31, textKey: 'bfq_31', trait: 'C', keyed: 1 },
  { id: 32, textKey: 'bfq_32', trait: 'C', keyed: -1 },
  { id: 33, textKey: 'bfq_33', trait: 'C', keyed: 1 },
  { id: 34, textKey: 'bfq_34', trait: 'C', keyed: -1 },
  { id: 35, textKey: 'bfq_35', trait: 'C', keyed: 1 },
  { id: 36, textKey: 'bfq_36', trait: 'C', keyed: -1 },
  // Neuroticism
  { id: 37, textKey: 'bfq_37', trait: 'N', keyed: 1 },
  { id: 38, textKey: 'bfq_38', trait: 'N', keyed: -1 },
  { id: 39, textKey: 'bfq_39', trait: 'N', keyed: 1 },
  { id: 40, textKey: 'bfq_40', trait: 'N', keyed: -1 },
  { id: 41, textKey: 'bfq_41', trait: 'N', keyed: 1 },
  { id: 42, textKey: 'bfq_42', trait: 'N', keyed: -1 },
  { id: 43, textKey: 'bfq_43', trait: 'N', keyed: 1 },
  { id: 44, textKey: 'bfq_44', trait: 'N', keyed: -1 },
  { id: 45, textKey: 'bfq_45', trait: 'N', keyed: 1 },
  { id: 46, textKey: 'bfq_46', trait: 'N', keyed: -1 },
  { id: 47, textKey: 'bfq_47', trait: 'N', keyed: 1 },
  { id: 48, textKey: 'bfq_48', trait: 'N', keyed: -1 },
  // Openness
  { id: 49, textKey: 'bfq_49', trait: 'O', keyed: 1 },
  { id: 50, textKey: 'bfq_50', trait: 'O', keyed: -1 },
  { id: 51, textKey: 'bfq_51', trait: 'O', keyed: 1 },
  { id: 52, textKey: 'bfq_52', trait: 'O', keyed: -1 },
  { id: 53, textKey: 'bfq_53', trait: 'O', keyed: 1 },
  { id: 54, textKey: 'bfq_54', trait: 'O', keyed: -1 },
  { id: 55, textKey: 'bfq_55', trait: 'O', keyed: 1 },
  { id: 56, textKey: 'bfq_56', trait: 'O', keyed: -1 },
  { id: 57, textKey: 'bfq_57', trait: 'O', keyed: 1 },
  { id: 58, textKey: 'bfq_58', trait: 'O', keyed: 1 }, // Note: two positive keyed in a row is correct based on IPIP-NEO
  { id: 59, textKey: 'bfq_59', trait: 'O', keyed: -1 },
  { id: 60, textKey: 'bfq_60', trait: 'O', keyed: 1 },
];

export interface OceanScores {
    N: number; E: number; O: number; A: number; C: number;
}

export const calculateBigFiveScores = (answers: Record<number, number>): OceanScores => {
    const scores: OceanScores = { N: 0, E: 0, O: 0, A: 0, C: 0 };

    BIG_FIVE_QUESTIONS.forEach(q => {
        const answer = answers[q.id];
        if (answer) {
            const score = q.keyed === 1 ? answer : 6 - answer;
            scores[q.trait] += score;
        }
    });

    return scores;
};

export const mapBigFiveToMbtiScores = (oceanScores: OceanScores): Record<string, number> => {
    const mbtiScores: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    const totalQuestionsPerTrait = 12; // Each OCEAN trait has 12 questions
    const maxScore = totalQuestionsPerTrait * 5;
    const minScore = totalQuestionsPerTrait * 1;

    const normalize = (score: number) => (score - minScore) / (maxScore - minScore);

    // Get the total number of questions for each MBTI dimension from the original set
    const mbtiTotals = QUESTIONS.reduce((acc, q) => {
        if (!acc[q.dimension]) acc[q.dimension] = 0;
        acc[q.dimension]++;
        return acc;
    }, {} as Record<string, number>);

    // E/I from Extraversion
    const e_norm = normalize(oceanScores.E);
    mbtiScores.E = Math.round(e_norm * mbtiTotals['E/I']);
    mbtiScores.I = mbtiTotals['E/I'] - mbtiScores.E;
    
    // N/S from Openness
    const o_norm = normalize(oceanScores.O);
    mbtiScores.N = Math.round(o_norm * mbtiTotals['S/N']);
    mbtiScores.S = mbtiTotals['S/N'] - mbtiScores.N;

    // F/T from Agreeableness
    const a_norm = normalize(oceanScores.A);
    mbtiScores.F = Math.round(a_norm * mbtiTotals['T/F']);
    mbtiScores.T = mbtiTotals['T/F'] - mbtiScores.F;

    // J/P from Conscientiousness
    const c_norm = normalize(oceanScores.C);
    mbtiScores.J = Math.round(c_norm * mbtiTotals['J/P']);
    mbtiScores.P = mbtiTotals['J/P'] - mbtiScores.J;

    return mbtiScores;
};