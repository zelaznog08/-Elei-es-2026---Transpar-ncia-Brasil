
import React from 'react';
import { MessageSquare, Database, Menu, X, Info, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { id: 'manual', label: 'Manual do Eleitor', icon: UserCheck },
    { id: 'chat', label: 'PoliAgent AI', icon: MessageSquare },
    { id: 'data', label: 'Bases de Dados Integradas', icon: Database },
    { id: 'guide', label: 'Guia Transparência', icon: Info },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full lg:w-64 h-auto lg:h-screen bg-white lg:bg-[#0A0A0A] border-r border-gray-200 lg:border-white/5 z-50 flex flex-col">
      <div className="flex items-center justify-between p-6 lg:p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-900/20">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter lg:text-white leading-none">POLIAGENT</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Brasil 2026</span>
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} lg:block px-4 py-2 flex-1 overflow-y-auto scrollbar-hide`}>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                activeTab === item.id
                  ? 'bg-white/10 text-white shadow-xl'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              {activeTab === item.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-green-500 rounded-full"
                />
              )}
              <item.icon size={18} className={`${activeTab === item.id ? 'text-green-500' : 'text-gray-500 group-hover:text-gray-300'} transition-colors`} />
              <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="hidden lg:block p-6">
        <div className="p-5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-colors" />
          <p className="text-[10px] text-gray-400 mb-3 uppercase tracking-[0.2em] font-black">Contagem Regressiva</p>
          <div className="text-2xl font-black text-white flex gap-2 items-baseline">
            <span>582</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">dias</span>
          </div>
          <div className="mt-4 w-full bg-gray-700 h-1 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-green-500 rounded-full" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
