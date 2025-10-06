import React, { useState, useEffect } from 'react';
import { BAI_QUESTIONS } from '../services/baiService';
import { useLanguage } from '../contexts/LanguageContext';
import JourneyProgress from './JourneyProgress';
import { BAIAssessmentState } from '../types';

interface BAIAssessmentScreenProps {
  assessmentState: BAIAssessmentState;
  onAnswer: (questionId: number, score: number) => void;
  onBack: () => void;
  onFinishRandomly: () => void;
}

const BAIAssessmentScreen: React.FC<BAIAssessmentScreenProps> = ({ assessmentState, onAnswer, onBack, onFinishRandomly }) => {
  const { currentQuestionIndex } = assessmentState;
  const [isFading, setIsFading] = useState(false);
  const { t } = useLanguage();
  
  const totalQuestions = BAI_QUESTIONS.length;
  const currentQuestion = BAI_QUESTIONS[currentQuestionIndex];

  useEffect(() => {
    setIsFading(true);
    const timer = setTimeout(() => setIsFading(false), 150);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  const handleAnswer = (score: number) => {
    onAnswer(currentQuestion.id, score);
  };

  const likertOptions = [
    { labelKey: 'bai_likert_0', value: 0 },
    { labelKey: 'bai_likert_1', value: 1 },
    { labelKey: 'bai_likert_2', value: 2 },
    { labelKey: 'bai_likert_3', value: 3 },
  ];

  return (
    <div className="relative min-h-full flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="font-display text-xl text-sky-400 tracking-widest">
            {t('trial')} {currentQuestionIndex + 1} {t('of')} {totalQuestions}
          </h2>
          <JourneyProgress total={totalQuestions} current={currentQuestionIndex} />
        </div>
        
        <div key={currentQuestion.id} className={`transition-opacity duration-150 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            <h3 className="font-display text-center text-xl sm:text-2xl md:text-3xl text-gray-200 mb-2">
              {t(currentQuestion.textKey)}
            </h3>
            <p className="text-center text-gray-400 mb-10">{t('assessment_timeframe_week')}</p>
    
            <div className="flex flex-col justify-center items-center gap-4 my-8">
              {likertOptions.map(({ labelKey, value }) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(value)}
                  className="group w-full max-w-lg p-4 text-left rtl:text-right bg-black/20 backdrop-blur-md border-2 border-sky-400/20 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-sky-400 hover:bg-sky-900/20 active:scale-95"
                >
                  <span className="font-body text-base sm:text-lg text-gray-200 group-hover:text-sky-200 transition-colors">
                    <span className="font-mono font-bold text-sky-300 mr-2 rtl:mr-0 rtl:ml-2">{value}:</span>
                    {t(labelKey)}
                  </span>
                </button>
              ))}
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

export default BAIAssessmentScreen;