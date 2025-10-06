import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-24 h-32 flex items-center justify-center">
      <div className="hourglass w-full h-full relative">
        {/* Glass Frame */}
        <svg viewBox="0 0 100 133" className="w-full h-full absolute top-0 left-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M95 5H5V15L45 51.6667V81.3333L5 118V128H95V118L55 81.3333V51.6667L95 15V5Z" stroke="#38bdf8" strokeWidth="5" strokeLinejoin="round"/>
        </svg>

        {/* Sand */}
        <div className="absolute w-full h-full top-0 left-0 p-[10px]">
          <div className="w-full h-full relative overflow-hidden">
            {/* Top Sand Container */}
            <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: '40px solid transparent',
                  borderRight: '40px solid transparent',
                  borderTop: '56px solid #38bdf8',
                }}
              >
                <div className="sand-top absolute -top-[56px] left-[-40px] w-[80px] h-full bg-[#0a192f]"></div>
              </div>
            </div>

             {/* Bottom Sand Container */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: '40px solid transparent',
                  borderRight: '40px solid transparent',
                  borderBottom: '56px solid #38bdf8',
                }}
              >
                 <div className="sand-bottom absolute -bottom-[56px] left-[-40px] w-[80px] h-0 bg-[#38bdf8]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;