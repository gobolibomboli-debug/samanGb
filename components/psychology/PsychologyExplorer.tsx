import React, { useState } from 'react';
import { Result, OceanScores, MMPIScores, SCL90Scores, BDIScores, BAIScores, EQIScores } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import SchoolList from './SchoolList';
import SchoolDetail from './SchoolDetail';
import PsychologistChat from './PsychologistChat';
import CosmicBackground from '../CosmicBackground';

interface PsychologyExplorerProps {
  result: Result | null;
  bigFiveScores: OceanScores | null;
  mmpiScores: MMPIScores | null;
  scl90Scores: SCL90Scores | null;
  bdiScores: BDIScores | null;
  baiScores: BAIScores | null;
  eqiScores: EQIScores | null;
  onExit: () => void;
}

type View = 'list' | 'detail' | 'chat';

const ProgressTracker: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    const { t } = useLanguage();
    const steps = [t('psych_step1'), t('psych_step2'), t('psych_step3')];
    return (
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 font-display text-sm sm:text-base">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <span className={`transition-colors duration-500 ${currentStep >= index + 1 ? 'text-sky-300' : 'text-gray-500'}`}>
                       {index + 1}. {step}
                    </span>
                    {index < steps.length - 1 && <span className="text-gray-600">→</span>}
                </React.Fragment>
            ))}
        </div>
    );
};

const PsychologyExplorer: React.FC<PsychologyExplorerProps> = (props) => {
  const { result, onExit } = props;
  const { t } = useLanguage();
  const [view, setView] = useState<View>('list');
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [selectedPsychologistId, setSelectedPsychologistId] = useState<string | null>(null);
  const [initialQuestion, setInitialQuestion] = useState<string | undefined>();

  const handleSelectSchool = (schoolId: string) => {
    setSelectedSchoolId(schoolId);
    setView('detail');
  };

  const handleSelectPsychologist = (psychologistId: string, question?: string) => {
    setSelectedPsychologistId(psychologistId);
    setInitialQuestion(question);
    setView('chat');
  };

  const handleBack = () => {
    if (view === 'chat') {
      setView('detail');
      setSelectedPsychologistId(null);
      setInitialQuestion(undefined);
    } else if (view === 'detail') {
      setView('list');
      setSelectedSchoolId(null);
    } else {
      onExit();
    }
  };

  const getCurrentStep = () => {
    if(view === 'chat') return 3;
    if(view === 'detail') return 2;
    return 1;
  }

  const renderContent = () => {
    switch(view) {
      case 'detail':
        return <SchoolDetail 
                 schoolId={selectedSchoolId!} 
                 result={result} 
                 onSelectPsychologist={handleSelectPsychologist} 
               />;
      case 'chat':
        return <PsychologistChat 
                 psychologistId={selectedPsychologistId!}
                 result={props.result}
                 bigFiveScores={props.bigFiveScores}
                 mmpiScores={props.mmpiScores}
                 scl90Scores={props.scl90Scores}
                 bdiScores={props.bdiScores}
                 baiScores={props.baiScores}
                 eqiScores={props.eqiScores}
                 initialQuestion={initialQuestion}
               />;
      case 'list':
      default:
        return <SchoolList result={result} onSelectSchool={handleSelectSchool} />;
    }
  };

  return (
    <div className="absolute inset-0 z-30 bg-[#090a0f] flex flex-col animate-fade-in">
        <CosmicBackground />
        <header className="relative z-10 p-4 border-b border-sky-400/20 text-center bg-[#0c1e3a]/50 backdrop-blur-sm flex-shrink-0">
            <h1 className="font-display text-2xl sm:text-4xl accent-gradient-text animate-text-flicker-glow">
                {t('psych_title')}
            </h1>
            <ProgressTracker currentStep={getCurrentStep()} />
            <button
                onClick={handleBack}
                className="absolute top-1/2 left-4 rtl:left-auto rtl:right-4 -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-200 z-20 transform hover:scale-110 active:scale-100"
                aria-label={t('back')}
            >
                <svg className="w-8 h-8 sm:w-9 sm:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
        </header>
        <main className="relative z-10 flex-grow overflow-y-auto custom-scrollbar">
            {renderContent()}
        </main>
    </div>
  );
};

export default PsychologyExplorer;