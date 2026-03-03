
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, X, MessageCircle, ShieldCheck, Maximize2, Minimize2, Sparkles, ExternalLink } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { Message } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface GlobalChatProps {
  currentContext: string;
}

const GlobalChat: React.FC<GlobalChatProps> = ({ currentContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Olá! Sou seu assistente de transparência. Notei que você está em: **${currentContext}**. Como posso ajudar com os dados desta seção?`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const contextualPrompt = `[Contexto Atual: ${currentContext}] ${input}`;
    const response = await sendMessageToGemini(contextualPrompt, history);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: response.text,
      timestamp: new Date(),
      sources: response.sources
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gray-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[100] group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-blue-600/20 animate-pulse" />
            <MessageCircle size={28} className="relative z-10" />
            <span className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Atmospheric Style */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 w-[90vw] md:w-[420px] ${isMinimized ? 'h-16' : 'h-[650px] max-h-[85vh]'} bg-white/80 backdrop-blur-2xl border border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] rounded-[2.5rem] overflow-hidden flex flex-col transition-all z-[100]`}
          >
            {/* Atmospheric Background Element */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />
            
            {/* Header */}
            <header className="p-6 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles size={20} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">PoliAgent AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest font-black">Sessão Ativa • {currentContext}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-black/5 rounded-xl transition-colors text-gray-400">
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 rounded-xl transition-colors text-gray-400">
                  <X size={16} />
                </button>
              </div>
            </header>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm leading-relaxed ${
                        m.role === 'user' 
                          ? 'bg-gray-900 text-white rounded-tr-none shadow-xl shadow-gray-200' 
                          : 'bg-white/50 border border-white/40 text-gray-800 rounded-tl-none shadow-sm'
                      }`}>
                        <div className={`whitespace-pre-wrap ${m.role === 'model' ? 'font-serif italic text-[15px]' : 'font-sans'}`}>
                          {m.content}
                        </div>
                        {m.sources && m.sources.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                            {m.sources.slice(0, 3).map((s, idx) => (
                              <a key={idx} href={s.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1">
                                {s.title.slice(0, 20)}... <ExternalLink size={10} />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/50 p-4 rounded-[1.5rem] shadow-sm flex items-center gap-3 border border-white/40">
                        <Loader2 size={16} className="animate-spin text-green-600" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">Consultando Redes Oficiais...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-6 relative z-10">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative flex items-center bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-gray-900 transition-all">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Pergunte sobre os dados..."
                        className="flex-1 pl-5 pr-12 py-4 bg-transparent border-none text-sm focus:ring-0"
                      />
                      <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 p-2.5 bg-gray-900 text-white rounded-xl hover:bg-black disabled:opacity-30 disabled:hover:bg-gray-900 transition-all"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 px-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={12} className="text-green-500" />
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Protocolo de Segurança Ativo</span>
                    </div>
                    <span className="text-[9px] text-gray-400 font-bold font-mono">v2.5_FLASH_PRO</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalChat;
