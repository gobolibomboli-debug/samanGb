import React, { useState } from 'react';
import { Result, NarrativeDomain } from '../types';
import ResultPrintLayout from './ResultPrintLayout';
import LoadingSpinner from './LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';

interface ExportModalProps {
  result: Result;
  narratives: Record<string, string | null>;
  onClose: () => void;
}

const ChoiceCard: React.FC<{
  title: string;
  description: string;
  onClick: () => void;
  icon: React.ReactNode;
}> = ({ title, description, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className="group relative w-full h-64 p-6 flex flex-col justify-end text-left rtl:text-right bg-black/30 hover:bg-sky-900/10 border-2 border-sky-400/20 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/10"
    >
      <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-16 h-16 text-sky-400/50 transition-colors duration-500 group-hover:text-sky-400">
        {icon}
      </div>
      <div className="relative z-10">
        <h3 className="font-display text-2xl text-white group-hover:accent-gradient-text">{title}</h3>
        <p className="mt-2 font-body text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </button>
  );
};

const ExportModal: React.FC<ExportModalProps> = ({ result, narratives, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const { t } = useLanguage();

  const performExport = async (format: 'png' | 'pdf') => {
    setIsLoading(true);

    const html2canvas = (window as any).html2canvas;
    const jsPDF = (window as any).jspdf?.jsPDF;

    if (!html2canvas || (format === 'pdf' && !jsPDF)) {
      console.error('Export libraries (html2canvas or jspdf) are not available on the window object.');
      alert('Error: Could not find the required export libraries. Please check your internet connection, disable any ad-blockers that might interfere, and try again.');
      setIsLoading(false);
      return;
    }

    // Use a timeout to allow the DOM to update with the print layout
    await new Promise(resolve => setTimeout(resolve, 50));

    const printContent = document.getElementById('print-layout-container');
    if (!printContent) {
      console.error('Could not find element to export.');
      setIsLoading(false);
      return;
    }

    setLoadingMessage(t('exportMuses'));
    const canvas = await html2canvas(printContent, {
      scale: 2.5,
      backgroundColor: '#0a192f',
      useCORS: true,
      logging: false,
    });

    if (format === 'png') {
      setLoadingMessage(t('exportForging'));
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `Mythos-Persona-${result.dominantArchetype.name}.png`;
      link.href = image;
      link.click();
    } else { // PDF
      setLoadingMessage(t('exportBinding'));
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const pdf = new jsPDF({
        orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
        unit: 'pt',
        format: 'a4',
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const ratio = Math.min((pdfWidth - 40) / imgWidth, (pdfHeight - 40) / imgHeight);
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;
      const x = (pdfWidth - finalWidth) / 2;
      const y = (pdfHeight - finalHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
      pdf.save(`Mythos-Persona-${result.dominantArchetype.name}.pdf`);
    }

    setIsLoading(false);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-title"
      >
        <div
          className="bg-gradient-to-br from-[#0a192f] via-[#0c1e3a] to-[#102444] border-2 border-sky-400/30 rounded-lg shadow-2xl shadow-sky-500/10 w-full max-w-2xl animate-fade-in-scale-up"
          onClick={(e) => e.stopPropagation()}
        >
          {!isLoading ? (
            <div className="p-8">
              <h2 id="export-title" className="font-display text-3xl accent-gradient-text text-center">{t('exportYourMythos')}</h2>
              <p className="text-gray-400 text-center mt-2 mb-8">{t('exportSubtitle')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChoiceCard
                  title={t('imagePng')}
                  description={t('imagePngDesc')}
                  onClick={() => performExport('png')}
                  icon={
                     <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v14.25c0 .621-.504 1.125-1.125-1.125H4.875A1.125 1.125 0 013.75 19.125V4.875z" /><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 9.75l4.5 4.5m0-4.5l-4.5 4.5" /></svg>
                  }
                />
                 <ChoiceCard
                  title={t('documentPdf')}
                  description={t('documentPdfDesc')}
                  onClick={() => performExport('pdf')}
                  icon={
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                  }
                />
              </div>
              <div className="text-center mt-8">
                <button onClick={onClose} className="font-display text-gray-400 hover:text-white transition-colors">{t('cancel')}</button>
              </div>
            </div>
          ) : (
            <div className="p-8 h-64 flex flex-col justify-center items-center">
              <LoadingSpinner />
              <p className="font-display text-sky-400 mt-4 text-lg tracking-wider animate-pulse-text text-center">{loadingMessage}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Hidden container for rendering the print layout */}
      {isLoading && (
        <div style={{ position: 'absolute', left: '-9999px', top: '0', zIndex: -1 }}>
          <div id="print-layout-container" style={{ width: '1240px' }}>
            <ResultPrintLayout result={result} narratives={narratives} />
          </div>
        </div>
      )}
    </>
  );
};

export default ExportModal;