import { MMPIScores } from '../types';

export interface MMPIQuestion {
  id: number;
  textKey: string;
  scale: keyof MMPIScores;
  keyed: boolean; // True if a 'true' answer is scored
}

// A simplified, 70-item list inspired by MMPI-2 scales for educational/entertainment purposes.
// THIS IS NOT A CLINICAL INSTRUMENT.
export const MMPI_QUESTIONS: MMPIQuestion[] = [
  // Scale 1 (Hs: Hypochondriasis) - 7 questions
  { id: 101, textKey: 'mmpi_q_101', scale: 'Hs', keyed: true },
  { id: 102, textKey: 'mmpi_q_102', scale: 'Hs', keyed: true },
  { id: 103, textKey: 'mmpi_q_103', scale: 'Hs', keyed: false },
  { id: 104, textKey: 'mmpi_q_104', scale: 'Hs', keyed: true },
  { id: 105, textKey: 'mmpi_q_105', scale: 'Hs', keyed: true },
  { id: 106, textKey: 'mmpi_q_106', scale: 'Hs', keyed: false },
  { id: 107, textKey: 'mmpi_q_107', scale: 'Hs', keyed: true },
  // Scale 2 (D: Depression) - 7 questions
  { id: 201, textKey: 'mmpi_q_201', scale: 'D', keyed: true },
  { id: 202, textKey: 'mmpi_q_202', scale: 'D', keyed: false },
  { id: 203, textKey: 'mmpi_q_203', scale: 'D', keyed: true },
  { id: 204, textKey: 'mmpi_q_204', scale: 'D', keyed: true },
  { id: 205, textKey: 'mmpi_q_205', scale: 'D', keyed: false },
  { id: 206, textKey: 'mmpi_q_206', scale: 'D', keyed: true },
  { id: 207, textKey: 'mmpi_q_207', scale: 'D', keyed: true },
  // Scale 3 (Hy: Hysteria) - 7 questions
  { id: 301, textKey: 'mmpi_q_301', scale: 'Hy', keyed: false },
  { id: 302, textKey: 'mmpi_q_302', scale: 'Hy', keyed: true },
  { id: 303, textKey: 'mmpi_q_303', scale: 'Hy', keyed: true },
  { id: 304, textKey: 'mmpi_q_304', scale: 'Hy', keyed: false },
  { id: 305, textKey: 'mmpi_q_305', scale: 'Hy', keyed: true },
  { id: 306, textKey: 'mmpi_q_306', scale: 'Hy', keyed: false },
  { id: 307, textKey: 'mmpi_q_307', scale: 'Hy', keyed: true },
  // Scale 4 (Pd: Psychopathic Deviate) - 7 questions
  { id: 401, textKey: 'mmpi_q_401', scale: 'Pd', keyed: true },
  { id: 402, textKey: 'mmpi_q_402', scale: 'Pd', keyed: true },
  { id: 403, textKey: 'mmpi_q_403', scale: 'Pd', keyed: false },
  { id: 404, textKey: 'mmpi_q_404', scale: 'Pd', keyed: true },
  { id: 405, textKey: 'mmpi_q_405', scale: 'Pd', keyed: true },
  { id: 406, textKey: 'mmpi_q_406', scale: 'Pd', keyed: false },
  { id: 407, textKey: 'mmpi_q_407', scale: 'Pd', keyed: true },
  // Scale 5 (Mf: Masculinity-Femininity) - 7 questions
  { id: 501, textKey: 'mmpi_q_501', scale: 'Mf', keyed: true },
  { id: 502, textKey: 'mmpi_q_502', scale: 'Mf', keyed: false },
  { id: 503, textKey: 'mmpi_q_503', scale: 'Mf', keyed: true },
  { id: 504, textKey: 'mmpi_q_504', scale: 'Mf', keyed: false },
  { id: 505, textKey: 'mmpi_q_505', scale: 'Mf', keyed: true },
  { id: 506, textKey: 'mmpi_q_506', scale: 'Mf', keyed: false },
  { id: 507, textKey: 'mmpi_q_507', scale: 'Mf', keyed: true },
  // Scale 6 (Pa: Paranoia) - 7 questions
  { id: 601, textKey: 'mmpi_q_601', scale: 'Pa', keyed: true },
  { id: 602, textKey: 'mmpi_q_602', scale: 'Pa', keyed: true },
  { id: 603, textKey: 'mmpi_q_603', scale: 'Pa', keyed: false },
  { id: 604, textKey: 'mmpi_q_604', scale: 'Pa', keyed: true },
  { id: 605, textKey: 'mmpi_q_605', scale: 'Pa', keyed: true },
  { id: 606, textKey: 'mmpi_q_606', scale: 'Pa', keyed: false },
  { id: 607, textKey: 'mmpi_q_607', scale: 'Pa', keyed: true },
  // Scale 7 (Pt: Psychasthenia) - 7 questions
  { id: 701, textKey: 'mmpi_q_701', scale: 'Pt', keyed: true },
  { id: 702, textKey: 'mmpi_q_702', scale: 'Pt', keyed: true },
  { id: 703, textKey: 'mmpi_q_703', scale: 'Pt', keyed: false },
  { id: 704, textKey: 'mmpi_q_704', scale: 'Pt', keyed: true },
  { id: 705, textKey: 'mmpi_q_705', scale: 'Pt', keyed: true },
  { id: 706, textKey: 'mmpi_q_706', scale: 'Pt', keyed: false },
  { id: 707, textKey: 'mmpi_q_707', scale: 'Pt', keyed: true },
  // Scale 8 (Sc: Schizophrenia) - 7 questions
  { id: 801, textKey: 'mmpi_q_801', scale: 'Sc', keyed: true },
  { id: 802, textKey: 'mmpi_q_802', scale: 'Sc', keyed: true },
  { id: 803, textKey: 'mmpi_q_803', scale: 'Sc', keyed: false },
  { id: 804, textKey: 'mmpi_q_804', scale: 'Sc', keyed: true },
  { id: 805, textKey: 'mmpi_q_805', scale: 'Sc', keyed: true },
  { id: 806, textKey: 'mmpi_q_806', scale: 'Sc', keyed: false },
  { id: 807, textKey: 'mmpi_q_807', scale: 'Sc', keyed: true },
  // Scale 9 (Ma: Hypomania) - 7 questions
  { id: 901, textKey: 'mmpi_q_901', scale: 'Ma', keyed: true },
  { id: 902, textKey: 'mmpi_q_902', scale: 'Ma', keyed: true },
  { id: 903, textKey: 'mmpi_q_903', scale: 'Ma', keyed: false },
  { id: 904, textKey: 'mmpi_q_904', scale: 'Ma', keyed: true },
  { id: 905, textKey: 'mmpi_q_905', scale: 'Ma', keyed: true },
  { id: 906, textKey: 'mmpi_q_906', scale: 'Ma', keyed: false },
  { id: 907, textKey: 'mmpi_q_907', scale: 'Ma', keyed: true },
  // Scale 0 (Si: Social Introversion) - 7 questions
  { id: 1001, textKey: 'mmpi_q_1001', scale: 'Si', keyed: true },
  { id: 1002, textKey: 'mmpi_q_1002', scale: 'Si', keyed: true },
  { id: 1003, textKey: 'mmpi_q_1003', scale: 'Si', keyed: false },
  { id: 1004, textKey: 'mmpi_q_1004', scale: 'Si', keyed: true },
  { id: 1005, textKey: 'mmpi_q_1005', scale: 'Si', keyed: true },
  { id: 1006, textKey: 'mmpi_q_1006', scale: 'Si', keyed: false },
  { id: 1007, textKey: 'mmpi_q_1007', scale: 'Si', keyed: true },
];

export const calculateMMPIScores = (answers: Record<number, boolean>): MMPIScores => {
    const scores: MMPIScores = { Hs: 0, D: 0, Hy: 0, Pd: 0, Mf: 0, Pa: 0, Pt: 0, Sc: 0, Ma: 0, Si: 0 };

    MMPI_QUESTIONS.forEach(q => {
        const userAnswer = answers[q.id];
        // Only score if an answer was given
        if (userAnswer !== undefined) {
            // If the keyed direction matches the user's answer, add 1 to the score.
            if (q.keyed === userAnswer) {
                scores[q.scale] += 1;
            }
        }
    });

    return scores;
};