
import React, { useState, useRef, useLayoutEffect, useMemo, useEffect, useCallback } from 'react';
import { TAPESTRY_DATA, TapestryNode } from '../data/tapestryData';
import { DEITY_PROFILES } from '../data/deityData';
import GodIcon from './GodIcon';
import { useLanguage } from '../contexts/LanguageContext';
import { RelationType } from '../types';

// --- PROPS & INTERFACES ---

interface LivingTapestryProps {
  dominantArchetypeId: string | null;
  onClose: () => void;
  onViewArchetype: (archetypeId: string) => void;
}

interface DeityCardProps {
  deityId: string;
  gridPosition: { row: number; col: string };
  isHighlighted: boolean;
  isDimmed: boolean;
  isDominant: boolean;
  isCloseRelative: boolean;
  isDistant: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick?: () => void;
  cardRef: (el: HTMLButtonElement | HTMLDivElement | null) => void;
}

interface RelationLine {
  from: string;
  to: string;
  type: RelationType;
  path: string;
}

interface RelationshipTooltipProps {
  deityId: string | null;
  position: { x: number; y: number } | undefined;
  isVisible: boolean;
  containerRef: React.RefObject<HTMLElement>;
}

type ViewMode = 'tapestry' | 'list';

const ARCHETYPE_GROUPS = [
  { titleKey: 'map_group_primordials', archetypeIds: ['Chaos', 'Gaia', 'Uranus', 'Nyx', 'Eros', 'Tartarus'] },
  { titleKey: 'map_group_titans', archetypeIds: ['Cronus', 'Rhea', 'Iapetus', 'Leto', 'Prometheus'] },
  { titleKey: 'map_group_sovereigns', archetypeIds: ['Zeus', 'Hera', 'Poseidon', 'Hades', 'Demeter', 'Hestia'] },
  { titleKey: 'map_group_olympians', archetypeIds: ['Athena', 'Ares', 'Apollo', 'Artemis', 'Aphrodite', 'Hephaestus', 'Hermes', 'Dionysus', 'Persephone'] }
];

// --- HELPER COMPONENTS ---

const RelationshipTooltip: React.FC<RelationshipTooltipProps> = ({ deityId, position, isVisible, containerRef }) => {
  const { t } = useLanguage();
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
      opacity: 0,
      position: 'absolute',
      pointerEvents: 'none',
  });

  useEffect(() => {
    if (isVisible && position && tooltipRef.current && containerRef.current) {
      const ttWidth = tooltipRef.current.offsetWidth;
      const ttHeight = tooltipRef.current.offsetHeight;
      const cardWidth = 144; // w-36 from DeityCard
      
      let left = position.x + (cardWidth / 2) + 20; // Default: to the right
      let top = position.y - (ttHeight / 2);

      if (left + ttWidth > containerRef.current.offsetWidth - 20) {
          left = position.x - (cardWidth / 2) - ttWidth - 20; // Move to the left
      }
      
      if (top < 10) top = 10;
      else if (top + ttHeight > containerRef.current.offsetHeight - 10) top = containerRef.current.offsetHeight - ttHeight - 10;
      
      setStyle({
        position: 'absolute', left: `${left}px`, top: `${top}px`,
        opacity: 1, pointerEvents: 'none', transform: 'translateZ(0)',
      });
    } else {
      setStyle(s => ({ ...s, opacity: 0 }));
    }
  }, [isVisible, position, deityId, containerRef]);
  
  if (!deityId) return <div ref={tooltipRef} className="z-30 w-64 opacity-0" />;
  
  const deity = TAPESTRY_DATA[deityId];
  if (!deity) return null;
  
  const generateRelationString = (relationType: string, ids: string[] | undefined) => {
    if (!ids || ids.length === 0) return null;
    const maxNames = 2;
    const names = ids.slice(0, maxNames).map(id => t(TAPESTRY_DATA[id]?.name)).join(t('list_separator'));
    const moreCount = ids.length - maxNames;
    const more = moreCount > 0 ? ` ${t('and_x_more', moreCount.toString())}` : '';
    
    return (
      <div key={relationType} className="text-sm">
        <span className="font-bold text-sky-400/80 rtl:ml-1 ltr:mr-1">{t(`tooltip_${relationType}`)}:</span>
        <span className="text-gray-300">{names}{more}</span>
      </div>
    );
  };
  
  const relations = [
    generateRelationString('consorts', deity.consorts), generateRelationString('parents', deity.parents),
    generateRelationString('children', deity.children), generateRelationString('allies', deity.allies),
    generateRelationString('rivals', deity.rivals), generateRelationString('complement', deity.complement),
  ].filter(Boolean);

  return (
    <div ref={tooltipRef} style={style} className="z-50 w-64 p-4 bg-gray-900/80 backdrop-blur-md border border-sky-400/30 rounded-lg shadow-2xl transition-opacity duration-300">
      <h5 className="font-display text-lg accent-gradient-text border-b border-sky-400/20 pb-2 mb-2">{t(deity.name)}</h5>
      <p className="text-sm font-bold text-sky-300 mb-2">{t(`deity_type_${deity.type}`)}</p>
      <div className="space-y-1">
        {relations.length > 0 ? relations : <p className="text-sm text-gray-400 italic">{t('no_direct_relations')}</p>}
      </div>
    </div>
  );
};

const AnimatedPath: React.FC<{ d: string; className: string; style?: React.CSSProperties; }> = ({ d, className, style }) => {
    const pathRef = useRef<SVGPathElement>(null);
    useLayoutEffect(() => {
        if (pathRef.current) {
            const length = pathRef.current.getTotalLength();
            pathRef.current.style.strokeDasharray = `${length} ${length}`;
            pathRef.current.style.strokeDashoffset = `${length}`;
        }
    }, [d]);

    return <path ref={pathRef} d={d} className={`${className} line-draw-animated`} fill="none" style={style} />;
};

const DeityCard: React.FC<DeityCardProps> = ({ deityId, gridPosition, isHighlighted, isDimmed, isDominant, isCloseRelative, isDistant, onMouseEnter, onMouseLeave, onClick, cardRef }) => {
  const { t } = useLanguage();
  const deity = TAPESTRY_DATA[deityId];
  const profile = DEITY_PROFILES[deityId];
  if (!deity) return null;
  
  const ButtonOrDiv = profile && onClick ? 'button' : 'div';

  const baseClasses = [
    'group', 'relative', 'w-36', 'h-36', 'flex', 'flex-col', 'items-center', 'justify-center', 'text-center', 'p-3',
    'bg-black/40', 'backdrop-blur-sm', 'rounded-lg', 'border', 'transition-all', 'duration-300', 'ease-in-out',
    onClick ? 'cursor-pointer' : 'cursor-default',
    'hover:!opacity-100', 'hover:bg-sky-400/10', 'hover:border-sky-400', 'hover:scale-110', 'hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]'
  ];

  if (isHighlighted) baseClasses.push('border-sky-300', 'scale-105', 'shadow-lg', 'shadow-sky-400/25', 'opacity-100');
  else if (isDimmed) baseClasses.push('opacity-30', 'border-sky-400/20', 'scale-90');
  else {
    if (isDominant) baseClasses.push('scale-105', 'opacity-100', 'shadow-xl', 'shadow-sky-300/50', 'border-sky-300');
    else if (isCloseRelative) baseClasses.push('scale-100', 'opacity-100', 'border-sky-400/40');
    else if (isDistant) baseClasses.push('scale-90', 'opacity-60', 'border-sky-400/20');
    else baseClasses.push('scale-100', 'opacity-100', 'border-sky-400/20');
  }

  return (
    <div style={{ gridRow: gridPosition.row, gridColumn: gridPosition.col }} className="flex items-center justify-center">
      <ButtonOrDiv ref={cardRef} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={baseClasses.join(' ')}>
        {isDominant && <div className="absolute inset-0 bg-sky-400/10 rounded-lg -z-10 animate-pulse-glow"></div>}
        <div className="w-14 h-14 text-gray-400 group-hover:text-sky-300 transition-colors duration-300 mb-1"><GodIcon archetypeId={deity.id} /></div>
        <div className="flex-grow flex flex-col justify-center">
            <h4 className={`font-display text-base leading-tight transition-colors ${isHighlighted || isDominant ? 'accent-gradient-text' : 'text-white group-hover:accent-gradient-text'}`}>{t(deity.name)}</h4>
            {profile && <p className="text-xs text-gray-400 mt-1">{t(`${deity.id}_domain`)}</p>}
        </div>
      </ButtonOrDiv>
    </div>
  );
};

// --- MAIN COMPONENT ---
const MIN_SCALE = 0.5; const MAX_SCALE = 2;

const LivingTapestry: React.FC<LivingTapestryProps> = ({ dominantArchetypeId, onClose, onViewArchetype }) => {
  const { t } = useLanguage();
  const [hoveredDeityId, setHoveredDeityId] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number, y: number } | undefined>();
  const [viewMode, setViewMode] = useState<ViewMode>('tapestry');

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const [cardPositions, setCardPositions] = useState<Record<string, { x: number, y: number }>>({});
  
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const panState = useRef({ isPanning: false, start: { x: 0, y: 0 } });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setViewMode(mediaQuery.matches ? 'list' : 'tapestry');
    const handler = (e: MediaQueryListEvent) => setViewMode(e.matches ? 'list' : 'tapestry');
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const layout = useMemo(() => ({
    'Chaos': { row: 1, col: '11 / span 4' }, 'Gaia': { row: 2, col: '7 / span 4' }, 'Uranus': { row: 2, col: '13 / span 4' },
    'Nyx': { row: 2, col: '1 / span 4' }, 'Eros': { row: 2, col: '5 / span 4' }, 'Tartarus': { row: 2, col: '17 / span 4' },
    'Cronus': { row: 3, col: '8 / span 4' }, 'Rhea': { row: 3, col: '12 / span 4' }, 'Iapetus': { row: 3, col: '2 / span 4' },
    'Leto': { row: 3, col: '18 / span 4' }, 'Hades': { row: 4, col: '2 / span 4' }, 'Poseidon': { row: 4, col: '6 / span 4' },
    'Hera': { row: 4, col: '10 / span 4' }, 'Zeus': { row: 4, col: '14 / span 4' }, 'Demeter': { row: 4, col: '18 / span 4' },
    'Hestia': { row: 4, col: '22 / span 4' }, 'Prometheus': { row: 5, col: '1 / span 4' }, 'Persephone': { row: 5, col: '19 / span 4' },
    'Hephaestus': { row: 5, col: '5 / span 4' }, 'Ares': { row: 5, col: '9 / span 4' }, 'Athena': { row: 5, col: '13 / span 4' },
    'Hermes': { row: 5, col: '17 / span 4' }, 'Aphrodite': { row: 6, col: '7 / span 4' }, 'Artemis': { row: 6, col: '11 / span 4' },
    'Apollo': { row: 6, col: '15 / span 4' }, 'Dionysus': { row: 6, col: '19 / span 4' },
  }), []);

  useLayoutEffect(() => {
    if (viewMode !== 'tapestry') return;
    const calculatePositions = () => {
      if (!containerRef.current) return;
      const newPositions: Record<string, { x: number; y: number }> = {};
      Object.entries(cardRefs.current).forEach(([id, el]) => {
        if (el) {
          const htmlEl = el as HTMLElement;
          newPositions[id] = { x: htmlEl.offsetLeft + htmlEl.offsetWidth / 2, y: htmlEl.offsetTop + htmlEl.offsetHeight / 2 };
        }
      });
      setCardPositions(newPositions);
    };
    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    return () => window.removeEventListener('resize', calculatePositions);
  }, [layout, viewMode]);

  const relations = useMemo((): RelationLine[] => {
    if (!hoveredDeityId || Object.keys(cardPositions).length === 0) return [];
    const deity = TAPESTRY_DATA[hoveredDeityId]; if (!deity) return [];
    const getPathD = (startId: string, endId: string) => {
      const start = cardPositions[startId], end = cardPositions[endId]; if(!start || !end) return "";
      const yOffset = Math.abs(end.y - start.y) * 0.3, xOffset = Math.abs(end.x - start.x) * 0.1;
      const c1x = start.x + (end.x > start.x ? xOffset : -xOffset), c1y = start.y + yOffset;
      const c2x = end.x + (start.x > end.x ? xOffset : -xOffset), c2y = end.y - yOffset;
      return `M ${start.x} ${start.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${end.x} ${end.y}`;
    }
    const lines: RelationLine[] = [], relationsAdded = new Set<string>();
    const addLine = (targetId: string, type: RelationType) => {
      const relationKey = [deity.id, targetId].sort().join('-'); if (relationsAdded.has(relationKey)) return;
      const path = getPathD(deity.id, targetId);
      if(path) { lines.push({ from: deity.id, to: targetId, type, path }); relationsAdded.add(relationKey); }
    };
    [...(deity.parents || []), ...(deity.children || [])].forEach(id => addLine(id, 'family'));
    (deity.consorts || []).forEach(id => addLine(id, 'consort')); (deity.allies || []).forEach(id => addLine(id, 'ally'));
    (deity.rivals || []).forEach(id => addLine(id, 'rival')); (deity.complement || []).forEach(id => addLine(id, 'complement'));
    return lines;
  }, [hoveredDeityId, cardPositions]);

  const relatedIds = useMemo(() => {
    if (!hoveredDeityId) return new Set<string>();
    const ids = new Set<string>([hoveredDeityId]);
    relations.forEach(r => ids.add(r.to));
    return ids;
  }, [hoveredDeityId, relations]);
  
  const closeRelatives = useMemo(() => {
    if (!dominantArchetypeId) return new Set<string>();
    const dominantDeity = TAPESTRY_DATA[dominantArchetypeId]; if (!dominantDeity) return new Set<string>();
    const ids = new Set<string>();
    (dominantDeity.parents || []).forEach(id => ids.add(id)); (dominantDeity.consorts || []).forEach(id => ids.add(id));
    (dominantDeity.children || []).forEach(id => ids.add(id));
    return ids;
  }, [dominantArchetypeId]);

  const handleMouseEnter = (deityId: string) => {
    if (viewMode !== 'tapestry') return;
    setHoveredDeityId(deityId);
    if (cardRefs.current[deityId] && containerRef.current) {
        const cardRect = cardRefs.current[deityId]!.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setTooltipPosition({ x: cardRect.left - containerRect.left, y: cardRect.top - containerRect.top });
    }
  };

  const handleMouseLeave = () => setHoveredDeityId(null);
  
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault(); if (!containerRef.current) return;
    const scaleAmount = -e.deltaY * 0.001;
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * (1 + scaleAmount)));
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left, mouseY = e.clientY - rect.top;
    const newTranslateX = mouseX - (mouseX - translate.x) * (newScale / scale);
    const newTranslateY = mouseY - (mouseY - translate.y) * (newScale / scale);
    setScale(newScale); setTranslate({ x: newTranslateX, y: newTranslateY });
  }, [scale, translate.x, translate.y]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    panState.current = { isPanning: true, start: { x: e.clientX - translate.x, y: e.clientY - translate.y }};
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  }, [translate.x, translate.y]);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!panState.current.isPanning) return;
    setTranslate({ x: e.clientX - panState.current.start.x, y: e.clientY - panState.current.start.y });
  }, []);

  const handleMouseUp = useCallback(() => {
    // FIX: Correctly update the `isPanning` property instead of overwriting the entire ref object.
    panState.current.isPanning = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  }, []);

  useEffect(() => {
    if (viewMode !== 'tapestry') return;
    const currentContainer = containerRef.current;
    if(currentContainer) currentContainer.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      if(currentContainer) currentContainer.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, viewMode]);

  const handleZoom = (direction: 'in' | 'out') => {
    const scaleAmount = direction === 'in' ? 1.2 : 1 / 1.2;
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * scaleAmount));
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect(), centerX = rect.width / 2, centerY = rect.height / 2;
      const newTranslateX = centerX - (centerX - translate.x) * (newScale / scale);
      const newTranslateY = centerY - (centerY - translate.y) * (newScale / scale);
      setScale(newScale); setTranslate({ x: newTranslateX, y: newTranslateY });
    }
  };
  const handleReset = () => { setScale(1); setTranslate({ x: 0, y: 0 }); };

  const lineColors: Record<RelationType, string> = {
    family: 'stroke-sky-400', consort: 'stroke-rose-400', ally: 'stroke-green-400',
    rival: 'stroke-red-500', complement: 'stroke-purple-400'
  };

  return (
    <div className="w-full h-full flex flex-col animate-fade-in">
        <div className="p-4 border-b border-sky-400/20 text-center bg-[#0c1e3a]/50 backdrop-blur-sm flex-shrink-0 z-10">
            <p className="text-gray-400 text-sm sm:text-base">{t('livingTapestry_subtitle')}</p>
            <div className="mt-2">
                <div className="inline-flex items-center bg-black/30 rounded-full border border-sky-400/20 p-1">
                    <button onClick={() => setViewMode('list')} className={`px-4 py-1 text-sm rounded-full ${viewMode === 'list' ? 'bg-sky-500 text-white' : 'text-sky-300 hover:bg-sky-500/20'}`}>List</button>
                    <button onClick={() => setViewMode('tapestry')} className={`px-4 py-1 text-sm rounded-full ${viewMode === 'tapestry' ? 'bg-sky-500 text-white' : 'text-sky-300 hover:bg-sky-500/20'}`}>Tapestry</button>
                </div>
            </div>
        </div>

        {viewMode === 'list' ? (
          <div className="flex-grow p-4 md:p-6 overflow-y-auto custom-scrollbar">
            {ARCHETYPE_GROUPS.map(group => (
              <section key={group.titleKey} className="mb-8">
                <h3 className="font-display text-2xl sm:text-3xl text-sky-300 mb-4">{t(group.titleKey)}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {group.archetypeIds.map(id => {
                    const deity = DEITY_PROFILES[id];
                    if (!deity) return null;
                    const isDominant = id === dominantArchetypeId;
                    return (
                      <button key={id} onClick={() => onViewArchetype(id)} className={`group aspect-w-1 aspect-h-1 flex flex-col items-center justify-center p-2 text-center bg-black/20 rounded-lg border-2 transition-all duration-200 transform hover:-translate-y-1 hover:bg-sky-400/5 hover:shadow-lg hover:shadow-sky-500/10 ${isDominant ? 'border-sky-300 animate-pulse-glow' : 'border-sky-400/20 hover:border-sky-400'}`}>
                        <div className={`w-1/2 h-1/2 mb-2 transition-colors duration-300 ${isDominant ? 'text-sky-200' : 'text-gray-400 group-hover:text-white'}`}><GodIcon archetypeId={id} /></div>
                        <h4 className={`font-display text-lg transition-colors ${isDominant ? 'accent-gradient-text' : 'text-white'}`}>{t(deity.name)}</h4>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div ref={containerRef} className="flex-grow relative overflow-hidden cursor-grab" onWheel={handleWheel} onMouseDown={handleMouseDown}>
            <div className="relative w-full h-full transition-transform duration-100 ease-out" style={{ transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`, transformOrigin: '0 0' }}>
              <div className="grid grid-cols-24 gap-x-4 gap-y-20 min-w-[1800px] min-h-[900px]">
                {Object.keys(layout).map((deityId) => {
                  const isDominant = deityId === dominantArchetypeId, isCloseRelative = closeRelatives.has(deityId), isDistant = !!dominantArchetypeId && !isDominant && !isCloseRelative;
                  return <DeityCard key={deityId} deityId={deityId} gridPosition={layout[deityId as keyof typeof layout]} isHighlighted={relatedIds.has(deityId)} isDimmed={!!hoveredDeityId && !relatedIds.has(deityId)} isDominant={isDominant} isCloseRelative={isCloseRelative} isDistant={isDistant} onMouseEnter={() => handleMouseEnter(deityId)} onMouseLeave={handleMouseLeave} onClick={DEITY_PROFILES[deityId] ? () => onViewArchetype(deityId) : undefined} cardRef={(el) => (cardRefs.current[deityId] = el)} />;
                })}
              </div>
              <svg className="absolute top-0 left-0 w-[1800px] h-[900px] pointer-events-none z-10" aria-hidden="true" style={{ width: '1800px', height: '900px'}}>
                <defs><filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.5" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
                <g>{relations.map(({ from, to, type, path }) => (<g key={`${from}-${to}-${type}`}><AnimatedPath d={path} className={`${lineColors[type]} stroke-2`} style={{ filter: `url(#line-glow)` }} /></g>))}</g>
              </svg>
            </div>
            <RelationshipTooltip deityId={hoveredDeityId} position={tooltipPosition} isVisible={!!hoveredDeityId} containerRef={containerRef} />
            <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 z-40 flex flex-col items-center gap-2">
                <button onClick={() => handleZoom('in')} aria-label="Zoom In" className="w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-md border-2 border-sky-400/30 text-sky-300 rounded-full transition-all hover:scale-110 hover:bg-sky-400/10 hover:border-sky-400 active:scale-100 font-mono text-xl">+</button>
                <button onClick={() => handleZoom('out')} aria-label="Zoom Out" className="w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-md border-2 border-sky-400/30 text-sky-300 rounded-full transition-all hover:scale-110 hover:bg-sky-400/10 hover:border-sky-400 active:scale-100 font-mono text-2xl">-</button>
                <button onClick={handleReset} aria-label="Reset View" className="w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-md border-2 border-sky-400/30 text-sky-300 rounded-full transition-all hover:scale-110 hover:bg-sky-400/10 hover:border-sky-400 active:scale-100">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l16 16" /></svg>
                </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default LivingTapestry;
