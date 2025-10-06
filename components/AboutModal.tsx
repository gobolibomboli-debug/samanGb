import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Accordion, AccordionItem } from './Accordion';

interface AboutModalProps {}

const GuideSubSection: React.FC<{ titleKey: string; pKey: string }> = ({ titleKey, pKey }) => {
  const { t } = useLanguage();
  return (
    <div className="ml-4 pl-4 border-l-2 border-sky-400/20">
      <h4 className="font-display text-xl text-sky-200">{t(titleKey)}</h4>
      <p className="mt-1 text-base">{t(pKey)}</p>
    </div>
  );
};


const AboutModal: React.FC<AboutModalProps> = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full h-full flex items-start justify-center p-4 animate-fade-in">
        <div className="w-full max-w-4xl animate-fade-in-scale-up">
            <header className="text-center mb-10">
                <h2 className="font-display text-4xl sm:text-5xl accent-gradient-text animate-text-flicker-glow">{t('guide_title')}</h2>
            </header>

            <main className="flex-grow">
                <Accordion defaultOpenId="intro">
                    <AccordionItem id="intro" title={t('guide_intro_title')}>
                        <p>{t('guide_intro_p1')}</p>
                        <p>{t('guide_intro_p2')}</p>
                    </AccordionItem>
                    <AccordionItem id="journey" title={t('guide_journey_title')}>
                        <div className="space-y-4">
                            <GuideSubSection titleKey="guide_journey_welcome_title" pKey="guide_journey_welcome_p1" />
                            <GuideSubSection titleKey="guide_journey_userinfo_title" pKey="guide_journey_userinfo_p1" />
                            <GuideSubSection titleKey="guide_journey_assessment_title" pKey="guide_journey_assessment_p1" />
                        </div>
                    </AccordionItem>
                    <AccordionItem id="sanctum" title={t('guide_sanctum_title')}>
                        <p>{t('guide_sanctum_p1')}</p>
                        <div className="space-y-4 mt-4">
                            <GuideSubSection titleKey="guide_sanctum_sigil_title" pKey="guide_sanctum_sigil_p1" />
                            <h4 className="font-display text-xl text-sky-200 pt-4">{t('guide_sanctum_hotspots_title')}</h4>
                            <div className="ml-4 pl-4 border-l-2 border-sky-400/20 space-y-4">
                                <p className="text-sm text-gray-400">The Sanctum is surrounded by interactive hotspots. Here’s what they do:</p>
                                <ul className="list-disc list-inside text-base space-y-3">
                                    <li><strong>{t('guide_sanctum_report_title')}:</strong> {t('guide_sanctum_report_p1')}</li>
                                    <li><strong>{t('guide_sanctum_pantheon_title')}:</strong> {t('guide_sanctum_pantheon_p1')}</li>
                                    <li><strong>{t('guide_sanctum_jung_title')}:</strong> {t('guide_sanctum_jung_p1')}</li>
                                    <li><strong>{t('guide_sanctum_dyads_title')}:</strong> {t('guide_sanctum_dyads_p1')}</li>
                                    <li><strong>{t('guide_sanctum_tapestry_title')}:</strong> {t('guide_sanctum_tapestry_p1')}</li>
                                    <li><strong>{t('guide_sanctum_map_title')}:</strong> {t('guide_sanctum_map_p1')}</li>
                                    <li><strong>{t('guide_sanctum_share_title')}:</strong> {t('guide_sanctum_share_p1')}</li>
                                    <li><strong>{t('guide_sanctum_restart_title')}:</strong> {t('guide_sanctum_restart_p1')}</li>
                                </ul>
                            </div>
                        </div>
                    </AccordionItem>
                    <AccordionItem id="interpretation" title={t('guide_interpretation_title')}>
                        <p>{t('guide_interpretation_p1')}</p>
                    </AccordionItem>
                    <AccordionItem id="archives" title={t('guide_archives_title')}>
                        <p>{t('guide_archives_p1')}</p>
                    </AccordionItem>
                </Accordion>
            </main>
        </div>
    </div>
  );
};

export default AboutModal;