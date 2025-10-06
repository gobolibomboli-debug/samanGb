import React from 'react';
import { Result } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import ArchetypeDistributionChart from '../ArchetypeDistributionChart';

interface PantheonModalProps {
  distribution: Result['archetypeDistribution'];
  onViewProfile: (archetypeId: string) => void;
}

const PantheonModal: React.FC<PantheonModalProps> = ({ distribution, onViewProfile }) => {
    const { t } = useLanguage();

    return (
        <div
            className="w-full h-full flex items-start justify-center p-4 animate-fade-in"
            role="region"
            aria-labelledby="pantheon-title"
        >
            <div
                className="w-full max-w-3xl animate-fade-in-scale-up"
            >
                <header className="text-center mt-6 mb-8">
                    <h2 id="pantheon-title" className="font-display text-4xl sm:text-5xl accent-gradient-text">{t('pantheon_modal_title')}</h2>
                </header>

                <main className="p-6 md:p-8">
                   <ArchetypeDistributionChart distribution={distribution} onViewProfile={onViewProfile} />
                </main>
            </div>
        </div>
    );
};

export default PantheonModal;