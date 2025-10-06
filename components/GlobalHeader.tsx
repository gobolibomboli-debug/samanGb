import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { AppView } from '../types';

interface GlobalHeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView, context?: any) => void;
}

const Breadcrumb: React.FC<{ children: React.ReactNode; onClick?: () => void, isLast?: boolean }> = ({ children, onClick, isLast = false }) => (
  <button
    onClick={onClick}
    disabled={!onClick || isLast}
    className={`font-display text-sm sm:text-base transition-colors duration-200 ${onClick && !isLast ? 'text-gray-400 hover:text-white' : 'text-sky-200'}`}
  >
    {children}
  </button>
);


const GlobalHeader: React.FC<GlobalHeaderProps> = ({ currentView, onNavigate }) => {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fa' : 'en');
  };

  const generateBreadcrumbs = () => {
    const crumbs = [<Breadcrumb key="sanctum" onClick={() => onNavigate('sanctum')} isLast={currentView === 'sanctum'}>{t('sanctum_title')}</Breadcrumb>];
    
    if (currentView !== 'sanctum') {
        let titleKey: string | null = null;
        if(currentView === 'profile') titleKey = 'hotspot_profile';
        else if(currentView === 'psychology') titleKey = 'hotspot_psychology';
        else if(currentView === 'tapestry') titleKey = 'hotspot_tapestry';
        
        if(titleKey) {
            crumbs.push(<span key="sep1" className="mx-1 sm:mx-2 text-gray-500">/</span>);
            crumbs.push(<Breadcrumb key={currentView} isLast={true}>{t(titleKey)}</Breadcrumb>);
        }
    }
    return crumbs;
  };

  return (
    <header className="absolute top-0 left-0 right-0 h-16 bg-black/20 backdrop-blur-md border-b border-white/10 z-40 flex items-center justify-between px-2 sm:px-6">
      <div className="flex-1">
        <button onClick={() => onNavigate('sanctum')} className="font-display text-lg sm:text-2xl accent-gradient-text hover:opacity-80 transition-opacity">
          {t('welcomeTitle')}
        </button>
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center space-x-2 text-gray-400">
        {generateBreadcrumbs()}
      </div>
      <div className="flex-1 flex items-center justify-end gap-2 sm:gap-4">
        <button onClick={() => onNavigate('about')} className="text-gray-300 hover:text-white transition-colors" aria-label={t('hotspot_about')}>
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
        </button>
        <button onClick={() => onNavigate('archives')} className="text-gray-300 hover:text-white transition-colors" aria-label={t('hotspot_archives')}>
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
        </button>
        <div className="h-6 w-px bg-white/10"></div>
        <button onClick={toggleLanguage} className="font-display text-sm sm:text-lg text-gray-300 hover:text-white w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-colors" aria-label="Switch Language">
            {language === 'en' ? 'FA' : 'EN'}
        </button>
      </div>
    </header>
  );
};

export default GlobalHeader;