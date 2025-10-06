import React from 'react';
import { Result } from '../types';
import GodIcon from './GodIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface ArchetypeDistributionChartProps {
  distribution: Result['archetypeDistribution'];
  onViewProfile: (archetypeId: string) => void;
}

const ArchetypeDistributionChart: React.FC<ArchetypeDistributionChartProps> = ({ distribution, onViewProfile }) => {
  const { t } = useLanguage();

  // Filter out archetypes with a score of 0, unless all scores are 0.
  const relevantDistribution = distribution.filter(item => item.score > 0.05); // Filter out negligible scores
  const displayDistribution = relevantDistribution.length > 0 ? relevantDistribution : distribution.slice(0, 1); // Show at least one if all are 0

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h3 className="font-display text-3xl sm:text-4xl accent-gradient-text mb-4 text-center">{t('archetypeComposition')}</h3>
      <p className="text-center text-gray-400 mb-10">{t('archetypeComposition_subtitle_new', displayDistribution.length.toString())}</p>
      
      <div className="space-y-4">
        {displayDistribution.map((item, index) => {
          const isDominant = index === 0;
          const percentage = item.score;

          return (
            <button
              key={item.archetype.id}
              onClick={() => onViewProfile(item.archetype.id)}
              className="group w-full flex items-center gap-4 p-3 bg-black/20 rounded-lg border border-transparent hover:border-sky-400/50 hover:bg-sky-900/20 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[#0c1e3a]"
              style={{ animation: `fadeIn 0.5s ease-out ${index * 0.05}s forwards`, opacity: 0 }}
              aria-label={`${t(item.archetype.name)}: ${percentage.toFixed(1)}%`}
            >
              {/* Rank */}
              <div className="font-display text-xl sm:text-2xl w-8 text-center flex-shrink-0 text-sky-400/70 group-hover:text-sky-300">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 flex-shrink-0 text-gray-300 group-hover:text-sky-300 transition-colors duration-300">
                <GodIcon archetypeId={item.archetype.id} />
              </div>

              {/* Name & Bar */}
              <div className="flex-grow">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-display text-lg sm:text-xl text-white group-hover:accent-gradient-text transition-colors duration-300">
                    {t(item.archetype.name)}
                  </h4>
                  <span className="font-mono text-base sm:text-lg font-bold text-white">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-800/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${isDominant ? 'bg-sky-400 animate-pulse-glow' : 'bg-sky-600/70 group-hover:bg-sky-500'}`}
                    style={{ width: `${Math.max(percentage, 0.5)}%` }} // Ensure even small bars are visible
                  ></div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ArchetypeDistributionChart;