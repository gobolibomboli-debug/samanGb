import React from 'react';
import GodIcon from '../GodIcon';

interface MythicSigilProps {
  archetypeId: string;
  mbtiType: string;
}

const getPatternsForMBTI = (mbti: string) => {
    const patterns = [];
    const size = 100;
    const center = size / 2;

    // Pattern based on Introversion/Extraversion
    if (mbti.includes('E')) {
        patterns.push(<circle key="e-circle" cx={center} cy={center} r={48} strokeWidth="1" className="opacity-70 animate-sigil-pulse" style={{ animationDelay: '0.5s' }} />);
    } else { // I
        patterns.push(<circle key="i-circle-1" cx={center} cy={center} r={35} strokeWidth="0.5" className="opacity-50" />);
        patterns.push(<circle key="i-circle-2" cx={center} cy={center} r={48} strokeWidth="0.5" className="opacity-50" />);
    }

    // Pattern based on Sensing/Intuition
    if (mbti.includes('S')) {
        patterns.push(<path key="s-square" d={`M 15 ${center} L ${center} 15 L 85 ${center} L ${center} 85 Z`} strokeWidth="1" className="opacity-80 animate-sigil-pulse" />);
    } else { // N
        patterns.push(<path key="n-triangle" d={`M ${center} 10 L 90 85 L 10 85 Z`} strokeWidth="1" className="opacity-60" />);
    }

    // Pattern based on Thinking/Feeling
    if (mbti.includes('T')) {
        patterns.push(<path key="t-lines" d={`M 10 10 L 90 90 M 90 10 L 10 90`} strokeWidth="0.75" className="opacity-60" />);
    } else { // F
        patterns.push(<path key="f-curves" d={`M 10 50 C 30 20, 70 20, 90 50 M 10 50 C 30 80, 70 80, 90 50`} strokeWidth="0.75" className="opacity-70 animate-sigil-pulse" style={{ animationDelay: '1s' }} />);
    }
    
    // Pattern based on Judging/Perceiving
    if (mbti.includes('J')) {
        patterns.push(<rect key="j-rect" x="5" y="5" width="90" height="90" rx="5" strokeWidth="1.5" className="opacity-90" />);
    } else { // P
        patterns.push(<circle key="p-dots" cx={center} cy={center} r={48} strokeWidth="1" strokeDasharray="2 6" className="opacity-70" />);
    }


    return patterns;
}


const MythicSigil: React.FC<MythicSigilProps> = ({ archetypeId, mbtiType }) => {
    const patterns = getPatternsForMBTI(mbtiType);

  return (
    <div className="relative w-full h-full aspect-square flex items-center justify-center">
        {/* Animated geometric background */}
        <div className="absolute inset-0 animate-sigil-rotate">
            <svg viewBox="0 0 100 100" className="w-full h-full text-sky-300/80" fill="none" stroke="currentColor">
                {patterns}
            </svg>
        </div>
        
        {/* Pulsing glow effect */}
        <div className="absolute inset-[20%] animate-sigil-pulse"
             style={{
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(56, 189, 248, 0) 70%)'
             }}
        ></div>

        {/* Central God Icon */}
        <div className="relative w-1/2 h-1/2 text-sky-300">
             <GodIcon archetypeId={archetypeId} />
        </div>
    </div>
  );
};

export default MythicSigil;