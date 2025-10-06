import React from 'react';
import { Archetype } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import ArchetypeComparison from '../ArchetypeComparison';

interface ComparisonModalProps {
  dominantArchetype: Archetype;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ dominantArchetype }) => {
    const { t } = useLanguage();

    return (
        <div
            className="w-full h-full flex items-start justify-center p-4 animate-fade-in"
            role="region"
            aria-labelledby="comparison-title"
        >
            <div
                className="w-full max-w-5xl animate-fade-in-scale-up"
            >
                <header className="text-center mt-6 mb-8">
                    <h2 id="comparison-title" className="font-display text-4xl sm:text-5xl accent-gradient-text">{t('comparison_modal_title')}</h2>
                </header>

                <main className="p-6 md:p-8">
                   <ArchetypeComparison dominantArchetype={dominantArchetype} />
                </main>
            </div>
        </div>
    );
};

export default ComparisonModal;