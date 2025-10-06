import React, { useEffect, useState } from 'react';
// FIX: Add EQIScores to the import and eqiScores to the props to fix type error.
import { Result, AppView, OceanScores, MMPIScores, SCL90Scores, BDIScores, BAIScores, EQIScores } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import MythicSigil from './MythicSigil';
import SanctumHotspot from './SanctumHotspot';

interface SanctumOfSelfProps {
  result: Result | null;
  bigFiveScores: OceanScores | null;
  mmpiScores: MMPIScores | null;
  scl90Scores: SCL90Scores | null;
  bdiScores: BDIScores | null;
  baiScores: BAIScores | null;
  eqiScores: EQIScores | null;
  onNavigate: (view: AppView, context?: any) => void;
  apiAvailable: boolean;
  onApiDisabledClick: () => void;
}

const SanctumOfSelf: React.FC<SanctumOfSelfProps> = ({ result, bigFiveScores, mmpiScores, scl90Scores, bdiScores, baiScores, eqiScores, onNavigate, apiAvailable, onApiDisabledClick }) => {
  const { t } = useLanguage();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleHotspotClick = (view: AppView, needsApi: boolean) => {
    if (needsApi && !apiAvailable) {
      onApiDisabledClick();
    } else {
      onNavigate(view);
    }
  };

  const hasMbtiResult = !!result;
  const hasAnyResult = !!(result || bigFiveScores || mmpiScores || scl90Scores || bdiScores || baiScores || eqiScores);
  
  // --- SVG Icons for Hotspots ---
  const ReportIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>;
  const MapIcon = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m0 10V7m0 10L9 7" /></svg>;
  const TapestryIcon = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M4.75 3.75h14.5a.75.75 0 01.75.75v14.5a.75.75 0 01-.75-.75H4.75a.75.75 0 01-.75-.75V4.5a.75.75 0 01.75-.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" /></svg>;
  const JungIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.17 48.17 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>;
  const DyadsIcon = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="12" r="5" /><circle cx="16" cy="12" r="5" /></svg>;
  const PsycheIcon = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2a9.5 9.5 0 018.78 6.5A1 1 0 0120 9.5v5a1 1 0 01-.78 1A9.5 9.5 0 0112 22a9.5 9.5 0 01-8.78-6.5A1 1 0 014 14.5v-5a1 1 0 01.78-1A9.5 9.5 0 0112 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 10h1.5v1.5H9v3h4.5v-1.5H12V10" /></svg>;
  const TakeTestIcon = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624l.259-1.035a3.375 3.375 0 00-2.456-2.456L13.75 16.5l1.035-.259a3.375 3.375 0 002.456-2.456l.259-1.035.259 1.035a3.375 3.375 0 002.456 2.456l1.035.259-1.035.259a3.375 3.375 0 00-2.456 2.456l-.259 1.035z" /></svg>;
  const TrialsIcon = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-2m0-14V3m0 7v2m2.9-2.9l1.4-1.4m-11.4 0l1.4 1.4m11.4 5.6l-1.4 1.4m-11.4 0l-1.4-1.4" /><circle cx="12" cy="12" r="4" /></svg>;
  const ShareIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.195.025.39.05.588.08a2.25 2.25 0 011.834 2.058m-2.422-2.138a2.25 2.25 0 00-1.834-2.058 2.25 2.25 0 00-2.186 0M12 18.75a.75.75 0 00.75-.75V13.5m0-3V5.25A2.25 2.25 0 0115 3h1.5a2.25 2.25 0 012.25 2.25v.75" /></svg>;

  const renderCenter = () => {
    if (result) {
        return (
             <button onClick={() => onNavigate('profile', { profileId: result.dominantArchetype.id })} className="w-full h-full group" aria-label={t('hotspot_profile')}>
                <MythicSigil archetypeId={result.dominantArchetype.id} mbtiType={result.mbtiType} />
            </button>
        );
    }
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <button onClick={() => onNavigate('trials')} className="group w-full h-full flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm border-2 border-sky-400/30 rounded-full animate-pulse-glow transition-all duration-300 hover:scale-105 hover:border-sky-300">
                <div className="w-1/3 h-1/3 text-sky-300 mb-2 transition-transform group-hover:scale-110"><TakeTestIcon /></div>
                <h3 className="font-display text-lg text-center text-white group-hover:accent-gradient-text">{t('sanctum_take_mbti_test')}</h3>
                <p className="text-xs text-center text-gray-400 mt-1 max-w-[80%]">{t('sanctum_take_mbti_desc')}</p>
            </button>
        </div>
    );
  };

  return (
    <div 
      className={`h-full w-full flex flex-col items-center justify-start md:justify-center transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, black)'}}
      />
      
      <div className={`relative z-10 w-full min-h-full p-4 flex flex-col`}>
          <header className="text-center py-4 flex-shrink-0">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold accent-gradient-text animate-fade-in" style={{animationDelay: '0.2s'}}>
                {t('sanctum_title')}
              </h1>
              <p className="mt-2 font-body text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.4s'}}>
                {t('sanctum_subtitle')}
              </p>
          </header>
          
          {/* Desktop View (Grid) */}
          <main className="hidden md:flex flex-col items-center justify-center flex-grow">
            <div className="grid grid-cols-[1fr,auto,1fr] grid-rows-[1fr,auto,1fr] gap-x-12 gap-y-8 w-full h-full p-8 max-w-screen-lg max-h-[700px]">
                
                <div className="col-start-1 row-start-1 flex justify-center items-center"><SanctumHotspot disabled={!hasMbtiResult} label={t('hotspot_map')} onClick={() => handleHotspotClick('map', false)} delay="0.5s"><MapIcon /></SanctumHotspot></div>
                <div className="col-start-2 row-start-1 flex justify-center items-center"><SanctumHotspot disabled={!hasMbtiResult} label={t('hotspot_report')} onClick={() => handleHotspotClick('scroll', true)} delay="0.6s"><ReportIcon /></SanctumHotspot></div>
                <div className="col-start-3 row-start-1 flex justify-center items-center"><SanctumHotspot disabled={!hasMbtiResult} label={t('hotspot_jung')} onClick={() => handleHotspotClick('jung', true)} delay="0.7s"><JungIcon /></SanctumHotspot></div>
                
                <div className="col-start-1 row-start-2 flex justify-center items-center"><SanctumHotspot label={t('hotspot_tapestry')} onClick={() => handleHotspotClick('tapestry', false)} delay="0.8s"><TapestryIcon /></SanctumHotspot></div>
                <div className="col-start-3 row-start-2 flex justify-center items-center"><SanctumHotspot disabled={!hasMbtiResult} label={t('hotspot_share')} onClick={() => handleHotspotClick('share', true)} delay="0.9s"><ShareIcon /></SanctumHotspot></div>

                <div className="col-start-1 row-start-3 flex justify-center items-center"><SanctumHotspot disabled={!hasMbtiResult} label={t('hotspot_dyads')} onClick={() => handleHotspotClick('comparison', true)} delay="1s"><DyadsIcon /></SanctumHotspot></div>
                <div className="col-start-2 row-start-3 flex justify-center items-center"><SanctumHotspot label={t('hotspot_trials')} onClick={() => handleHotspotClick('trials', false)} delay="1.1s"><TrialsIcon /></SanctumHotspot></div>
                <div className="col-start-3 row-start-3 flex justify-center items-center"><SanctumHotspot disabled={!hasAnyResult} label={t('hotspot_psychology')} onClick={() => handleHotspotClick('psychology', true)} delay="1.2s"><PsycheIcon /></SanctumHotspot></div>
                
                <div className="col-start-2 row-start-2 flex items-center justify-center w-64 h-64">
                    {renderCenter()}
                </div>
            </div>
          </main>

          {/* Mobile View (List) */}
          <main className="md:hidden flex-grow w-full max-w-md mx-auto py-8 flex flex-col items-center">
            <div className="w-48 h-48 sm:w-64 sm:h-64">
                {renderCenter()}
            </div>
            
            <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-sky-600/30 to-transparent"></div>
            
            <div className="grid grid-cols-2 gap-8 w-full">
                <SanctumHotspot disabled={!hasMbtiResult} label={t('hotspot_report')} onClick={() => handleHotspotClick('scroll', true)}><ReportIcon /></SanctumHotspot>
                <SanctumHotspot disabled={!hasMbtiResult} label={t('hotspot_jung')} onClick={() => handleHotspotClick('jung', true)}><JungIcon /></SanctumHotspot>
                <SanctumHotspot label={t('hotspot_trials')} onClick={() => handleHotspotClick('trials', false)}><TrialsIcon /></SanctumHotspot>
                <SanctumHotspot disabled={!hasAnyResult} label={t('hotspot_psychology')} onClick={() => handleHotspotClick('psychology', true)}><PsycheIcon /></SanctumHotspot>
                <SanctumHotspot label={t('hotspot_tapestry')} onClick={() => handleHotspotClick('tapestry', false)}><TapestryIcon /></SanctumHotspot>
                <SanctumHotspot disabled={!hasMbtiResult} label={t('hotspot_map')} onClick={() => handleHotspotClick('map', false)}><MapIcon /></SanctumHotspot>
                <SanctumHotspot disabled={!hasMbtiResult} label={t('hotspot_dyads')} onClick={() => handleHotspotClick('comparison', true)}><DyadsIcon /></SanctumHotspot>
                <SanctumHotspot disabled={!hasMbtiResult} label={t('hotspot_share')} onClick={() => handleHotspotClick('share', true)}><ShareIcon /></SanctumHotspot>
            </div>
          </main>
      </div>
    </div>
  );
};

export default SanctumOfSelf;