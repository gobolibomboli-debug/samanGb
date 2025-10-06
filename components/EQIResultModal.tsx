import React, { useMemo, useState } from 'react';
import { EQIScores, EQIComposite } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import LoadingSpinner from './LoadingSpinner';

interface EQIResultModalProps {
  scores: EQIScores | null;
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

    // Handle simple error messages
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

const EQIResultModal: React.FC<EQIResultModalProps> = ({ scores, onTakeTest, analysis, isLoading, onFetchAnalysis, apiAvailable, onApiDisabledClick }) => {
  const { t } = useLanguage();
  
  const handleFetchClick = () => { if (!apiAvailable) onApiDisabledClick(); else if (!analysis) onFetchAnalysis(); };

  const radarData = useMemo(() => {
    if (!scores) return [];
    return (Object.keys(scores.composites) as EQIComposite[]).map(key => ({
      subject: t(`eqi_composite_${key}`).split('(')[0].trim(),
      score: scores.composites[key],
      fullMark: 100,
    }));
  }, [scores, t]);

  if (!scores) {
    return (
        <div className="w-full h-full flex items-center justify-center p-4 animate-fade-in text-center">
            <div className="max-w-xl">
                 <h2 className="font-display text-4xl sm:text-5xl accent-gradient-text animate-text-flicker-glow">{t('eqi_modal_title')}</h2>
                 <p className="font-body text-lg text-gray-300 mt-4 mb-8">{t('eqi_intro')}</p>
                 <button onClick={onTakeTest} className="font-display text-xl bg-sky-500 hover:bg-sky-400 text-black rounded-lg px-12 py-4 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/20">{t('take_the_test')}</button>
            </div>
        </div>
    );
  }
  
  return (
    <div className="w-full h-full flex items-start justify-center p-4 animate-fade-in">
      <div className="w-full max-w-4xl animate-fade-in-scale-up">
        <header className="text-center mt-6 mb-8">
          <h2 className="font-display text-4xl sm:text-5xl accent-gradient-text">{t('eqi_modal_title')}</h2>
        </header>

        <main>
          <div className="p-4 mb-10 bg-amber-900/30 border-2 border-amber-600/50 rounded-lg text-amber-200 text-center shadow-inner max-w-3xl mx-auto">
            <h3 className="font-display font-bold">{t('eqi_disclaimer_title')}</h3>
            <p className="text-sm font-body mt-2">{t('eqi_disclaimer')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full h-80 sm:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <defs>
                        <radialGradient id="auraFill" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.6}/>
                            <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                        </radialGradient>
                    </defs>
                    <PolarGrid stroke="rgba(56, 189, 248, 0.2)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#e6f1ff', fontFamily: 'Cinzel, Vazirmatn', fontSize: '14px' }} />
                    <Radar name="Score" dataKey="score" stroke="#7dd3fc" fill="url(#auraFill)" fillOpacity={0.8} />
                  </RadarChart>
                </ResponsiveContainer>
            </div>
            <div className="text-center md:text-left">
                <p className="font-display text-lg text-sky-300">{t('eqi_your_score')}</p>
                <p className="font-mono text-6xl text-white my-2">{scores.total}</p>
                <p className="font-display text-lg text-sky-300 mt-4">{t('eqi_score_level')}</p>
                <p className="font-display text-3xl accent-gradient-text">{t(`eqi_level_${scores.level}`)}</p>
                <p className="font-body text-gray-300 mt-2">{t(`eqi_level_${scores.level}_desc`)}</p>
            </div>
          </div>


          <div className="text-center my-12">
            <button onClick={handleFetchClick} disabled={!!analysis} className="font-display text-xl bg-transparent border-2 border-sky-400 text-sky-300 rounded-lg px-10 py-3 transition-all duration-300 transform hover:scale-105 hover:bg-sky-400/10 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
              {analysis ? t('interpretation_complete') : t('eqi_get_interpretation')}
            </button>
          </div>
          
          {(isLoading || analysis) && (
            <section className="my-12 animate-scroll-unfurl p-8 sm:p-10 bg-black/20 backdrop-blur-sm border-2 border-sky-400/20 rounded-xl max-w-4xl mx-auto">
                 {isLoading && <div className="flex flex-col items-center justify-center h-full min-h-[200px]"><LoadingSpinner /><p className="font-display text-sky-300 mt-4 text-lg tracking-wider animate-pulse-text">{t('eqi_loading_interpretation')}</p></div>}
                 {!isLoading && analysis && <div className="animate-fade-in"><MarkdownRenderer text={analysis} /></div>}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default EQIResultModal;