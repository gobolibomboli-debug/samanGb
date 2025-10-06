import React, { useState, useEffect, useRef } from 'react';
import { QUESTIONS } from '../constants';
import { Answer, Question, AssessmentState } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import JourneyProgress from './JourneyProgress';

interface AssessmentScreenProps {
  assessmentState: AssessmentState;
  onAnswer: (questionId: number, choice: 'A' | 'B') => void;
  onBack: () => void;
  onSave: () => void;
  onFinishRandomly: () => void;
}

const ChoiceCard: React.FC<{
  onClick: () => void;
  className: string;
  disabled: boolean;
  children: React.ReactNode;
}> = ({ onClick, className, disabled, children }) => {
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const rotateX = (-y / height) * 10;
    const rotateY = (x / width) * 10;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
  };

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      className={`group relative w-full md:w-2/5 h-48 md:h-64 p-6 flex flex-col items-center justify-center text-center glass-panel rounded-2xl shadow-lg transition-all duration-300 ease-out active:scale-95 will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      <div className="transform-gpu" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </button>
  );
};

const AssessmentScreen: React.FC<AssessmentScreenProps> = ({ assessmentState, onAnswer, onBack, onSave, onFinishRandomly }) => {
  const { currentQuestionIndex } = assessmentState;
  const [animation, setAnimation] = useState({ state: 'entering', choice: null as 'A' | 'B' | null });
  const { t } = useLanguage();

  const audioContextRef = useRef<AudioContext | null>(null);
  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      document.removeEventListener('click', initAudio);
    };
    document.addEventListener('click', initAudio);
    return () => document.removeEventListener('click', initAudio);
  }, []);

  useEffect(() => {
    setAnimation(prev => ({ ...prev, state: 'entering' }));
  }, [currentQuestionIndex]);

  const playSound = () => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;
    if (audioContext.state === 'suspended') audioContext.resume();
    
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.2, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.3);
    
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.3);
  };

  const currentQuestion: Question = QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUESTIONS.length;

  const handleAnswer = (questionId: number, choice: 'A' | 'B') => {
    if (animation.choice) return;
    playSound();
    setAnimation({ state: 'exiting', choice });

    setTimeout(() => {
        onAnswer(questionId, choice);
        setAnimation({ state: 'entering', choice: null });
      }, 400);
  };
  
  const animationClass = animation.state === 'entering' ? 'animate-slide-in' : 'animate-slide-out';

  return (
    <div className="relative min-h-full flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="font-display text-xl text-sky-300 tracking-widest">
            {t('trial')} {currentQuestionIndex + 1} {t('of')} {totalQuestions}
          </h2>
          <JourneyProgress total={totalQuestions} current={currentQuestionIndex} />
        </div>
        
        <div className={animationClass}>
            <p className="font-display text-center text-xl sm:text-2xl md:text-3xl text-gray-100 mb-8 min-h-[4rem]">
              {t(`q${currentQuestion.id}_question`)}
            </p>
    
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 my-8">
              <ChoiceCard
                onClick={() => handleAnswer(currentQuestion.id, 'A')}
                className={animation.choice === 'A' ? 'animate-choice-select' : ''}
                disabled={!!animation.choice}
              >
                <span className="font-display text-base sm:text-lg md:text-xl text-gray-200 group-hover:accent-gradient-text transition-colors">{t(`q${currentQuestion.id}_optionA`)}</span>
              </ChoiceCard>
              <ChoiceCard
                onClick={() => handleAnswer(currentQuestion.id, 'B')}
                className={animation.choice === 'B' ? 'animate-choice-select' : ''}
                disabled={!!animation.choice}
              >
                <span className="font-display text-base sm:text-lg md:text-xl text-gray-200 group-hover:accent-gradient-text transition-colors">{t(`q${currentQuestion.id}_optionB`)}</span>
              </ChoiceCard>
            </div>
        </div>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
          <button onClick={onBack} disabled={currentQuestionIndex === 0 || !!animation.choice} className="font-body text-lg text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
            &larr; {t('back')}
          </button>
          <button onClick={onSave} className="font-body text-lg text-gray-400 hover:text-white transition-colors">{t('saveProgress')}</button>
          <button onClick={onFinishRandomly} className="font-body text-lg text-amber-400 hover:text-amber-300 transition-colors">{t('finishRandomly')}</button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentScreen;