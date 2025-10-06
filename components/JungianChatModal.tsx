import React, { useState, useEffect, useRef } from 'react';
import { Result, ChatMessage } from '../types';
import { continueJungianChatStream } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';
import { PSYCHOLOGISTS } from '../data/psychologyData';
import PsychologistImage from './psychology/PsychologistImage';

interface JungianChatModalProps {
    result: Result;
}

const JungianChatModal: React.FC<JungianChatModalProps> = ({ result }) => {
    const { t, language } = useLanguage();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const jungData = PSYCHOLOGISTS['jung'];

    useEffect(() => {
        setMessages([{ role: 'model', content: t('jungianChat_initial_greeting') }]);
    }, [t]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!userInput.trim() || isLoading) return;

        const newUserMessage: ChatMessage = { role: 'user', content: userInput.trim() };
        const updatedHistory = [...messages, newUserMessage];
        
        const newModelMessage: ChatMessage = { role: 'model', content: '' };
        setMessages([...updatedHistory, newModelMessage]);
        
        setUserInput('');
        setIsLoading(true);

        try {
            const stream = await continueJungianChatStream(result, updatedHistory, language);
            if (!stream) throw new Error("No stream returned.");

            let accumulatedContent = '';
            for await (const chunk of stream) {
                accumulatedContent += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = accumulatedContent;
                    return newMessages;
                });
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
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div
            className="w-full h-full flex items-center justify-center p-0 sm:p-4 animate-fade-in"
            role="region"
            aria-labelledby="jungian-chat-title"
        >
            <div
                className="w-full h-full sm:max-w-2xl sm:h-[calc(100%-2rem)] flex flex-col bg-black/30 rounded-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <header className="flex-shrink-0 p-4 border-b border-sky-400/20 flex justify-center items-center relative">
                    <h2 id="jungian-chat-title" className="font-display text-xl sm:text-2xl accent-gradient-text">{t('jungianChat_title')}</h2>
                </header>

                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto custom-scrollbar space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                           {msg.role === 'model' && (
                               <PsychologistImage psychologistId={jungData.id} alt={t(jungData.name)} className="w-8 h-8 rounded-full flex-shrink-0" />
                           )}
                           <div className={`max-w-[80%] p-3 rounded-lg text-base sm:text-lg leading-relaxed ${msg.role === 'user' ? 'bg-gray-700/50 text-gray-200' : 'bg-sky-900/30 text-gray-200'}`}>
                               {msg.content.split('\n').map((line, i) => <p key={i} className="mb-2 last:mb-0">{line}</p>)}
                               {isLoading && index === messages.length - 1 && <span className="inline-block w-2 h-5 bg-sky-300 ml-1 animate-pulse"></span>}
                           </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex-shrink-0 p-4 border-t border-sky-400/20">
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={t('jungianChat_placeholder')}
                            disabled={isLoading}
                            className="flex-grow bg-black/30 border-2 border-sky-400/30 rounded-full px-4 py-2 sm:px-5 text-white focus:outline-none focus:border-sky-400 transition-colors"
                        />
                        <button onClick={handleSend} disabled={isLoading || !userInput.trim()} className="font-display bg-sky-400 hover:bg-sky-300 text-[#0a192f] rounded-full px-6 py-2 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-sky-400/30">
                            {t('send')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JungianChatModal;
