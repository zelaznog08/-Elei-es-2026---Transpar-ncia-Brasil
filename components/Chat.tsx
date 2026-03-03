
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Search, ExternalLink, ShieldCheck, Sparkles, Database } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { Message } from '../types';
import { motion } from 'motion/react';

interface ChatProps {
  initialQuery?: string | null;
  onClearQuery?: () => void;
}

const Chat: React.FC<ChatProps> = ({ initialQuery, onClearQuery }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: 'Olá. Sou o PoliAgent, seu analista de dados políticos. \n\nEstou configurado para gerar dossiês técnicos e imparciais sobre qualquer agente político brasileiro, com foco em currículo, produção legislativa e histórico jurídico. \n\nDigite o nome de um parlamentar ou pergunte sobre um gasto público específico para começarmos a investigação.',
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
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuery && !isLoading) {
      handleSend(initialQuery);
      if (onClearQuery) onClearQuery();
    }
  }, [initialQuery]);

  const handleSend = async (queryOverride?: string) => {
    const textToSend = queryOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    if (!queryOverride) setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const response = await sendMessageToGemini(textToSend, history);

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
    <div className="flex flex-col h-[calc(100vh-64px)] lg:h-screen bg-[#F8F9FA]">
      <header className="p-6 lg:p-8 border-b bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles size={24} className="text-green-400" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">PoliAgent <span className="text-green-600">AI</span></h1>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Inteligência Investigativa Ativa
              </p>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Protocolo de Análise</p>
            <p className="text-xs font-bold text-gray-900 font-mono">DADOS_PUBLICOS_V2.5</p>
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 lg:p-12 space-y-8 scrollbar-hide">
        <div className="max-w-4xl mx-auto w-full space-y-8">
          {messages.map((m) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={m.id} 
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[90%] lg:max-w-[85%] p-6 lg:p-10 rounded-[2.5rem] shadow-sm ${
                m.role === 'user' 
                  ? 'bg-gray-900 text-white rounded-tr-none shadow-xl shadow-gray-200' 
                  : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
              }`}>
                <div className="flex items-center gap-3 mb-6 opacity-40">
                  {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                    {m.role === 'user' ? 'Solicitante' : 'PoliAgent Analysis'}
                  </span>
                </div>
                <div className={`whitespace-pre-wrap text-base lg:text-lg leading-relaxed ${m.role === 'model' ? 'font-serif italic' : 'font-sans font-medium'}`}>
                  {m.content}
                </div>
                
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-widest">
                      <Search size={12} /> Fontes de Verificação
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {m.sources.map((s, idx) => (
                        <a 
                          key={idx} 
                          href={s.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-[11px] text-blue-700 hover:bg-blue-100 border border-blue-100 rounded-xl font-bold transition-all"
                        >
                          {s.title.length > 30 ? s.title.slice(0, 30) + '...' : s.title} <ExternalLink size={12} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="relative">
                  <Loader2 size={24} className="animate-spin text-gray-900" />
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-900 font-black uppercase tracking-widest">Processando Dossiê</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Cruzando bases governamentais em tempo real</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 lg:p-12 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-[2rem] blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-[2rem] shadow-sm focus-within:ring-2 focus-within:ring-gray-900 transition-all overflow-hidden">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ex: 'Gere um dossiê sobre Arthur Lira' ou 'Analise gastos de gabinete'"
              className="flex-1 pl-8 pr-16 py-5 bg-transparent border-none text-sm lg:text-base focus:ring-0 placeholder:text-gray-400 font-medium"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="absolute right-3 p-4 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-gray-200"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="flex justify-center gap-12 mt-6">
             <div className="flex items-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-widest">
               <ShieldCheck size={14} className="text-green-500" /> Dados Auditáveis
             </div>
             <div className="flex items-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-widest">
               <Search size={14} className="text-blue-500" /> Fontes Primárias
             </div>
             <div className="flex items-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-widest">
               <Database size={14} className="text-purple-500" /> TSE & Transparência
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
