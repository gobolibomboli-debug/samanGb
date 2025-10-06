import React, { useState, useEffect } from 'react';
import { Result, FullMythosReport } from '../../types';
import LoadingSpinner from '../LoadingSpinner';
import { useLanguage } from '../../contexts/LanguageContext';
import ShareableCard from './ShareableCard';

interface ShareModalProps {
  result: Result;
  fullReport: Partial<FullMythosReport> | null;
  isReportLoading: boolean;
  onFetchReport: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ result, fullReport, isReportLoading, onFetchReport }) => {
  const [isExporting, setIsExporting] = useState(false);
  const { t } = useLanguage();
  
  const [originQuote, setOriginQuote] = useState<string | null>(null);

  useEffect(() => {
    // If the report isn't loaded and isn't currently loading, fetch it.
    if (!fullReport && !isReportLoading) {
        onFetchReport();
    }
  }, [fullReport, isReportLoading, onFetchReport]);

  useEffect(() => {
    // Once the report is available, extract the quote.
    if (fullReport?.originStory) {
        const quote = (fullReport.originStory.split('.').filter(s => s.trim().length > 20)[1] || fullReport.originStory.split('.')[0])?.trim() + '.';
        setOriginQuote(quote);
    } else if (fullReport) { // Handle case where report fetch failed but we have fallback content
        setOriginQuote(t(`${result.dominantArchetype.id}_summary`));
    }
  }, [fullReport, result.dominantArchetype.id, t]);

  const isLoadingQuote = isReportLoading || !originQuote;

  const handleExport = async () => {
    setIsExporting(true);
    const html2canvas = (window as any).html2canvas;
    if (!html2canvas) {
      console.error('html2canvas library not found.');
      alert('Error: Could not find export library. Please try again.');
      setIsExporting(false);
      return;
    }
    
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const elementToCapture = document.getElementById('shareable-card-container');
    if (!elementToCapture) {
      setIsExporting(false);
      return;
    }

    try {
        const canvas = await html2canvas(elementToCapture, {
            scale: 2,
            backgroundColor: null,
            useCORS: true,
            logging: false,
        });

        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `Mythos-Persona-${result.dominantArchetype.name}-${result.mbtiType}.png`;
        link.href = image;
        link.click();
    } catch (error) {
        console.error("Failed to export image:", error);
        alert("Sorry, there was an error creating your shareable image.");
    }

    setIsExporting(false);
  };

  return (
    <>
      <div
        className="w-full h-full flex flex-col items-center justify-start p-4 animate-fade-in"
        role="region"
        aria-labelledby="share-title"
      >
        <div
          className="relative w-full max-w-lg"
        >
          {!isExporting ? (
            <>
              <div className="p-8 text-center text-white">
                <h2 id="share-title" className="font-display text-3xl accent-gradient-text">{t('shareYourSigil')}</h2>
                <p className="text-gray-300 mt-2 mb-6">{t('shareSigil_desc')}</p>
              </div>

              <div id="shareable-card-preview">
                 <ShareableCard result={result} originQuote={originQuote} isLoadingQuote={isLoadingQuote} />
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleExport}
                  disabled={isLoadingQuote}
                  className="font-display text-xl bg-sky-400 hover:bg-sky-300 text-[#0a192f] rounded-full px-12 py-3 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(56,189,248,0.5)] hover:shadow-[0_0_25px_rgba(56,189,248,0.7)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {t('downloadImage')}
                </button>
              </div>
            </>
          ) : (
            <div className="h-96 flex flex-col justify-center items-center">
              <LoadingSpinner />
              <p className="font-display text-sky-400 mt-4 text-lg tracking-wider animate-pulse-text text-center">{t('exportForging')}</p>
            </div>
          )}
        </div>
      </div>
       {isExporting && (
        <div style={{ position: 'absolute', left: '-9999px', top: '0', zIndex: -1 }}>
          <div id="shareable-card-container" style={{ width: '600px', height: '1067px' }}>
             <ShareableCard result={result} originQuote={originQuote} isLoadingQuote={false} />
          </div>
        </div>
       )}
    </>
  );
};

export default ShareModal;
