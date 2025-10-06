import React, { useState } from 'react';

interface PsychologistImageProps {
  psychologistId: string;
  className?: string;
  alt?: string;
}

const FallbackIcon: React.FC = () => (
  <svg className="w-full h-full text-sky-400/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </svg>
);

const PsychologistImage: React.FC<PsychologistImageProps> = ({ psychologistId, className, alt }) => {
  const [imageSrc, setImageSrc] = useState(`/images/${psychologistId}.jpg`);

  const handleError = () => {
    // If the image fails to load, clear the src to render the fallback
    setImageSrc('');
  };

  if (!imageSrc) {
    return (
      <div className={`${className} bg-black/20 p-2`}>
        <FallbackIcon />
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt || `${psychologistId}'s portrait`}
      className={`${className} object-cover object-top`}
      loading="lazy"
      onError={handleError}
    />
  );
};

export default PsychologistImage;