
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Chat from './components/Chat';
import Guide from './components/Guide';
import VoterManual from './components/VoterManual';
import GlobalChat from './components/GlobalChat';
import { DATA_CATEGORIES } from './constants';
import * as LucideIcons from 'lucide-react';
import { ExternalLink, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('manual');
  const [pendingSearch, setPendingSearch] = useState<string | null>(null);

  const getContextLabel = () => {
    switch(activeTab) {
      case 'manual': return 'Manual do Eleitor';
      case 'chat': return 'PoliAgent AI';
      case 'data': return 'Bases de Dados Integradas';
      case 'guide': return 'Guia Transparência';
      default: return 'Portal Eleições 2026';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <Chat initialQuery={pendingSearch} onClearQuery={() => setPendingSearch(null)} />;
      case 'guide':
        return <Guide onGoToChat={() => setActiveTab('chat')} />;
      case 'manual':
        return <VoterManual />;
      case 'data':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 lg:p-12 space-y-12 max-w-7xl mx-auto"
          >
            <header className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-[10px]">
                <Database size={12} /> Open Data Infrastructure
              </div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Bases de Dados Integradas</h1>
              <p className="text-lg text-gray-500 font-serif italic">Dados abertos estruturados para transparência radical e engajamento cidadão.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {DATA_CATEGORIES.map((cat) => {
                // @ts-ignore - dynamic icon access
                const Icon = LucideIcons[cat.icon] || LucideIcons.Database;
                return (
                  <a 
                    key={cat.id} 
                    href={cat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-green-200 transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[3rem] -mr-8 -mt-8 group-hover:bg-green-50 transition-colors" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-all shadow-lg shadow-gray-200">
                        <Icon size={28} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-green-700 leading-tight">{cat.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed font-medium">{cat.desc}</p>
                    </div>
                    
                    <div className="mt-8 flex items-center justify-between relative z-10">
                      <span className="text-[9px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-2 py-1 rounded-lg">Online</span>
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 group-hover:text-green-600 transition-colors uppercase tracking-widest">
                        Acessar <ExternalLink size={12} />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="bg-gray-900 p-12 rounded-[3rem] text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-600/10 to-blue-600/10" />
              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Tradução e Acesso</h3>
                <p className="text-gray-400 text-lg font-serif italic">Nossa plataforma não apenas fornece os dados, mas os traduz em relatórios compreensíveis. Use o PoliAgent para gerar análises customizadas a partir destes dados.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['CSV estruturado', 'API REST integrada', 'Dashboards interativos', 'JSON Real-time'].map(tag => (
                    <div key={tag} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-gray-300 uppercase tracking-widest hover:bg-white/10 transition-colors cursor-default">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return <Chat initialQuery={pendingSearch} onClearQuery={() => setPendingSearch(null)} />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F8F9FA]">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Camada de IA Ubíqua */}
      <GlobalChat currentContext={getContextLabel()} />
    </div>
  );
};

export default App;
