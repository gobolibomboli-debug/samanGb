import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';

interface MythicAnalysisProps {
  pantheonAnalysis: string | null;
  shadowAnalysis: string | null;
  isLoadingPantheon: boolean;
  isLoadingShadow: boolean;
  pantheonLoadingKey: string;
  shadowLoadingKey: string;
}

const AnalysisCard: React.FC<{ title: string; content: string | null; isLoading: boolean; loadingMessageKey: string; }> = ({ title, content, isLoading, loadingMessageKey }) => {
  const { t } = useLanguage();
  return (
    <div className="">
      <h4 className="font-display text-2xl sm:text-3xl accent-gradient-text mb-4 text-center">{title}</h4>
      <div className="min-h-[200px] flex justify-center items-center">
        {isLoading ? (
          <div className="text-center">
            <LoadingSpinner />
            <p className="font-display text-sky-400 mt-4 text-lg tracking-wider animate-pulse-text">{t(loadingMessageKey)}</p>
          </div>
        ) : (
          <div className="font-body text-gray-300 text-base sm:text-lg leading-relaxed max-w-prose text-left rtl:text-right">
            {content?.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MythicAnalysis: React.FC<MythicAnalysisProps> = ({ 
    pantheonAnalysis, 
    shadowAnalysis, 
    isLoadingPantheon, 
    isLoadingShadow,
    pantheonLoadingKey,
    shadowLoadingKey
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
       <h3 className="font-display text-3xl sm:text-4xl accent-gradient-text mb-4 text-center">{t('mythicSelfAnalysis')}</h3>
      <AnalysisCard
        title={t('yourInnerPantheon')}
        content={pantheonAnalysis}
        isLoading={isLoadingPantheon}
        loadingMessageKey={pantheonLoadingKey}
      />
      <AnalysisCard
        title={t('integratingYourShadow')}
        content={shadowAnalysis}
        isLoading={isLoadingShadow}
        loadingMessageKey={shadowLoadingKey}
      />
    </div>
  );
};

export default MythicAnalysis;