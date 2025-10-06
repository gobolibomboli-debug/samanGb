import React, { useState, useEffect } from 'react';
import { UserInfo } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface UserInfoScreenProps {
  onSubmit: (userInfo: UserInfo) => void;
}

const MaleIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="13" r="8"></circle><line x1="17" y1="7" x2="22" y2="2"></line><polyline points="17 2 22 2 22 7"></polyline></svg>;
const FemaleIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="8"></circle><line x1="12" y1="18" x2="12" y2="23"></line><line x1="9" y1="20" x2="15" y2="20"></line></svg>;


const UserInfoScreen: React.FC<UserInfoScreenProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (name.trim().length > 1 && gender !== null) {
      onSubmit({ name: name.trim(), gender });
    }
  }, [name, gender, onSubmit]);

  const genderCardBaseStyle = "group w-full sm:w-48 h-48 p-4 flex flex-col items-center justify-center text-center bg-black/20 backdrop-blur-md border-2 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-sky-400 hover:bg-sky-900/20 active:scale-95 cursor-pointer";

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold accent-gradient-text">
          {t('userInfo_title')}
        </h1>
        <p className="mt-4 font-body text-lg sm:text-xl text-gray-300">
          {t('userInfo_subtitle')}
        </p>

        <div className="mt-12 space-y-8">
          <div>
            <label htmlFor="name" className="sr-only">{t('userInfo_name_label')}</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('userInfo_name_placeholder')}
              className="w-full max-w-md mx-auto px-6 py-4 font-display text-xl sm:text-2xl text-center bg-transparent border-b-2 border-sky-400/30 text-white focus:outline-none focus:border-sky-400 transition-colors duration-300"
              required
              minLength={2}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
            <div 
              onClick={() => setGender('male')}
              className={`${genderCardBaseStyle} ${gender === 'male' ? 'border-sky-400 shadow-sky-500/20 scale-105' : 'border-sky-400/20'}`}
              role="radio"
              aria-checked={gender === 'male'}
              tabIndex={0}
            >
              <div className={`w-16 h-16 transition-colors duration-300 ${gender === 'male' ? 'text-sky-300' : 'text-gray-400 group-hover:text-sky-300'}`}><MaleIcon/></div>
              <span className={`mt-2 font-display text-2xl transition-colors duration-300 ${gender === 'male' ? 'accent-gradient-text' : 'text-gray-200 group-hover:text-sky-200'}`}>{t('userInfo_gender_male')}</span>
            </div>
            <div 
              onClick={() => setGender('female')}
              className={`${genderCardBaseStyle} ${gender === 'female' ? 'border-sky-400 shadow-sky-500/20 scale-105' : 'border-sky-400/20'}`}
              role="radio"
              aria-checked={gender === 'female'}
              tabIndex={0}
            >
              <div className={`w-16 h-16 transition-colors duration-300 ${gender === 'female' ? 'text-sky-300' : 'text-gray-400 group-hover:text-sky-300'}`}><FemaleIcon/></div>
              <span className={`mt-2 font-display text-2xl transition-colors duration-300 ${gender === 'female' ? 'accent-gradient-text' : 'text-gray-200 group-hover:text-sky-200'}`}>{t('userInfo_gender_female')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoScreen;