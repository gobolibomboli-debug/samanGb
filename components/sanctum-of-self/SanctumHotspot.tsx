import React from 'react';

interface SanctumHotspotProps {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  delay?: string;
  disabled?: boolean;
}

const SanctumHotspot: React.FC<SanctumHotspotProps> = ({ label, onClick, children, size = 'medium', delay = '0s', disabled = false }) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-20 h-20 md:w-24 md:h-24',
    large: 'w-48 h-48 sm:w-64 sm:h-64'
  };

  const buttonClasses = `relative ${sizeClasses[size]} flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border-2 transition-all duration-300 ${disabled ? 'border-sky-400/10 text-sky-300/30 cursor-not-allowed' : 'border-sky-400/20 text-sky-300/80 group-hover:text-sky-200 group-hover:border-sky-300/70 group-hover:scale-110'}`;

  return (
    <div
      className="relative group flex flex-col items-center justify-center animate-fade-in"
      style={{ animationDelay: delay }}
    >
      <button
        onClick={disabled ? undefined : onClick}
        aria-label={label}
        disabled={disabled}
        className={buttonClasses}
      >
        <div className={`absolute inset-0 rounded-full animate-hotspot-glow ${disabled ? 'opacity-0' : 'opacity-70 group-hover:opacity-100'}`}></div>
        {children}
      </button>
      <span
        className={`mt-3 px-3 py-1 font-display whitespace-nowrap bg-gray-900/80 text-white rounded-md shadow-lg transition-opacity duration-300 pointer-events-none z-20 ${disabled ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}
      >
        {label}
      </span>
    </div>
  );
};

export default React.memo(SanctumHotspot);