import React, { useState, useMemo, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PSYCHOLOGY_SCHOOLS, PSYCHOLOGISTS } from '../../data/psychologyData';
import { PsychologyCategory, Result, Psychologist } from '../../types';
import SchoolIcon from './SchoolIcon';

interface SchoolListProps {
  result: Result | null;
  onSelectSchool: (schoolId: string) => void;
}

const categories: PsychologyCategory[] = ['Psychodynamic', 'Cognitive-Behavioral', 'Humanistic-Existential', 'Trauma-Body-Neuroscience', 'Family-Systems', 'Positive-Cultural'];

const RecommendationChip: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 z-10 flex items-center gap-1 bg-sky-500/20 backdrop-blur-sm text-sky-200 text-xs font-bold px-2 py-1 rounded-full border border-sky-400/30">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
      <span>{t('psych_recommended')}</span>
    </div>
  );
};

const SchoolList: React.FC<SchoolListProps> = ({ result, onSelectSchool }) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<PsychologyCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const calculateRelevance = useCallback((psychologist: Psychologist): number => {
    if (!result) return 0;
    
    let score = 0;
    const tags = psychologist.relevanceTags || [];

    // FIX: Cast `result.dominantArchetype.id` to `any` to satisfy `includes` type check, as its type `string` is too broad for the expected union of string literals.
    if (tags.includes(result.dominantArchetype.id as any)) score += 5;
    if (tags.includes(result.mbtiType as any)) score += 3;
    if (tags.includes('archetype_focus')) score += 2;
    if (tags.includes(result.mbtiType[0] as any)) score += 1; // E/I
    if (tags.includes(result.mbtiType[1] as any)) score += 1; // S/N
    if (tags.includes(result.mbtiType[2] as any)) score += 1; // T/F
    if (tags.includes(result.mbtiType[3] as any)) score += 1; // J/P

    return score;
  }, [result]);

  const sortedSchools = useMemo(() => {
    const schools = Object.values(PSYCHOLOGY_SCHOOLS).filter(school => {
        const categoryMatch = activeFilter === 'All' || school.category === activeFilter;
        if (!categoryMatch) return false;
        if (searchTerm.trim() === '') return true;
        
        const lowercasedSearch = searchTerm.toLowerCase();
        const nameMatch = t(school.name).toLowerCase().includes(lowercasedSearch);
        const descMatch = t(school.description).toLowerCase().includes(lowercasedSearch);
        return nameMatch || descMatch;
    });

    return schools.map(school => {
        const relevance = school.psychologistIds.reduce((sum, psychId) => sum + calculateRelevance(PSYCHOLOGISTS[psychId]), 0);
        return { ...school, relevance };
    }).sort((a, b) => b.relevance - a.relevance);

  }, [activeFilter, searchTerm, t, calculateRelevance]);

  const recommendedSchools = sortedSchools.filter(s => s.relevance > 0).slice(0, 3);
  const otherSchools = sortedSchools.filter(s => !recommendedSchools.some(r => r.id === s.id));

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 sm:p-6 sticky top-0 bg-[#0c1e3a]/80 backdrop-blur-md z-10 border-b border-sky-400/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-center font-body text-lg text-gray-300 mb-4">{t('psych_list_subtitle')}</p>
          <div className="max-w-md mx-auto mb-4">
             <input
              type="search"
              placeholder={t('psych_search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 font-body bg-black/30 border-2 border-sky-400/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
            />
          </div>
          <div className="flex justify-center flex-wrap gap-2">
            <button 
              onClick={() => setActiveFilter('All')} 
              className={`px-4 py-1.5 font-display text-sm sm:text-base rounded-full border-2 transition-colors duration-300 ${activeFilter === 'All' ? 'bg-sky-400 text-black border-sky-400' : 'bg-black/20 border-sky-400/30 text-sky-300 hover:bg-sky-400/10'}`}
            >
              {t('psych_cat_all')}
            </button>
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 font-display text-sm sm:text-base rounded-full border-2 transition-colors duration-300 ${activeFilter === cat ? 'bg-sky-400 text-black border-sky-400' : 'bg-black/20 border-sky-400/30 text-sky-300 hover:bg-sky-400/10'}`}
              >
                {t(`psych_cat_${cat.toLowerCase().replace(/-/g, '_')}`)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-8 flex-grow">
        <div className="max-w-5xl mx-auto">
          {result && recommendedSchools.length > 0 && (
            <section className="mb-12">
              <h2 className="font-display text-3xl accent-gradient-text text-center mb-8">{t('psych_recommended_for_you')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedSchools.map((school, index) => (
                  <div key={school.id} className="animate-fade-in-scale-up" style={{ animationDelay: `${index * 100}ms`}}>
                    <div className="relative group h-full flex flex-col bg-black/30 backdrop-blur-sm border-2 border-sky-300 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-sky-400/30 hover:-translate-y-2">
                       <RecommendationChip />
                       <div className="p-6 border-b-2 border-sky-300/30 text-center flex flex-col items-center">
                        <div className="w-16 h-16 text-sky-300 mb-4 transition-transform duration-300 group-hover:scale-110"><SchoolIcon schoolId={school.id} /></div>
                        <h2 className="font-display text-2xl text-white group-hover:accent-gradient-text transition-colors duration-300">{t(school.name)}</h2>
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <p className="text-gray-300 flex-grow">{t(school.description)}</p>
                        <button onClick={() => onSelectSchool(school.id)} className="mt-6 w-full font-display text-lg bg-sky-400/20 border-2 border-sky-400/50 text-sky-200 rounded-lg px-6 py-2 transition-all duration-300 transform hover:bg-sky-400 hover:text-black hover:scale-105 active:scale-95">{t('psych_learn_more')}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {otherSchools.length > 0 && (
             <section>
                {result && recommendedSchools.length > 0 && <h2 className="font-display text-2xl text-gray-400 text-center mb-8 border-t border-sky-400/10 pt-8">{t('psych_all_schools')}</h2>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherSchools.map((school, index) => (
                    <div key={school.id} className="animate-fade-in-scale-up" style={{ animationDelay: `${(recommendedSchools.length + index) * 50}ms`}}>
                      <div className="group h-full flex flex-col bg-black/30 backdrop-blur-sm border-2 border-sky-400/20 rounded-xl overflow-hidden transition-all duration-300 hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-500/20 hover:-translate-y-2">
                        <div className="p-6 border-b-2 border-sky-400/20 text-center flex flex-col items-center">
                          <div className="w-16 h-16 text-sky-400 mb-4 transition-transform duration-300 group-hover:scale-110"><SchoolIcon schoolId={school.id} /></div>
                          <h2 className="font-display text-2xl text-white group-hover:accent-gradient-text transition-colors duration-300">{t(school.name)}</h2>
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                          <p className="text-gray-300 flex-grow">{t(school.description)}</p>
                          <button onClick={() => onSelectSchool(school.id)} className="mt-6 w-full font-display text-lg bg-transparent border-2 border-sky-400/50 text-sky-300 rounded-lg px-6 py-2 transition-all duration-300 transform hover:bg-sky-400 hover:text-black hover:scale-105 active:scale-95">{t('psych_learn_more')}</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             </section>
          )}

          {sortedSchools.length === 0 && (
             <div className="text-center py-16 animate-fade-in">
              <p className="font-display text-2xl text-gray-400">{t('psych_no_results')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolList;