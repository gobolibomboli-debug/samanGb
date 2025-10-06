import React, { useCallback, useMemo, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PSYCHOLOGY_SCHOOLS, PSYCHOLOGISTS } from '../../data/psychologyData';
import { Result, Psychologist, TimelineEvent, KeyConcept, LegacyInYourLifeExample } from '../../types';
import PsychologistImage from './PsychologistImage';
import ConceptSimulator from './ConceptSimulator';

type ActiveTab = 'bio' | 'concepts' | 'legacy';

interface PsychologistWithRelevance extends Psychologist {
    relevance: number;
    reason: string | null;
}

interface SchoolDetailProps {
  schoolId: string;
  result: Result | null;
  onSelectPsychologist: (psychologistId: string, initialQuestion?: string) => void;
}


// --- SUB-COMPONENTS for the new design ---

const QuoteBlock: React.FC<{ quote: string; source: string; }> = ({ quote, source }) => (
  <div className="my-6 py-4 border-l-4 border-sky-400/70 pl-4 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-4">
    <blockquote className="font-display text-lg italic text-sky-200/90 leading-relaxed">
      "{quote}"
    </blockquote>
    <cite className="block text-right rtl:text-left mt-2 font-body text-sm text-gray-400 not-italic">— {source}</cite>
  </div>
);

const ConceptCard: React.FC<{ concept: KeyConcept }> = ({ concept }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-black/20 p-4 rounded-lg border border-sky-400/20">
            <h4 className="font-display text-lg text-sky-300">{t(concept.titleKey)}</h4>
            <p className="mt-1 text-sm text-gray-300">{t(concept.descriptionKey)}</p>
        </div>
    );
};

const Timeline: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
    const { t } = useLanguage();
    if (events.length === 0) return null;

    return (
        <div className="relative mt-8 border-l-2 border-sky-400/20 ml-4 pl-8 space-y-10">
            {events.map((event, index) => (
                <div key={index} className="relative">
                    <div className="absolute -left-[42px] top-1 w-4 h-4 bg-sky-400 rounded-full border-2 border-gray-900"></div>
                    <p className="font-mono text-lg text-sky-300">{event.year}</p>
                    <h4 className="font-display text-xl text-white mt-1">{t(event.eventKey)}</h4>
                    <p className="text-gray-400 text-sm mt-1">{t(event.descriptionKey)}</p>
                </div>
            ))}
        </div>
    );
};

const InYourLifeSection: React.FC<{ examples: LegacyInYourLifeExample[] }> = ({ examples }) => {
    const { t } = useLanguage();
    if (examples.length === 0) return null;

    return (
        <div className="mt-8 space-y-4">
            {examples.map((ex, index) => (
                <div key={index} className="bg-black/20 p-4 rounded-lg border border-sky-400/20">
                    <p className="font-bold text-sky-300">"{t(ex.exampleKey)}"</p>
                    <p className="text-sm text-gray-300 mt-1">{t(ex.explanationKey)}</p>
                </div>
            ))}
        </div>
    );
};

// --- MAIN COMPONENT ---

const SchoolDetail: React.FC<SchoolDetailProps> = ({ schoolId, result, onSelectPsychologist }) => {
  const { t } = useLanguage();
  const [selectedPsychologistId, setSelectedPsychologistId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('bio');

  const school = PSYCHOLOGY_SCHOOLS[schoolId];

  const calculateRelevance = useCallback((psychologist: Psychologist): [number, string | null] => {
    if (!result) return [0, null];
    
    let score = 0;
    let reasonKey: string | null = null;
    const tags = psychologist.relevanceTags || [];

    if (tags.includes(result.dominantArchetype.id as any)) {
        score += 5;
        reasonKey = 'psych_match_archetype';
    }
    if (tags.includes(result.mbtiType as any)) {
        score += 3;
        if (!reasonKey) reasonKey = 'psych_match_mbti';
    }
    
    const mbtiLetters = result.mbtiType.split('');
    if (tags.includes(mbtiLetters[2] as any)) { score += 2; if (!reasonKey) reasonKey = `psych_match_${mbtiLetters[2]}`; }
    if (tags.includes(mbtiLetters[1] as any)) { score += 2; if (!reasonKey) reasonKey = `psych_match_${mbtiLetters[1]}`; }
    if (tags.includes('archetype_focus')) { score += 2; if (!reasonKey) reasonKey = 'psych_match_archetype_focus'; }

    return [score, reasonKey];
  }, [result]);

  const sortedPsychologists = useMemo((): PsychologistWithRelevance[] => {
    if (!school) return [];
    return school.psychologistIds.map(id => {
        const psychologist = PSYCHOLOGISTS[id];
        const [relevance, reason] = calculateRelevance(psychologist);
        return { ...psychologist, relevance, reason };
    }).sort((a, b) => b.relevance - a.relevance);
  }, [school, calculateRelevance]);
  
  const selectedPsychologist = useMemo(() => {
    return sortedPsychologists.find(p => p.id === selectedPsychologistId) || null;
  }, [selectedPsychologistId, sortedPsychologists]);

  const suggestedQuestions = useMemo(() => {
      if (!result || !selectedPsychologist) return [];
      const questions: string[] = [];
      const addTranslatedQuestion = (key: string, ...args: any[]) => {
          const translatedText = t(key, ...args);
          if (translatedText !== key && !questions.includes(translatedText)) questions.push(translatedText);
      };
      
      const shadowArchetype = result.archetypeDistribution[result.archetypeDistribution.length - 1].archetype;
      addTranslatedQuestion(`psych_question_general_1`);
      addTranslatedQuestion(`psych_question_general_3`, t(result.dominantArchetype.name));
      addTranslatedQuestion(`psych_question_general_2`, t(shadowArchetype.name));
      const specificQuestionKey = `psych_question_specific_${selectedPsychologist.id}`;
      if (t(specificQuestionKey) !== specificQuestionKey) {
          addTranslatedQuestion(specificQuestionKey);
      }
      
      return questions.slice(0, 3);
  }, [selectedPsychologist, result, t]);

  if (!school) return null;

  const handleSelect = (id: string) => {
    setSelectedPsychologistId(id);
    setActiveTab('bio'); // Reset to bio tab on new selection
  };

  const handleBack = () => {
    setSelectedPsychologistId(null);
  };
  
  const PsychologistCard: React.FC<{psychologist: PsychologistWithRelevance}> = ({ psychologist }) => {
    const isRecommended = psychologist.relevance > 0;
    return (
      <button 
        onClick={() => handleSelect(psychologist.id)}
        className="group relative aspect-[3/4] w-full flex flex-col items-center justify-end text-center p-4 bg-black/40 rounded-xl overflow-hidden border-2 border-sky-400/20 transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-400/20"
      >
        <PsychologistImage 
          psychologistId={psychologist.id} 
          alt={t(psychologist.name)} 
          className="absolute inset-0 w-full h-full object-cover object-top opacity-50 group-hover:opacity-80 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        {isRecommended && (
          <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto z-10 flex items-center gap-1 bg-sky-500/20 text-sky-200 text-xs font-bold px-2 py-1 rounded-full border border-sky-400/30">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            <span>{t('psych_recommended')}</span>
          </div>
        )}
        <div className="relative z-10">
          <h4 className="font-display text-xl text-white group-hover:accent-gradient-text">{t(psychologist.name)}</h4>
        </div>
      </button>
    );
  };

  const TabButton: React.FC<{ tabId: ActiveTab, label: string }> = ({ tabId, label }) => (
      <button
          onClick={() => setActiveTab(tabId)}
          className={`px-4 py-2 font-display rounded-t-lg transition-colors duration-200 ${activeTab === tabId ? 'bg-sky-900/50 text-sky-200 border-b-2 border-sky-300' : 'text-gray-400 hover:text-white'}`}
      >
          {label}
      </button>
  );

  return (
    <div className="p-4 sm:p-8 text-gray-200 animate-fade-in">
      <div className="max-w-6xl mx-auto relative min-h-[600px]">
        {/* Gallery View */}
        <div className={`transition-opacity duration-500 ease-in-out ${selectedPsychologist ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <header className="text-center mb-10">
            <h1 className="font-display text-4xl sm:text-5xl accent-gradient-text mb-2">{t(school.name)}</h1>
            <p className="font-body text-lg text-gray-400 max-w-2xl mx-auto">{t(school.longDescription)}</p>
          </header>
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-sky-600/30 to-transparent"></div>
          <h2 className="font-display text-3xl text-center accent-gradient-text mb-8">{t('psych_select_a_guide')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {sortedPsychologists.map(p => <PsychologistCard key={p.id} psychologist={p} />)}
          </div>
        </div>

        {/* Detail/Consultation Panel View */}
        {selectedPsychologist && (
          <div className="absolute inset-0 flex flex-col animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Portrait & Details */}
              <div className="lg:col-span-1 flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-sky-400/40 shadow-2xl shadow-sky-400/20">
                    <PsychologistImage psychologistId={selectedPsychologist.id} alt={t(selectedPsychologist.name)} className="w-full h-full" />
                  </div>
                  <h2 className="font-display text-4xl accent-gradient-text mt-4">{t(selectedPsychologist.name)}</h2>
                  <div className="my-4 h-px w-2/3 bg-gradient-to-r from-transparent via-sky-600/30 to-transparent"></div>
                  <QuoteBlock quote={t(selectedPsychologist.quoteKey)} source={t(selectedPsychologist.name)} />
              </div>

              {/* Right Column: Interactive Content & Actions */}
              <div className="lg:col-span-2 flex flex-col animate-fade-in" style={{ animationDelay: '250ms' }}>
                  {/* Tabs */}
                  <div className="border-b border-sky-400/20 flex space-x-2 rtl:space-x-reverse">
                      <TabButton tabId="bio" label={t('psych_tab_bio')} />
                      <TabButton tabId="concepts" label={t('psych_tab_concepts')} />
                      <TabButton tabId="legacy" label={t('psych_tab_legacy')} />
                  </div>
                  
                  {/* Tab Content */}
                  <div className="py-6 flex-grow min-h-[250px] font-body text-base leading-relaxed">
                      {activeTab === 'bio' && (
                          <div className="animate-fade-in">
                              <p>{t(selectedPsychologist.biography.summaryKey)}</p>
                              <Timeline events={selectedPsychologist.biography.timeline} />
                          </div>
                      )}
                      {activeTab === 'concepts' && (
                          <div className="animate-fade-in space-y-4">
                              {selectedPsychologist.concepts.map((concept, i) =>
                                  concept.type === 'text' ? (
                                      <ConceptCard key={i} concept={concept} />
                                  ) : (
                                      <div key={i}>
                                          <h4 className="font-display text-lg text-sky-300">{t(concept.titleKey)}</h4>
                                          <p className="mt-1 text-sm text-gray-300 mb-2">{t(concept.descriptionKey)}</p>
                                          {concept.interactiveId && <ConceptSimulator interactiveId={concept.interactiveId} />}
                                      </div>
                                  )
                              )}
                          </div>
                      )}
                      {activeTab === 'legacy' && (
                          <div className="animate-fade-in">
                              <p>{t(selectedPsychologist.legacy.summaryKey)}</p>
                              <h4 className="font-display text-xl text-sky-200 mt-6">{t('psych_legacy_in_your_life')}</h4>
                              <InYourLifeSection examples={selectedPsychologist.legacy.inYourLife} />
                          </div>
                      )}
                  </div>
                  
                  {/* Suggested Questions & CTA */}
                  <div className="mt-auto pt-6 border-t border-sky-400/20">
                      <div className="bg-black/30 p-4 rounded-lg border border-sky-400/20">
                          <h3 className="font-display text-xl text-sky-200 mb-2">{t('psych_suggested_questions_for', t(selectedPsychologist.name))}</h3>
                          <div className="space-y-2 font-body text-base">
                              {suggestedQuestions.map((q, i) => (
                                <button key={i} onClick={() => onSelectPsychologist(selectedPsychologist.id, q)} className="block w-full text-left rtl:text-right p-2 rounded-md hover:bg-sky-900/50 transition-colors">
                                  "{q}"
                                </button>
                              ))}
                          </div>
                      </div>
                      <button 
                          onClick={() => onSelectPsychologist(selectedPsychologist.id)}
                          className="mt-6 w-full font-display text-xl bg-sky-500 hover:bg-sky-400 text-black rounded-lg px-6 py-4 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/20"
                      >
                          {t('psych_consult_with', t(selectedPsychologist.name))}
                      </button>
                  </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <button onClick={handleBack} className="font-display text-lg text-gray-400 hover:text-white transition-colors flex items-center gap-2 mx-auto">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                {t('psych_back_to_gallery')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolDetail;