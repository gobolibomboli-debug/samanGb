import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ConceptSimulatorProps {
  interactiveId: string;
}

const JungArchetypeQuiz: React.FC = () => {
  const { t } = useLanguage();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const question = {
    scenario: 'psych_interactive_jung_archetype_q1_scenario',
    options: [
      { key: 'psych_interactive_jung_archetype_q1_opt1', isAnswer: false }, // The Shadow
      { key: 'psych_interactive_jung_archetype_q1_opt2', isAnswer: true },  // The Persona
      { key: 'psych_interactive_jung_archetype_q1_opt3', isAnswer: false }, // The Anima
    ],
    feedbackCorrect: 'psych_interactive_jung_archetype_q1_feedback_correct',
    feedbackIncorrect: 'psych_interactive_jung_archetype_q1_feedback_incorrect',
  };

  const handleSelect = (option: { key: string; isAnswer: boolean }) => {
    setSelectedOption(option.key);
    setIsCorrect(option.isAnswer);
  };
  
  const handleReset = () => {
      setSelectedOption(null);
      setIsCorrect(null);
  }

  return (
    <div className="bg-black/30 p-6 rounded-lg border-2 border-sky-400/30 shadow-inner">
      <p className="font-body text-gray-300 italic mb-4">{t(question.scenario)}</p>
      <div className="space-y-3">
        {question.options.map(opt => (
          <button
            key={opt.key}
            onClick={() => handleSelect(opt)}
            disabled={selectedOption !== null}
            className={`w-full text-left p-3 rounded-md border transition-all duration-200 ${
              selectedOption === null
                ? 'border-gray-600 hover:bg-sky-900/50 hover:border-sky-500'
                : selectedOption === opt.key && opt.isAnswer
                ? 'bg-green-500/20 border-green-400 cursor-default'
                : selectedOption === opt.key && !opt.isAnswer
                ? 'bg-red-500/20 border-red-400 cursor-default'
                : 'border-gray-700 text-gray-500 cursor-default'
            }`}
          >
            {t(opt.key)}
          </button>
        ))}
      </div>
      {isCorrect !== null && (
        <div className="mt-4 p-3 rounded-md bg-gray-800/50 animate-fade-in">
            <p className={`font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? t('correct') : t('incorrect')}
            </p>
            <p className="text-sm text-gray-300 mt-1">
                {isCorrect ? t(question.feedbackCorrect) : t(question.feedbackIncorrect)}
            </p>
            <button onClick={handleReset} className="text-xs text-sky-400 hover:text-white mt-2">{t('try_again')}</button>
        </div>
      )}
    </div>
  );
};


const ConceptSimulator: React.FC<ConceptSimulatorProps> = ({ interactiveId }) => {
  
  const renderSimulator = () => {
    switch(interactiveId) {
      case 'jung_archetype_quiz':
        return <JungArchetypeQuiz />;
      default:
        return null;
    }
  };

  return (
    <div className="my-4">
      {renderSimulator()}
    </div>
  );
};

export default ConceptSimulator;