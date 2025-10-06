import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Result, ChatMessage, OceanScores, MMPIScores, SCL90Scores, BDIScores, BAIScores, EQIScores } from '../../types';
import { continuePsychologyChatStream } from '../../services/geminiService';
import { useLanguage } from '../../contexts/LanguageContext';
import { PSYCHOLOGISTS } from '../../data/psychologyData';
import DossierModal from './DossierModal';
import PsychologistImage from './PsychologistImage';

interface PsychologistChatProps {
    psychologistId: string;
    result: Result | null;
    bigFiveScores: OceanScores | null;
    mmpiScores: MMPIScores | null;
    scl90Scores: SCL90Scores | null;
    bdiScores: BDIScores | null;
    baiScores: BAIScores | null;
    eqiScores: EQIScores | null;
    initialQuestion?: string;
}

const PsychologistChat: React.FC<PsychologistChatProps> = (props) => {
    const { psychologistId, result, bigFiveScores, mmpiScores, scl90Scores, bdiScores, baiScores, eqiScores, initialQuestion } = props;
    const { t, language } = useLanguage();
    const psychologist = PSYCHOLOGISTS[psychologistId];
    
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const initialQuestionSent = useRef(false);
    const [isDossierOpen, setIsDossierOpen] = useState(false);

    useEffect(() => {
        if (psychologist) {
            setMessages([{ role: 'model', content: t(psychologist.greetingKey) }]);
            initialQuestionSent.current = false;
        }
    }, [t, psychologist]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = useCallback(async (messageToSend?: string) => {
        const content = messageToSend || userInput.trim();
        if (!content || isLoading) return;

        setSuggestions([]);
        const newUserMessage: ChatMessage = { role: 'user', content };
        const updatedHistory = [...messages, newUserMessage];
        
        const newModelMessage: ChatMessage = { role: 'model', content: '' };
        setMessages([...updatedHistory, newModelMessage]);
        
        setUserInput('');
        setIsLoading(true);

        try {
            const stream = await continuePsychologyChatStream(
                psychologist, 
                result,
                bigFiveScores,
                mmpiScores,
                scl90Scores,
                bdiScores,
                baiScores,
                eqiScores,
                updatedHistory, 
                language
            );

            if (!stream) {
                 throw new Error("The stream could not be initiated.");
            }

            let accumulatedContent = '';
            for await (const chunk of stream) {
                accumulatedContent += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = accumulatedContent;
                    return newMessages;
                });
            }

            const finalContent = accumulatedContent;
            const suggestionRegex = /\[SUGGESTION\](.*?)\[\/SUGGESTION\]/g;
            const matches = [...finalContent.matchAll(suggestionRegex)];
            const newSuggestions = matches.map(match => match[1].trim());

            if (newSuggestions.length > 0) {
                const contentWithoutSuggestions = finalContent.replace(suggestionRegex, '').trim();
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = contentWithoutSuggestions;
                    return newMessages;
                });
                setSuggestions(newSuggestions);
            }

        } catch (error) {
            console.error("Chat error:", error);
            const errorMessageContent = error instanceof Error ? error.message : t('genericError_desc');
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = errorMessageContent;
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, userInput, messages, psychologist, result, bigFiveScores, mmpiScores, scl90Scores, bdiScores, baiScores, eqiScores, language, t]);
    
    useEffect(() => {
        if (initialQuestion && !initialQuestionSent.current && messages.length === 1) {
            initialQuestionSent.current = true;
            setTimeout(() => {
                handleSend(initialQuestion);
            }, 500);
        }
    }, [initialQuestion, messages, handleSend]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    
    const handleSuggestionClick = (suggestion: string) => {
        handleSend(suggestion);
    };
    
    if (!psychologist) return null;

    return (
        <>
            <div className="h-full flex flex-col p-0 sm:p-4 animate-fade-in">
                <div className="w-full max-w-3xl mx-auto h-full flex flex-col bg-black/30 rounded-lg">
                    {/* Header */}
                    <header className="flex-shrink-0 p-4 border-b border-sky-400/20 flex items-center justify-between gap-4">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-sky-400/40 flex-shrink-0">
                                <PsychologistImage psychologistId={psychologist.id} alt={t(psychologist.name)} className="w-full h-full" />
                            </div>
                             <div>
                                <h2 id="psychologist-chat-title" className="font-display text-lg sm:text-xl text-white">
                                    {t('psych_chatting_with', t(psychologist.name))}
                                </h2>
                             </div>
                         </div>
                         <button 
                            onClick={() => setIsDossierOpen(true)}
                            className="p-2 text-sky-300 hover:text-white transition-colors rounded-full hover:bg-sky-400/10"
                            aria-label={t('psych_dossier_button')}
                         >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625a1.875 1.875 0 00-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V11.25a2.25 2.25 0 00-2.25-2.25h-2.25" /></svg>
                         </button>
                    </header>

                    {/* Messages */}
                    <div className="flex-grow p-4 overflow-y-auto custom-scrollbar space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                               {msg.role === 'model' && (
                                   <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                        <PsychologistImage psychologistId={psychologist.id} alt={t(psychologist.name)} className="w-full h-full" />
                                   </div>
                               )}
                               <div className={`max-w-[80%] p-3 rounded-lg text-base sm:text-lg leading-relaxed ${msg.role === 'user' ? 'bg-gray-700/50 text-gray-200' : 'bg-sky-900/30 text-gray-200'}`}>
                                   {msg.content.split('\n').map((line, i) => <p key={i} className="mb-2 last:mb-0">{line}</p>)}
                                   {isLoading && index === messages.length - 1 && <span className="inline-block w-2 h-5 bg-sky-300 ml-1 animate-pulse"></span>}
                               </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="flex-shrink-0 p-4 border-t border-sky-400/20">
                        {suggestions.length > 0 && !isLoading && (
                            <div className="mb-4 flex flex-wrap justify-end gap-2 animate-fade-in">
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSuggestionClick(s)}
                                        className="px-3 py-1.5 text-sm font-body bg-sky-900/50 border border-sky-400/30 text-sky-200 rounded-full hover:bg-sky-800/70 transition-colors"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={t(psychologist.placeholderKey) || t('psych_placeholder_default')}
                                disabled={isLoading}
                                className="flex-grow bg-black/30 border-2 border-sky-400/30 rounded-full px-4 py-2 sm:px-5 text-white focus:outline-none focus:border-sky-400 transition-colors"
                            />
                            <button onClick={() => handleSend()} disabled={isLoading || !userInput.trim()} className="font-display bg-sky-400 hover:bg-sky-300 text-[#0a192f] rounded-full px-6 py-2 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-sky-400/30">
                                {t('send')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <DossierModal 
                isOpen={isDossierOpen} 
                onClose={() => setIsDossierOpen(false)}
                result={result}
                bigFiveScores={bigFiveScores}
                mmpiScores={mmpiScores}
                scl90Scores={scl90Scores}
                bdiScores={bdiScores}
                baiScores={baiScores}
                eqiScores={eqiScores}
            />
        </>
    );
};

export default PsychologistChat;
