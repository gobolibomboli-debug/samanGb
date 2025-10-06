import React from 'react';
import { Result } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import MythicSigil from './MythicSigil';
import SkeletonLoader from '../SkeletonLoader';

interface ShareableCardProps {
  result: Result;
  originQuote: string | null;
  isLoadingQuote: boolean;
}

const ShareableCard: React.FC<ShareableCardProps> = ({ result, originQuote, isLoadingQuote }) => {
  const { t } = useLanguage();

  return (
    <div
      className="w-full aspect-[9/16] rounded-xl shadow-2xl shadow-sky-500/20 overflow-hidden relative flex flex-col"
      style={{ background: 'radial-gradient(ellipse at top, #1b2735 0%, #090a0f 100%)' }}
    >
       {/* Ensure CSS is available if this component is rendered in isolation */}
      <style>{`
        .font-display { font-family: 'Cinzel', serif; }
        html[dir="rtl"] .font-display { font-family: 'Vazirmatn', 'Cinzel', serif; }
        .accent-gradient-text {
            background: linear-gradient(120deg, #7dd3fc, #38bdf8, #0ea5e9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
      `}</style>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent -z-0"></div>
      
      <div className="flex-grow flex flex-col justify-end items-center text-center p-8 text-white z-10">
        <div className="w-64 h-64 mb-6">
            <MythicSigil archetypeId={result.dominantArchetype.id} mbtiType={result.mbtiType} />
        </div>

        <h2 className="font-display text-5xl sm:text-6xl font-bold accent-gradient-text" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          {t(result.dominantArchetype.name)}
        </h2>
        
        <p className="font-display text-3xl sm:text-4xl text-white/90 tracking-widest mt-1" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          {result.mbtiType}
        </p>

        <div className="mt-8 font-body text-base sm:text-lg text-gray-300 border-l-2 border-sky-400/50 pl-4 italic max-w-sm h-24 flex items-center">
            {isLoadingQuote ? (
                <div className="w-full">
                    <SkeletonLoader className="h-4 w-11/12 mb-3" />
                    <SkeletonLoader className="h-4 w-full mb-3" />
                    <SkeletonLoader className="h-4 w-10/12" />
                </div>
            ) : (
                <blockquote>{originQuote}</blockquote>
            )}
        </div>
      </div>

      <footer className="p-4 text-center z-10">
        <p className="font-display text-sm text-sky-400/70">Mythos Persona</p>
      </footer>
    </div>
  );
};

export default ShareableCard;