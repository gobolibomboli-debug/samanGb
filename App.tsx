import React, { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import CosmicBackground from './components/CosmicBackground';
import { GameState, Result, Answer, UserInfo, AppView, FullMythosReport, AIArchetypeAnalysis, AssessmentState, BigFiveAssessmentState, OceanScores, MMPIAssessmentState, MMPIScores, SCL90AssessmentState, SCL90Scores, BDIAssessmentState, BDIScores, BAIAssessmentState, BAIScores, EQIAssessmentState, EQIScores } from './types';
import { calculateResult } from './services/assessmentService';
import { calculateBigFiveScores, BIG_FIVE_QUESTIONS } from './services/bigFiveService';
import { calculateMMPIScores, MMPI_QUESTIONS } from './services/mmpiService';
import { calculateSCL90Scores, SCL90_QUESTIONS } from './services/scl90Service';
import { calculateBDIScores, BDI_QUESTIONS } from './services/bdiService';
import { calculateBAIScores, BAI_QUESTIONS } from './services/baiService';
import { calculateEQIScores, EQI_QUESTIONS } from './services/eqiService';
import { useLanguage } from './contexts/LanguageContext';
import GlobalHeader from './components/GlobalHeader';
import { generateFullMythosReport, getAIJungianAnalysis, getBigFiveInterpretation, getMMPIInterpretation, getSCL90Interpretation, getBDIInterpretation, getBAIInterpretation, getEQIInterpretation, isApiAvailable } from './services/geminiService';
import { QUESTIONS } from './constants';
import * as storageService from './services/storageService';
import Notification from './components/Notification';
import ApiUnavailableModal from './components/ApiUnavailableModal';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy-loaded components for code splitting
const WelcomeScreen = lazy(() => import('./components/WelcomeScreen'));
const UserInfoScreen = lazy(() => import('./components/UserInfoScreen'));
const AssessmentScreen = lazy(() => import('./components/AssessmentScreen'));
const BigFiveAssessmentScreen = lazy(() => import('./components/BigFiveAssessmentScreen'));
const MMPIAssessmentScreen = lazy(() => import('./components/MMPIAssessmentScreen'));
const SCL90AssessmentScreen = lazy(() => import('./components/SCL90AssessmentScreen'));
const BDIAssessmentScreen = lazy(() => import('./components/BDIAssessmentScreen'));
const BAIAssessmentScreen = lazy(() => import('./components/BAIAssessmentScreen'));
const EQIAssessmentScreen = lazy(() => import('./components/EQIAssessmentScreen'));
const SanctumOfSelf = lazy(() => import('./components/sanctum-of-self/SanctumOfSelf'));
const ArchetypeProfile = lazy(() => import('./components/ArchetypeProfile'));
const LivingTapestry = lazy(() => import('./components/LivingTapestry'));
const AboutModal = lazy(() => import('./components/AboutModal'));
const ArchivesModal = lazy(() => import('./components/ArchivesModal'));
const ReportScrollModal = lazy(() => import('./components/sanctum-of-self/ReportScrollModal'));
const PantheonModal = lazy(() => import('./components/sanctum-of-self/PantheonModal'));
const AIAnalysisModal = lazy(() => import('./components/sanctum-of-self/AIAnalysisModal'));
const ComparisonModal = lazy(() => import('./components/sanctum-of-self/ComparisonModal'));
const ShareModal = lazy(() => import('./components/sanctum-of-self/ShareModal'));
const MythicalMap = lazy(() => import('./components/MythicalMap'));
const PsychologyExplorer = lazy(() => import('./components/psychology/PsychologyExplorer'));
const JungianChatModal = lazy(() => import('./components/JungianChatModal'));
const BigFiveResultModal = lazy(() => import('./components/BigFiveResultModal'));
const MMPIResultModal = lazy(() => import('./components/MMPIResultModal'));
const SCL90ResultModal = lazy(() => import('./components/SCL90ResultModal'));
const BDIResultModal = lazy(() => import('./components/BDIResultModal'));
const BAIResultModal = lazy(() => import('./components/BAIResultModal'));
const EQIResultModal = lazy(() => import('./components/EQIResultModal'));
const TrialsModal = lazy(() => import('./components/TrialsModal'));

type AnimationState = 'entering' | 'exiting' | 'idle';

const GlobalBackground: React.FC = () => (
  <div className="fixed inset-0 z-0" aria-hidden="true">
    <CosmicBackground />
  </div>
);

const SuspenseFallback: React.FC = () => (
  <div className="h-screen w-screen flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.WELCOME);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [bigFiveScores, setBigFiveScores] = useState<OceanScores | null>(null);
  const [mmpiScores, setMMPIScores] = useState<MMPIScores | null>(null);
  const [scl90Scores, setSCL90Scores] = useState<SCL90Scores | null>(null);
  const [bdiScores, setBDIScores] = useState<BDIScores | null>(null);
  const [baiScores, setBAIScores] = useState<BAIScores | null>(null);
  const [eqiScores, setEQIScores] = useState<EQIScores | null>(null);
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({ answers: {}, currentQuestionIndex: 0 });
  const [bigFiveAssessmentState, setBigFiveAssessmentState] = useState<BigFiveAssessmentState>({ answers: {}, currentQuestionIndex: 0 });
  const [mmpiAssessmentState, setMMPIAssessmentState] = useState<MMPIAssessmentState>({ answers: {}, currentQuestionIndex: 0 });
  const [scl90AssessmentState, setSCL90AssessmentState] = useState<SCL90AssessmentState>({ answers: {}, currentQuestionIndex: 0 });
  const [bdiAssessmentState, setBDIAssessmentState] = useState<BDIAssessmentState>({ answers: {}, currentQuestionIndex: 0 });
  const [baiAssessmentState, setBAIAssessmentState] = useState<BAIAssessmentState>({ answers: {}, currentQuestionIndex: 0 });
  const [eqiAssessmentState, setEQIAssessmentState] = useState<EQIAssessmentState>({ answers: {}, currentQuestionIndex: 0 });
  const [saveNotification, setSaveNotification] = useState('');
  const [hasSave, setHasSave] = useState(false);
  
  const [appView, setAppView] = useState<AppView>('sanctum');
  const [viewContext, setViewContext] = useState<any>({});
  const [fullReport, setFullReport] = useState<Partial<FullMythosReport> | null>(null);
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIArchetypeAnalysis[] | null>(null);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [bigFiveAnalysis, setBigFiveAnalysis] = useState<string | null>(null);
  const [isBigFiveAnalysisLoading, setIsBigFiveAnalysisLoading] = useState(false);
  const [mmpiAnalysis, setMMPIAnalysis] = useState<string | null>(null);
  const [isMMPIAnalysisLoading, setIsMMPIAnalysisLoading] = useState(false);
  const [scl90Analysis, setSCL90Analysis] = useState<string | null>(null);
  const [isSCL90AnalysisLoading, setIsSCL90AnalysisLoading] = useState(false);
  const [bdiAnalysis, setBDIAnalysis] = useState<string | null>(null);
  const [isBDIAnalysisLoading, setIsBDIAnalysisLoading] = useState(false);
  const [baiAnalysis, setBAIAnalysis] = useState<string | null>(null);
  const [isBAIAnalysisLoading, setIsBAIAnalysisLoading] = useState(false);
  const [eqiAnalysis, setEQIAnalysis] = useState<string | null>(null);
  const [isEQIAnalysisLoading, setIsEQIAnalysisLoading] = useState(false);
  const [showApiUnavailableModal, setShowApiUnavailableModal] = useState(false);
  
  const apiAvailable = isApiAvailable();

  const { language, dir, t } = useLanguage();
  
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.title = language === 'fa' ? 'پرسونای اسطوره' : 'Mythos Persona';
    setHasSave(storageService.hasSavedState());
    setAnimationState('entering');
  }, [language, dir]);

  const changeGameState = useCallback((newState: GameState) => {
    if (gameState === newState) return;
    setAnimationState('exiting');
    setTimeout(() => {
      setGameState(newState);
      setAnimationState('entering');
      if (newState === GameState.RESULT && gameState !== GameState.RESULT) {
        setAppView('sanctum');
        setViewContext({});
        setFullReport(null); setAiAnalysis(null); setAnalysisError(null);
        setBigFiveAnalysis(null); setMMPIAnalysis(null); setSCL90Analysis(null);
        setBDIAnalysis(null); setBAIAnalysis(null); setEQIAnalysis(null);
      }
    }, 500);
  }, [gameState]);
  
  const handleNavigate = useCallback((view: AppView, context: any = {}) => {
    setAppView(view);
    setViewContext(context);
  }, []);

  // --- SAVE/LOAD ---
  const handleSave = useCallback(() => {
    const stateToSave: storageService.SavedAppState = {
        gameState, userInfo, assessmentState, bigFiveAssessmentState, mmpiAssessmentState, scl90AssessmentState, bdiAssessmentState, baiAssessmentState, eqiAssessmentState, result, bigFiveScores, mmpiScores, scl90Scores, bdiScores, baiScores, eqiScores, fullReport, aiAnalysis, bigFiveAnalysis, mmpiAnalysis, scl90Analysis, bdiAnalysis, baiAnalysis, eqiAnalysis, appView, viewContext
    };
    if (storageService.saveState(stateToSave)) {
        setSaveNotification(gameState === GameState.RESULT ? t('personaSaved') : t('progressSaved'));
        setHasSave(true);
    }
  }, [gameState, userInfo, assessmentState, bigFiveAssessmentState, mmpiAssessmentState, scl90AssessmentState, bdiAssessmentState, baiAssessmentState, eqiAssessmentState, result, bigFiveScores, mmpiScores, scl90Scores, bdiScores, baiScores, eqiScores, fullReport, aiAnalysis, bigFiveAnalysis, mmpiAnalysis, scl90Analysis, bdiAnalysis, baiAnalysis, eqiAnalysis, appView, viewContext, t]);
  
  const handleLoad = useCallback(() => {
    const savedState = storageService.loadState();
    if (savedState) {
        setAnimationState('exiting');
        setTimeout(() => {
            setGameState(savedState.gameState); setUserInfo(savedState.userInfo);
            setAssessmentState(savedState.assessmentState || { answers: {}, currentQuestionIndex: 0 });
            setBigFiveAssessmentState(savedState.bigFiveAssessmentState || { answers: {}, currentQuestionIndex: 0 });
            setMMPIAssessmentState(savedState.mmpiAssessmentState || { answers: {}, currentQuestionIndex: 0 });
            setSCL90AssessmentState(savedState.scl90AssessmentState || { answers: {}, currentQuestionIndex: 0 });
            setBDIAssessmentState(savedState.bdiAssessmentState || { answers: {}, currentQuestionIndex: 0 });
            setBAIAssessmentState(savedState.baiAssessmentState || { answers: {}, currentQuestionIndex: 0 });
            setEQIAssessmentState(savedState.eqiAssessmentState || { answers: {}, currentQuestionIndex: 0 });
            setResult(savedState.result); setBigFiveScores(savedState.bigFiveScores || null);
            setMMPIScores(savedState.mmpiScores || null); setSCL90Scores(savedState.scl90Scores || null);
            setBDIScores(savedState.bdiScores || null); setBAIScores(savedState.baiScores || null);
            setEQIScores(savedState.eqiScores || null); setFullReport(savedState.fullReport);
            setAiAnalysis(savedState.aiAnalysis); setBigFiveAnalysis(savedState.bigFiveAnalysis || null);
            setMMPIAnalysis(savedState.mmpiAnalysis || null); setSCL90Analysis(savedState.scl90Analysis || null);
            setBDIAnalysis(savedState.bdiAnalysis || null); setBAIAnalysis(savedState.baiAnalysis || null);
            setEQIAnalysis(savedState.eqiAnalysis || null); setAppView(savedState.appView || 'sanctum');
            setViewContext(savedState.viewContext || {});
            setAnimationState('entering');
            setSaveNotification(t('state_loaded'));
        }, 500);
    }
  }, [t]);

  const handleClearSave = useCallback(() => {
    storageService.clearState();
    setHasSave(false);
    setSaveNotification(t('archives_cleared'));
  }, [t]);

  const restart = useCallback(() => {
    setAnimationState('exiting');
    setTimeout(() => {
      setResult(null); setBigFiveScores(null); setMMPIScores(null); setSCL90Scores(null);
      setBDIScores(null); setBAIScores(null); setEQIScores(null); setUserInfo(null);
      setGameState(GameState.WELCOME); setAssessmentState({ answers: {}, currentQuestionIndex: 0 });
      setBigFiveAssessmentState({ answers: {}, currentQuestionIndex: 0 });
      setMMPIAssessmentState({ answers: {}, currentQuestionIndex: 0 });
      setSCL90AssessmentState({ answers: {}, currentQuestionIndex: 0 });
      setBDIAssessmentState({ answers: {}, currentQuestionIndex: 0 });
      setBAIAssessmentState({ answers: {}, currentQuestionIndex: 0 });
      setEQIAssessmentState({ answers: {}, currentQuestionIndex: 0 });
      setAppView('sanctum'); setViewContext({}); setFullReport(null); setAiAnalysis(null);
      setAnalysisError(null); setBigFiveAnalysis(null); setMMPIAnalysis(null);
      setSCL90Analysis(null); setBDIAnalysis(null); setBAIAnalysis(null); setEQIAnalysis(null);
      handleClearSave();
      setAnimationState('entering');
    }, 500);
  }, [handleClearSave]);

  // --- Data Fetching ---
  const handleFetchReport = useCallback(async () => { if (fullReport || !result || isReportLoading) return; setIsReportLoading(true); try { const report = await generateFullMythosReport(result, language); setFullReport(report); } catch (error) { console.error("Error fetching Mythos Report:", error); setFullReport({ originStory: `**${t('genericError_title')}**:\n\n${t('genericError_desc')}` }); } finally { setIsReportLoading(false); } }, [fullReport, result, isReportLoading, language, t]);
  const handleFetchAnalysis = useCallback(async () => { if (!result || isAnalysisLoading) return; setIsAnalysisLoading(true); setAnalysisError(null); setAiAnalysis(null); try { const analysis = await getAIJungianAnalysis(result, language); const total = analysis.reduce((sum, item) => sum + item.percentage, 0); const normalized = analysis.map(item => ({...item, percentage: total > 0 ? (item.percentage / total) * 100 : 0})).sort((a,b) => b.percentage - a.percentage); setAiAnalysis(normalized); } catch (error) { console.error("Error fetching AI Analysis:", error); setAnalysisError(error instanceof Error ? error.message : t('genericError_desc')); setAiAnalysis(null); } finally { setIsAnalysisLoading(false); } }, [result, isAnalysisLoading, language, t]);
  const handleFetchBigFiveAnalysis = useCallback(async () => { if (!bigFiveScores || isBigFiveAnalysisLoading) return; setIsBigFiveAnalysisLoading(true); try { const analysisText = await getBigFiveInterpretation(bigFiveScores, language); setBigFiveAnalysis(analysisText); } catch (error) { console.error("Error fetching Big Five analysis:", error); setBigFiveAnalysis(error instanceof Error ? error.message : t('genericError_desc')); } finally { setIsBigFiveAnalysisLoading(false); } }, [bigFiveScores, isBigFiveAnalysisLoading, language, t]);
  const handleFetchMMPIAnalysis = useCallback(async () => { if (!mmpiScores || isMMPIAnalysisLoading) return; setIsMMPIAnalysisLoading(true); try { const analysisText = await getMMPIInterpretation(mmpiScores, language); setMMPIAnalysis(analysisText); } catch (error) { console.error("Error fetching MMPI analysis:", error); setMMPIAnalysis(error instanceof Error ? error.message : t('genericError_desc')); } finally { setIsMMPIAnalysisLoading(false); } }, [mmpiScores, isMMPIAnalysisLoading, language, t]);
  const handleFetchSCL90Analysis = useCallback(async () => { if (!scl90Scores || isSCL90AnalysisLoading) return; setIsSCL90AnalysisLoading(true); try { const analysisText = await getSCL90Interpretation(scl90Scores, language); setSCL90Analysis(analysisText); } catch (error) { console.error("Error fetching SCL-90 analysis:", error); setSCL90Analysis(error instanceof Error ? error.message : t('genericError_desc')); } finally { setIsSCL90AnalysisLoading(false); } }, [scl90Scores, isSCL90AnalysisLoading, language, t]);
  const handleFetchBDIAnalysis = useCallback(async () => { if (!bdiScores || isBDIAnalysisLoading) return; setIsBDIAnalysisLoading(true); try { const analysisText = await getBDIInterpretation(bdiScores, language); setBDIAnalysis(analysisText); } catch (error) { console.error("Error fetching BDI analysis:", error); setBDIAnalysis(error instanceof Error ? error.message : t('genericError_desc')); } finally { setIsBDIAnalysisLoading(false); } }, [bdiScores, isBDIAnalysisLoading, language, t]);
  const handleFetchBAIAnalysis = useCallback(async () => { if (!baiScores || isBAIAnalysisLoading) return; setIsBAIAnalysisLoading(true); try { const analysisText = await getBAIInterpretation(baiScores, language); setBAIAnalysis(analysisText); } catch (error) { console.error("Error fetching BAI analysis:", error); setBAIAnalysis(error instanceof Error ? error.message : t('genericError_desc')); } finally { setIsBAIAnalysisLoading(false); } }, [baiScores, isBAIAnalysisLoading, language, t]);
  const handleFetchEQIAnalysis = useCallback(async () => { if (!eqiScores || isEQIAnalysisLoading) return; setIsEQIAnalysisLoading(true); try { const analysisText = await getEQIInterpretation(eqiScores, language); setEQIAnalysis(analysisText); } catch (error) { console.error("Error fetching EQI analysis:", error); setEQIAnalysis(error instanceof Error ? error.message : t('genericError_desc')); } finally { setIsEQIAnalysisLoading(false); } }, [eqiScores, isEQIAnalysisLoading, language, t]);

  // --- Journey Logic ---
  const startJourney = useCallback(() => { changeGameState(GameState.USER_INFO); }, [changeGameState]);
  const handleUserInfoSubmit = useCallback((info: UserInfo) => { setUserInfo(info); changeGameState(GameState.ASSESSMENT); }, [changeGameState]);
  const handleTakeTest = useCallback((test: 'bigfive' | 'mmpi' | 'scl90' | 'bdi' | 'bai' | 'eqi') => {
    const stateMap = { bigfive: GameState.BIG_FIVE_ASSESSMENT, mmpi: GameState.MMPI_ASSESSMENT, scl90: GameState.SCL90_ASSESSMENT, bdi: GameState.BDI_ASSESSMENT, bai: GameState.BAI_ASSESSMENT, eqi: GameState.EQI_ASSESSMENT };
    changeGameState(stateMap[test]);
  }, [changeGameState]);
  
  const createFinishAssessmentHandler = (setter: (scores: any) => void, analysisSetter: (analysis: null) => void, resultView: AppView) => useCallback((answers: any) => {
    if (!userInfo) { restart(); return; }
    let scores;
    if (resultView === 'five_factor_result') scores = calculateBigFiveScores(answers);
    else if (resultView === 'mmpi_result') scores = calculateMMPIScores(answers);
    else if (resultView === 'scl90_result') scores = calculateSCL90Scores(answers);
    else if (resultView === 'bdi_result') scores = calculateBDIScores(answers);
    else if (resultView === 'bai_result') scores = calculateBAIScores(answers);
    else if (resultView === 'eqi_result') scores = calculateEQIScores(answers);
    setter(scores); analysisSetter(null);
    setAnimationState('exiting');
    setTimeout(() => { setGameState(GameState.RESULT); setAppView(resultView); setAnimationState('entering'); }, 500);
  }, [userInfo, restart, setter, analysisSetter, resultView]);

  const finishAssessment = useCallback((answers: Answer[]) => { if (!userInfo) { restart(); return; } const calculatedResult = calculateResult(answers, userInfo); setResult(calculatedResult); changeGameState(GameState.RESULT); }, [changeGameState, userInfo, restart]);
  const finishBigFiveAssessment = createFinishAssessmentHandler(setBigFiveScores, setBigFiveAnalysis, 'five_factor_result');
  const finishMMPIAssessment = createFinishAssessmentHandler(setMMPIScores, setMMPIAnalysis, 'mmpi_result');
  const finishSCL90Assessment = createFinishAssessmentHandler(setSCL90Scores, setSCL90Analysis, 'scl90_result');
  const finishBDIAssessment = createFinishAssessmentHandler(setBDIScores, setBDIAnalysis, 'bdi_result');
  const finishBAIAssessment = createFinishAssessmentHandler(setBAIScores, setBAIAnalysis, 'bai_result');
  const finishEQIAssessment = createFinishAssessmentHandler(setEQIScores, setEQIAnalysis, 'eqi_result');
  
  // --- Progress Updaters ---
  const createProgressUpdater = (state: any, setState: any, questions: any[], finishFn: (answers: any) => void) => useCallback((id: number, answer: any) => {
    const newAnswers = { ...state.answers, [id]: answer };
    if (state.currentQuestionIndex < questions.length - 1) { setState({ answers: newAnswers, currentQuestionIndex: state.currentQuestionIndex + 1 }); }
    else { setState(prev => ({...prev, answers: newAnswers})); finishFn(newAnswers); }
  }, [state, setState, questions, finishFn]);
  
  const updateAssessmentProgress = useCallback((questionId: number, choice: 'A' | 'B') => {
    const newAnswers = { ...assessmentState.answers, [questionId]: choice };
    if (assessmentState.currentQuestionIndex < QUESTIONS.length - 1) { setAssessmentState({ answers: newAnswers, currentQuestionIndex: assessmentState.currentQuestionIndex + 1 }); }
    else { const finalAnswers = QUESTIONS.map(q => ({ questionId: q.id, choice: newAnswers[q.id] || (Math.random() < 0.5 ? 'A' : 'B') })); setAssessmentState(prev => ({...prev, answers: newAnswers})); finishAssessment(finalAnswers); }
  }, [assessmentState, finishAssessment]);
  const updateBigFiveProgress = createProgressUpdater(bigFiveAssessmentState, setBigFiveAssessmentState, BIG_FIVE_QUESTIONS, finishBigFiveAssessment);
  const updateMMPIProgress = createProgressUpdater(mmpiAssessmentState, setMMPIAssessmentState, MMPI_QUESTIONS, finishMMPIAssessment);
  const updateSCL90Progress = createProgressUpdater(scl90AssessmentState, setSCL90AssessmentState, SCL90_QUESTIONS, finishSCL90Assessment);
  const updateBDIProgress = createProgressUpdater(bdiAssessmentState, setBDIAssessmentState, BDI_QUESTIONS, finishBDIAssessment);
  const updateBAIProgress = createProgressUpdater(baiAssessmentState, setBAIAssessmentState, BAI_QUESTIONS, finishBAIAssessment);
  const updateEQIProgress = createProgressUpdater(eqiAssessmentState, setEQIAssessmentState, EQI_QUESTIONS, finishEQIAssessment);

  // --- Back Handlers ---
  const createBackHandler = (setter: any) => useCallback(() => setter((prev: any) => ({ ...prev, currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1) })), [setter]);
  const handleAssessmentBack = createBackHandler(setAssessmentState);
  const handleBigFiveBack = createBackHandler(setBigFiveAssessmentState);
  const handleMMPIBack = createBackHandler(setMMPIAssessmentState);
  const handleSCL90Back = createBackHandler(setSCL90AssessmentState);
  const handleBDIBack = createBackHandler(setBDIAssessmentState);
  const handleBAIBack = createBackHandler(setBAIAssessmentState);
  const handleEQIBack = createBackHandler(setEQIAssessmentState);

  // --- Finish Randomly Handlers ---
  const createFinishRandomlyHandler = (state: any, questions: any[], finishFn: (answers: any) => void, randomValueFn: () => any) => useCallback(() => {
    const allAnswers = { ...state.answers };
    questions.forEach(q => { if (allAnswers[q.id] === undefined) { allAnswers[q.id] = randomValueFn(); } });
    finishFn(allAnswers);
  }, [state.answers, questions, finishFn, randomValueFn]);
  const handleFinishRandomly = useCallback(() => { const allAnswers = QUESTIONS.map(q => ({ questionId: q.id, choice: assessmentState.answers[q.id] || (Math.random() < 0.5 ? 'A' : 'B') })); finishAssessment(allAnswers); }, [assessmentState.answers, finishAssessment]);
  const handleBigFiveFinishRandomly = createFinishRandomlyHandler(bigFiveAssessmentState, BIG_FIVE_QUESTIONS, finishBigFiveAssessment, () => Math.floor(Math.random() * 5) + 1);
  const handleMMPIFinishRandomly = createFinishRandomlyHandler(mmpiAssessmentState, MMPI_QUESTIONS, finishMMPIAssessment, () => Math.random() < 0.5);
  const handleSCL90FinishRandomly = createFinishRandomlyHandler(scl90AssessmentState, SCL90_QUESTIONS, finishSCL90Assessment, () => Math.floor(Math.random() * 5));
  const handleBDIFinishRandomly = createFinishRandomlyHandler(bdiAssessmentState, BDI_QUESTIONS, finishBDIAssessment, () => Math.floor(Math.random() * 4));
  const handleBAIFinishRandomly = createFinishRandomlyHandler(baiAssessmentState, BAI_QUESTIONS, finishBAIAssessment, () => Math.floor(Math.random() * 4));
  const handleEQIFinishRandomly = createFinishRandomlyHandler(eqiAssessmentState, EQI_QUESTIONS, finishEQIAssessment, () => Math.floor(Math.random() * 5) + 1);
  
  const animationClass = animationState === 'entering' ? 'animate-slide-in' : animationState === 'exiting' ? 'animate-slide-out' : 'opacity-0';

  const renderPreResultContent = () => {
    const screens = {
      [GameState.WELCOME]: <WelcomeScreen hasSaveData={hasSave} onStart={startJourney} onLoad={handleLoad} onOpenTapestry={() => { setResult(null); setGameState(GameState.RESULT); handleNavigate('tapestry'); }} />,
      [GameState.USER_INFO]: <UserInfoScreen onSubmit={handleUserInfoSubmit} />,
      [GameState.ASSESSMENT]: <AssessmentScreen assessmentState={assessmentState} onAnswer={updateAssessmentProgress} onBack={handleAssessmentBack} onSave={handleSave} onFinishRandomly={handleFinishRandomly} />,
      [GameState.BIG_FIVE_ASSESSMENT]: <BigFiveAssessmentScreen assessmentState={bigFiveAssessmentState} onAnswer={updateBigFiveProgress} onBack={handleBigFiveBack} onFinishRandomly={handleBigFiveFinishRandomly} />,
      [GameState.MMPI_ASSESSMENT]: <MMPIAssessmentScreen assessmentState={mmpiAssessmentState} onAnswer={updateMMPIProgress} onBack={handleMMPIBack} onFinishRandomly={handleMMPIFinishRandomly} />,
      [GameState.SCL90_ASSESSMENT]: <SCL90AssessmentScreen assessmentState={scl90AssessmentState} onAnswer={updateSCL90Progress} onBack={handleSCL90Back} onFinishRandomly={handleSCL90FinishRandomly} />,
      [GameState.BDI_ASSESSMENT]: <BDIAssessmentScreen assessmentState={bdiAssessmentState} onAnswer={updateBDIProgress} onBack={handleBDIBack} onFinishRandomly={handleBDIFinishRandomly} />,
      [GameState.BAI_ASSESSMENT]: <BAIAssessmentScreen assessmentState={baiAssessmentState} onAnswer={updateBAIProgress} onBack={handleBAIBack} onFinishRandomly={handleBAIFinishRandomly} />,
      [GameState.EQI_ASSESSMENT]: <EQIAssessmentScreen assessmentState={eqiAssessmentState} onAnswer={updateEQIProgress} onBack={handleEQIBack} onFinishRandomly={handleEQIFinishRandomly} />,
    };
    return screens[gameState] || null;
  };

  const renderResultContent = () => {
    const hasAnyResult = !!(result || bigFiveScores || mmpiScores || scl90Scores || bdiScores || baiScores || eqiScores);
    
    const sanctum = <SanctumOfSelf result={result} bigFiveScores={bigFiveScores} mmpiScores={mmpiScores} scl90Scores={scl90Scores} bdiScores={bdiScores} baiScores={baiScores} eqiScores={eqiScores} onNavigate={handleNavigate} apiAvailable={apiAvailable} onApiDisabledClick={() => setShowApiUnavailableModal(true)} />;

    if (!hasAnyResult && appView !== 'tapestry') {
      return sanctum;
    }

    const modalViews: Partial<Record<AppView, React.ReactNode>> = {
      profile: <ArchetypeProfile profileId={viewContext.profileId} />,
      tapestry: <LivingTapestry dominantArchetypeId={result?.dominantArchetype.id ?? null} onClose={() => handleNavigate('sanctum')} onViewArchetype={(id) => handleNavigate('profile', { profileId: id })} />,
      five_factor_result: <BigFiveResultModal scores={bigFiveScores} onTakeTest={() => handleTakeTest('bigfive')} analysis={bigFiveAnalysis} isLoading={isBigFiveAnalysisLoading} onFetchAnalysis={handleFetchBigFiveAnalysis} apiAvailable={apiAvailable} onApiDisabledClick={() => setShowApiUnavailableModal(true)} />,
      mmpi_result: <MMPIResultModal scores={mmpiScores} onTakeTest={() => handleTakeTest('mmpi')} analysis={mmpiAnalysis} isLoading={isMMPIAnalysisLoading} onFetchAnalysis={handleFetchMMPIAnalysis} apiAvailable={apiAvailable} onApiDisabledClick={() => setShowApiUnavailableModal(true)} />,
      scl90_result: <SCL90ResultModal scores={scl90Scores} onTakeTest={() => handleTakeTest('scl90')} analysis={scl90Analysis} isLoading={isSCL90AnalysisLoading} onFetchAnalysis={handleFetchSCL90Analysis} apiAvailable={apiAvailable} onApiDisabledClick={() => setShowApiUnavailableModal(true)} />,
      bdi_result: <BDIResultModal scores={bdiScores} onTakeTest={() => handleTakeTest('bdi')} analysis={bdiAnalysis} isLoading={isBDIAnalysisLoading} onFetchAnalysis={handleFetchBDIAnalysis} apiAvailable={apiAvailable} onApiDisabledClick={() => setShowApiUnavailableModal(true)} />,
      bai_result: <BAIResultModal scores={baiScores} onTakeTest={() => handleTakeTest('bai')} analysis={baiAnalysis} isLoading={isBAIAnalysisLoading} onFetchAnalysis={handleFetchBAIAnalysis} apiAvailable={apiAvailable} onApiDisabledClick={() => setShowApiUnavailableModal(true)} />,
      eqi_result: <EQIResultModal scores={eqiScores} onTakeTest={() => handleTakeTest('eqi')} analysis={eqiAnalysis} isLoading={isEQIAnalysisLoading} onFetchAnalysis={handleFetchEQIAnalysis} apiAvailable={apiAvailable} onApiDisabledClick={() => setShowApiUnavailableModal(true)} />,
      map: result ? <MythicalMap dominantArchetypeId={result.dominantArchetype.id} onClose={() => handleNavigate('sanctum')} onViewArchetype={(id) => handleNavigate('profile', { profileId: id })} /> : null,
      scroll: result ? <ReportScrollModal result={result} fullReport={fullReport} isLoading={isReportLoading} onFetchReport={handleFetchReport} /> : null,
      pantheon: result ? <PantheonModal distribution={result.archetypeDistribution} onViewProfile={(id) => handleNavigate('profile', { profileId: id })} /> : null,
      jung: result ? <AIAnalysisModal result={result} analysis={aiAnalysis} isLoading={isAnalysisLoading} onFetchAnalysis={handleFetchAnalysis} onOpenChat={() => handleNavigate('jung-chat')} analysisError={analysisError} /> : null,
      'jung-chat': result ? <JungianChatModal result={result} /> : null,
      comparison: result ? <ComparisonModal dominantArchetype={result.dominantArchetype} /> : null,
      share: result ? <ShareModal result={result} fullReport={fullReport} isReportLoading={isReportLoading} onFetchReport={handleFetchReport} /> : null,
      psychology: hasAnyResult ? <PsychologyExplorer result={result} bigFiveScores={bigFiveScores} mmpiScores={mmpiScores} scl90Scores={scl90Scores} bdiScores={bdiScores} baiScores={baiScores} eqiScores={eqiScores} onExit={() => handleNavigate('sanctum')} /> : null,
      about: <AboutModal />,
      archives: <ArchivesModal onSave={handleSave} onLoad={handleLoad} onClear={handleClearSave} hasSave={hasSave} />,
      trials: <TrialsModal result={result} bigFiveScores={bigFiveScores} mmpiScores={mmpiScores} scl90Scores={scl90Scores} bdiScores={bdiScores} baiScores={baiScores} eqiScores={eqiScores} onTakeTest={handleTakeTest} onRestart={restart} onNavigate={handleNavigate} />,
    };

    const isModalOpen = appView !== 'sanctum';
    const modalContent = modalViews[appView] || null;

    return (
      <div className="h-full w-full flex flex-col">
        <GlobalHeader currentView={appView} onNavigate={handleNavigate} />
        <main className="flex-grow pt-16 overflow-hidden relative">
          <div className={`h-full w-full transition-all duration-700 ease-in-out ${isModalOpen ? 'blur-lg scale-95 brightness-50' : ''}`}>
            {sanctum}
          </div>
          {isModalOpen && (
            <div className="absolute inset-0 pt-16 overflow-y-auto custom-scrollbar">
              <Suspense fallback={<SuspenseFallback />}>{modalContent}</Suspense>
            </div>
          )}
        </main>
      </div>
    );
  };
  
  return (
    <div className="w-screen h-screen">
      <GlobalBackground />
      <div className={`relative z-10 w-full h-full glass-panel rounded-none sm:rounded-2xl sm:m-4 sm:h-[calc(100%-2rem)] sm:w-[calc(100%-2rem)] overflow-hidden ${animationClass}`}>
        <Suspense fallback={<SuspenseFallback />}>
          {gameState !== GameState.RESULT ? renderPreResultContent() : renderResultContent()}
        </Suspense>
      </div>
      {saveNotification && <Notification message={saveNotification} onClose={() => setSaveNotification('')} />}
      {showApiUnavailableModal && <ApiUnavailableModal onClose={() => setShowApiUnavailableModal(false)} />}
    </div>
  );
};

export default App;