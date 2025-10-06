import React from 'react';
import { Result, OceanScores, MMPIScores, SCL90Scores, BDIScores, BAIScores, EQIScores, EQIComposite } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import GodIcon from '../GodIcon';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: Result | null;
  bigFiveScores: OceanScores | null;
  mmpiScores: MMPIScores | null;
  scl90Scores: SCL90Scores | null;
  bdiScores: BDIScores | null;
  baiScores: BAIScores | null;
  eqiScores: EQIScores | null;
}

const Section: React.FC<{ title: string; children: React.ReactNode; isCompleted: boolean }> = ({ title, children, isCompleted }) => {
    const { t } = useLanguage();
    return (
        <div className="p-4 bg-black/20 rounded-lg border border-sky-400/20">
            <h3 className="font-display text-xl accent-gradient-text mb-3">{title}</h3>
            {isCompleted ? children : <p className="text-gray-400 italic">{t('psych_dossier_not_completed')}</p>}
        </div>
    );
};

const DossierModal: React.FC<DossierModalProps> = ({ isOpen, onClose, result, bigFiveScores, mmpiScores, scl90Scores, bdiScores, baiScores, eqiScores }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-title"
    >
      <div
        className="bg-gradient-to-br from-[#0a192f] via-[#0c1e3a] to-[#102444] border-2 border-sky-400/30 rounded-lg shadow-2xl shadow-sky-500/10 w-full max-w-2xl animate-fade-in-scale-up max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 border-b border-sky-400/20 text-center">
            <h2 id="dossier-title" className="font-display text-3xl accent-gradient-text">{t('psych_dossier_title')}</h2>
        </header>
        
        <main className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
            <Section title={t('psych_dossier_mythos')} isCompleted={!!result}>
                {result && (
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 text-sky-300 flex-shrink-0"><GodIcon archetypeId={result.dominantArchetype.id} /></div>
                        <div>
                            <p className="font-bold text-white">{t(result.dominantArchetype.name)}</p>
                            <p className="font-mono text-2xl text-sky-300">{result.mbtiType}</p>
                        </div>
                    </div>
                )}
            </Section>
            
            <Section title={t('psych_dossier_five_factor')} isCompleted={!!bigFiveScores}>
               {bigFiveScores && (
                    <ul>{Object.entries(bigFiveScores).map(([key, value]) => <li key={key} className="text-gray-300">{t(`ocean_${key.toLowerCase()}`)}: <span className="font-mono text-white">{value}</span></li>)}</ul>
                )}
            </Section>

            <Section title={t('psych_dossier_alchemical')} isCompleted={!!mmpiScores}>
               {mmpiScores && (
                    <ul>{Object.entries(mmpiScores).map(([key, value]) => (value as number) >= 5 && <li key={key} className="text-amber-300">{t(`mmpi_scale_${key.toLowerCase()}`)}: <span className="font-mono text-white">{value}/7</span></li>)}</ul>
                )}
            </Section>

            <Section title={t('psych_dossier_nebula')} isCompleted={!!scl90Scores}>
               {scl90Scores && (
                    <ul>{Object.entries(scl90Scores.dimensions).map(([key, value]) => (value as number) >= 1.0 && <li key={key} className="text-purple-300">{t(`scl90_dim_${key.toLowerCase()}`)}: <span className="font-mono text-white">{(value as number).toFixed(2)}</span></li>)}</ul>
                )}
            </Section>
            
            <Section title={t('psych_dossier_wellspring')} isCompleted={!!bdiScores}>
               {bdiScores && <p className="text-gray-300">{t('bdi_your_score')}: <span className="font-mono text-white">{bdiScores.score}</span> ({t(`bdi_level_${bdiScores.level}`)})</p>}
            </Section>

            <Section title={t('psych_dossier_tremors')} isCompleted={!!baiScores}>
               {baiScores && <p className="text-gray-300">{t('bai_your_score')}: <span className="font-mono text-white">{baiScores.score}</span> ({t(`bai_level_${baiScores.level}`)})</p>}
            </Section>

            <Section title={t('psych_dossier_aura')} isCompleted={!!eqiScores}>
               {eqiScores && (
                    <div>
                        <p className="text-gray-300">{t('eqi_your_score')}: <span className="font-mono text-white">{eqiScores.total}</span> ({t(`eqi_level_${eqiScores.level}`)})</p>
                        <ul className="mt-2 text-sm">{Object.entries(eqiScores.composites).map(([key, value]) => <li key={key} className="text-gray-400">{t(`eqi_composite_${key as EQIComposite}`).split('(')[0]}: <span className="font-mono text-gray-200">{value}</span></li>)}</ul>
                    </div>
                )}
            </Section>
        </main>
        
        <footer className="p-4 border-t border-sky-400/20 text-center">
            <button onClick={onClose} className="font-display text-lg bg-sky-500 hover:bg-sky-400 text-black rounded-lg px-8 py-2 transition-colors">{t('close')}</button>
        </footer>
      </div>
    </div>
  );
};

export default DossierModal;