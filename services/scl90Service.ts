import { SCL90Scores, SCL90Dimension } from '../types';

export interface SCL90Question {
  id: number;
  textKey: string;
  dimensions: SCL90Dimension[];
}

export const SCL90_QUESTIONS: SCL90Question[] = [
  { id: 201, textKey: 'scl90_q_1', dimensions: ['SOM'] },
  { id: 202, textKey: 'scl90_q_2', dimensions: ['OC'] },
  { id: 203, textKey: 'scl90_q_3', dimensions: ['IS'] },
  { id: 204, textKey: 'scl90_q_4', dimensions: ['SOM'] },
  { id: 205, textKey: 'scl90_q_5', dimensions: ['ANX'] },
  { id: 206, textKey: 'scl90_q_6', dimensions: ['IS'] },
  { id: 207, textKey: 'scl90_q_7', dimensions: ['PHOB'] },
  { id: 208, textKey: 'scl90_q_8', dimensions: ['PAR'] },
  { id: 209, textKey: 'scl90_q_9', dimensions: ['OC'] },
  { id: 210, textKey: 'scl90_q_10', dimensions: ['ANX'] },
  { id: 211, textKey: 'scl90_q_11', dimensions: ['HOS'] },
  { id: 212, textKey: 'scl90_q_12', dimensions: ['SOM'] },
  { id: 213, textKey: 'scl90_q_13', dimensions: ['DEP'] },
  { id: 214, textKey: 'scl90_q_14', dimensions: ['PSY'] },
  { id: 215, textKey: 'scl90_q_15', dimensions: ['DEP'] },
  { id: 216, textKey: 'scl90_q_16', dimensions: ['HOS'] },
  { id: 217, textKey: 'scl90_q_17', dimensions: ['PAR'] },
  { id: 218, textKey: 'scl90_q_18', dimensions: ['PSY'] },
  { id: 219, textKey: 'scl90_q_19', dimensions: ['DEP'] },
  { id: 220, textKey: 'scl90_q_20', dimensions: ['DEP'] },
  { id: 221, textKey: 'scl90_q_21', dimensions: ['DEP'] },
  { id: 222, textKey: 'scl90_q_22', dimensions: ['DEP'] },
  { id: 223, textKey: 'scl90_q_23', dimensions: ['ANX'] },
  { id: 224, textKey: 'scl90_q_24', dimensions: ['HOS'] },
  { id: 225, textKey: 'scl90_q_25', dimensions: ['PHOB'] },
  { id: 226, textKey: 'scl90_q_26', dimensions: ['DEP'] },
  { id: 227, textKey: 'scl90_q_27', dimensions: ['SOM'] },
  { id: 228, textKey: 'scl90_q_28', dimensions: ['OC'] },
  { id: 229, textKey: 'scl90_q_29', dimensions: ['DEP'] },
  { id: 230, textKey: 'scl90_q_30', dimensions: ['HOS'] },
  { id: 231, textKey: 'scl90_q_31', dimensions: ['PHOB'] },
  { id: 232, textKey: 'scl90_q_32', dimensions: ['IS'] },
  { id: 233, textKey: 'scl90_q_33', dimensions: ['OC'] },
  { id: 234, textKey: 'scl90_q_34', dimensions: ['IS'] },
  { id: 235, textKey: 'scl90_q_35', dimensions: ['PSY'] },
  { id: 236, textKey: 'scl90_q_36', dimensions: ['IS'] },
  { id: 237, textKey: 'scl90_q_37', dimensions: ['SOM'] },
  { id: 238, textKey: 'scl90_q_38', dimensions: ['OC'] },
  { id: 239, textKey: 'scl90_q_39', dimensions: ['ANX'] },
  { id: 240, textKey: 'scl90_q_40', dimensions: ['SOM'] },
  { id: 241, textKey: 'scl90_q_41', dimensions: ['PSY'] },
  { id: 242, textKey: 'scl90_q_42', dimensions: ['DEP'] },
  { id: 243, textKey: 'scl90_q_43', dimensions: ['PAR'] },
  { id: 244, textKey: 'scl90_q_44', dimensions: ['HOS'] },
  { id: 245, textKey: 'scl90_q_45', dimensions: ['OC'] },
  { id: 246, textKey: 'scl90_q_46', dimensions: ['OC'] },
  { id: 247, textKey: 'scl90_q_47', dimensions: ['PHOB'] },
  { id: 248, textKey: 'scl90_q_48', dimensions: ['DEP'] },
  { id: 249, textKey: 'scl90_q_49', dimensions: ['SOM'] },
  { id: 250, textKey: 'scl90_q_50', dimensions: ['PHOB'] },
  { id: 251, textKey: 'scl90_q_51', dimensions: ['DEP'] },
  { id: 252, textKey: 'scl90_q_52', dimensions: ['OC'] },
  { id: 253, textKey: 'scl90_q_53', dimensions: ['DEP'] },
  { id: 254, textKey: 'scl90_q_54', dimensions: ['SOM'] },
  { id: 255, textKey: 'scl90_q_55', dimensions: ['DEP'] },
  { id: 256, textKey: 'scl90_q_56', dimensions: ['DEP'] },
  { id: 257, textKey: 'scl90_q_57', dimensions: ['ANX'] },
  { id: 258, textKey: 'scl90_q_58', dimensions: ['HOS'] },
  { id: 259, textKey: 'scl90_q_59', dimensions: ['SOM'] },
  { id: 260, textKey: 'scl90_q_60', dimensions: ['IS'] },
  { id: 261, textKey: 'scl90_q_61', dimensions: ['OC'] },
  { id: 262, textKey: 'scl90_q_62', dimensions: ['PSY'] },
  { id: 263, textKey: 'scl90_q_63', dimensions: ['HOS'] },
  { id: 264, textKey: 'scl90_q_64', dimensions: ['ANX'] },
  { id: 265, textKey: 'scl90_q_65', dimensions: ['ANX'] },
  { id: 266, textKey: 'scl90_q_66', dimensions: ['IS'] },
  { id: 267, textKey: 'scl90_q_67', dimensions: ['PSY'] },
  { id: 268, textKey: 'scl90_q_68', dimensions: ['OC'] },
  { id: 269, textKey: 'scl90_q_69', dimensions: ['PHOB'] },
  { id: 270, textKey: 'scl90_q_70', dimensions: ['SOM'] },
  { id: 271, textKey: 'scl90_q_71', dimensions: ['DEP'] },
  { id: 272, textKey: 'scl90_q_72', dimensions: ['OC'] },
  { id: 273, textKey: 'scl90_q_73', dimensions: ['DEP'] },
  { id: 274, textKey: 'scl90_q_74', dimensions: ['PSY'] },
  { id: 275, textKey: 'scl90_q_75', dimensions: ['PAR'] },
  { id: 276, textKey: 'scl90_q_76', dimensions: ['PSY'] },
  { id: 277, textKey: 'scl90_q_77', dimensions: ['HOS'] },
  { id: 278, textKey: 'scl90_q_78', dimensions: ['ANX'] },
  { id: 279, textKey: 'scl90_q_79', dimensions: ['DEP'] },
  { id: 280, textKey: 'scl90_q_80', dimensions: ['PHOB'] },
  { id: 281, textKey: 'scl90_q_81', dimensions: ['IS'] },
  { id: 282, textKey: 'scl90_q_82', dimensions: ['PAR'] },
  { id: 283, textKey: 'scl90_q_83', dimensions: ['PAR'] },
  { id: 284, textKey: 'scl90_q_84', dimensions: ['HOS'] },
  { id: 285, textKey: 'scl90_q_85', dimensions: ['PSY'] },
  { id: 286, textKey: 'scl90_q_86', dimensions: ['IS'] },
  { id: 287, textKey: 'scl90_q_87', dimensions: ['PSY'] },
  { id: 288, textKey: 'scl90_q_88', dimensions: ['PAR'] },
  { id: 289, textKey: 'scl90_q_89', dimensions: ['SOM'] },
  { id: 290, textKey: 'scl90_q_90', dimensions: ['DEP'] },
];

const DIMENSION_ITEM_COUNT: Record<SCL90Dimension, number> = {
    SOM: 12, OC: 10, IS: 9, DEP: 13, ANX: 10, HOS: 6, PHOB: 7, PAR: 6, PSY: 10,
};

export const calculateSCL90Scores = (answers: Record<number, number>): SCL90Scores => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    let positiveSymptomTotal = 0;

    const dimensionScores: Record<SCL90Dimension, number> = {
        SOM: 0, OC: 0, IS: 0, DEP: 0, ANX: 0, HOS: 0, PHOB: 0, PAR: 0, PSY: 0
    };

    SCL90_QUESTIONS.forEach(q => {
        const answer = answers[q.id];
        if (answer !== undefined && answer !== null) {
            if(answer > 0) {
                positiveSymptomTotal++;
            }
            q.dimensions.forEach(dim => {
                dimensionScores[dim] += answer;
            });
        }
    });

    const finalDimensionScores = (Object.keys(dimensionScores) as SCL90Dimension[]).reduce((acc, dim) => {
        acc[dim] = dimensionScores[dim] / DIMENSION_ITEM_COUNT[dim];
        return acc;
    }, {} as Record<SCL90Dimension, number>);


    const GSI = totalScore / SCL90_QUESTIONS.length;
    const PST = positiveSymptomTotal;
    const PSDI = PST > 0 ? totalScore / PST : 0;

    return {
        dimensions: finalDimensionScores,
        GSI,
        PST,
        PSDI
    };
};
