import React from 'react';
import { Result } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import GodIcon from './GodIcon';

interface ResultChoiceScreenProps {
  result: Result;
  onChooseClassic: () => void;
  onChooseOracle: () => void;
}

const ChoiceCard: React.FC<{
  title: string;
  description: string;
  onClick: () => void;
  icon: React.ReactNode;
}> = ({ title, description, onClick, icon }) => {
  const { t } = useLanguage();
  return (
    <button
      onClick={onClick}
      className="group relative w-full max-w-sm h-80 sm:h-96 p-8 flex flex-col justify-end text-left rtl:text-right bg-black/30 hover:bg-sky-900/10 border-2 border-sky-400/20 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-500/20"
    >
      <div className="absolute inset-0 transition-opacity duration-500 opacity-20 group-hover:opacity-40">
        {icon}
      </div>
      <div className="relative z-10">
        <h3 className="font-display text-3xl sm:text-4xl accent-gradient-text">{title}</h3>
        <p className="mt-4 font-body text-base sm:text-lg leading-relaxed text-gray-300">{description}</p>
        <span className="inline-block mt-6 font-display text-lg sm:text-xl bg-sky-400/10 text-sky-300 border border-sky-400/50 rounded-full px-8 py-2 group-hover:bg-sky-400 group-hover:text-black transition-colors duration-300">
          {t('choiceSelect')}
        </span>
      </div>
    </button>
  );
};

const ResultChoiceScreen: React.FC<ResultChoiceScreenProps> = ({ result, onChooseClassic, onChooseOracle }) => {
  const { t } = useLanguage();

  return (
    <div className="relative h-full flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold accent-gradient-text">
          {t('choiceTitle')}
        </h1>
        <div className="flex justify-center items-center gap-4 mt-6">
            <div className="w-16 h-16 text-sky-300">
                <GodIcon archetypeId={result.dominantArchetype.id} />
            </div>
            <p className="font-body text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
              {t('choiceSubtitle', t(result.dominantArchetype.name))}
            </p>
        </div>
      </div>

      <div className="relative z-10 mt-12 w-full max-w-5xl flex flex-col md:flex-row justify-center items-center gap-8">
        <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <ChoiceCard
              title={t('choiceClassicTitle')}
              description={t('choiceClassicDesc')}
              onClick={onChooseClassic}
              icon={
                <svg className="w-full h-full text-sky-400/50" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 8 Q32 2, 52 8" />
                    <path d="M12 56 Q32 62, 52 56" />
                    <path d="M12 8 V56" />
                    <path d="M52 8 V56" />
                    <path d="M16 16 H48 M16 24 H48 M16 32 H40 M16 40 H44 M16 48 H32" strokeOpacity="0.5" />
                </svg>
              }
            />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
            <ChoiceCard
              title={t('choiceOracleTitle')}
              description={t('choiceOracleDesc')}
              onClick={onChooseOracle}
              icon={
                <svg className="w-full h-full text-sky-400/50" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M32 2 L62 32 L32 62 L2 32 Z" />
                    <circle cx="32" cy="32" r="10" />
                    <path d="M32 2 V-4 M32 62 V68 M2 32 H-4 M62 32 H68" />
                </svg>
              }
            />
        </div>
      </div>
    </div>
  );
};

export default ResultChoiceScreen;