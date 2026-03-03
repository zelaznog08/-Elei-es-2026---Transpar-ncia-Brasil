
import React from 'react';
import { ExternalLink, BookOpen, ShieldCheck, Globe, HelpCircle, MessageCircle, Sparkles, Database } from 'lucide-react';
import { motion } from 'motion/react';

const OFFICIAL_LINKS = [
  {
    title: 'Portal da Transparência',
    desc: 'Consulta de gastos do Governo Federal, convênios e servidores públicos.',
    url: 'https://portaldatransparencia.gov.br/',
    icon: ShieldCheck,
  },
  {
    title: 'TSE - DivulgaCandContas',
    desc: 'Sistema de divulgação de candidaturas e contas eleitorais.',
    url: 'https://divulgacandcontas.tse.jus.br/',
    icon: Globe,
  },
  {
    title: 'Dados Abertos - Câmara',
    desc: 'Acesso a proposições, votações e gastos de deputados federais.',
    url: 'https://dadosabertos.camara.leg.br/',
    icon: BookOpen,
  },
  {
    title: 'Senado Federal',
    desc: 'Transparência e dados abertos relativos à atividade dos senadores.',
    url: 'https://www12.senado.leg.br/transparencia',
    icon: BookOpen,
  }
];

interface GuideProps {
  onGoToChat: () => void;
}

const Guide: React.FC<GuideProps> = ({ onGoToChat }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 lg:p-12 space-y-20 max-w-7xl mx-auto pb-32"
    >
      <header className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
          <ShieldCheck size={14} /> Protocolo de Transparência Radical
        </div>
        <h1 className="text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">Guia <span className="text-blue-600">Transparência</span></h1>
        <p className="text-xl text-gray-500 font-serif italic leading-relaxed">
          Entenda como utilizamos dados oficiais para promover a cidadania e a fiscalização política para 2026.
        </p>
      </header>

      {/* Seção de Esclarecimentos */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-10 lg:p-12 rounded-[3rem] border border-gray-100 shadow-sm space-y-8 group hover:border-blue-200 transition-all">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg shadow-blue-100">
            <HelpCircle size={32} />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900">Origem dos Dados</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              Toda a informação visualizada nesta plataforma é extraída diretamente de APIs oficiais de Dados Abertos. 
              Não realizamos edições manuais nos valores de gastos ou histórico de votações, garantindo a integridade da fonte original.
            </p>
          </div>
        </div>

        <div className="bg-white p-10 lg:p-12 rounded-[3rem] border border-gray-100 shadow-sm space-y-8 group hover:border-green-200 transition-all">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all shadow-lg shadow-green-100">
            <ShieldCheck size={32} />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900">Segurança da Informação</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              Nosso compromisso é com a transparência pública. Utilizamos inteligência artificial (PoliAgent) para 
              facilitar a compreensão de termos técnicos e jurídicos, traduzindo o "juridiquês" para uma linguagem acessível.
            </p>
          </div>
        </div>
      </section>

      {/* Links Oficiais */}
      <section className="space-y-10">
        <div className="flex items-center gap-4 px-2">
          <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
            <Database size={24} />
          </div>
          <h2 className="text-3xl font-black tracking-tighter uppercase">Fontes Oficiais de Consulta</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OFFICIAL_LINKS.map((link, i) => (
            <a 
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all flex items-start gap-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[3rem] -mr-8 -mt-8 group-hover:bg-blue-50 transition-colors" />
              <div className="p-4 bg-gray-50 text-gray-400 group-hover:bg-blue-600 group-hover:text-white rounded-2xl transition-all shadow-sm relative z-10">
                <link.icon size={28} />
              </div>
              <div className="flex-1 relative z-10">
                <h4 className="text-xl font-black text-gray-900 group-hover:text-blue-700 flex items-center gap-3 uppercase tracking-tighter leading-tight">
                  {link.title} <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-sm text-gray-500 mt-3 font-medium leading-relaxed">{link.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA Chatbot */}
      <section className="bg-gray-900 rounded-[3rem] p-10 lg:p-20 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-green-600/10 to-blue-600/10 opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="space-y-6 text-center md:text-left relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
            <Sparkles size={14} className="text-green-400" /> Inteligência Artificial
          </div>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-tight">Dúvidas sobre os dados?</h2>
          <p className="text-gray-400 text-lg leading-relaxed font-medium">
            O PoliAgent AI está treinado para explicar leis, orçamentos e detalhes técnicos de forma instantânea.
          </p>
        </div>
        <button 
          onClick={onGoToChat}
          className="relative z-10 flex items-center gap-4 bg-white text-gray-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-50 transition-all shadow-2xl shadow-white/5 hover:scale-105 active:scale-95"
        >
          <MessageCircle size={24} className="text-green-600" />
          Falar com o PoliAgent
        </button>
      </section>

      <footer className="text-center py-12">
        <div className="inline-flex items-center gap-4 px-8 py-4 bg-gray-100 rounded-full border border-gray-200">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] leading-none">
            Plataforma Independente de Monitoramento • Dados Abertos Brasil 2026
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default Guide;
