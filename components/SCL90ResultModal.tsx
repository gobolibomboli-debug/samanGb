import React, { useMemo, useState, useRef, useEffect } from 'react';
import { SCL90Scores, SCL90Dimension } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import LoadingSpinner from './LoadingSpinner';

// --- PROPS & INTERFACES ---
interface SCL90ResultModalProps {
  scores: SCL90Scores | null;
  onTakeTest: () => void;
  analysis: string | null;
  isLoading: boolean;
  onFetchAnalysis: () => void;
  apiAvailable: boolean;
  onApiDisabledClick: () => void;
}

// --- HOOKS ---
const useTypewriter = (text: string, speed = 20) => {
    const [displayText, setDisplayText] = useState('');
    useEffect(() => {
        setDisplayText('');
        if (!text) return;
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setDisplayText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);
        return () => clearInterval(typingInterval);
    }, [text, speed]);
    return displayText;
};

// --- UTILITIES & CONSTANTS ---
const dimensionKeys = ['SOM', 'OC', 'IS', 'DEP', 'ANX', 'HOS', 'PHOB', 'PAR', 'PSY'] as SCL90Dimension[];
const dimensionRelations: Record<SCL90Dimension, SCL90Dimension[]> = {
    DEP: ['ANX', 'IS', 'PSY'], ANX: ['DEP', 'SOM', 'PHOB'], OC: ['ANX', 'DEP'],
    IS: ['DEP', 'ANX', 'PAR'], SOM: ['ANX', 'DEP'], HOS: ['PAR', 'DEP'],
    PHOB: ['ANX'], PAR: ['HOS', 'IS', 'PSY'], PSY: ['DEP', 'PAR'],
};

interface ParsedAnalysis {
    note: string;
    reading: string;
    bodies: string;
    navigation: string;
}

const parseAnalysis = (text: string | null): ParsedAnalysis | null => {
    if (!text) return null;
    const sections = text.split('### ').filter(s => s.trim());
    const parsed: Partial<ParsedAnalysis> = {};
    const keyMap = { note: 0, reading: 1, bodies: 2, navigation: 3 };
    
    Object.entries(keyMap).forEach(([key, index]) => {
        if(sections[index]) {
            const [_, ...contentParts] = sections[index].split('\n');
            (parsed as any)[key] = contentParts.join('\n').trim();
        }
    });
    return parsed as ParsedAnalysis;
};

const getAnalysisForStar = (analysis: ParsedAnalysis | null, starKey: SCL90Dimension, t: (key: string) => string): string => {
    if (!analysis?.bodies) return t(`scl90_dim_${starKey.toLowerCase()}_desc`);
    
    const cosmicLexiconEn: Record<SCL90Dimension, string> = { SOM: "Echoes of the Body", OC: "Gravitational Loops", IS: "Telepathic Resonance", DEP: "Gravity Well", ANX: "Cosmic Jitters", HOS: "Solar Flares", PHOB: "Avoidance Zones", PAR: "Gravitational Lensing", PSY: "Alien Nebulae" };
    const cosmicLexiconFa: Record<SCL90Dimension, string> = { SOM: "پژواک‌های تن", OC: "مدارهای گرانشی", IS: "تشدید تله‌پاتیک", DEP: "چاه گرانشی", ANX: "ارتعاشات کیهانی", HOS: "شعله‌های خورشیدی", PHOB: "مناطق پرهیز", PAR: "اعوجاج‌های گرانشی", PSY: "سحابی‌های بیگانه" };
    
    const isFarsi = t('dir') === 'rtl';
    const lexicon = isFarsi ? cosmicLexiconFa : cosmicLexiconEn;
    
    const metaphor = lexicon[starKey];
    const sentences = analysis.bodies.split('. ');
    const relevantSentence = sentences.find(s => s.includes(metaphor));
    
    return relevantSentence ? `${relevantSentence.trim()}.` : t(`scl90_dim_${starKey.toLowerCase()}_desc`);
};


// --- SUB-COMPONENTS ---

const Stardust: React.FC<{ count: number }> = ({ count }) => {
    const particles = useMemo(() => Array.from({ length: count * 3 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 5 + 3}s`,
        animationDelay: `${Math.random() * 5}s`,
        size: `${Math.random() * 2 + 1}px`
    })), [count]);
    return (
        <div className="absolute inset-0 z-0">
            {particles.map(p => (
                <div key={p.id} className="absolute rounded-full bg-sky-300" style={{
                    left: p.left, top: p.top, width: p.size, height: p.size,
                    animation: `stardust-fade ${p.animationDuration} infinite ease-in-out`,
                    animationDelay: p.animationDelay
                }}/>
            ))}
        </div>
    );
};

const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
    const displayText = useTypewriter(text);
    return (
        <div className="font-body text-gray-300 text-lg leading-relaxed space-y-3"
             dangerouslySetInnerHTML={{ __html: displayText.replace(/\n/g, '<br />') }} />
    );
};

// --- MAIN COMPONENT ---

const SCL90ResultModal: React.FC<SCL90ResultModalProps> = ({ scores, onTakeTest, analysis, isLoading, onFetchAnalysis, apiAvailable, onApiDisabledClick }) => {
  const { t } = useLanguage();
  const [view, setView] = useState<'nebula' | 'detail'>('nebula');
  const [selectedStar, setSelectedStar] = useState<SCL90Dimension | null>(null);
  const [hoveredStar, setHoveredStar] = useState<SCL90Dimension | null>(null);
  const starRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const nebulaViewportRef = useRef<HTMLDivElement>(null);
  
  const handleFetchClick = () => { if (!apiAvailable) onApiDisabledClick(); else if (!analysis) onFetchAnalysis(); };

  const parsedAnalysis = useMemo(() => parseAnalysis(analysis), [analysis]);

  const starData = useMemo(() => {
    if (!scores) return [];
    const numStars = dimensionKeys.length;
    const angleStep = (2 * Math.PI) / numStars;
    return dimensionKeys.map((key, i) => {
        const score = scores.dimensions[key];
        const angle = angleStep * i - Math.PI / 2;
        const radius = 60 + (score / 4) * 160;
        const size = 12 + score * 8;
        const hue = 210 - (score / 4) * 60; // Blue (210) to Purple-Pink (150)
        return {
            key, score, angle, radius, size, hue,
            x: 250 + radius * Math.cos(angle),
            y: 250 + radius * Math.sin(angle),
        };
    });
  }, [scores]);

  const psdiColor = useMemo(() => {
      if (!scores) return 'hsl(210, 80%, 15%)';
      const hue = 210 - (scores.PSDI / 4 * 180); // Blue (210) towards Red (30)
      return `hsl(${hue}, 80%, 15%)`;
  }, [scores]);

  const leyLines = useMemo(() => {
      if (!hoveredStar) return [];
      const related = dimensionRelations[hoveredStar] || [];
      const start = starData.find(s => s.key === hoveredStar);
      if (!start) return [];
      return related.map(relKey => {
          const end = starData.find(s => s.key === relKey);
          return end ? { key: `${hoveredStar}-${relKey}`, d: `M ${start.x} ${start.y} L ${end.x} ${end.y}` } : null;
      }).filter(Boolean);
  }, [hoveredStar, starData]);
  
  const handleStarClick = (starKey: SCL90Dimension) => {
      setSelectedStar(starKey);
      setView('detail');
  };

  if (!scores) {
    return (
        <div className="w-full h-full flex items-center justify-center p-4 animate-fade-in text-center">
            <div className="max-w-xl">
                 <h2 className="font-display text-4xl sm:text-5xl accent-gradient-text animate-text-flicker-glow">{t('scl90_modal_title')}</h2>
                 <p className="font-body text-lg text-gray-300 mt-4 mb-8">{t('scl90_intro')}</p>
                 <button onClick={onTakeTest} className="font-display text-xl bg-sky-500 hover:bg-sky-400 text-black rounded-lg px-12 py-4 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/20">{t('take_the_test')}</button>
            </div>
        </div>
    );
  }

  const selectedStarData = starData.find(s => s.key === selectedStar);
  const nebulaScale = view === 'detail' ? 2.5 : 1;
  const nebulaTranslateX = view === 'detail' && selectedStarData ? (250 - selectedStarData.x) * nebulaScale : 0;
  const nebulaTranslateY = view === 'detail' && selectedStarData ? (250 - selectedStarData.y) * nebulaScale : 0;

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-4 animate-fade-in">
      <div className="w-full max-w-6xl animate-fade-in-scale-up">
        <header className="text-center mt-6 mb-8">
          <h2 className="font-display text-4xl sm:text-5xl accent-gradient-text">{t('scl90_modal_title')}</h2>
        </header>

        <main>
          <div className="p-4 mb-10 bg-amber-900/30 border-2 border-amber-600/50 rounded-lg text-amber-200 text-center shadow-inner max-w-3xl mx-auto">
            <h3 className="font-display font-bold">{t('scl90_disclaimer_title')}</h3>
            <p className="text-sm font-body mt-2">{t('scl90_disclaimer')}</p>
          </div>
          
          <div ref={nebulaViewportRef} className="relative aspect-square w-full max-w-xl mx-auto rounded-full overflow-hidden transition-opacity duration-500" style={{'--parallax-x': '0px', '--parallax-y': '0px'} as React.CSSProperties}>
              {/* Background Layers */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 opacity-50" style={{ animation: 'nebula-rotate 180s linear infinite reverse' }} />
              <div className="absolute inset-0 z-0" style={{ background: `radial-gradient(circle at center, ${psdiColor} 0%, transparent 60%)`, mixBlendMode: 'screen', transition: 'background 1s ease' }} />
              <Stardust count={scores.PST} />
              
              {/* Nebula content */}
              <div className="absolute inset-0 transition-transform duration-1000 ease-in-out" style={{ transform: `translate(${nebulaTranslateX}px, ${nebulaTranslateY}px) scale(${nebulaScale})`}}>
                  <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full overflow-visible">
                      {/* Ley Lines */}
                      <g className="transition-opacity duration-300" style={{ opacity: view === 'nebula' ? 1 : 0 }}>
                          {leyLines.map(line => (
                            <path key={line!.key} d={line!.d} stroke="#7dd3fc" strokeWidth="1" strokeDasharray="5 5" style={{strokeDashoffset: 1000, animation: 'draw-ley-line 1s ease-out forwards'}}/>
                          ))}
                      </g>
                  </svg>
                  {/* Stars */}
                  {starData.map(star => (
                    <button 
                        key={star.key}
                        // FIX: Changed ref callback to not return a value.
                        ref={el => { starRefs.current[star.key] = el }}
                        onClick={() => handleStarClick(star.key)}
                        onMouseEnter={() => setHoveredStar(star.key)}
                        onMouseLeave={() => setHoveredStar(null)}
                        className={`absolute rounded-full transition-all duration-1000 ease-in-out cursor-pointer group`}
                        // FIX: Casted the entire style object to React.CSSProperties to allow for custom properties.
                        style={{ 
                            left: star.x, top: star.y, width: star.size, height: star.size,
                            transform: 'translate(-50%, -50%)',
                            opacity: view === 'detail' && selectedStar !== star.key ? 0 : 1,
                            '--star-color': `hsl(${star.hue}, 100%, 70%)`
                        } as React.CSSProperties}
                        aria-label={t(`scl90_dim_${star.key.toLowerCase()}`)}
                    >
                        <div className="w-full h-full rounded-full bg-[var(--star-color)]" style={{ animation: `star-pulse ${2 + (4 - star.score)}s infinite ease-in-out`}} />
                        <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 font-display text-sm whitespace-nowrap text-white transition-opacity duration-300 ${hoveredStar === star.key && view === 'nebula' ? 'opacity-100' : 'opacity-0'}`}>{t(`scl90_dim_${star.key.toLowerCase()}`)}</span>
                    </button>
                  ))}
              </div>
              
              {/* Detail View Panel */}
              <div className={`absolute inset-0 p-8 flex flex-col justify-center items-center text-center transition-opacity duration-1000 ease-in-out ${view === 'detail' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  {selectedStar && (
                      <div className="animate-fade-in-scale-up w-full max-w-sm">
                        <h3 className="font-display text-2xl accent-gradient-text">{t(`scl90_dim_${selectedStar.toLowerCase()}`)}</h3>
                        <p className="font-mono text-lg text-sky-300">Score: {scores.dimensions[selectedStar].toFixed(2)}</p>
                        <p className="text-sm mt-4 text-gray-300">{t(`scl90_dim_${selectedStar.toLowerCase()}_desc`)}</p>
                        <div className="mt-4 p-3 bg-black/30 rounded-lg border border-sky-400/20 max-h-40 overflow-y-auto custom-scrollbar">
                           <h4 className="font-display text-sky-200">{t('scl90_ai_detail_title')}</h4>
                           <MarkdownRenderer text={getAnalysisForStar(parsedAnalysis, selectedStar, t)} />
                        </div>
                        <button onClick={() => setView('nebula')} className="mt-6 font-display text-sky-300 hover:text-white transition-colors">{t('scl90_back_to_nebula')}</button>
                      </div>
                  )}
              </div>
          </div>
          
          <div className="my-12 p-6 bg-black/20 backdrop-blur-sm border border-sky-400/10 rounded-xl max-w-4xl mx-auto">
            <h3 className="font-display text-2xl text-center accent-gradient-text mb-4">{t('scl90_global_indices')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div><p className="font-mono text-3xl text-white">{scores.GSI.toFixed(2)}</p><p className="text-sm text-sky-300">{t('scl90_gsi')}</p></div>
                <div><p className="font-mono text-3xl text-white">{scores.PST}</p><p className="text-sm text-sky-300">{t('scl90_pst')}</p></div>
                <div><p className="font-mono text-3xl text-white">{scores.PSDI.toFixed(2)}</p><p className="text-sm text-sky-300">{t('scl90_psdi')}</p></div>
            </div>
          </div>

          <div className="text-center my-12">
            <button onClick={handleFetchClick} disabled={!!analysis} className="font-display text-xl bg-transparent border-2 border-sky-400 text-sky-300 rounded-lg px-10 py-3 transition-all duration-300 transform hover:scale-105 hover:bg-sky-400/10 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
              {analysis ? t('interpretation_complete') : t('scl90_get_interpretation')}
            </button>
          </div>
          
          {(isLoading || analysis) && (
            <section className="my-12 animate-scroll-unfurl p-8 sm:p-10 bg-black/20 backdrop-blur-sm border-2 border-sky-400/20 rounded-xl max-w-4xl mx-auto">
                 {isLoading && <div className="flex flex-col items-center justify-center h-full min-h-[200px]"><LoadingSpinner /><p className="font-display text-sky-300 mt-4 text-lg tracking-wider animate-pulse-text">{t('scl90_loading_interpretation')}</p></div>}
                 {!isLoading && parsedAnalysis?.reading && (
                     <div className="animate-fade-in space-y-6">
                        <div>
                            <h3 className="font-display text-2xl accent-gradient-text mb-2">{t('scl90_ai_summary_title')}</h3>
                            <MarkdownRenderer text={parsedAnalysis.reading} />
                        </div>
                        <div>
                             <h3 className="font-display text-2xl accent-gradient-text mb-2">{t('scl90_ai_detail_title')}</h3>
                             <MarkdownRenderer text={parsedAnalysis.bodies || ''} />
                        </div>
                     </div>
                 )}
                 {!isLoading && analysis && !parsedAnalysis?.reading && <MarkdownRenderer text={analysis} /> }
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default SCL90ResultModal;
