import React, { useState, createContext, useContext, ReactNode } from 'react';

interface AccordionContextType {
  openItemId: string | null;
  setOpenItemId: (id: string | null) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export const Accordion: React.FC<{ children: ReactNode; defaultOpenId?: string | null }> = ({ children, defaultOpenId = null }) => {
  const [openItemId, setOpenItemId] = useState<string | null>(defaultOpenId);

  return (
    <AccordionContext.Provider value={{ openItemId, setOpenItemId }}>
      <div className="space-y-4">
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem: React.FC<{ id: string; title: string; children: ReactNode; }> = ({ id, title, children }) => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }
  const { openItemId, setOpenItemId } = context;
  const isOpen = openItemId === id;

  const handleToggle = () => {
    setOpenItemId(isOpen ? null : id);
  };

  return (
    <div className={`group glass-panel rounded-lg transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'border-sky-300/50' : 'border-white/10'}`}>
      <button
        onClick={handleToggle}
        className="w-full flex justify-between items-center text-left rtl:text-right px-6 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 hover:bg-white/5 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <h2 className="font-display text-2xl sm:text-3xl accent-gradient-text">{title}</h2>
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white/5 group-hover:bg-white/10 rounded-full transition-colors duration-300">
            <svg
              className={`w-6 h-6 text-sky-200 transform transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-6 pt-0 font-body text-gray-200 text-base sm:text-lg leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};