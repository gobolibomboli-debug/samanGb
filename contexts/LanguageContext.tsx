import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations } from '../i18n/locales';

type Language = 'en' | 'fa';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, ...args: any[]) => string;
  dir: Direction;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fa');

  const t = (key: string, ...args: any[]): string => {
    const langTranslations = translations[language];
    let translation = key.split('.').reduce((obj: any, k) => obj && obj[k], langTranslations) || translations['en'][key];

    if (typeof translation !== 'string') {
      // Fallback for missing keys
      return key;
    }

    // Basic interpolation
    if (args.length > 0) {
        args.forEach((arg, index) => {
            translation = translation.replace(`{${index}}`, arg);
        });
    }

    return translation;
  };

  const dir = language === 'fa' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};