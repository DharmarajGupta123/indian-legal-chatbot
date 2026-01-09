import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const LegalDashboardSidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const recentChats = [
    { title: 'Consumer Fraud - Laptop', category: 'Consumer Protection', date: 'Oct 24' },
    { title: 'BNS Section 304 Query', category: 'Criminal Law', date: 'Oct 22' },
    { title: 'Stalking Laws Discussion', category: 'Women Protection', date: 'Oct 20' },
  ];

  return (
    <aside className={`bg-slate-50 border-r border-slate-200 flex flex-col transition-all duration-300 z-40 ${isOpen ? 'w-72' : 'w-0 overflow-hidden md:w-0'}`}>
      <div className="p-6 border-b border-slate-200 shrink-0">
        <button className="w-full bg-white border-2 border-slate-200 border-dashed rounded-xl p-4 text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 font-bold text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          New Inference
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h4 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Inference History</h4>
          <div className="space-y-1">
            {recentChats.map((chat, idx) => (
              <button 
                key={idx}
                className="w-full flex flex-col text-left px-4 py-3 rounded-xl hover:bg-white hover:shadow-sm group transition-all"
              >
                <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 truncate">{chat.title}</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-slate-400 font-medium">{chat.category}</span>
                  <span className="text-[9px] text-slate-300">{chat.date}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-6 border-t border-slate-200">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Statutory Reference</h4>
          <div className="space-y-2">
            {['BNS 2023 Gazette', 'Consumer Act 2019', 'IT Act 2000'].map(doc => (
              <button key={doc} className="w-full flex items-center gap-3 text-left p-2 rounded-lg hover:bg-indigo-50 text-slate-600 transition-colors">
                <span className="text-lg opacity-60">📄</span>
                <span className="text-xs font-semibold">{doc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-900 text-slate-400 border-t border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-black text-xs">GOI</div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white leading-none">Legal Awareness</span>
            <span className="text-[9px] opacity-60">Ministry of Law & Justice</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LegalDashboardSidebar;