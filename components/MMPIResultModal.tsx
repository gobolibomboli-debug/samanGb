import React, { useMemo, useState } from 'react';
import { MMPIScores } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import LoadingSpinner from './LoadingSpinner';

interface MMPIResultModalProps {
  scores: MMPIScores | null;
  onTakeTest: () => void;
  analysis: string | null;
  isLoading: boolean;
  onFetchAnalysis: () => void;
  apiAvailable: boolean;
  onApiDisabledClick: () => void;
}

const scaleKeys: Array<keyof MMPIScores> = ['Hs', 'D', 'Hy', 'Pd', 'Mf', 'Pa', 'Pt', 'Sc', 'Ma', 'Si'];
const MAX_SCORE = 7;
const ELEVATED_THRESHOLD = 5;

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

const ScaleDetailPanel: React.FC<{ selectedScale: keyof MMPIScores | null, scores: MMPIScores }> = ({ selectedScale, scores }) => {
    const { t } = useLanguage();

    if (!selectedScale) {
        return (
            <div className="h-full flex flex-col justify-center items-center text-center p-8 animate-fade-in">
                <div className="w-24 h-24 text-sky-400/30 mb-4">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 00-3.46 19.3M12 22a10 10 0 003.46-19.3" /><path d="M2 12h20" /><path d="M12 2v20" /></svg>
                </div>
                <p className="font-display text-lg text-sky-300">{t('mmpi_glossary_prompt')}</p>
            </div>
        );
    }
    
    const score = scores[selectedScale];
    const isElevated = score >= ELEVATED_THRESHOLD;
    const key = selectedScale.toLowerCase();

    return (
        <div className="h-full p-6 sm:p-8 animate-fade-in flex flex-col justify-center">
            <h3 className="font-display text-3xl accent-gradient-text">{t(`mmpi_scale_${key}`)}</h3>
            <p className={`font-mono text-xl mt-1 ${isElevated ? 'text-amber-400' : 'text-sky-300'}`}>Intensity: {score}/{MAX_SCORE}</p>
            <div className="h-px w-full bg-sky-400/20 my-4"></div>
            <p className="font-body text-gray-300 text-base leading-relaxed mb-6">{t(`mmpi_scale_${key}_desc`)}</p>
            
            <h4 className="font-display text-xl text-amber-300">{t('alchemicalProcess')}: {t(`mmpi_process_${key}`)}</h4>
            <p className="font-body text-gray-300 text-base leading-relaxed mt-2">{t(`mmpi_process_${key}_desc`)}</p>
        </div>
    );
};


const MMPIResultModal: React.FC<MMPIResultModalProps> = ({ scores, onTakeTest, analysis, isLoading, onFetchAnalysis, apiAvailable, onApiDisabledClick }) => {
  const { t } = useLanguage();
  const [selectedScale, setSelectedScale] = useState<keyof MMPIScores | null>(null);
  
  const handleFetchClick = () => {
    if (!apiAvailable) {
      onApiDisabledClick();
      return;
    }
    if (!analysis) {
        onFetchAnalysis();
    }
  }

  const orreryPoints = useMemo(() => {
    if (!scores) return [];
    const numPoints = scaleKeys.length;
    const angleStep = (2 * Math.PI) / numPoints;
    const SVG_SIZE = 500;
    const center = SVG_SIZE / 2;
    const baseRadius = 60;
    const maxRadiusOffset = 150;

    return scaleKeys.map((key, i) => {
        const angle = angleStep * i - Math.PI / 2; // Start from top
        const scoreRadius = baseRadius + (scores[key] / MAX_SCORE) * maxRadiusOffset;
        return {
            key,
            cx: center + scoreRadius * Math.cos(angle),
            cy: center + scoreRadius * Math.sin(angle),
            labelX: center + (scoreRadius + 28) * Math.cos(angle),
            labelY: center + (scoreRadius + 28) * Math.sin(angle),
            isElevated: scores[key] >= ELEVATED_THRESHOLD,
        };
    });
  }, [scores]);

  if (!scores) {
    return (
        <div className="w-full h-full flex items-center justify-center p-4 animate-fade-in text-center">
            <div className="max-w-xl">
                 <h2 className="font-display text-4xl sm:text-5xl accent-gradient-text animate-text-flicker-glow">{t('mmpi_modal_title')}</h2>
                 <p className="font-body text-lg text-gray-300 mt-4 mb-8">{t('mmpi_intro')}</p>
                 <button 
                    onClick={onTakeTest}
                    className="font-display text-xl bg-sky-500 hover:bg-sky-400 text-black rounded-lg px-12 py-4 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/20"
                 >
                    {t('take_the_test')}
                 </button>
            </div>
        </div>
    );
  }

  return (
    <div className="w-full h-full flex items-start justify-center p-4 animate-fade-in">
      <div className="w-full max-w-6xl animate-fade-in-scale-up">
        <header className="text-center mt-6 mb-8">
          <h2 className="font-display text-4xl sm:text-5xl accent-gradient-text">{t('mmpi_modal_title')}</h2>
        </header>

        <main>
          {/* Disclaimer */}
          <div className="p-4 mb-10 bg-amber-900/30 border-2 border-amber-600/50 rounded-lg text-amber-200 text-center shadow-inner max-w-3xl mx-auto">
            <h3 className="font-display font-bold">{t('mmpi_disclaimer_title')}</h3>
            <p className="text-sm font-body mt-2">{t('mmpi_disclaimer')}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Alchemical Orrery */}
            <div className="relative aspect-square w-full max-w-lg mx-auto">
                <svg viewBox="0 0 500 500" className="w-full h-full">
                    <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                         <filter id="elevated-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 0.7 0 0 0  0 0 0.3 0 0  0 0 0 1 0" result="matrix"/>
                            <feMerge>
                                <feMergeNode in="matrix"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    <g className="opacity-30">
                        <circle cx="250" cy="250" r="60" stroke="#38bdf8" strokeWidth="0.5" fill="none" />
                        <circle cx="250" cy="250" r="135" stroke="#38bdf8" strokeWidth="0.5" fill="none" strokeDasharray="4 4" />
                        <circle cx="250" cy="250" r="210" stroke="#38bdf8" strokeWidth="0.5" fill="none" />
                    </g>
                    {orreryPoints.map(p => (
                        <line key={`${p.key}-line`} x1="250" y1="250" x2={p.cx} y2={p.cy} stroke={p.isElevated ? '#f59e0b' : '#38bdf8'} strokeWidth="0.75" className="opacity-20 group-hover:opacity-50 transition-opacity" />
                    ))}
                    {orreryPoints.map(p => (
                        <g key={p.key} onClick={() => setSelectedScale(p.key as keyof MMPIScores)} className="cursor-pointer group">
                             <circle 
                                cx={p.cx} 
                                cy={p.cy} 
                                r={selectedScale === p.key ? 16 : 12} 
                                fill={p.isElevated ? '#1d1305' : '#0c1e3a'}
                                stroke={p.isElevated ? '#f59e0b' : '#38bdf8'}
                                strokeWidth={selectedScale === p.key ? 2 : 1.5}
                                className={`transition-all duration-300 ${p.isElevated ? 'animate-pulse-glow' : ''}`}
                                style={{animationDuration: '3s'}}
                            />
                            {p.isElevated && <circle cx={p.cx} cy={p.cy} r="6" fill="#f59e0b" className="pointer-events-none" />}
                             <text
                                x={p.labelX}
                                y={p.labelY}
                                dy="0.3em"
                                textAnchor="middle"
                                className={`font-mono text-sm transition-colors duration-300 ${selectedScale === p.key ? 'fill-white' : 'fill-gray-400 group-hover:fill-white'}`}
                            >
                                {p.key}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>

            {/* Detail Panel */}
            <div className="relative w-full min-h-[400px] lg:min-h-[500px] bg-black/30 backdrop-blur-sm border-2 border-sky-400/20 rounded-xl overflow-hidden">
                <ScaleDetailPanel selectedScale={selectedScale} scores={scores} />
            </div>
          </div>


          <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-600/30 to-transparent my-12"></div>

          <div className="text-center my-12">
            <button
                onClick={handleFetchClick}
                disabled={!!analysis}
                className="font-display text-xl bg-transparent border-2 border-sky-400 text-sky-300 rounded-lg px-10 py-3 transition-all duration-300 transform hover:scale-105 hover:bg-sky-400/10 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {analysis ? t('interpretation_complete') : t('get_interpretation')}
            </button>
          </div>
          
          {(isLoading || analysis) && (
            <section className="my-12 animate-scroll-unfurl p-8 sm:p-10 bg-no-repeat bg-center bg-cover max-w-4xl mx-auto"
              style={{ 
                backgroundImage: 'radial-gradient(circle, rgba(12, 30, 58, 0.95) 0%, rgba(10, 20, 42, 0.95) 100%), url(https://www.transparenttextures.com/patterns/old-map.png)',
                border: '2px solid #a37c4f',
                boxShadow: '0 0 15px rgba(163, 124, 79, 0.3), inset 0 0 10px rgba(0,0,0,0.5)',
                borderRadius: '8px'
              }}
            >
                 {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
                        <LoadingSpinner />
                        <p className="font-display text-amber-300 mt-4 text-lg tracking-wider animate-pulse-text">{t('loading_mmpi')}</p>
                    </div>
                )}
                {!isLoading && analysis && (
                    <div className="animate-fade-in">
                        <MarkdownRenderer text={analysis} />
                    </div>
                )}
            </section>
          )}

        </main>
      </div>
    </div>
  );
};

export default MMPIResultModal;
