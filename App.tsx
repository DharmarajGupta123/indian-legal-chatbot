import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import DocumentPreviewer from './components/DocumentPreviewer';

export type Language = 'en' | 'hi' | 'mr';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [previewContent, setPreviewContent] = useState<string | null>(null);

  return (
    <div className="flex h-screen w-screen bg-slate-100 overflow-hidden font-sans">
      <div className="flex flex-col flex-1">
        {/* Header - Accessibility & Multilingual */}
        <header className="bg-slate-900 text-white h-16 flex items-center justify-between px-6 shadow-xl z-30 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 p-1.5 rounded shadow-lg shadow-orange-900/40">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.994 5.994 0 01-2.029-.352c-.484-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.994 5.994 0 01-2.029-.352c-.484-.174-.711-.703-.59-1.202L5.25 4.971z" />
              </svg>
            </div>
            <h1 className="text-xl font-serif font-bold tracking-tight">Nyaya Sahayak</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="bg-slate-800 rounded-full p-1 border border-slate-700 flex items-center">
              {(['en', 'hi', 'mr'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    lang === l ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {l === 'en' ? 'ENG' : l === 'hi' ? 'हिंदी' : 'मराठी'}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden relative">
          <ChatInterface 
            language={lang} 
            onShowDoc={(content) => setPreviewContent(content)} 
          />
        </main>

        <footer className="bg-white px-6 py-2 border-t border-slate-200 text-[10px] text-slate-400 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 italic">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Neural Inference Engine Active
          </div>
          <div className="font-medium tracking-wide opacity-80 uppercase">Legal Awareness v2.0 • 2024</div>
        </footer>
      </div>

      {/* Side Document Drawer */}
      <DocumentPreviewer 
        content={previewContent} 
        onClose={() => setPreviewContent(null)} 
      />
    </div>
  );
};

export default App;