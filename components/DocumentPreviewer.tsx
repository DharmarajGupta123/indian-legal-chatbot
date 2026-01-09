import React from 'react';
import ReactMarkdown from 'react-markdown';

interface PreviewProps {
  content: string | null;
  onClose: () => void;
}

const DocumentPreviewer: React.FC<PreviewProps> = ({ content, onClose }) => {
  if (!content) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-slide-left">
        <header className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-1.5 rounded">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z" />
              </svg>
            </div>
            <h3 className="font-serif font-bold text-lg">Official Statutory Viewer</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-900">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>

        <footer className="p-6 bg-slate-50 border-t border-slate-200 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
            Source: The Gazette of India • 2023 Digital Edition
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DocumentPreviewer;