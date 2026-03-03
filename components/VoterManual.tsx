
import React from 'react';
import { 
  UserCheck, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Info, 
  ArrowRight, 
  Download, 
  ExternalLink, 
  FileText, 
  Calendar, 
  Fingerprint, 
  MapPin,
  Globe,
  Smartphone,
  Search,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';

const VoterManual: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 lg:p-12 max-w-7xl mx-auto space-y-16 pb-32"
    >
      <header className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-green-50 text-green-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-green-100 shadow-sm">
          <ShieldCheck size={14} /> Consultoria de Justiça Eleitoral
        </div>
        <h1 className="text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">Guia Eleitoral <span className="text-green-600">2026</span></h1>
        <p className="text-xl text-gray-500 font-serif italic leading-relaxed">
          Tudo o que você precisa saber sobre o seu <strong>Título Eleitoral</strong>, prazos e regularização para o próximo pleito.
        </p>
      </header>

      {/* Seção Título Digital (e-Título) */}
      <section className="bg-gray-900 rounded-[3rem] p-10 lg:p-20 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-50 group-hover:opacity-70 transition-opacity" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
              <Smartphone size={14} className="text-blue-400" /> Inovação Digital
            </div>
            <h2 className="text-5xl font-black tracking-tighter uppercase leading-tight">e-Título: Seu documento no celular</h2>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              O e-Título é a via digital do título de eleitor. Ele substitui o documento em papel e, se você já tiver cadastrado a biometria, serve como identificação oficial com foto na hora de votar.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="https://play.google.com/store/apps/details?id=br.jus.tse.eleitoral.etitulo" target="_blank" className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-50 transition-all shadow-xl shadow-white/5">
                Google Play <Download size={18} />
              </a>
              <a href="https://apps.apple.com/br/app/e-t%C3%ADtulo/id1320338088" target="_blank" className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-50 transition-all shadow-xl shadow-white/5">
                App Store <Download size={18} />
              </a>
            </div>
          </div>
          <div className="w-64 lg:w-80 relative">
             <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
             <Smartphone size={280} strokeWidth={0.5} className="text-white relative z-10 drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Consulta Rápida de Situação */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 lg:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-green-200 transition-all">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all shadow-lg shadow-green-100">
              <Search size={32} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter">Consulta de Situação</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              Verifique se o seu título está <strong>Regular</strong>, <strong>Cancelado</strong> ou <strong>Suspenso</strong>. Títulos cancelados impedem o voto e geram restrições no CPF.
            </p>
          </div>
          <a 
            href="https://www.tse.jus.br/institucional/corregedoria-geral-eleitoral/sistemas-e-servicos-1/consulta-situacao-eleitoral" 
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 text-green-600 font-black uppercase tracking-widest text-xs hover:gap-5 transition-all"
          >
            Consultar Situação Agora <ExternalLink size={16} />
          </a>
        </div>

        <div className="bg-white p-10 lg:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-yellow-200 transition-all">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center group-hover:bg-yellow-600 group-hover:text-white transition-all shadow-lg shadow-yellow-100">
              <Fingerprint size={32} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter">Biometria Pendente?</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              A biometria é obrigatória para a maioria dos municípios brasileiros. Se você ainda não tem as digitais coletadas, agende seu comparecimento.
            </p>
          </div>
          <a 
            href="https://www.justicaeleitoral.jus.br/biometria/" 
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 text-yellow-600 font-black uppercase tracking-widest text-xs hover:gap-5 transition-all"
          >
            Agendar Biometria <ExternalLink size={16} />
          </a>
        </div>
      </section>

      {/* Autoatendimento (Título-Net) */}
      <section className="bg-white rounded-[3rem] p-10 lg:p-20 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 rounded-l-[5rem] -mr-12" />
        <div className="relative z-10 space-y-12">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3 text-blue-600">
              <Globe size={32} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Serviços Digitais</span>
            </div>
            <h2 className="text-4xl font-black tracking-tighter uppercase">Autoatendimento Título-Net</h2>
            <p className="text-gray-500 text-lg leading-relaxed font-medium">
              Para tirar o 1º título, transferir seu domicílio, revisar dados ou regularizar um título cancelado, utilize o sistema oficial da Justiça Eleitoral.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 'A', title: 'Regularização', desc: 'Pague multas e solicite a reativação do seu título de forma online.', color: 'green' },
              { id: 'B', title: 'Transferência', desc: 'Mudou de cidade? Solicite a transferência do seu local de votação.', color: 'blue' },
              { id: 'C', title: 'Revisão', desc: 'Corrija nomes, filiação ou outros dados cadastrais equivocados.', color: 'yellow' }
            ].map(item => (
              <div key={item.id} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                <div className={`w-10 h-10 bg-${item.color}-600 text-white rounded-xl flex items-center justify-center font-black mb-6 text-xs shadow-lg shadow-${item.color}-100`}>
                  {item.id}
                </div>
                <h4 className="font-black mb-3 text-sm uppercase tracking-widest text-gray-900">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href="https://www.justicaeleitoral.jus.br/titulo-eleitoral/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 shadow-2xl shadow-gray-200"
            >
              Iniciar Autoatendimento <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Documentação Obrigatória */}
      <section className="space-y-10">
        <div className="flex items-center gap-4 px-2">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
            <FileText size={24} />
          </div>
          <h2 className="text-3xl font-black tracking-tighter uppercase">Documentação Obrigatória</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-10 lg:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <h3 className="font-black text-xl uppercase tracking-tighter flex items-center gap-3">
              <CheckCircle className="text-green-500" size={24} /> Identificação com Foto
            </h3>
            <ul className="space-y-4">
              {['RG ou Certidão de Nascimento/Casamento', 'Passaporte (modelo novo)'].map(doc => (
                <li key={doc} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl font-bold text-sm text-gray-700">
                  <ArrowRight size={16} className="text-blue-500" /> {doc}
                </li>
              ))}
              <li className="bg-red-50 p-6 rounded-2xl border border-red-100 space-y-2">
                <p className="font-black text-red-700 text-[10px] uppercase tracking-[0.2em]">Atenção (1º Título):</p>
                <p className="text-xs text-red-600 font-bold">A CNH sozinha não é aceita para o primeiro título.</p>
              </li>
            </ul>
          </div>

          <div className="bg-white p-10 lg:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <h3 className="font-black text-xl uppercase tracking-tighter flex items-center gap-3">
              <MapPin className="text-blue-500" size={24} /> Comprovante de Residência
            </h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Emitido nos últimos 3 meses</p>
            <ul className="space-y-4">
              {['Contas de consumo (Luz, Água, Gás)', 'Contrato de locação ou holerite'].map(doc => (
                <li key={doc} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl font-bold text-sm text-gray-700">
                  <ArrowRight size={16} className="text-blue-500" /> {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer do Manual */}
      <footer className="text-center space-y-8 pt-20">
        <div className="inline-flex items-center gap-4 px-8 py-4 bg-gray-900 rounded-full border border-white/10 shadow-2xl">
          <Info size={18} className="text-green-500" />
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] leading-none">
            Conselho de Transparência Eleitoral • Dados Oficiais do TSE
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default VoterManual;
