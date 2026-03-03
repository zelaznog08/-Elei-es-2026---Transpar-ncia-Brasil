
import React, { useState, useMemo } from 'react';
import { MOCK_NEWS, MOCK_POLITICIANS } from '../constants';
import { ShieldCheck, ShieldAlert, BarChart3, ExternalLink, Calendar, Newspaper, TrendingUp, TrendingDown, Minus, Bot } from 'lucide-react';

interface NewsConsultoryProps {
  onSearchIA?: (query: string) => void;
}

const NewsConsultory: React.FC<NewsConsultoryProps> = ({ onSearchIA }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | 'all'>('all');

  const filteredNews = useMemo(() => {
    if (selectedCandidate === 'all') return MOCK_NEWS;
    return MOCK_NEWS.filter(article => article.candidateId === selectedCandidate);
  }, [selectedCandidate]);

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positivo': return <TrendingUp size={16} className="text-green-500" />;
      case 'negativo': return <TrendingDown size={16} className="text-red-500" />;
      default: return <Minus size={16} className="text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verificado': 
        return <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full"><ShieldCheck size={12}/> FATO</span>;
      case 'alerta': 
        return <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full"><ShieldAlert size={12}/> ALERTA</span>;
      default: 
        return <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">EM ANÁLISE</span>;
    }
  };

  const handleIASearchTrigger = () => {
    if (onSearchIA) {
      const candidate = MOCK_POLITICIANS.find(p => p.id === selectedCandidate);
      const query = candidate ? candidate.name : "Eduardo Bolsonaro";
      onSearchIA(`PoliAgent, como Analista de Inteligência de Mercado, realize uma varredura completa em tempo real sobre ${query}. Foque em impactos econômicos, tendências políticas para 2026 e veracidade de declarações recentes.`);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto pb-24">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">
            <Newspaper size={14} /> Hub de Inteligência Política
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Consultório de Notícias</h1>
          <p className="text-gray-500 text-sm max-w-xl">Curadoria estratégica de manchetes com processamento de linguagem natural para análise de impacto e sentimento.</p>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-right">
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Monitoramento</p>
            <p className="text-sm font-bold text-blue-600">24h em tempo real</p>
          </div>
        </div>
      </header>

      {/* Navegação por Candidatos */}
      <section className="space-y-4">
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest px-2">Filtrar dossiês por agente político</p>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          <button 
            onClick={() => setSelectedCandidate('all')}
            className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex-shrink-0 border-2 ${
              selectedCandidate === 'all' ? 'bg-gray-900 text-white border-gray-900 shadow-lg' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200 shadow-sm'
            }`}
          >
            Fluxo Global
          </button>
          {MOCK_POLITICIANS.map(pol => (
            <button 
              key={pol.id}
              onClick={() => setSelectedCandidate(pol.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex-shrink-0 flex items-center gap-2 border-2 ${
                selectedCandidate === pol.id ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' : 'bg-white text-gray-500 border-gray-100 hover:border-blue-200 shadow-sm'
              }`}
            >
              <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${selectedCandidate === pol.id ? 'bg-white text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                {pol.name.charAt(0)}
              </div>
              {pol.name}
            </button>
          ))}
        </div>
      </section>

      {/* Grid de Conteúdo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.length > 0 ? filteredNews.map((article) => (
          <article key={article.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col group">
            <div className="p-7 flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{article.source}</span>
                  <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                    <Calendar size={10} /> {article.date}
                  </span>
                </div>
                {getStatusBadge(article.factCheckStatus)}
              </div>

              <h3 className="text-[17px] font-bold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors">
                {article.title}
              </h3>

              <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                {article.summary}
              </p>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter">Impacto</span>
                  <div className="p-1.5 bg-gray-50 rounded-xl">
                    {getSentimentIcon(article.sentiment)}
                  </div>
                </div>
                
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>

            <button className="w-full bg-gray-50/50 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 border-t border-gray-100">
              <BarChart3 size={14} /> Relatório de Inteligência
            </button>
          </article>
        )) : (
          <div className="col-span-full py-16 text-center">
            <div className="max-w-md mx-auto bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bot size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Análise de IA Necessária</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Não encontramos registros arquivados para este filtro específico em nosso banco local. Deseja realizar uma busca de inteligência em tempo real na web?
                </p>
                
                <button 
                    onClick={handleIASearchTrigger}
                    className="w-full bg-blue-600 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-blue-200"
                >
                    Acionar PoliAgent Investigativo
                </button>
            </div>
          </div>
        )}
      </div>

      {/* Monitor Analítico */}
      <section className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold leading-tight">Métricas de Sentimento do Mercado</h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-xl">
              Como Analista de Inteligência, você tem acesso ao nosso motor de NLP que quantifica o viés das manchetes para identificar tendências de mercado e riscos políticos.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl flex-1 min-w-[120px] text-center">
                <p className="text-3xl font-black text-green-400">12%</p>
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Bullish</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl flex-1 min-w-[120px] text-center">
                <p className="text-3xl font-black text-gray-100">74%</p>
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Stable</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl flex-1 min-w-[120px] text-center">
                <p className="text-3xl font-black text-red-400">14%</p>
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Bearish</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] absolute -right-10 -top-10"></div>
        </div>
      </section>
    </div>
  );
};

export default NewsConsultory;
