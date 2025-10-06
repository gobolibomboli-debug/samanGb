import React from 'react';
import { Result, AIArchetypeAnalysis } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import LoadingSpinner from '../LoadingSpinner';
import GodIcon from '../GodIcon';

interface AIAnalysisModalProps {
    result: Result;
    analysis: AIArchetypeAnalysis[] | null;
    isLoading: boolean;
    onFetchAnalysis: () => void;
    onOpenChat: () => void;
    analysisError: string | null;
}

const AIAnalysisModal: React.FC<AIAnalysisModalProps> = ({ result, analysis, isLoading, onFetchAnalysis, onOpenChat, analysisError }) => {
    const { t } = useLanguage();

    const InitialState: React.FC = () => (
        <div className="flex flex-col items-center justify-center text-center p-8 h-full">
            <div className="w-48 h-48 text-sky-400/30 opacity-50 mb-8">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.17 48.17 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
            </div>
            <p className="font-body text-lg text-gray-300 max-w-md mb-8">{t('consultJungsAI_desc')}</p>
            
            {analysisError && (
                <div className="mb-6 p-4 bg-red-900/30 border-2 border-red-500/50 rounded-lg text-red-300 max-w-md text-left rtl:text-right">
                    {(() => {
                        const parts = analysisError.split('**:\n\n');
                        const title = parts[0]?.replace(/\*\*/g, '');
                        const description = parts[1] || analysisError.replace(/\*\*/g, '');
                        return (
                            <>
                                <h4 className="font-display font-bold mb-2">{title}</h4>
                                <p className="text-sm font-body">{description}</p>
                            </>
                        );
                    })()}
                </div>
            )}

            <button
                onClick={onFetchAnalysis}
                className="font-display text-xl bg-sky-500 hover:bg-sky-400 text-black rounded-lg px-12 py-4 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/20"
            >
                {analysisError ? t('retry_consultation') : t('consultJungsAI')}
            </button>
        </div>
    );

    return (
        <div
            className="w-full h-full flex items-start justify-center p-4 animate-fade-in"
            role="region"
            aria-labelledby="ai-analysis-title"
        >
            <div
                className="w-full max-w-3xl animate-fade-in-scale-up"
            >
                <header className="text-center mt-6 mb-8">
                    <h2 id="ai-analysis-title" className="font-display text-4xl sm:text-5xl accent-gradient-text">{t('aiAnalysisTitle')}</h2>
                </header>
                
                <main className="p-6 md:p-8">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center h-full">
                            <LoadingSpinner />
                            <p className="font-display text-sky-400 mt-4 text-lg tracking-wider animate-pulse-text">{t('loading_aiAnalysis')}</p>
                        </div>
                    )}

                    {!isLoading && analysis && (
                        <div className="w-full max-w-3xl mx-auto p-4 animate-fade-in">
                            <p className="text-center text-gray-400 mb-10">{t('aiAnalysisSubtitle')}</p>
                            <div className="space-y-6">
                                {analysis.map((item) => (
                                    <div key={item.archetypeId} className="flex items-start gap-4">
                                        <div className="w-12 h-12 flex-shrink-0 text-sky-300 mt-1">
                                            <GodIcon archetypeId={item.archetypeId} />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h4 className="font-display text-xl text-white">
                                                    {t(item.name) || item.name}
                                                </h4>
                                                <span className="font-mono text-lg font-bold text-white">
                                                    {item.percentage.toFixed(1)}%
                                                </span>
                                            </div>
                                            <div className="w-full h-2.5 bg-gray-800/50 rounded-full overflow-hidden mb-2">
                                                <div
                                                    className="h-full bg-sky-500 rounded-full transition-all duration-500 ease-out"
                                                    style={{ width: `${item.percentage}%` }}
                                                ></div>
                                            </div>
                                            <p className="font-body text-sm text-gray-400 italic">
                                                "{item.reasoning}"
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-12">
                                <button
                                    onClick={onOpenChat}
                                    className="font-display text-lg bg-transparent border-2 border-sky-400/50 text-sky-300 rounded-lg px-8 py-3 transition-all duration-300 transform hover:scale-105 hover:bg-sky-400/10 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95"
                                >
                                    {t('jungianChat_discuss_button')}
                                </button>
                            </div>
                        </div>
                    )}

                    {!isLoading && !analysis && (
                         <InitialState />
                    )}
                </main>
            </div>
        </div>
    );
};

export default AIAnalysisModal;