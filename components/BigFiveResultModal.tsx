import React, { useMemo, useState } from 'react';
import { OceanScores } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { Accordion, AccordionItem } from './Accordion';
import LoadingSpinner from './LoadingSpinner';

interface BigFiveResultModalProps {
  scores: OceanScores | null;
  onTakeTest: () => void;
  analysis: string | null;
  isLoading: boolean;
  onFetchAnalysis: () => void;
  apiAvailable: boolean;
  onApiDisabledClick: () => void;
}

const traitKeys: Array<keyof OceanScores> = ['O', 'C', 'E', 'A', 'N'];
const MIN_SCORE = 12; // 12 questions * 1 point min
const MAX_SCORE = 60; // 12 questions * 5 points max

// --- ICONS ---
const OpennessIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2a9.5 9.5 0 018.78 6.5A1 1 0 0120 9.5v5a1 1 0 01-.78 1A9.5 9.5 0 0112 22a9.5 9.5 0 01-8.78-6.5A1 1 0 014 14.5v-5a1 1 0 01.78-1A9.5 9.5 0 0112 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 10h1.5v1.5H9v3h4.5v-1.5H12V10" /></svg>;
const ConscientiousnessIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>;
const ExtraversionIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m2.25 1.5l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const AgreeablenessIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.75h.008v.008H9V9.75zm6 0h.008v.008H15V9.75z" /></svg>;
const NeuroticismIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>;

const traitIcons: Record<keyof OceanScores, React.ReactNode> = {
  O: <OpennessIcon />, C: <ConscientiousnessIcon />, E: <ExtraversionIcon />,
  A: <AgreeablenessIcon />, N: <NeuroticismIcon />
};

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
                        <div key={index}>
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
            <h3 className="font-display text-2xl text-sky-300 mb-2">{title}</h3>
            <div className="font-body text-gray-300 text-lg leading-relaxed space-y-3">
                {description.split('\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
        </div>
    );
};


const BigFiveResultModal: React.FC<BigFiveResultModalProps> = ({ scores, onTakeTest, analysis, isLoading, onFetchAnalysis, apiAvailable, onApiDisabledClick }) => {
  const { t } = useLanguage();
  const [showAnalysis, setShowAnalysis] = useState(false);

  const radarData = useMemo(() => {
    if (!scores) return [];
    return traitKeys.map(key => ({
      subject: t(`ocean_${key.toLowerCase()}`),
      score: scores[key],
      fullMark: MAX_SCORE,
    }));
  }, [scores, t]);

  const handleFetchClick = () => {
    if (!apiAvailable) {
      onApiDisabledClick();
      return;
    }
    setShowAnalysis(true);
    if (!analysis) {
        onFetchAnalysis();
    }
  }

  if (!scores) {
    return (
        <div className="w-full h-full flex items-center justify-center p-4 animate-fade-in text-center">
            <div className="max-w-xl">
                 <h2 className="font-display text-4xl sm:text-5xl accent-gradient-text animate-text-flicker-glow">{t('five_factor_modal_title')}</h2>
                 <p className="font-body text-lg text-gray-300 mt-4 mb-8">{t('five_factor_intro')}</p>
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
      <div className="w-full max-w-4xl animate-fade-in-scale-up">
        <header className="text-center mt-6 mb-8">
          <h2 className="font-display text-4xl sm:text-5xl accent-gradient-text">{t('five_factor_modal_title')}</h2>
        </header>

        <main>
          {/* Radar Chart */}
          <div className="w-full h-80 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <defs>
                    <radialGradient id="radarFill" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.4}/>
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.1}/>
                    </radialGradient>
                </defs>
                <PolarGrid stroke="rgba(56, 189, 248, 0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#e6f1ff', fontFamily: 'Cinzel, Vazirmatn' }} />
                <PolarRadiusAxis angle={30} domain={[MIN_SCORE, MAX_SCORE]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="score" stroke="#38bdf8" fill="url(#radarFill)" fillOpacity={0.8} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-center my-10">
            <button
                onClick={handleFetchClick}
                className="font-display text-xl bg-transparent border-2 border-sky-400 text-sky-300 rounded-lg px-10 py-3 transition-all duration-300 transform hover:scale-105 hover:bg-sky-400/10 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95"
            >
                {t('get_interpretation')}
            </button>
          </div>

          {showAnalysis && (
            <section className="my-12 p-6 bg-black/30 backdrop-blur-sm border-2 border-sky-400/20 rounded-xl">
                 {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
                        <LoadingSpinner />
                        <p className="font-display text-sky-400 mt-4 text-lg tracking-wider animate-pulse-text">{t('loading_bigFive')}</p>
                    </div>
                )}
                {!isLoading && analysis && (
                    <div className="animate-fade-in">
                        <MarkdownRenderer text={analysis} />
                    </div>
                )}
            </section>
          )}


          {/* Accordion for details */}
          <Accordion>
            {traitKeys.map(key => {
                const score = scores[key];
                const percentage = ((score - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * 100;
                let level: 'low' | 'average' | 'high';
                if (percentage < 35) level = 'low';
                else if (percentage > 65) level = 'high';
                else level = 'average';

                return (
                    <AccordionItem key={key} id={key} title={t(`ocean_${key.toLowerCase()}`)}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 text-sky-300 flex-shrink-0">{traitIcons[key]}</div>
                            <div>
                                <h4 className="font-body text-lg text-white">{t(`ocean_score_is_${level}`)}</h4>
                                <p className="text-sm text-gray-400">{t(`ocean_${key.toLowerCase()}_${level}_desc`)}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h5 className="font-display text-sky-200 mb-2">{t('ocean_high_score')}</h5>
                            <p className="text-sm text-gray-300 pl-4 border-l-2 border-sky-400/30">{t(`ocean_${key.toLowerCase()}_high_desc`)}</p>
                        </div>
                         <div className="mt-4">
                            <h5 className="font-display text-sky-200 mb-2">{t('ocean_low_score')}</h5>
                            <p className="text-sm text-gray-300 pl-4 border-l-2 border-sky-400/30">{t(`ocean_${key.toLowerCase()}_low_desc`)}</p>
                        </div>
                    </AccordionItem>
                )
            })}
          </Accordion>

        </main>
      </div>
    </div>
  );
};

export default BigFiveResultModal;