import React, { useState } from 'react';
import { BDIScores } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import LoadingSpinner from './LoadingSpinner';

interface BDIResultModalProps {
  scores: BDIScores | null;
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

const WellspringVisualization: React.FC<{ score: number }> = ({ score }) => {
    const MAX_SCORE = 63;
    const waterLevel = 100 - (Math.min(score, MAX_SCORE) / MAX_SCORE) * 100; // Inverse relationship
    const waterHeight = 45 + (waterLevel / 100) * 45; // Map to SVG height (45 to 90)

    return (
        <div className="relative w-64 h-64 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Water */}
                <path 
                    d={`M 5 95 C 30 85, 70 85, 95 95 L 95 99 L 5 99 Z`}
                    fill="url(#waterGradient)"
                    style={{ transform: `translateY(-${95 - waterHeight}px)`, transition: 'transform 2s ease-out' }}
                />
                
                {/* Well Stones */}
                <path d="M 5 10 C 30 0, 70 0, 95 10 L 95 95 C 70 105, 30 105, 5 95 Z" fill="#2d3748" />
                <path d="M 5 10 C 30 20, 70 20, 95 10" fill="none" stroke="#4a5568" strokeWidth="2" />

                {/* Bubbles */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <circle key={i} cx={Math.random() * 60 + 20} cy="95" r={Math.random() * 2 + 1} fill="#e6f1ff" opacity="0">
                        <animate attributeName="cy" from="95" to={100 - waterHeight} dur={`${Math.random() * 4 + 3}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0; 0.7; 0.7; 0" dur={`${Math.random() * 4 + 3}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" />
                    </circle>
                ))}

                <defs>
                    <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#7dd3fc', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#0c4a6e', stopOpacity: 0.9}} />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

const BDIResultModal: React.FC<BDIResultModalProps> = ({ scores, onTakeTest, analysis, isLoading, onFetchAnalysis, apiAvailable, onApiDisabledClick }) => {
  const { t } = useLanguage();
  
  const handleFetchClick = () => { if (!apiAvailable) onApiDisabledClick(); else if (!analysis) onFetchAnalysis(); };

  if (!scores) {
    return (
        <div className="w-full h-full flex items-center justify-center p-4 animate-fade-in text-center">
            <div className="max-w-xl">
                 <h2 className="font-display text-4xl sm:text-5xl accent-gradient-text animate-text-flicker-glow">{t('bdi_modal_title')}</h2>
                 <p className="font-body text-lg text-gray-300 mt-4 mb-8">{t('bdi_intro')}</p>
                 <button onClick={onTakeTest} className="font-display text-xl bg-sky-500 hover:bg-sky-400 text-black rounded-lg px-12 py-4 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/20">{t('take_the_test')}</button>
            </div>
        </div>
    );
  }
  
  return (
    <div className="w-full h-full flex items-start justify-center p-4 animate-fade-in">
      <div className="w-full max-w-4xl animate-fade-in-scale-up">
        <header className="text-center mt-6 mb-8">
          <h2 className="font-display text-4xl sm:text-5xl accent-gradient-text">{t('bdi_modal_title')}</h2>
        </header>

        <main>
          <div className="p-4 mb-10 bg-amber-900/30 border-2 border-amber-600/50 rounded-lg text-amber-200 text-center shadow-inner max-w-3xl mx-auto">
            <h3 className="font-display font-bold">{t('bdi_disclaimer_title')}</h3>
            <p className="text-sm font-body mt-2">{t('bdi_disclaimer')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center justify-center">
                <WellspringVisualization score={scores.score} />
            </div>
            <div className="text-center md:text-left">
                <p className="font-display text-lg text-sky-300">{t('bdi_your_score')}</p>
                <p className="font-mono text-6xl text-white my-2">{scores.score}</p>
                <p className="font-display text-lg text-sky-300 mt-4">{t('bdi_score_level')}</p>
                <p className="font-display text-3xl accent-gradient-text">{t(`bdi_level_${scores.level}`)}</p>
                <p className="font-body text-gray-300 mt-2">{t(`bdi_level_${scores.level}_desc`)}</p>
            </div>
          </div>


          <div className="text-center my-12">
            <button onClick={handleFetchClick} disabled={!!analysis} className="font-display text-xl bg-transparent border-2 border-sky-400 text-sky-300 rounded-lg px-10 py-3 transition-all duration-300 transform hover:scale-105 hover:bg-sky-400/10 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
              {analysis ? t('interpretation_complete') : t('bdi_get_interpretation')}
            </button>
          </div>
          
          {(isLoading || analysis) && (
            <section className="my-12 animate-scroll-unfurl p-8 sm:p-10 bg-black/20 backdrop-blur-sm border-2 border-sky-400/20 rounded-xl max-w-4xl mx-auto">
                 {isLoading && <div className="flex flex-col items-center justify-center h-full min-h-[200px]"><LoadingSpinner /><p className="font-display text-sky-300 mt-4 text-lg tracking-wider animate-pulse-text">{t('bdi_loading_interpretation')}</p></div>}
                 {!isLoading && analysis && <div className="animate-fade-in"><MarkdownRenderer text={analysis} /></div>}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default BDIResultModal;
