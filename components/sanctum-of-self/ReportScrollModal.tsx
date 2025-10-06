import React from 'react';
import { FullMythosReport, NarrativeDomain, Result } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { Accordion, AccordionItem } from '../Accordion';
import SkeletonLoader from '../SkeletonLoader';
import LoadingSpinner from '../LoadingSpinner';

const ContentDisplay: React.FC<{ content: string | null; isLoading: boolean; }> = ({ content, isLoading }) => {
    if (isLoading) {
        return (
            <div className="w-full max-w-prose space-y-3">
                <SkeletonLoader className="h-5 w-11/12" />
                <SkeletonLoader className="h-5 w-full" />
                <SkeletonLoader className="h-5 w-10/12" />
                <SkeletonLoader className="h-5 w-full" />
            </div>
        );
    }
    return (
        <>
            {content?.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
            ))}
        </>
    );
};


interface ReportScrollModalProps {
  result: Result;
  fullReport: Partial<FullMythosReport> | null;
  isLoading: boolean;
  onFetchReport: () => void;
}

const ReportScrollModal: React.FC<ReportScrollModalProps> = ({ result, fullReport, isLoading, onFetchReport }) => {
    const { t } = useLanguage();

    const reportSections: { domain: NarrativeDomain, titleKey: string }[] = [
        { domain: NarrativeDomain.ORIGIN, titleKey: 'oraclesVision' },
        { domain: NarrativeDomain.CAREER, titleKey: 'pathOfHero' },
        { domain: NarrativeDomain.RELATIONSHIPS, titleKey: 'bondsOfFate' },
        { domain: NarrativeDomain.GROWTH, titleKey: 'innerOdyssey' },
        { domain: NarrativeDomain.COMPARISONS, titleKey: 'mythicTriad' },
        { domain: NarrativeDomain.PANTHEON, titleKey: 'yourInnerPantheon' },
        { domain: NarrativeDomain.SHADOW, titleKey: 'integratingYourShadow' },
    ];

    const InitialState: React.FC = () => (
        <div className="flex flex-col items-center justify-center text-center p-8 h-full">
            <div className="w-48 h-48 text-sky-400/30 opacity-50 mb-8">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            </div>
            <p className="font-body text-lg text-gray-300 max-w-md mb-8">{t('guide_sanctum_report_p1')}</p>
            <button
                onClick={onFetchReport}
                className="font-display text-xl bg-sky-500 hover:bg-sky-400 text-black rounded-lg px-12 py-4 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/20"
            >
                {t('hotspot_report')}
            </button>
        </div>
    );

    return (
        <div className="w-full h-full flex items-start justify-center p-4 animate-fade-in">
            <div className="w-full max-w-4xl animate-fade-in-scale-up">
                <main className="p-6 md:p-10 text-white">
                    <header className="text-center mb-10">
                        <h2 className="font-display text-4xl sm:text-5xl accent-gradient-text">{t('report_modal_title')}</h2>
                    </header>
                    
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center text-center p-8">
                            <LoadingSpinner />
                            <p className="font-display text-sky-400 mt-4 text-lg tracking-wider animate-pulse-text">{t('oracleConsulting')}</p>
                        </div>
                    ) : fullReport ? (
                        <Accordion defaultOpenId={NarrativeDomain.ORIGIN}>
                            {reportSections.map(({ domain, titleKey }) => (
                                <AccordionItem 
                                    key={domain} 
                                    id={domain} 
                                    title={t(titleKey)}
                                >
                                    <ContentDisplay 
                                        content={fullReport[domain] || null} 
                                        isLoading={false} 
                                    />
                                </AccordionItem>
                            ))}
                        </Accordion>
                    ) : (
                        <InitialState />
                    )}
                </main>
            </div>
        </div>
    );
};

export default ReportScrollModal;
