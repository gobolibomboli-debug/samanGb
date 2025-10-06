import React from 'react';

const RevelationIcon: React.FC<{ isGlowing: boolean }> = ({ isGlowing }) => (
    <div className={`relative w-10 h-10 transition-all duration-1000 ${isGlowing ? 'scale-125' : 'scale-100'}`}>
        <svg className={`w-full h-full text-sky-300 transition-all duration-500 ${isGlowing ? 'opacity-100' : 'opacity-40'}`} style={{ filter: isGlowing ? 'drop-shadow(0 0 8px rgba(125, 211, 252, 0.8))' : 'none' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" fill={isGlowing ? "rgba(125, 211, 252, 0.5)" : "none"} className="transition-all duration-500"/>
        </svg>
    </div>
);

const JourneyProgress: React.FC<{ total: number; current: number }> = ({ total, current }) => {
    const progressPercentage = total > 1 ? (current / (total - 1)) * 100 : 0;
    const isNearCompletion = progressPercentage > 95;

    return (
        <div className="w-full max-w-2xl mx-auto mt-4" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total} aria-label="Assessment Progress">
            <div className="relative h-10 flex items-center">
                {/* Track */}
                <div className="w-full h-1 bg-white/5 rounded-full"></div>
                
                {/* Filled part */}
                <div 
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-1 bg-gradient-to-r from-sky-500 to-cyan-300 rounded-full"
                    style={{ 
                      width: `${progressPercentage}%`, 
                      transition: 'width 0.3s ease-out',
                      boxShadow: '0 0 8px rgba(125, 211, 252, 0.5)'
                    }}
                ></div>
                
                {/* Orb */}
                <div 
                    className="absolute top-1/2 rounded-full z-10"
                    style={{ 
                      width: '20px', height: '20px',
                      left: `${progressPercentage}%`, 
                      transform: `translateX(-50%) translateY(-50%)`,
                      background: 'radial-gradient(circle, white, rgba(125, 211, 252, 0.7))',
                      boxShadow: '0 0 12px 2px rgba(255, 255, 255, 0.8), 0 0 20px 5px rgba(125, 211, 252, 0.5)',
                      transition: 'left 0.3s ease-out'
                    }}
                ></div>

                {/* Destination Icon at the end */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 transform translate-x-1/2 rtl:-translate-x-1/2">
                    <RevelationIcon isGlowing={isNearCompletion || progressPercentage >= 100} />
                </div>
            </div>
        </div>
    );
};

export default React.memo(JourneyProgress);