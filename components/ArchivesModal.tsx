import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ArchivesModalProps {
    onSave: () => void;
    onLoad: () => void;
    onClear: () => void;
    hasSave: boolean;
}

const ArchiveButton: React.FC<{ title: string, description: string, onClick: () => void, disabled?: boolean, icon: React.ReactNode }> = ({ title, description, onClick, disabled = false, icon }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="group flex flex-col sm:flex-row items-center gap-4 text-left rtl:text-right w-full p-4 bg-black/20 rounded-lg border-2 border-sky-400/20 hover:border-sky-400 hover:bg-sky-900/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black/20 disabled:hover:border-sky-400/20"
    >
        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-sky-400 group-hover:text-sky-300 transition-colors">
            {icon}
        </div>
        <div>
            <h4 className="font-display text-xl text-white group-hover:accent-gradient-text transition-colors">{title}</h4>
            <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
    </button>
);


const ArchivesModal: React.FC<ArchivesModalProps> = ({ onSave, onLoad, onClear, hasSave }) => {
  const { t } = useLanguage();
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);

  const handleClearClick = () => {
    if (isConfirmingClear) {
      onClear();
      setIsConfirmingClear(false);
    } else {
      setIsConfirmingClear(true);
    }
  };

  const SaveIcon = () => <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>;
  const LoadIcon = () => <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3v12" /></svg>;
  const ClearIcon = () => <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25m2.25-2.25l-2.25-2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>;

  return (
    <div className="w-full h-full flex items-center justify-center p-4 animate-fade-in">
      <div
        className="w-full max-w-2xl animate-fade-in-scale-up p-8 relative"
      >
        <h2 className="font-display text-4xl accent-gradient-text mb-4 animate-text-flicker-glow text-center">{t('herosArchives')}</h2>
        <p className="text-center font-body text-gray-300 text-lg mb-8">{t('archives_manage_title')}</p>
        
        <div className="space-y-6">
            <ArchiveButton title={t('archives_save_button')} description={t('archives_save_desc')} onClick={onSave} icon={<SaveIcon />} />
            <ArchiveButton title={t('archives_load_button')} description={hasSave ? t('archives_load_desc') : t('no_save_data')} onClick={onLoad} disabled={!hasSave} icon={<LoadIcon />} />
            
            {isConfirmingClear ? (
                 <div className="p-4 bg-red-900/30 border-2 border-red-500/50 rounded-lg">
                    <p className="text-center text-red-300 mb-4">{t('archives_clear_confirm')}</p>
                    <div className="flex justify-center gap-4">
                        <button onClick={handleClearClick} className="font-display text-lg bg-red-600 hover:bg-red-500 text-white rounded-lg px-8 py-2 transition-colors">{t('confirm')}</button>
                        <button onClick={() => setIsConfirmingClear(false)} className="font-display text-lg text-gray-300 hover:text-white rounded-lg px-8 py-2 transition-colors">{t('cancel')}</button>
                    </div>
                 </div>
            ) : (
                <ArchiveButton title={t('archives_clear_button')} description={t('archives_clear_desc')} onClick={handleClearClick} disabled={!hasSave} icon={<ClearIcon />} />
            )}
        </div>
      </div>
    </div>
  );
};

export default ArchivesModal;