import React, { useState, useEffect } from 'react';
import { MMPI_QUESTIONS } from '../services/mmpiService';
import { useLanguage } from '../contexts/LanguageContext';
import JourneyProgress from './JourneyProgress';
import { MMPIAssessmentState } from '../types';

interface MMPIAssessmentScreenProps {
  assessmentState: MMPIAssessmentState;
  onAnswer: (questionId: number, answer: boolean) => void;
  onBack: () => void;
  onFinishRandomly: () => void;
}

const MMPIAssessmentScreen: React.FC<MMPIAssessmentScreenProps> = ({ assessmentState, onAnswer, onBack, onFinishRandomly }) => {
  const { currentQuestionIndex } = assessmentState;
  const [isFading, setIsFading] = useState(false);
  const { t } = useLanguage();
  
  const totalQuestions = MMPI_QUESTIONS.length;
  const currentQuestion = MMPI_QUESTIONS[currentQuestionIndex];

  useEffect(() => {
    setIsFading(true);
    const timer = setTimeout(() => setIsFading(false), 150);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  const cardBaseStyle = "group w-full md:w-2/5 h-48 md:h-64 p-6 flex flex-col items-center justify-center text-center bg-black/20 backdrop-blur-md border-2 border-sky-400/20 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-sky-400 hover:bg-sky-900/20 hover:shadow-sky-500/20 active:scale-95";

  return (
    <div className="relative min-h-full flex items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="font-display text-xl text-sky-400 tracking-widest">
            {t('trial')} {currentQuestionIndex + 1} {t('of')} {totalQuestions}
          </h2>
          <JourneyProgress total={totalQuestions} current={currentQuestionIndex} />
        </div>
        
        <div key={currentQuestion.id} className={`transition-opacity duration-150 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            <p className="font-display text-center text-xl sm:text-2xl md:text-3xl text-gray-200 mb-10 min-h-[4rem]">
              {t(currentQuestion.textKey)}
            </p>
    
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 my-8">
              <button
                onClick={() => onAnswer(currentQuestion.id, true)}
                className={cardBaseStyle}
              >
                <span className="font-display text-3xl text-gray-200 group-hover:accent-gradient-text transition-colors">True</span>
              </button>
              <button
                onClick={() => onAnswer(currentQuestion.id, false)}
                className={cardBaseStyle}
              >
                <span className="font-display text-3xl text-gray-200 group-hover:accent-gradient-text transition-colors">False</span>
              </button>
            </div>
        </div>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
          <button
            onClick={onBack}
            disabled={currentQuestionIndex === 0}
            className="font-display text-lg bg-transparent border border-gray-600 hover:border-gray-400 text-gray-300 rounded-lg px-8 py-2 transition-all duration-200 transform hover:scale-105 hover:bg-gray-700/50 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            &larr; {t('back')}
          </button>
          
          <button
            onClick={onFinishRandomly}
            className="font-display text-lg text-amber-400 hover:text-amber-300 transition-colors"
          >
            {t('finishRandomly')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MMPIAssessmentScreen;