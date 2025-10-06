import React from 'react';

interface GodIconProps {
  archetypeId: string;
}

const GodIcon: React.FC<GodIconProps> = ({ archetypeId }) => {
  const renderIcon = () => {
    switch (archetypeId) {
      // --- Olympians ---
      case 'Athena':
        return ( // Refined Owl with Olive Branches
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4.004c-2.343-1.353-5.657-1.353-8 0"/>
            <path d="M12 20c4.418 0 8-3.582 8-8 0-3.953-2.83-7.25-6.5-7.893" />
            <path d="M4 12c0 4.418 3.582 8 8 8 1.58 0 3.04-.46 4.25-1.25" />
            <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
            <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
            <path d="M12 9.5V6.5" />
          </svg>
        );
      case 'Ares':
        return ( // Dynamic Corinthian Helmet
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 11.75C4 8.5 6.5 6 9.5 6h5c3 0 5.5 2.5 5.5 5.75V15c0 2-1.5 4-3.5 4h-1" />
                <path d="M4.5 15H15c1.5 0 2.5-1.5 2.5-3s-1-3-2.5-3" />
                <path d="M12 6V3.5c0-1 .5-1.5 1.5-1.5h1" />
                <path d="M14.5 2c1 1 1 3-1 4" />
            </svg>
        );
      case 'Apollo':
        return ( // Elegant Lyre with Sun motif
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
                <path d="M12 12V2" />
                <path d="M12 22v-4" />
                <path d="M5.636 5.636l1.414 1.414" />
                <path d="M18.364 18.364l-1.414-1.414" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="M5.636 18.364l1.414-1.414" />
                <path d="M18.364 5.636l-1.414 1.414" />
                <path d="M9 22c-4-1-7-5-7-10" />
                <path d="M15 22c4-1 7-5 7-10" />
            </svg>
        );
      case 'Artemis':
        return ( // Bow with Crescent Moon arrow
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16.5 21c-3.6-1-6.9-3.4-9-6.9-2.1-3.5-2.7-7.7-.9-11.6" />
                <path d="M13.2 3.3c3.9 1.8 6.7 5.4 7.3 9.7" />
                <path d="M14 3l7 7" />
                <path d="M21 3h-4v4" />
            </svg>
        );
      case 'Zeus':
        return ( // Sharper, more dynamic Lightning Bolt
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13.29 2.11L4.4 12.35a1.31 1.31 0 0 0 .11 1.77l5.44 4.48a1.31 1.31 0 0 0 1.77.11l8.89-10.24a1.31 1.31 0 0 0-.11-1.77l-5.43-4.48a1.31 1.31 0 0 0-1.78-.11z" />
                <path d="M13.29 2.11l-2.44 7.33 7.33-2.44" />
                <path d="M4.51 14.12l2.44-7.33-7.33 2.44" />
            </svg>
        );
      case 'Hera':
        return ( // Stylized Peacock Feather
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                <path d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                <path d="M12 15c-4 4-6 6-6 6" />
                <path d="M12 15c4 4 6 6 6 6" />
            </svg>
        );
      case 'Poseidon':
        return ( // Trident with Wave motif
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22V10" />
                <path d="M5 10h14" />
                <path d="M5 10c0-4 3-6 7-6s7 2 7 6" />
                <path d="M2 14c2-1 4-1 6 0s4-1 6 0 4 1 6 0" />
                <path d="M2 18c2-1 4-1 6 0s4-1 6 0 4 1 6 0" />
            </svg>
        );
      case 'Hades':
        return ( // Key with Skull motif (Bident)
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                <path d="M12 12v10" />
                <path d="M12 4V2" />
                <path d="M12 12H4.5c0-4 3-6 7.5-6" />
                <path d="M12 12h7.5c0-4-3-6-7.5-6" />
                <path d="M9 8h.01" />
                <path d="M15 8h.01" />
            </svg>
        );
      case 'Aphrodite':
        return ( // Elegant Scallop Shell
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20.5c-4.4 0-8-3.4-8-7.5 0-4.1 3.6-7.5 8-7.5s8 3.4 8 7.5c0 4.1-3.6 7.5-8 7.5z" />
            <path d="M12 20.5V22" />
            <path d="M12 5.5c-4.4 0-8-1.6-8-3.5S7.6 2 12 2s8 1.6 8 3.5-3.6 3.5-8 3.5z" />
            <path d="M4 13v-2.5" />
            <path d="M20 13v-2.5" />
            <path d="M8 13v-1.5" />
            <path d="M16 13v-1.5" />
          </svg>
        );
      case 'Hephaestus':
        return ( // Forge Hammer with Sparks
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 12l-5 5-5-5h10z" />
            <path d="M12 17V8" />
            <path d="M12 8h-2a2 2 0 1 0 0-4h4a2 2 0 1 0 0-4h-4" />
            <path d="M3 21h18" />
            <path d="M18.5 2.5l2 2" />
            <path d="M21 7l-2-2" />
            <path d="M3 5l2-2" />
          </svg>
        );
      case 'Hermes':
        return ( // Winged Sandal (Talaria)
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 17.5L8 16V9L3 12.5v5z" />
            <path d="M8 16l8-3V7L8 9" />
            <path d="M16 13l5-1.5V6L16 7" />
            <path d="M8 9L5 11" />
            <path d="M16 7l-3 1.5" />
            <path d="M8 19.5c0 .8.7 1.5 1.5 1.5H16c.8 0 1.5-.7 1.5-1.5" />
          </svg>
        );
      case 'Dionysus':
        return ( // Bunch of Grapes with a Vine Leaf
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22s-2.3-1.3-4-3.3c-1.8-2-2.3-4.7-1-6.7 1.3-2 4-2.3 6-1 2.3 1.3 3.3 4 3.3 6S17 22 15 22z" />
            <path d="M11.7 15.7c-1.9.8-3.5 2.2-4.5 4.1" />
            <path d="M10.2 13c-1.9.8-3.5 2.2-4.5 4.1" />
            <path d="M14 10.8c-1.9.8-3.5 2.2-4.5 4.1" />
            <path d="M6 3.5c0-1.7 1.3-3 3-3" />
            <path d="M9 9.3c1.3-1.6 3.3-2.6 5.5-2.6h.1" />
          </svg>
        );
      case 'Demeter':
        return ( // Sheaf of Wheat, more detailed
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s-4-3-4-7V5" />
            <path d="M12 22s4-3 4-7V5" />
            <path d="M12 5c-2-1.5-4-3-4-3" />
            <path d="M12 5c2-1.5 4-3 4-3" />
            <path d="M4 11c2-1.5 4-3 4-3" />
            <path d="M20 11c-2-1.5-4-3-4-3" />
            <path d="M8 15c-1-.7-2-1.5-2-1.5" />
            <path d="M16 15c1-.7 2-1.5 2-1.5" />
          </svg>
        );
      case 'Persephone':
        return ( // Split Pomegranate
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
            <path d="M12 2c2 0 4 2 4 4" />
            <path d="M12 2c-2 0-4 2-4 4" />
            <path d="M12 22c-2.5-2.5-4-7-4-10" />
            <path d="M12 22c2.5-2.5 4-7 4-10" />
            <path d="M10 14h.01" />
            <path d="M14 14h.01" />
            <path d="M12 16h.01" />
          </svg>
        );
      case 'Hestia':
        return ( // Contained, steady Hearth Flame
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22a8 8 0 0 1-8-8c0-4.4 3.6-8 8-8s8 3.6 8 8a8 8 0 0 1-8 8z" />
            <path d="M12 18c-1.3 0-2.5-1.1-2.5-2.5S10.7 13 12 13s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
            <path d="M12 13c0-3 2-5 2-5s-2-2-2-5" />
          </svg>
        );
      case 'Prometheus':
        return ( // Hand with Fire and a breaking chain link
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 9.5a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2Z" />
            <path d="M12 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3c0 1-1.3 3-3 5-1.7-2-3-4-3-5" />
            <path d="M18 22V10.5A4.5 4.5 0 0 0 13.5 6H8" />
            <path d="M6 22V10.5A4.5 4.5 0 0 1 10.5 6H13" />
            <path d="M4 14.5h2.5" />
            <path d="M17.5 14.5H20" />
          </svg>
        );
      
      // --- Primordials ---
      case 'Chaos':
        return ( // Swirling Void
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 12c0-4.4 3.6-8 8-8" />
            <path d="M20 12c0 4.4-3.6 8-8 8" />
            <path d="M12 12c4.4 0 8 3.6 8 8" />
            <path d="M12 20c-4.4 0-8-3.6-8-8" />
            <path d="M12 12c-4.4 0-8-3.6-8-8" />
            <path d="M4 12c0 4.4 3.6 8 8 8" />
          </svg>
        );
      case 'Gaia':
        return ( // Earth with a Sprout
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
            <path d="M12 12c-3 0-6 2-6 4s3 4 6 4 6-2 6-4-3-4-6-4z" />
            <path d="M12 12V7" />
            <path d="M12 7c-1-1-2-2-2-2" />
            <path d="M12 7c1-1 2-2 2-2" />
          </svg>
        );
      case 'Uranus':
        return ( // Arch of Stars
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 17c5-3 15-3 20 0" />
            <path d="M12 2v2" />
            <path d="M6 4l1 1" />
            <path d="M18 4l-1 1" />
            <path d="M4 9l1 1" />
            <path d="M20 9l-1 1" />
            <path d="M8 2.5l.5.5" />
            <path d="M16 2.5l-.5.5" />
          </svg>
        );
      case 'Tartarus':
        return ( // Descending Pit/Abyss
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18" />
                <path d="M8 7l-4 4 4 4" />
                <path d="M16 7l4 4-4 4" />
                <path d="M12 13.5L3 21" />
                <path d="M12 13.5L21 21" />
            </svg>
        );
      case 'Eros':
        return ( // Primal, Cosmic Wings
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                <path d="M22 8.5c-7 2-10-1-10-1" />
                <path d="M2 8.5c7 2 10-1 10-1" />
            </svg>
        );
      case 'Nyx':
        return ( // Crescent Moon with Stars/Veil
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3c-4.2 0-8 3.5-8 8.5a8.2 8.2 0 0 0 5 7.8 8.5 8.5 0 0 1 6.2-15.8A8.5 8.5 0 0 1 12 3z" />
                <path d="M16 5h.01" />
                <path d="M18 8h.01" />
                <path d="M15 11h.01" />
                <path d="M19 12h.01" />
            </svg>
        );

      // --- Titans ---
      case 'Cronus':
        return ( // Sickle with Hourglass motif
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 4L4 20" />
            <path d="M4 4h16v16" />
            <path d="M18 6c-2.8 1.2-5.2 3.6-6.4 6.4" />
          </svg>
        );
      case 'Rhea':
        return ( // Stylized Lion's Head
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
                <path d="M12 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path d="M12 2v2" />
                <path d="M12 22v-2" />
                <path d="M22 12h-2" />
                <path d="M4 12h2" />
                <path d="M19.07 4.93l-1.42 1.42" />
                <path d="M4.93 19.07l1.42-1.42" />
                <path d="M19.07 19.07l-1.42-1.42" />
                <path d="M4.93 4.93l1.42 1.42" />
            </svg>
        );
      case 'Iapetus':
        return ( // Piercing Spear
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.15 2.85l-18 18" />
                <path d="M20 8l-4 4" />
                <path d="M18 10l-4 4" />
                <path d="M16 12l-4 4" />
                <path d="M14 14l-4 4" />
                <path d="M3 11V3h8" />
            </svg>
        );
      case 'Leto':
        return (// Stylized Palm Tree
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22V8" />
                <path d="M12 8c4 0 8-4 8-4" />
                <path d="M12 8c-4 0-8-4-8-4" />
                <path d="M12 15c4 0 8-4 8-4" />
                <path d="M12 15c-4 0-8-4-8-4" />
            </svg>
        );

      default:
        return ( // Generic constellation as fallback
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
            <circle cx="12" cy="12" r="2" />
            <circle cx="4.93" cy="4.93" r="2" />
            <circle cx="19.07" cy="19.07" r="2" />
            <circle cx="4.93" cy="19.07" r="2" />
            <circle cx="19.07" cy="4.93" r="2" />
            <path d="M6.34 6.34l4.24 4.24" strokeWidth="0.5" />
            <path d="M17.66 17.66l-4.24-4.24" strokeWidth="0.5" />
          </svg>
        );
    }
  };

  return <div className="w-full h-full">{renderIcon()}</div>;
};

export default React.memo(GodIcon);