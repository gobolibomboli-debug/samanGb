import React from 'react';
import { BAIScores } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import LoadingSpinner from './LoadingSpinner';

interface BAIResultModalProps {
  scores: BAIScores | null;
  onTakeTest: () => void;
  analysis: string | null;
  isLoading: boolean;
  onFetchAnalysis: () => void;
  apiAvailable: boolean;
  onApiDisabledClick: () => void;
}

const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
    // Handle Gemini's structured response (with ###)
    if (text.includes('###')) {
        const sections = text.split('### ').filter(s => s.trim());
        return (
            <div className="space-y-6">
                {sections.map((section, index) => {
                    const [title, ...contentParts] = section.split('\n');
                    const content = contentParts.join('\n').trim();
                    return (
                        <div key={index} className="animate-fade-in" style={{animationDelay: `${index * 150}ms`}}>
                            <h3 className="font-display text-2xl accent-gradient-text mb-2">{title}</h3>
                            <div className="font-body text-gray-300 text-lg leading-relaxed space-y-3"
                                 dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
                        </div>
                    );
                })}
            </div>
        );
    }

    // Handle simple error messages (e.g., **Title**:\n\nDescription)
    const parts = text.split(/:\s*\n/);
    const title = (parts[0] || '').replace(/\*\*/g, '');
    const description = parts.slice(1).join(':\n\n');

    return (
        <div>
            <h3 className="font-display text-2xl text-red-400 mb-2">{title}</h3>
            <div className="font-body text-gray-300 text-lg leading-relaxed space-y-3">
                {description.split('\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
        </div>
    );
};

const CrystalVisualization: React.FC<{ score: number }> = ({ score }) => {
    const MAX_SCORE = 63;
    const intensity = Math.min(score, MAX_SCORE) / MAX_SCORE; // 0 to 1
    const animationDuration = 0.5 - (intensity * 0.45); // Faster vibration with higher score
    const color = `hsl(200, ${100 - intensity * 50}%, ${60 + intensity * 10}%)`;

    return (
        <div className="relative w-64 h-64 mx-auto">
            <style>
                {`
                @keyframes vibrate {
                    0%, 100% { transform: translate(0, 0) rotate(0); }
                    25% { transform: translate(${intensity*0.5}px, -${intensity*0.5}px) rotate(${intensity*0.1}deg); }
                    50% { transform: translate(0, 0) rotate(0); }
                    75% { transform: translate(-${intensity*0.5}px, ${intensity*0.5}px) rotate(-${intensity*0.1}deg); }
                }
                `}
            </style>
            <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: `drop-shadow(0 0 15px ${color})`}}>
                <defs>
                    <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#e6f1ff" stopOpacity="0.8" />
                    </linearGradient>
                </defs>
                <g style={{ animation: `vibrate ${animationDuration}s infinite ease-in-out`}}>
                    <path d="M 50 5 L 90 35 L 75 95 L 25 95 L 10 35 Z" fill="url(#crystalGradient)" stroke="#e6f1ff" strokeWidth="1" />
                    <path d="M 50 5 L 50 95 M 10 35 L 90 35 M 25 95 L 50 35 L 75 95" stroke="#e6f1ff" strokeWidth="0.5" strokeOpacity="0.7" />
                </g>
            </svg>
        </div>
    );
};

const BAIResultModal: React.FC<BAIResultModalProps> = ({ scores, onTakeTest, analysis, isLoading, onFetchAnalysis, apiAvailable, onApiDisabledClick }) => {
  const { t } = useLanguage();
  
  const handleFetchClick = () => { if (!apiAvailable) onApiDisabledClick(); else if (!analysis) onFetchAnalysis(); };

  if (!scores) {
    return (
        <div className="w-full h-full flex items-center justify-center p-4 animate-fade-in text-center">
            <div className="max-w-xl">
                 <h2 className="font-display text-4xl sm:text-5xl accent-gradient-text animate-text-flicker-glow">{t('bai_modal_title')}</h2>
                 <p className="font-body text-lg text-gray-300 mt-4 mb-8">{t('bai_intro')}</p>
                 <button onClick={onTakeTest} className="font-display text-xl bg-sky-500 hover:bg-sky-400 text-black rounded-lg px-12 py-4 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/20">{t('take_the_test')}</button>
            </div>
        </div>
    );
  }
  
  return (
    <div className="w-full h-full flex items-start justify-center p-4 animate-fade-in">
      <div className="w-full max-w-4xl animate-fade-in-scale-up">
        <header className="text-center mt-6 mb-8">
          <h2 className="font-display text-4xl sm:text-5xl accent-gradient-text">{t('bai_modal_title')}</h2>
        </header>

        <main>
          <div className="p-4 mb-10 bg-amber-900/30 border-2 border-amber-600/50 rounded-lg text-amber-200 text-center shadow-inner max-w-3xl mx-auto">
            <h3 className="font-display font-bold">{t('bai_disclaimer_title')}</h3>
            <p className="text-sm font-body mt-2">{t('bai_disclaimer')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center justify-center">
                <CrystalVisualization score={scores.score} />
            </div>
            <div className="text-center md:text-left">
                <p className="font-display text-lg text-sky-300">{t('bai_your_score')}</p>
                <p className="font-mono text-6xl text-white my-2">{scores.score}</p>
                <p className="font-display text-lg text-sky-300 mt-4">{t('bai_score_level')}</p>
                <p className="font-display text-3xl accent-gradient-text">{t(`bai_level_${scores.level}`)}</p>
                <p className="font-body text-gray-300 mt-2">{t(`bai_level_${scores.level}_desc`)}</p>
            </div>
          </div>


          <div className="text-center my-12">
            <button onClick={handleFetchClick} disabled={!!analysis} className="font-display text-xl bg-transparent border-2 border-sky-400 text-sky-300 rounded-lg px-10 py-3 transition-all duration-300 transform hover:scale-105 hover:bg-sky-400/10 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
              {analysis ? t('interpretation_complete') : t('bai_get_interpretation')}
            </button>
          </div>
          
          {(isLoading || analysis) && (
            <section className="my-12 animate-scroll-unfurl p-8 sm:p-10 bg-black/20 backdrop-blur-sm border-2 border-sky-400/20 rounded-xl max-w-4xl mx-auto">
                 {isLoading && <div className="flex flex-col items-center justify-center h-full min-h-[200px]"><LoadingSpinner /><p className="font-display text-sky-300 mt-4 text-lg tracking-wider animate-pulse-text">{t('bai_loading_interpretation')}</p></div>}
                 {!isLoading && analysis && <div className="animate-fade-in"><MarkdownRenderer text={analysis} /></div>}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default BAIResultModal;
