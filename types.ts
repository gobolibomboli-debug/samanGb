export enum GameState {
  WELCOME,
  USER_INFO,
  ASSESSMENT, // Original MBTI assessment
  BIG_FIVE_ASSESSMENT, // New Big Five assessment
  MMPI_ASSESSMENT, // New MMPI-style assessment
  SCL90_ASSESSMENT, // New SCL-90-R assessment
  BDI_ASSESSMENT, // New BDI-II assessment
  BAI_ASSESSMENT, // New BAI assessment
  EQI_ASSESSMENT, // New EQ-i assessment
  RESULT,
}

// NEW: A unified type for all possible views in the RESULT game state.
export type AppView = 
  | 'sanctum'
  | 'profile'
  | 'tapestry'
  | 'map'
  | 'scroll'
  | 'pantheon'
  | 'jung'
  | 'jung-chat'
  | 'comparison'
  | 'share'
  | 'about'
  | 'archives'
  | 'psychology'
  | 'five_factor_result'
  | 'mmpi_result'
  | 'scl90_result'
  | 'bdi_result'
  | 'bai_result'
  | 'eqi_result'
  | 'trials';


export enum ArchetypeId {
  ATHENA = 'Athena',
  ARES = 'Ares',
  APOLLO = 'Apollo',
  ARTEMIS = 'Artemis',
  ZEUS = 'Zeus',
  HERA = 'Hera',
  POSEIDON = 'Poseidon',
  HADES = 'Hades',
  APHRODITE = 'Aphrodite',
  HEPHAESTUS = 'Hephaestus',
  HERMES = 'Hermes',
  DIONYSUS = 'Dionysus',
  DEMETER = 'Demeter',
  PERSEPHONE = 'Persephone',
  HESTIA = 'Hestia',
  PROMETHEUS = 'Prometheus',
}

export enum NarrativeDomain {
  ORIGIN = 'originStory',
  CAREER = 'career',
  RELATIONSHIPS = 'relationships',
  GROWTH = 'growth',
  PANTHEON = 'pantheon',
  SHADOW = 'shadow',
  COMPARISONS = 'comparisons',
}

export enum AnalysisType {
  PANTHEON = 'Inner Pantheon',
  SHADOW = 'Shadow & Light',
}

export type RelationType = 'ally' | 'rival' | 'family' | 'complement' | 'consort';

export interface ThematicImages {
  origin: string;
  career: string;
  relationships: string;
  growth: string;
}

// --- NEW DEITY PROFILE STRUCTURE ---
export interface MythicEvent {
    titleKey: string;
    descriptionKey: string;
}

export interface DeitySymbol {
    iconId: string;
    titleKey: string;
    descriptionKey: string;
}

export interface DeityInteractive {
    type: 'interactive';
    titleKey: string;
    descriptionKey: string;
    interactiveId: string;
}

export interface ModernEcho {
    echoKey: string;
    explanationKey: string;
}

export interface Mythos {
    summaryKey: string;
    constellation: MythicEvent[];
}

export interface DomainsAndPowers {
    summaryKey: string; // The original domain
    symbols: DeitySymbol[];
    interactives: DeityInteractive[];
}

export interface Resonance {
    summaryKey: string; // The legacy summary
    modernEchoes: ModernEcho[];
    archetypalMirrorKey: string;
}


export interface Archetype {
  id: string;
  name: string; // translation key
  gender: 'male' | 'female';
  domain: string; // Used for simple display, main content is in domains object
  mbtiMapping: string[];
  strengths: string[];
  shadows: string[];
  
  // NEW STRUCTURE
  mythos: Mythos;
  domains: DomainsAndPowers;
  resonance: Resonance;
}

export interface Question {
  id: number;
  dimension: 'E/I' | 'S/N' | 'T/F' | 'J/P';
  optionA: { pole: 'E' | 'S' | 'T' | 'J' };
  optionB: { pole: 'I' | 'N' | 'F' | 'P' };
}

export interface Answer {
  questionId: number;
  choice: 'A' | 'B';
}

export interface UserInfo {
  name: string;
  gender: 'male' | 'female';
}

export interface Result {
  mbtiType: string;
  dominantArchetype: Archetype;
  archetypeDistribution: { archetype: Archetype; score: number }[];
  mbtiScores: Record<string, number>;
  userInfo: UserInfo;
}

export interface FullMythosReport {
  originStory: string;
  career: string;
  relationships: string;
  growth: string;
  pantheon: string;
  shadow: string;
  comparisons: string;
}

export interface AIArchetypeAnalysis {
  archetypeId: string;
  name: string;
  percentage: number;
  reasoning: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface OceanScores {
  N: number; // Neuroticism
  E: number; // Extraversion
  O: number; // Openness
  A: number; // Agreeableness
  C: number; // Conscientiousness
}

// --- New types for MMPI-style Assessment ---
export interface MMPIScores {
  Hs: number; // Hypochondriasis
  D: number;  // Depression
  Hy: number; // Hysteria
  Pd: number; // Psychopathic Deviate
  Mf: number; // Masculinity-Femininity
  Pa: number; // Paranoia
  Pt: number; // Psychasthenia
  Sc: number; // Schizophrenia
  Ma: number; // Hypomania
  Si: number; // Social Introversion
}

// --- New types for SCL-90-R Assessment ---
export type SCL90Dimension = 
  | 'SOM' // Somatization
  | 'OC'  // Obsessive-Compulsive
  | 'IS'  // Interpersonal Sensitivity
  | 'DEP' // Depression
  | 'ANX' // Anxiety
  | 'HOS' // Hostility
  | 'PHOB'// Phobic Anxiety
  | 'PAR' // Paranoid Ideation
  | 'PSY';// Psychoticism

export interface SCL90Scores {
  dimensions: Record<SCL90Dimension, number>;
  GSI: number; // Global Severity Index
  PST: number; // Positive Symptom Total
  PSDI: number; // Positive Symptom Distress Index
}

// --- New types for BDI-II Assessment ---
export type BDIScoreLevel = 'minimal' | 'mild' | 'moderate' | 'severe';
export interface BDIScores {
  score: number;
  level: BDIScoreLevel;
}

// --- New types for BAI Assessment ---
export type BAIScoreLevel = 'minimal' | 'mild' | 'moderate' | 'severe';
export interface BAIScores {
  score: number;
  level: BAIScoreLevel;
}

// --- New types for EQ-i Assessment ---
export type EQIComposite = 'intrapersonal' | 'interpersonal' | 'stressManagement' | 'adaptability' | 'generalMood';
export type EQIScoreLevel = 'developing' | 'functional' | 'proficient' | 'exemplary';

export interface EQIScores {
  total: number;
  composites: Record<EQIComposite, number>;
  level: EQIScoreLevel;
}


// --- New types for Psychology Exploration ---

export type PsychologyCategory = 
  | 'Psychodynamic' 
  | 'Cognitive-Behavioral' 
  | 'Humanistic-Existential'
  | 'Family-Systems'
  | 'Trauma-Body-Neuroscience'
  | 'Positive-Cultural';

export type PsychologyTheme = 'psychodynamic' | 'cbt' | 'humanistic' | 'systems' | 'neuro' | 'positive';


export interface TimelineEvent {
    year: string;
    eventKey: string;
    descriptionKey: string;
}

export interface KeyConcept {
    type: 'text' | 'interactive';
    titleKey: string;
    descriptionKey: string;
    interactiveId?: string;
}

export interface LegacyInYourLifeExample {
    exampleKey: string;
    explanationKey: string;
}

export interface Legacy {
    summaryKey: string;
    inYourLife: LegacyInYourLifeExample[];
}

export interface Psychologist {
    id: string;
    name: string;
    schoolId: string;
    basePrompt: string;
    relevanceTags?: (ArchetypeId | 'archetype_focus' | 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P' | 'ENFP' | 'INFP' | 'ENTJ' | 'INTJ' | 'ESFJ' | 'ISFJ' | 'ESTP' | 'ISTP' | 'ENFJ' | 'INFJ' | 'ESTJ' | 'ISTJ' | 'ESFP' | 'INTP' | 'ISFP' | 'ENTP')[];
    theme: PsychologyTheme;
    placeholderKey: string;
    greetingKey: string;
    // NEW STRUCTURE
    quoteKey: string;
    biography: {
        summaryKey: string;
        timeline: TimelineEvent[];
    };
    concepts: KeyConcept[];
    legacy: Legacy;
}


export interface PsychologicalSchool {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    category: PsychologyCategory;
    psychologistIds: string[];
}

// --- New types for Save/Load State ---
export interface AssessmentState {
  answers: Record<number, 'A' | 'B'>;
  currentQuestionIndex: number;
}

// New state for Big Five Assessment
export interface BigFiveAssessmentState {
  answers: Record<number, number>; // questionId -> score (1-5)
  currentQuestionIndex: number;
}

// New state for MMPI-style Assessment
export interface MMPIAssessmentState {
  answers: Record<number, boolean>; // questionId -> true/false
  currentQuestionIndex: number;
}

// New state for SCL-90-R Assessment
export interface SCL90AssessmentState {
  answers: Record<number, number>; // questionId -> score (0-4)
  currentQuestionIndex: number;
}

// New state for BDI-II Assessment
export interface BDIAssessmentState {
  answers: Record<number, number>; // questionId -> score (0-3)
  currentQuestionIndex: number;
}

// New state for BAI Assessment
export interface BAIAssessmentState {
  answers: Record<number, number>; // questionId -> score (0-3)
  currentQuestionIndex: number;
}

// New state for EQ-i Assessment
export interface EQIAssessmentState {
  answers: Record<number, number>; // questionId -> score (1-5)
  currentQuestionIndex: number;
}


export interface SavedAppState {
  gameState: GameState;
  userInfo: UserInfo | null;
  assessmentState: AssessmentState | null;
  bigFiveAssessmentState: BigFiveAssessmentState | null;
  mmpiAssessmentState: MMPIAssessmentState | null;
  scl90AssessmentState: SCL90AssessmentState | null;
  bdiAssessmentState: BDIAssessmentState | null;
  baiAssessmentState: BAIAssessmentState | null;
  eqiAssessmentState: EQIAssessmentState | null;
  result: Result | null;
  bigFiveScores: OceanScores | null;
  mmpiScores: MMPIScores | null;
  scl90Scores: SCL90Scores | null;
  bdiScores: BDIScores | null;
  baiScores: BAIScores | null;
  eqiScores: EQIScores | null;
  fullReport: Partial<FullMythosReport> | null;
  aiAnalysis: AIArchetypeAnalysis[] | null;
  bigFiveAnalysis: string | null;
  mmpiAnalysis: string | null;
  scl90Analysis: string | null;
  bdiAnalysis: string | null;
  baiAnalysis: string | null;
  eqiAnalysis: string | null;
  appView: AppView;
  viewContext: any;
}
