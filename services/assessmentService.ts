import { Answer, Result, Archetype, Question, UserInfo } from '../types';
import { DEITY_PROFILES } from '../data/deityData';
import { QUESTIONS } from '../constants';

export const determineArchetypes = (mbtiScores: Record<string, number>, userInfo: UserInfo): { dominantArchetype: Archetype, archetypeDistribution: { archetype: Archetype; score: number }[] } => {
  // 1. Filter archetypes based on the user's selected gender
  const genderFilteredArchetypes = Object.values(DEITY_PROFILES).filter(
    archetype => archetype.gender === userInfo.gender
  );

  // 2. Implement a more scientific scoring for archetype distribution
  const dimensionTotals: Record<string, number> = { 'E/I': 0, 'S/N': 0, 'T/F': 0, 'J/P': 0 };
  QUESTIONS.forEach(question => {
      dimensionTotals[question.dimension]++;
  });
  
  // Calculate the percentage strength for each pole
  const poleScores: Record<string, number> = {};
  if (dimensionTotals['E/I'] > 0) {
    poleScores['E'] = (mbtiScores['E'] / dimensionTotals['E/I']) * 100;
    poleScores['I'] = (mbtiScores['I'] / dimensionTotals['E/I']) * 100;
  }
  if (dimensionTotals['S/N'] > 0) {
    poleScores['S'] = (mbtiScores['S'] / dimensionTotals['S/N']) * 100;
    poleScores['N'] = (mbtiScores['N'] / dimensionTotals['S/N']) * 100;
  }
  if (dimensionTotals['T/F'] > 0) {
    poleScores['T'] = (mbtiScores['T'] / dimensionTotals['T/F']) * 100;
    poleScores['F'] = (mbtiScores['F'] / dimensionTotals['T/F']) * 100;
  }
  if (dimensionTotals['J/P'] > 0) {
    poleScores['J'] = (mbtiScores['J'] / dimensionTotals['J/P']) * 100;
    poleScores['P'] = (mbtiScores['P'] / dimensionTotals['J/P']) * 100;
  }

  // Calculate a raw affinity score for each GENDER-FILTERED archetype.
  const rawArchetypeScores = genderFilteredArchetypes.map(archetype => {
      let maxScore = 0;
      if (archetype.mbtiMapping && archetype.mbtiMapping.length > 0) {
          archetype.mbtiMapping.forEach(mapping => {
              const typeChars = mapping.split('');
              const currentScore = typeChars.reduce((sum, char) => sum + (poleScores[char] || 0), 0);
              if (currentScore > maxScore) {
                  maxScore = currentScore;
              }
          });
      }
      return {
          archetype: archetype as Archetype,
          score: maxScore,
      };
  });

  // 3. Focus the distribution on the Top 10 archetypes.
  const TOP_N_ARCHETYPES = 10;

  const sortedRawScores = rawArchetypeScores.sort((a, b) => b.score - a.score);
  
  const topRawScores = sortedRawScores.slice(0, TOP_N_ARCHETYPES);
  const bottomRawScores = sortedRawScores.slice(TOP_N_ARCHETYPES);

  const totalTopRawScore = topRawScores.reduce((sum, item) => sum + item.score, 0);

  const topDistribution = topRawScores.map(item => ({
      archetype: item.archetype,
      score: totalTopRawScore > 0 ? (item.score / totalTopRawScore) * 100 : 0,
  }));
  
  const bottomDistribution = bottomRawScores.map(item => ({
      archetype: item.archetype,
      score: 0,
  }));
  
  const archetypeDistribution = [...topDistribution, ...bottomDistribution].sort((a, b) => b.score - a.score);
  
  // The dominant archetype is the one with the highest percentage.
  const dominantArchetype = archetypeDistribution[0]?.archetype || Object.values(DEITY_PROFILES).find(a => a.id === 'Athena')!;

  return { dominantArchetype, archetypeDistribution };
}


export const calculateResult = (answers: Answer[], userInfo: UserInfo): Result => {
  // 1. Tally raw scores for each pole
  const mbtiScores: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  
  answers.forEach(answer => {
    const question = QUESTIONS.find(q => q.id === answer.questionId);
    if (!question) return;

    const chosenPole = answer.choice === 'A' ? question.optionA.pole : question.optionB.pole;
    mbtiScores[chosenPole]++;
  });

  // 2. Determine final MBTI type string for display purposes
  let mbtiType = '';
  mbtiType += mbtiScores.E >= mbtiScores.I ? 'E' : 'I';
  mbtiType += mbtiScores.S >= mbtiScores.N ? 'S' : 'N';
  mbtiType += mbtiScores.T >= mbtiScores.F ? 'T' : 'F';
  mbtiType += mbtiScores.J >= mbtiScores.P ? 'J' : 'P';
  
  // 3. Determine archetypes using the refactored function
  const { dominantArchetype, archetypeDistribution } = determineArchetypes(mbtiScores, userInfo);
  
  return { mbtiType, dominantArchetype, archetypeDistribution, mbtiScores, userInfo };
};