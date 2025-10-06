import React from 'react';
import { Result, NarrativeDomain } from '../types';
import GodIcon from './GodIcon';
import { useLanguage } from '../contexts/LanguageContext';


interface ResultPrintLayoutProps {
  result: Result;
  narratives: Record<string, string | null>;
}

const OrnamentalDivider: React.FC = () => (
  <div className="flex items-center justify-center my-8" aria-hidden="true">
    <div className="h-px flex-grow bg-gradient-to-r from-transparent via-sky-600/50 to-transparent"></div>
    <svg width="60" height="10" viewBox="0 0 80 12" className="mx-4 text-sky-500/80 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M0 6 L15 6 L20 2 L25 10 L30 2 L35 10 L40 6 L45 10 L50 2 L55 10 L60 2 L65 6 L80 6" />
    </svg>
    <div className="h-px flex-grow bg-gradient-to-l from-transparent via-sky-600/50 to-transparent"></div>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section>
        <h3 className="font-display text-3xl accent-gradient-text text-center mb-4">{title}</h3>
        <div className="font-body text-gray-300 text-lg leading-relaxed space-y-4 text-left rtl:text-right">
            {children}
        </div>
        <OrnamentalDivider />
    </section>
);


const ResultPrintLayout: React.FC<ResultPrintLayoutProps> = ({ result, narratives }) => {
    const { t } = useLanguage();

    return (
        <div className="bg-[#0a192f] text-[#e6f1ff] p-16 font-body" dir={t('dir')}>
             <style>{`
                #print-layout-container .font-display { font-family: 'Cinzel', serif; }
                #print-layout-container .font-body { font-family: 'Lato', sans-serif; }
                html[dir="rtl"] #print-layout-container .font-display { font-family: 'Vazirmatn', 'Cinzel', serif; }
                html[dir="rtl"] #print-layout-container, html[dir="rtl"] #print-layout-container .font-body { font-family: 'Vazirmatn', 'Lato', sans-serif; }
                .accent-gradient-text {
                    background: linear-gradient(120deg, #7dd3fc, #38bdf8, #0ea5e9);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
             `}</style>
            {/* Header */}
            <header className="text-center mb-8">
                <h1 className="font-display text-6xl font-bold accent-gradient-text">{t('welcomeTitle')}</h1>
                <p className="font-body text-2xl text-gray-300 mt-2">{t('yourMythicProfile')}</p>
            </header>

            <OrnamentalDivider />

            {/* Dominant Archetype & Type */}
            <div className="grid grid-cols-3 gap-8 items-center text-center my-12">
                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 text-sky-300">
                        <GodIcon archetypeId={result.dominantArchetype.id} />
                    </div>
                    <h2 className="font-display text-4xl text-white mt-2">{t(result.dominantArchetype.name)}</h2>
                    <p className="text-sky-400 text-2xl">{t(`${result.dominantArchetype.id}_domain`)}</p>
                </div>
                <div className="col-span-2 text-left rtl:text-right border-l-2 rtl:border-l-0 rtl:border-r-2 border-sky-400/30 px-8">
                    <h3 className="font-display text-3xl accent-gradient-text">{t('dominantArchetype')}</h3>
                    <p className="text-lg text-gray-300 mt-2 leading-relaxed">{t(`${result.dominantArchetype.id}_summary`)}</p>
                    <div className="mt-6">
                        <p className="font-display text-sm text-gray-400 tracking-widest">{t('yourType')}</p>
                        <p className="font-display text-8xl text-white">{result.mbtiType}</p>
                    </div>
                </div>
            </div>
            
            <OrnamentalDivider />

            {/* Mythic Origin */}
            <Section title={t('oraclesVision')}>
                {narratives[NarrativeDomain.ORIGIN]?.split('\n').filter(p => p.trim()).map((p, i) => <p key={i}>{p}</p>)}
            </Section>

            {/* Inner Pantheon */}
             <section>
                <h3 className="font-display text-3xl accent-gradient-text text-center mb-4">{t('yourInnerPantheon')}</h3>
                <div className="max-w-2xl mx-auto font-display text-2xl text-center space-y-2">
                    {result.archetypeDistribution.slice(0, 5).map(({ archetype, score }) => {
                        if (score < 1) return null; // Only show significant archetypes in the summary
                        return (
                            <div key={archetype.id} className="flex justify-between items-center px-4 py-1">
                                <span className="text-white">{t(archetype.name)}</span>
                                <span className="text-sky-300 font-bold">{score.toFixed(1)}%</span>
                            </div>
                        );
                    })}
                </div>
                <OrnamentalDivider />
            </section>


            {/* Guidance Narratives */}
            {narratives[NarrativeDomain.CAREER] && (
                <Section title={t('pathOfHero')}>
                    {narratives[NarrativeDomain.CAREER]?.split('\n').filter(p => p.trim()).map((p, i) => <p key={i}>{p}</p>)}
                </Section>
            )}

             {narratives[NarrativeDomain.RELATIONSHIPS] && (
                <Section title={t('bondsOfFate')}>
                    {narratives[NarrativeDomain.RELATIONSHIPS]?.split('\n').filter(p => p.trim()).map((p, i) => <p key={i}>{p}</p>)}
                </Section>
            )}

            {narratives[NarrativeDomain.GROWTH] && (
                <Section title={t('innerOdyssey')}>
                     {narratives[NarrativeDomain.GROWTH]?.split('\n').filter(p => p.trim()).map((p, i) => <p key={i}>{p}</p>)}
                </Section>
            )}

            {narratives[NarrativeDomain.COMPARISONS] && (
                <Section title={t('mythicTriad')}>
                    {narratives[NarrativeDomain.COMPARISONS]?.split('\n').filter(p => p.trim()).map((p, i) => <p key={i}>{p}</p>)}
                </Section>
            )}

            <footer className="text-center text-gray-500 font-display mt-12">
                {t('generatedBy')}
            </footer>
        </div>
    );
};

export default ResultPrintLayout;