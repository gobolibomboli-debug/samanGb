import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { AppView } from '../types';

interface WelcomeScreenProps {
  onStart: () => void;
  onOpenTapestry: (view: AppView) => void;
  hasSaveData: boolean;
  onLoad: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onOpenTapestry, hasSaveData, onLoad }) => {
  const { t } = useLanguage();
  const [isForging, setIsForging] = useState(false);
  const forgeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleForgeStart = () => {
    setIsForging(true);
    forgeTimeoutRef.current = setTimeout(() => {
      onStart();
    }, 1200);
  };

  const handleForgeEnd = () => {
    setIsForging(false);
    if (forgeTimeoutRef.current) {
      clearTimeout(forgeTimeoutRef.current);
    }
  };
  
  return (
    <div className="relative h-full flex flex-col items-center justify-center text-center p-4 sm:p-8">
      
      {/* Title & Subtitle */}
      <header className="w-full max-w-4xl z-10">
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold accent-gradient-text animate-soft-glow">
          {t('welcomeTitle')}
        </h1>
        <p className="mt-6 font-body text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {t('welcome_subtitle_new')}
        </p>
      </header>
      
      {/* Interactive Orb */}
      <main className="relative flex items-center justify-center z-10 my-16">
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center animate-[orb-float_8s_ease-in-out_infinite]">
            <button
                onMouseDown={handleForgeStart}
                onMouseUp={handleForgeEnd}
                onTouchStart={handleForgeStart}
                onTouchEnd={handleForgeEnd}
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full rounded-full flex items-center justify-center group focus:outline-none"
                aria-label={t('forgeYourLegend')}
            >
                {/* Charge Animation */}
                {isForging && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute w-full h-full rounded-full border-sky-300 animate-[orb-charge-ring_1.2s_ease-out_forwards]"></div>
                        <div className="absolute w-full h-full rounded-full border-sky-400 animate-[orb-charge-ring_1.2s_ease-out_0.2s_forwards]"></div>
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="absolute w-1 h-1 bg-white rounded-full" style={{ animation: `orb-charge-suck-in 1.2s ease-in ${i * 0.1}s forwards`, transformOrigin: 'center center', willChange: 'transform, opacity' }}></div>
                        ))}
                    </div>
                )}
                
                {/* Orb Visuals */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-900/50 to-transparent border-2 border-white/10 shadow-2xl shadow-black"></div>
                <div className="absolute inset-[8px] rounded-full bg-black/40 backdrop-blur-xl"></div>
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_40%,_rgba(125,211,252,0.6),_transparent_40%)] animate-[orb-light-pulse_7s_ease-in-out_infinite]"></div>
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_60%,_rgba(168,85,247,0.4),_transparent_35%)] animate-[orb-light-pulse_9s_ease-in-out_2s_infinite]"></div>

                <div className="relative text-center z-10 transition-transform duration-300 group-hover:scale-105">
                    <span className="font-display text-2xl sm:text-3xl text-white">
                        {isForging ? t('forging') : t('forgeYourLegend')}
                    </span>
                    <p className="text-xs sm:text-sm text-sky-300/80 mt-1">{t('holdToBegin')}</p>
                </div>
            </button>
        </div>
      </main>

      {/* Secondary Actions */}
      <footer className="w-full flex items-center justify-center gap-8 z-10">
        {hasSaveData && (
            <button
              onClick={onLoad}
              className="font-body text-base text-gray-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3v12" /></svg>
              <span>{t('continueYourOdyssey')}</span>
            </button>
        )}
        
        <button 
          onClick={() => onOpenTapestry('tapestry')}
          className="font-body text-base text-gray-300 hover:text-white transition-colors flex items-center gap-2"
        >
            <span>{t('consultThePantheon')}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </footer>
    </div>
  );
};

export default WelcomeScreen;