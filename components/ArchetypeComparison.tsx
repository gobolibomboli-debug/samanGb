import React, { useState, useCallback, useEffect } from 'react';
import { Archetype } from '../types';
import { DEITY_PROFILES } from '../data/deityData';
import { generateArchetypeComparison } from '../services/geminiService';
import GodIcon from './GodIcon';
import SkeletonLoader from './SkeletonLoader';
import { useLanguage } from '../contexts/LanguageContext';

interface ArchetypeComparisonProps {
  dominantArchetype: Archetype;
}

// --- ICONS for Analysis Sections ---
const SynergyIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="12" r="5" /><circle cx="16" cy="12" r="5" /></svg>;
const FrictionIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="15" y1="9" x2="9" y2="15" /><polyline points="15 14 15 9 10 9" /><line x1="9" y1="9" x2="15" y2="15" /><polyline points="9 10 9 15 14 15" /></svg>;
const GrowthIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V10"></path><path d="M15 6.34A4 4 0 1 0 9.66 9"></path></svg>;
const OracleIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>;

// --- Helper Functions and Components ---

interface ParsedSection {
  title: string;
  content: string;
}

const parseComparison = (text: string): ParsedSection[] => {
  const sections: ParsedSection[] = [];
  const regex = /\*\*(.*?)\*\*:\s*([\s\S]*?)(?=\s*\*\*.*?:|$)/g;
  const matches = Array.from(text.matchAll(regex));

  if (matches.length > 0) {
    for (const match of matches) {
      const title = match[1]?.trim();
      const content = match[2]?.trim();
      if (title && content) sections.push({ title, content });
    }
    return sections;
  }
  
  const trimmedText = text.trim();
  if (trimmedText) return [{ title: "Oracle's Analysis", content: trimmedText }];
  return [];
};

const getIconForTitle = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('synergy') || lowerTitle.includes('similarities') || lowerTitle.includes('هم‌افزایی') || lowerTitle.includes('شباهت')) return <SynergyIcon />;
    if (lowerTitle.includes('friction') || lowerTitle.includes('differences') || lowerTitle.includes('اصطکاک') || lowerTitle.includes('تفاوت')) return <FrictionIcon />;
    if (lowerTitle.includes('dynamics') || lowerTitle.includes('growth') || lowerTitle.includes('پویایی') || lowerTitle.includes('رشد')) return <GrowthIcon />;
    return <OracleIcon />;
};

const AnalysisSection: React.FC<{ section: ParsedSection; index: number }> = ({ section, index }) => (
  <div className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
    <div className="flex items-center gap-4 mb-4 text-left rtl:text-right">
      <div className="w-10 h-10 text-sky-400 flex-shrink-0" aria-hidden="true">{getIconForTitle(section.title)}</div>
      <h4 className="font-display text-2xl accent-gradient-text">{section.title}</h4>
    </div>
    <div className="font-body text-gray-300 text-lg leading-relaxed space-y-3 text-left rtl:text-right">
      {section.content.split('\n').map((p, i) => p.trim() && <p key={i}>{p}</p>)}
    </div>
  </div>
);

const LoadingState: React.FC = () => (
    <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-8">
            <div className="flex flex-col items-center p-4">
                <SkeletonLoader className="w-16 h-16 rounded-full mb-2" />
                <SkeletonLoader className="w-32 h-8 mb-1" />
                <SkeletonLoader className="w-24 h-6" />
            </div>
            <div className="flex flex-col items-center p-4">
                <SkeletonLoader className="w-16 h-16 rounded-full mb-2" />
                <SkeletonLoader className="w-32 h-8 mb-1" />
                <SkeletonLoader className="w-24 h-6" />
            </div>
        </div>
        <div className="max-w-3xl mx-auto space-y-8">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                    <SkeletonLoader className="w-10 h-10 rounded-full flex-shrink-0" />
                    <div className="w-full">
                        <SkeletonLoader className="h-8 w-1/2 mb-4" />
                        <SkeletonLoader className="h-5 w-full mb-2" />
                        <SkeletonLoader className="h-5 w-11/12" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);


// --- Main Component ---
const ArchetypeComparison: React.FC<ArchetypeComparisonProps> = ({ dominantArchetype }) => {
  const { t, language } = useLanguage();
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [parsedComparison, setParsedComparison] = useState<ParsedSection[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = useCallback(async (archetype: Archetype) => {
    setSelectedArchetype(archetype);
    setIsLoading(true);
    setParsedComparison(null);
    try {
        const resultText = await generateArchetypeComparison(dominantArchetype, archetype, language);
        setParsedComparison(parseComparison(resultText));
    } catch (error) {
        console.error("Comparison fetch failed:", error);
        const errorMessage = error instanceof Error ? error.message : t('genericError_desc');
        setParsedComparison(parseComparison(`**${t('genericError_title')}**:\n${errorMessage}`));
    } finally {
        setIsLoading(false);
    }
  }, [dominantArchetype, language, t]);

  useEffect(() => {
    if (selectedArchetype) handleSelect(selectedArchetype);
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleReset = () => {
    setSelectedArchetype(null);
    setParsedComparison(null);
  };

  if (isLoading) {
    return <LoadingState />;
  }
  
  if (parsedComparison && selectedArchetype) {
    return (
      <div className="animate-scroll-unfurl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-8">
          <div className="flex flex-col items-center text-center p-4 rounded-lg">
            <div className="w-16 h-16 text-sky-300 mb-2"><GodIcon archetypeId={dominantArchetype.id} /></div>
            <h3 className="font-display text-2xl text-white">{t(dominantArchetype.name)}</h3>
            <p className="text-sky-400">{t(`${dominantArchetype.id}_domain`)}</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-lg">
            <div className="w-16 h-16 text-sky-300 mb-2"><GodIcon archetypeId={selectedArchetype.id} /></div>
            <h3 className="font-display text-2xl text-white">{t(selectedArchetype.name)}</h3>
            <p className="text-sky-400">{t(`${selectedArchetype.id}_domain`)}</p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {parsedComparison.map((section, index) => <AnalysisSection key={index} section={section} index={index} />)}
        </div>
        <div className="text-center mt-8">
          <button onClick={handleReset} className="font-display text-lg bg-transparent border-2 border-sky-400/80 text-sky-300 hover:bg-sky-400 hover:text-[#0a192f] rounded-lg px-8 py-2 transition-all duration-200 transform hover:scale-105 active:scale-95">
            {t('compareAnother')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in">
      <h3 className="font-display text-2xl accent-gradient-text mb-2 text-center">{t('mythicDyads')}</h3>
      <p className="text-center text-gray-400 mb-6">{t('selectToCompare')} {t(dominantArchetype.name)}.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
        {Object.values(DEITY_PROFILES).map((archetype) => (
          <button
            key={archetype.id}
            id={`archetype-card-${archetype.id}`}
            onClick={() => handleSelect(archetype)}
            disabled={archetype.id === dominantArchetype.id}
            className="group aspect-square flex flex-col items-center justify-center p-2 bg-black bg-opacity-20 rounded-lg border border-sky-400/20 hover:bg-sky-400/10 hover:border-sky-400 transition-all duration-200 transform hover:-translate-y-1 active:scale-95 active:translate-y-0 hover:shadow-lg hover:shadow-sky-500/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-black/20 disabled:hover:border-sky-400/20 disabled:hover:-translate-y-0"
          >
            <div className={`w-3/5 h-3/5 transition-colors duration-300 ${archetype.id === dominantArchetype.id ? 'text-sky-300' : 'text-gray-400 group-hover:text-sky-300'}`}>
              <GodIcon archetypeId={archetype.id} />
            </div>
            <h4 className={`font-display text-base text-center transition-colors duration-300 ${archetype.id === dominantArchetype.id ? 'accent-gradient-text' : 'text-gray-300 group-hover:accent-gradient-text'}`}>
              {t(archetype.name)}
            </h4>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArchetypeComparison;