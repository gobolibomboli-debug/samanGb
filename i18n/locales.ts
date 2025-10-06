import { uiEn, uiFa } from './locales/ui';
import { questionsEn, questionsFa } from './locales/questions';
import { bigFiveEn, bigFiveFa } from './locales/bigFive';
import { mmpiEn, mmpiFa } from './locales/mmpi';
import { scl90En, scl90Fa } from './locales/scl90';
import { bdiEn, bdiFa } from './locales/bdi';
import { baiEn, baiFa } from './locales/bai';
import { eqiEn, eqiFa } from './locales/eqi';
import { profileStringsEn, profileStringsFa } from './locales/archetypes';
import { psychologyEn, psychologyFa } from './locales/psychology';

// Merge all English translations
const en = {
  ...uiEn,
  ...profileStringsEn,
  ...questionsEn,
  ...bigFiveEn,
  ...mmpiEn,
  ...scl90En,
  ...bdiEn,
  ...baiEn,
  ...eqiEn,
  ...psychologyEn,
};

// Merge all Farsi translations
const fa = {
  ...uiFa,
  ...profileStringsFa,
  ...questionsFa,
  ...bigFiveFa,
  ...mmpiFa,
  ...scl90Fa,
  ...bdiFa,
  ...baiFa,
  ...eqiFa,
  ...psychologyFa,
};

// Combine all translations
export const translations = {
  en,
  fa,
};
