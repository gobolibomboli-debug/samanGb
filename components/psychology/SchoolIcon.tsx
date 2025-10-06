import React from 'react';

interface SchoolIconProps {
  schoolId: string;
}

const SchoolIcon: React.FC<SchoolIconProps> = ({ schoolId }) => {
  const renderIcon = () => {
    switch (schoolId) {
      // Psychodynamic
      case 'psychoanalysis':
      case 'adlerian':
      case 'neo-analytic':
      case 'humanistic-psychoanalytic':
         return ( // Iceberg for conscious/unconscious
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12h20" />
            <path d="M12 19l-4-7h8l-4 7z" />
            <path d="M8.5 12l-3-5h9l-3 5" />
          </svg>
        );
      case 'jungian':
      case 'object-relations':
      case 'self-psychology':
         return ( // Two overlapping circles for relationships/duality
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="12" r="6" />
            <circle cx="14" cy="12" r="6" />
          </svg>
        );
      case 'attachment-theory':
        return ( // Hand with connected figure
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path d="M11 11.5v2.5a2.5 2.5 0 105 0V10" />
            <path d="M18 18.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path d="M8 11.5V16a2 2 0 002 2h8" />
          </svg>
        );
      case 'individual-psychology':
        return ( // Striving arrow/figure
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        );


      // Cognitive-Behavioral
      case 'cbt':
      case 'rebt':
      case 'unified-protocol':
        return ( // Head with gears for cognitive processes
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 9v.01" />
            <path d="M16.5 11.25a4.5 4.5 0 11-9 0" />
            <path d="M20.25 15a8.25 8.25 0 11-16.5 0" />
          </svg>
        );
      case 'behaviorism':
         return ( // Pavlov's Bell
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 17.5a2.5 2.5 0 002.5-2.5V9.5A4.5 4.5 0 0010 5.23" />
            <path d="M12 17.5a2.5 2.5 0 01-2.5-2.5V9.5A4.5 4.5 0 0114 5.23" />
            <path d="M10 19h4" />
            <path d="M8 5a4 4 0 118 0" />
          </svg>
        );
      case 'dbt':
      case 'act':
      case 'schema-therapy':
        return ( // Wave for "Third Wave" CBT
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12c.83-.67 2.17-1 3.5-1s2.67.33 3.5 1 2.17 1 3.5 1 2.67-.33 3.5-1 2.17-1 3.5-1" />
            <path d="M3 7c.83-.67 2.17-1 3.5-1s2.67.33 3.5 1 2.17 1 3.5 1 2.67-.33 3.5-1 2.17-1 3.5-1" />
            <path d="M3 17c.83-.67 2.17-1 3.5-1s2.67.33 3.5 1 2.17 1 3.5 1 2.67-.33 3.5-1 2.17-1 3.5-1" />
          </svg>
        );
       case 'social-learning':
        return ( // Two figures, one observing
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a4 4 0 100-8 4 4 0 000 8z" />
            <path d="M18 22v-8" />
            <path d="M10 14a4 4 0 100-8 4 4 0 000 8z" />
            <path d="M10 22v-3" />
            <path d="M2 22v-3" />
            <path d="M2 14a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
        );
      
      // Humanistic-Existential
      case 'person-centered':
      case 'existential':
        return ( // Sprouting seed for growth potential
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 10h10" />
            <path d="M12 21a9 9 0 01-9-9V7.5A4.5 4.5 0 017.5 3h9A4.5 4.5 0 0121 7.5V12a9 9 0 01-9 9z" />
            <path d="M12 3v3m0 0a2 2 0 104 0 2 2 0 00-4 0zm-4 0a2 2 0 104 0 2 2 0 00-4 0z" />
          </svg>
        );
      case 'logotherapy':
        return ( // Mountain peak with sun for meaning/purpose
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 17l6-6 4 4 8-8" />
            <path d="M17 7h4v4" />
            <circle cx="6" cy="6" r="3" />
          </svg>
        );
      case 'humanistic':
        return ( // Pyramid for hierarchy of needs
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 22h20L12 2z" />
            <path d="M2 22l10-10L22 22" />
            <path d="M7.5 15.5h9" />
          </svg>
        );

      case 'gestalt':
      case 'narrative-therapy':
        return ( // Open book/scroll for stories and awareness
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <path d="M12 2v20" />
          </svg>
        );

      // Family Systems
      case 'structural-family':
      case 'bowen-family-systems':
      case 'family-systems':
        return ( // Network/tree for systems
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path d="M10 5.5V3" />
            <path d="M10 10.5v2a1 1 0 01-1 1H5.5a2.5 2.5 0 100 5H9a1 1 0 011 1v2" />
            <path d="M14 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path d="M14 5.5V3" />
            <path d="M14 10.5v2a1 1 0 001 1h3.5a2.5 2.5 0 100-5H15a1 1 0 00-1 1v2" />
          </svg>
        );
      case 'satir-transformational':
        return ( // Interconnected heart/family
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            <path d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
          </svg>
        );
      case 'interpersonal-therapy':
      case 'emotion-focused-therapy':
         return ( // Two connected figures
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M20 8v6" />
            <path d="M23 11h-6" />
          </svg>
        );

      // Trauma & Body
      case 'emdr':
      case 'sensorimotor':
      case 'trauma-neurobiology':
      case 'neuroplasticity':
      case 'polyvagal-theory':
        return ( // Brain with a spark/wave for neuro/body connection
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 00-8.6 14.2A10 10 0 0012 22a10 10 0 008.6-14.2A10 10 0 0012 2z" />
            <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
            <path d="M12 12v10" />
          </svg>
        );
      case 'somatic-experiencing':
        return ( // Body outline with a wave/sensation
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 22c-2.2 0-4-1.8-4-4v-8c0-2.2 1.8-4 4-4h6c2.2 0 4 1.8 4 4v8c0 2.2-1.8 4-4 4H9z" />
            <circle cx="12" cy="10" r="2" />
            <path d="M8 16c.5-1 1.5-2 4-2s3.5 1 4 2" />
          </svg>
        );

      // Positive & Cultural
      case 'positive-psychology':
      case 'mbsr':
      case 'mbct':
      case 'grit':
        return ( // Sun/Lotus for positive growth and mindfulness
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M4.93 4.93l1.41 1.41" />
            <path d="M17.66 17.66l1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M4.93 19.07l1.41-1.41" />
            <path d="M17.66 6.34l1.41-1.41" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        );
      case 'sociocultural-development':
      case 'cognitive-development':
        return ( // Interconnected people for social/cultural
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="3" />
            <path d="M12 8v5" />
            <circle cx="5" cy="19" r="3" />
            <path d="M7 17l3-4" />
            <circle cx="19" cy="19" r="3" />
            <path d="M17 17l-3-4" />
          </svg>
        );

      default: // A generic scroll for knowledge
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        );
    }
  };

  return <div className="w-full h-full">{renderIcon()}</div>;
};

export default SchoolIcon;