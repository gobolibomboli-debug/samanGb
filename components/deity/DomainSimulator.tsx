import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface DomainSimulatorProps {
  interactiveId: string;
}

const PoseidonSeaMood: React.FC = () => {
    const { t } = useLanguage();
    const [mood, setMood] = useState(50); // 0 (calm) to 100 (stormy)
    
    const waterColor = `hsl(210, 50%, ${70 - mood * 0.4}%)`;
    const skyColor = `hsl(210, 60%, ${80 - mood * 0.6}%)`;
    const waveAmplitude = mood / 10;
    const waveFrequency = 0.02 + (mood / 100) * 0.03;

    return (
        <div className="bg-black/30 p-4 rounded-lg border-2 border-sky-400/30 shadow-inner">
            <div className="relative w-full h-48 rounded-md overflow-hidden" style={{ background: skyColor, transition: 'background 0.5s ease' }}>
                <svg className="absolute bottom-0 w-full h-2/3" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path 
                        d={`M0,50 Q25,${50-waveAmplitude} 50,50 T100,50 L100,100 L0,100 Z`}
                        fill={waterColor}
                        style={{ transition: 'd 0.5s ease, fill 0.5s ease' }}
                    >
                         <animate attributeName="d" values={`M0,50 Q25,${50-waveAmplitude} 50,50 T100,50 L100,100 L0,100 Z; M0,50 Q25,${50+waveAmplitude} 50,50 T100,50 L100,100 L0,100 Z; M0,50 Q25,${50-waveAmplitude} 50,50 T100,50 L100,100 L0,100 Z;`} dur={`${4 - mood * 0.03}s`} repeatCount="indefinite" />
                    </path>
                </svg>
            </div>
            <div className="mt-4">
                <label htmlFor="mood-slider" className="font-display text-lg text-sky-200">{t('poseidon_interactive_1_slider')}</label>
                <input 
                    id="mood-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={mood}
                    onChange={(e) => setMood(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mt-2"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{t('poseidon_interactive_1_calm')}</span>
                    <span>{t('poseidon_interactive_1_storm')}</span>
                </div>
            </div>
        </div>
    );
};


const DomainSimulator: React.FC<DomainSimulatorProps> = ({ interactiveId }) => {
  
  const renderSimulator = () => {
    switch(interactiveId) {
      case 'poseidon_sea_mood':
        return <PoseidonSeaMood />;
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

export default DomainSimulator;