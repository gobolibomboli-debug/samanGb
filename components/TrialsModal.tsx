import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { AppView, OceanScores, MMPIScores, Result, SCL90Scores, BDIScores, BAIScores, EQIScores } from '../types';

interface TrialsModalProps {
  result: Result | null;
  bigFiveScores: OceanScores | null;
  mmpiScores: MMPIScores | null;
  scl90Scores: SCL90Scores | null;
  bdiScores: BDIScores | null;
  baiScores: BAIScores | null;
  eqiScores: EQIScores | null;
  onTakeTest: (test: 'bigfive' | 'mmpi' | 'scl90' | 'bdi' | 'bai' | 'eqi') => void;
  onRestart: () => void;
  onNavigate: (view: AppView, context?: any) => void;
}

const OracleIcon: React.FC<{ testId: string }> = ({ testId }) => {
    const iconMap: Record<string, React.ReactNode> = {
        mythos: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /><circle cx="12" cy="12" r="8" /></svg>,
        bigfive: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.35 7.16h7.53l-6.09 4.42 2.35 7.17L12 16.33l-6.14 4.42 2.35-7.17-6.09-4.42h7.53L12 2z" /></svg>,
        mmpi: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 00-3.46 19.3M12 22a10 10 0 003.46-19.3" /><path d="M2 12h20" /><path d="M12 2v20" /></svg>,
        scl90: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 100 18 9 9 0 000-18z" /><path d="M17.61 8.23a5.5 5.5 0 00-9.85 2.27" /></svg>,
        bdi: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L12 12l6 6" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12V3" /></svg>,
        bai: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h1.5M19.5 12H21M12 3v1.5M12 19.5V21" /><path d="M8.7 15.3a4.6 4.6 0 010-6.6M15.3 15.3a4.6 4.6 0 000-6.6" /></svg>,
        eqi: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>,
    };
    return <div className="w-full h-full">{iconMap[testId] || null}</div>;
};

const OracleCard: React.FC<{
  title: string; question: string; resultText: string;
  isCompleted: boolean; onClick: () => void;
  buttonText: string; testId: string;
}> = ({ title, question, resultText, isCompleted, onClick, buttonText, testId }) => {
  const { t } = useLanguage();
  return (
    <div className="group relative w-full h-full flex flex-col bg-black/30 backdrop-blur-sm border-2 border-sky-400/20 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-sky-400/30 hover:-translate-y-2">
      {isCompleted && (
        <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 z-10 flex items-center gap-1 bg-green-500/20 text-green-200 text-xs font-bold px-2 py-1 rounded-full border border-green-400/30">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
          <span>{t('completed')}</span>
        </div>
      )}
      <div className="p-6 border-b-2 border-sky-400/20 text-center flex flex-col items-center">
        <div className="w-16 h-16 text-sky-300 mb-4 transition-transform duration-300 group-hover:scale-110"><OracleIcon testId={testId} /></div>
        <h2 className="font-display text-2xl text-white group-hover:accent-gradient-text transition-colors duration-300">{title}</h2>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <p className="font-display text-lg text-sky-200/90 italic">"{question}"</p>
        <p className="text-gray-300 mt-2 flex-grow">{resultText}</p>
        <button onClick={onClick} className="mt-6 w-full font-display text-lg bg-sky-400/20 border-2 border-sky-400/50 text-sky-200 rounded-lg px-6 py-2 transition-all duration-300 transform hover:bg-sky-400 hover:text-black hover:scale-105 active:scale-95">{buttonText}</button>
      </div>
    </div>
  );
};

const PsycheConstellation: React.FC<{
  personalityComplete: boolean; mindComplete: boolean; wellbeingComplete: boolean;
}> = ({ personalityComplete, mindComplete, wellbeingComplete }) => {
    const { t } = useLanguage();
    const [tooltip, setTooltip] = useState<{ text: string; angle: number } | null>(null);

    const handleHover = (textKey: string, angle: number) => {
        setTooltip({ text: t(textKey), angle });
    };

    return (
        <div className="relative w-full max-w-sm mx-auto aspect-square flex items-center justify-center mb-12">
            <svg viewBox="0 0 100 100" className="w-full h-full absolute">
                <defs>
                    <filter id="glow-filter"><feGaussianBlur stdDeviation="1.5" /></filter>
                </defs>
                {/* Personality Arc */}
                <path d="M 10 50 A 40 40 0 0 1 70 14.6" strokeWidth="2" fill="none" onMouseEnter={() => handleHover(personalityComplete ? 'constellation_tooltip_personality' : 'constellation_tooltip_personality_incomplete', 60)} onMouseLeave={() => setTooltip(null)} className={`transition-all duration-500 cursor-pointer ${personalityComplete ? 'stroke-sky-300' : 'stroke-sky-600/30'}`} style={personalityComplete ? { filter: 'url(#glow-filter)' } : {}} />
                {/* Mind Arc */}
                <path d="M 70 14.6 A 40 40 0 0 1 70 85.4" strokeWidth="2" fill="none" onMouseEnter={() => handleHover(mindComplete ? 'constellation_tooltip_mind' : 'constellation_tooltip_mind_incomplete', 180)} onMouseLeave={() => setTooltip(null)} className={`transition-all duration-500 cursor-pointer ${mindComplete ? 'stroke-sky-300' : 'stroke-sky-600/30'}`} style={mindComplete ? { filter: 'url(#glow-filter)' } : {}} />
                {/* Wellbeing Arc */}
                <path d="M 70 85.4 A 40 40 0 0 1 10 50" strokeWidth="2" fill="none" onMouseEnter={() => handleHover(wellbeingComplete ? 'constellation_tooltip_wellbeing' : 'constellation_tooltip_wellbeing_incomplete', -60)} onMouseLeave={() => setTooltip(null)} className={`transition-all duration-500 cursor-pointer ${wellbeingComplete ? 'stroke-sky-300' : 'stroke-sky-600/30'}`} style={wellbeingComplete ? { filter: 'url(#glow-filter)' } : {}} />
            </svg>
            <div className="w-4/5 h-4/5 border-2 border-sky-400/10 rounded-full" />
            
            {tooltip && (
                <div className={`absolute p-3 text-center text-sm bg-gray-900/80 border border-sky-400/30 rounded-lg shadow-lg max-w-[180px] transition-opacity duration-300 ${tooltip ? 'opacity-100' : 'opacity-0'}`} style={{ transform: `rotate(${tooltip.angle}deg) translate(80px) rotate(-${tooltip.angle}deg)` }}>
                    {tooltip.text}
                </div>
            )}
        </div>
    );
};

const TrialsModal: React.FC<TrialsModalProps> = ({ result, bigFiveScores, mmpiScores, scl90Scores, bdiScores, baiScores, eqiScores, onTakeTest, onRestart, onNavigate }) => {
  const { t } = useLanguage();

  const personalityComplete = !!result && !!bigFiveScores;
  const mindComplete = !!mmpiScores && !!scl90Scores && !!bdiScores && !!baiScores;
  const wellbeingComplete = !!eqiScores;

  const assessments = {
    personality: [
      { id: 'mythos', title: t('trials_mythos_title'), question: t('oracles_mythos_q'), resultText: t('oracles_mythos_r'), isCompleted: !!result, onClick: onRestart, buttonText: t('trials_mythos_button') },
      { id: 'bigfive', title: t('trials_five_factor_title'), question: t('oracles_bigfive_q'), resultText: t('oracles_bigfive_r'), isCompleted: !!bigFiveScores, onClick: () => bigFiveScores ? onNavigate('five_factor_result') : onTakeTest('bigfive'), buttonText: bigFiveScores ? t('trials_five_factor_button_view') : t('trials_five_factor_button_take') },
    ],
    mind: [
      { id: 'mmpi', title: t('trials_alchemical_title'), question: t('oracles_mmpi_q'), resultText: t('oracles_mmpi_r'), isCompleted: !!mmpiScores, onClick: () => mmpiScores ? onNavigate('mmpi_result') : onTakeTest('mmpi'), buttonText: mmpiScores ? t('trials_alchemical_button_view') : t('trials_alchemical_button_take') },
      { id: 'scl90', title: t('trials_scl90_title'), question: t('oracles_scl90_q'), resultText: t('oracles_scl90_r'), isCompleted: !!scl90Scores, onClick: () => scl90Scores ? onNavigate('scl90_result') : onTakeTest('scl90'), buttonText: scl90Scores ? t('trials_scl90_button_view') : t('trials_scl90_button_take') },
      { id: 'bdi', title: t('trials_bdi_title'), question: t('oracles_bdi_q'), resultText: t('oracles_bdi_r'), isCompleted: !!bdiScores, onClick: () => bdiScores ? onNavigate('bdi_result') : onTakeTest('bdi'), buttonText: bdiScores ? t('bdi_button_view') : t('bdi_button_take') },
      { id: 'bai', title: t('trials_bai_title'), question: t('oracles_bai_q'), resultText: t('oracles_bai_r'), isCompleted: !!baiScores, onClick: () => baiScores ? onNavigate('bai_result') : onTakeTest('bai'), buttonText: baiScores ? t('bai_button_view') : t('bai_button_take') },
    ],
    wellbeing: [
       { id: 'eqi', title: t('trials_eqi_title'), question: t('oracles_eqi_q'), resultText: t('oracles_eqi_r'), isCompleted: !!eqiScores, onClick: () => eqiScores ? onNavigate('eqi_result') : onTakeTest('eqi'), buttonText: eqiScores ? t('trials_eqi_button_view') : t('trials_eqi_button_take') },
    ]
  };

  return (
    <div className="w-full h-full flex items-start justify-center p-4 animate-fade-in">
        <div className="w-full max-w-7xl animate-fade-in-scale-up">
            <header className="text-center mt-6 mb-8">
                <h2 className="font-display text-4xl sm:text-5xl accent-gradient-text">{t('oracles_chamber_title')}</h2>
                <p className="text-gray-300 mt-2 max-w-2xl mx-auto">{t('oracles_chamber_subtitle')}</p>
            </header>

            <main className="w-full px-4 sm:px-8 space-y-12">
                <PsycheConstellation personalityComplete={personalityComplete} mindComplete={mindComplete} wellbeingComplete={wellbeingComplete} />
                
                <section>
                    <h3 className="font-display text-2xl text-sky-300 border-b-2 border-sky-400/20 pb-2 mb-8">{t('oracles_category_personality')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                        {assessments.personality.map(a => <OracleCard key={a.id} testId={a.id} title={a.title} question={a.question} resultText={a.resultText} isCompleted={a.isCompleted} onClick={a.onClick} buttonText={a.buttonText} />)}
                    </div>
                </section>

                <section>
                    <h3 className="font-display text-2xl text-sky-300 border-b-2 border-sky-400/20 pb-2 mb-8">{t('oracles_category_mind')}</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                        {assessments.mind.map(a => <OracleCard key={a.id} testId={a.id} title={a.title} question={a.question} resultText={a.resultText} isCompleted={a.isCompleted} onClick={a.onClick} buttonText={a.buttonText} />)}
                    </div>
                </section>
                
                <section>
                    <h3 className="font-display text-2xl text-sky-300 border-b-2 border-sky-400/20 pb-2 mb-8">{t('oracles_category_wellbeing')}</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                        {assessments.wellbeing.map(a => <OracleCard key={a.id} testId={a.id} title={a.title} question={a.question} resultText={a.resultText} isCompleted={a.isCompleted} onClick={a.onClick} buttonText={a.buttonText} />)}
                    </div>
                </section>
            </main>
        </div>
    </div>
  );
};

export default TrialsModal;
