import React, { useState } from 'react';
import { ArchetypeId, ModernEcho, MythicEvent, DeitySymbol, DeityInteractive } from '../types';
import { DEITY_PROFILES } from '../data/deityData';
import GodIcon from './GodIcon';
import { useLanguage } from '../contexts/LanguageContext';
import DomainSimulator from './deity/DomainSimulator';

type ActiveTab = 'mythos' | 'domains' | 'resonance';

interface ArchetypeProfileProps {
  profileId: string;
}

// --- SUB-COMPONENTS ---

const TabButton: React.FC<{ tabId: ActiveTab, label: string, activeTab: ActiveTab, setActiveTab: (tabId: ActiveTab) => void }> = ({ tabId, label, activeTab, setActiveTab }) => (
    <button
        onClick={() => setActiveTab(tabId)}
        className={`px-4 py-2 font-display rounded-t-lg transition-colors duration-200 text-lg ${activeTab === tabId ? 'bg-sky-900/50 text-sky-200 border-b-2 border-sky-300' : 'text-gray-400 hover:text-white'}`}
        role="tab"
        aria-selected={activeTab === tabId}
    >
        {label}
    </button>
);

const MythicConstellation: React.FC<{ events: MythicEvent[] }> = ({ events }) => {
    const { t } = useLanguage();
    if (events.length === 0) return null;

    return (
        <div className="relative mt-8 border-l-2 border-sky-400/20 ml-4 pl-8 space-y-10">
            {events.map((event, index) => (
                <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 150}ms`}}>
                    <div className="absolute -left-[42px] top-1 w-4 h-4 bg-sky-400 rounded-full border-2 border-gray-900 animate-pulse-glow" style={{ animationDelay: `${index * 200}ms`}}></div>
                    <h4 className="font-display text-xl text-white mt-1">{t(event.titleKey)}</h4>
                    <p className="text-gray-300 text-base mt-1">{t(event.descriptionKey)}</p>
                </div>
            ))}
        </div>
    );
};

const SymbolCard: React.FC<{ symbol: DeitySymbol }> = ({ symbol }) => {
    const { t } = useLanguage();
    // In a future version, a specific icon component could be used based on symbol.iconId
    return (
        <div className="bg-black/20 p-4 rounded-lg border border-sky-400/20">
            <h4 className="font-display text-lg text-sky-300">{t(symbol.titleKey)}</h4>
            <p className="mt-1 text-base text-gray-300">{t(symbol.descriptionKey)}</p>
        </div>
    );
};

const ModernEchoes: React.FC<{ echoes: ModernEcho[] }> = ({ echoes }) => {
    const { t } = useLanguage();
    if (echoes.length === 0) return null;

    return (
        <div className="mt-6 space-y-4">
            {echoes.map((echo, index) => (
                <div key={index} className="bg-black/20 p-4 rounded-lg border border-sky-400/20">
                    <p className="font-bold text-sky-300">"{t(echo.echoKey)}"</p>
                    <p className="text-base text-gray-300 mt-1">{t(echo.explanationKey)}</p>
                </div>
            ))}
        </div>
    );
};


// --- MAIN COMPONENT ---

const ArchetypeProfile: React.FC<ArchetypeProfileProps> = ({ profileId }) => {
  const profile = DEITY_PROFILES[profileId];
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<ActiveTab>('mythos');

  if (!profile) {
    return (
        <div className="w-full h-full flex items-center justify-center text-center p-4">
            <p className="font-display text-2xl text-red-400">Error: Profile not found.</p>
        </div>
    );
  }

  return (
    <div className="w-full h-full flex items-start justify-center p-4 animate-fade-in">
        <div className="w-full max-w-4xl animate-fade-in-scale-up">
            <main className="relative z-10 p-6 md:p-10 text-left rtl:text-right">
                <header className="flex flex-col md:flex-row items-center gap-6 mb-8 text-center md:text-left rtl:md:text-right">
                    <div className="w-28 h-28 text-sky-300 flex-shrink-0" style={{ filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.5))' }}>
                        <GodIcon archetypeId={profile.id} />
                    </div>
                    <div>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold accent-gradient-text animate-text-flicker-glow">{t(profile.name)}</h1>
                        <p className="font-body text-lg sm:text-xl text-gray-300 mt-1">{t(profile.domains.summaryKey)}</p>
                    </div>
                </header>

                <div className="border-b border-sky-400/20 flex space-x-2 rtl:space-x-reverse mb-6">
                    <TabButton tabId="mythos" label={t('profile_tab_mythos')} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton tabId="domains" label={t('profile_tab_domains')} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton tabId="resonance" label={t('profile_tab_resonance')} activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                <div className="font-body text-lg text-gray-300 leading-relaxed min-h-[300px]">
                    {activeTab === 'mythos' && (
                        <div role="tabpanel" className="animate-fade-in">
                            <p className="italic text-sky-200/80 mb-6">{t(profile.mythos.summaryKey)}</p>
                            <MythicConstellation events={profile.mythos.constellation} />
                        </div>
                    )}
                    {activeTab === 'domains' && (
                        <div role="tabpanel" className="animate-fade-in">
                           <h3 className="font-display text-xl text-sky-200">{t('deity_symbols')}</h3>
                           <div className="mt-4 space-y-4">
                                {profile.domains.symbols.map((symbol, i) => (
                                    <SymbolCard key={i} symbol={symbol} />
                                ))}
                           </div>
                           {profile.domains.interactives.length > 0 && (
                            <>
                                <div className="my-8 h-px bg-gradient-to-r from-transparent via-sky-600/30 to-transparent"></div>
                                {profile.domains.interactives.map((interactive, i) => (
                                    <div key={i}>
                                        <h3 className="font-display text-xl text-sky-200">{t(interactive.titleKey)}</h3>
                                        <p className="text-gray-400 text-base mb-4">{t(interactive.descriptionKey)}</p>
                                        <DomainSimulator interactiveId={interactive.interactiveId} />
                                    </div>
                                ))}
                            </>
                           )}
                        </div>
                    )}
                    {activeTab === 'resonance' && (
                         <div role="tabpanel" className="animate-fade-in">
                            <p className="italic text-sky-200/80 mb-6">{t(profile.resonance.summaryKey)}</p>
                             <h3 className="font-display text-xl text-sky-200">{t('deity_modern_echoes')}</h3>
                            <ModernEchoes echoes={profile.resonance.modernEchoes} />
                             <div className="my-8 h-px bg-gradient-to-r from-transparent via-sky-600/30 to-transparent"></div>
                            <h3 className="font-display text-xl text-sky-200">{t('deity_archetypal_mirror')}</h3>
                            <p className="mt-2 text-gray-300">{t(profile.resonance.archetypalMirrorKey)}</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    </div>
  );
};

export default ArchetypeProfile;