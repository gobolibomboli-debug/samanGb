import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ApiUnavailableModalProps {
  onClose: () => void;
}

const ApiUnavailableModal: React.FC<ApiUnavailableModalProps> = ({ onClose }) => {
  const { t } = useLanguage();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="api-unavailable-title"
    >
      <div
        className="bg-gradient-to-br from-[#0a192f] via-[#0c1e3a] to-[#102444] border-2 border-red-500/50 rounded-lg shadow-2xl shadow-red-500/10 w-full max-w-lg animate-fade-in-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <h2 id="api-unavailable-title" className="font-display text-3xl text-red-400 text-center">{t('apiUnavailable_title')}</h2>
          <p className="text-gray-300 text-center mt-4 mb-8">{t('apiUnavailable_desc')}</p>
          <div className="text-center">
            <button 
              onClick={onClose} 
              className="font-display text-lg bg-gray-600 hover:bg-gray-500 text-white rounded-lg px-8 py-2 transition-colors"
            >
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiUnavailableModal;
