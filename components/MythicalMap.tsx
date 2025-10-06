import React from 'react';
import { DEITY_PROFILES } from '../data/deityData';
import GodIcon from './GodIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface MythicalMapProps {
  // FIX: Changed dominantArchetypeId to string to match Archetype.id type.
  dominantArchetypeId: string | null;
  onClose: () => void;
  onViewArchetype: (archetypeId: string) => void;
}

const ARCHETYPE_GROUPS = [
  {
    titleKey: 'map_group_primordials',
    archetypeIds: ['Chaos', 'Nyx', 'Eros', 'Tartarus', 'Gaia', 'Uranus'],
    colors: 'border-gray-400/30 text-gray-300',
  },
  {
    titleKey: 'map_group_titans',
    archetypeIds: ['Cronus', 'Rhea', 'Iapetus', 'Leto', 'Prometheus'],
    colors: 'border-indigo-400/30 text-indigo-300',
  },
  {
    titleKey: 'map_group_sovereigns',
    archetypeIds: ['Zeus', 'Hera', 'Poseidon', 'Hades'],
    colors: 'border-sky-400/30 text-sky-300',
  },
  {
    titleKey: 'map_group_strategists',
    archetypeIds: ['Athena', 'Apollo', 'Hephaestus', 'Hermes'],
    colors: 'border-blue-400/30 text-blue-300',
  },
  {
    titleKey: 'map_group_untamed',
    archetypeIds: ['Ares', 'Artemis', 'Dionysus', 'Aphrodite'],
    colors: 'border-green-400/30 text-green-300',
  },
  {
    titleKey: 'map_group_mystics',
    archetypeIds: ['Demeter', 'Persephone', 'Hestia'],
    colors: 'border-purple-400/30 text-purple-300',
  },
];

const MythicalMap: React.FC<MythicalMapProps> = ({ dominantArchetypeId, onClose, onViewArchetype }) => {
  const { t } = useLanguage();

  return (
    <div className="w-full h-full flex flex-col animate-fade-in">
        <header className="relative z-10 p-4 border-b border-sky-400/20 text-center flex-shrink-0 bg-[#0c1e3a]/50 backdrop-blur-sm">
          <h2 className="font-display text-3xl sm:text-4xl accent-gradient-text animate-text-flicker-glow">{t('mythicalMap')}</h2>
          <p className="text-gray-400 text-sm sm:text-base">{t('mapSubtitle_new')}</p>
        </header>

        <main className="relative z-10 flex-grow p-4 md:p-6 overflow-y-auto custom-scrollbar">
          {ARCHETYPE_GROUPS.map((group, groupIndex) => (
            <section key={group.titleKey} className="mb-10 last:mb-0">
              <h3 className={`font-display text-3xl sm:text-4xl text-center mb-6 ${group.colors}`}>
                {t(group.titleKey)}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                {group.archetypeIds.map((id, idIndex) => {
                  const archetype = DEITY_PROFILES[id];
                  if (!archetype) return null;
                  const isDominant = id === dominantArchetypeId;
                  return (
                    <button
                      key={id}
                      onClick={() => onViewArchetype(id)}
                      className={`group aspect-w-1 aspect-h-1 flex flex-col items-center justify-center p-4 text-center bg-black/20 backdrop-blur-sm rounded-lg border-2 transition-all duration-300 transform hover:-translate-y-1.5 active:scale-95 hover:shadow-2xl hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0c1e3a] animate-fade-in ${
                        isDominant
                          ? 'border-sky-300 shadow-xl shadow-sky-500/20 hover:shadow-sky-500/30 animate-pulse-glow'
                          : `${group.colors.replace('text-', 'border-')} hover:border-white/80 hover:shadow-white/10`
                      }`}
                      style={{ animationDelay: `${groupIndex * 150 + idIndex * 50}ms` }}
                    >
                      <div className={`w-1/2 h-1/2 mb-3 transition-colors duration-300 ${isDominant ? 'text-sky-300' : 'text-gray-400 group-hover:text-white'}`}>
                        <GodIcon archetypeId={id} />
                      </div>
                      <h4 className={`font-display text-xl md:text-2xl transition-colors duration-300 ${isDominant ? 'accent-gradient-text' : 'text-white'}`}>
                        {t(archetype.name)}
                      </h4>
                      <p className={`font-body text-xs md:text-sm mt-1 transition-colors duration-300 ${isDominant ? 'text-sky-300/80' : 'text-gray-400 group-hover:text-gray-200'}`}>
                        {t(`${archetype.id}_domain`)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
    </div>
  );
};

export default MythicalMap;