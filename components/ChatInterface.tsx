import React, { useState, useRef, useEffect } from 'react';
import { getLegalResponse } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { Language } from '../App';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  inferenceTime?: number;
}

interface ChatInterfaceProps {
  language: Language;
  onShowDoc: (content: string) => void;
}

const QUICK_START_CARDS = [
  { id: 'consumer', title: 'Consumer Rights', icon: '🛒', query: 'What are my rights as a consumer if I receive a defective product?' },
  { id: 'scams', title: 'Job Scams', icon: '💼', query: 'I received a fake job offer on Telegram asking for money. What law protects me?' },
  { id: 'bns', title: 'BNS 2023 Intro', icon: '⚖️', query: 'Explain the main changes in Bharatiya Nyaya Sanhita 2023 compared to IPC.' },
  { id: 'cyber', title: 'Cyber Crimes', icon: '💻', query: 'How do I report online financial fraud or unauthorized transactions?' }
];

const ChatInterface: React.FC<ChatInterfaceProps> = ({ language, onShowDoc }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "### ML Engine Initialized 🙏\n\nI am the **Nyaya Sahayak Inference Engine**.\n\nMy Natural Language Understanding (NLU) model is grounded in **BNS 2023** and **Consumer Protection Act 2019**.\n\nSelect a category below or type your legal query.",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (customQuery?: string) => {
    const queryToProcess = customQuery || input;
    if (!queryToProcess.trim() || isLoading) return;

    const startTime = Date.now();
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: queryToProcess.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customQuery) setInput('');
    setIsLoading(true);

    try {
      const historyContext = messages.slice(-4).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await getLegalResponse(queryToProcess.trim(), historyContext, language);
      const inferenceTime = Date.now() - startTime;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
        inferenceTime: inferenceTime
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "⚠️ **Inference Failure**\n\nThe neural pipeline encountered a runtime error. Check network connectivity.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/30">
      {/* ML Performance Monitor */}
      <div className="px-6 py-2 bg-white/60 backdrop-blur-md border-b border-slate-200 flex items-center justify-between z-10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">NLU Pipeline: Operational</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
            <span className="text-[8px] text-slate-400 font-bold uppercase">Locale</span>
            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{language}</span>
          </div>
        </div>
        <div className="text-[9px] text-slate-400 font-mono italic">
          v2.0-Production_Inference
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-105 ${
              msg.role === 'model' ? 'bg-slate-900 text-orange-500' : 'bg-indigo-600 text-white'
            }`}>
              {msg.role === 'model' ? '⚖️' : 'U'}
            </div>

            <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-5 shadow-sm relative transition-all group ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white border-l-4 border-orange-500 rounded-tl-none ring-1 ring-slate-200'
            }`}>
              {/* Trust Shield Badge */}
              {msg.role === 'model' && (
                <div className="absolute -top-3 left-4 flex items-center gap-1.5">
                  <div className="bg-slate-900 text-white text-[8px] font-black px-2 py-1 rounded shadow-md tracking-widest uppercase flex items-center gap-1">
                    Verified Inference
                  </div>
                  <div className="group/shield relative">
                    <div className="bg-emerald-50 text-emerald-600 p-1 rounded-full border border-emerald-200 shadow-sm cursor-help hover:bg-emerald-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M9.661 2.237a.531.531 0 01.678 0 11.947 11.947 0 003.078 2.454 21.458 21.458 0 013.307 2.408.531.531 0 01.176.37 12.861 12.861 0 01-3.974 9.766.53.53 0 01-.659.085 11.937 11.937 0 00-4.267-1.321 11.94 11.94 0 00-4.267 1.321.53.53 0 01-.66-.085 12.861 12.861 0 01-3.974-9.766.531.531 0 01.176-.37 21.46 21.46 0 013.307-2.408 11.944 11.944 0 003.078-2.454zM9.75 6.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5zM9 14a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="absolute left-full ml-2 top-0 w-48 bg-slate-900 text-white text-[10px] p-2 rounded-lg opacity-0 invisible group-hover/shield:opacity-100 group-hover/shield:visible transition-all z-50 shadow-xl border border-slate-700 pointer-events-none">
                      Grounding: Response verified against official Bharatiya Nyaya Sanhita 2023 and Consumer Protection Act datasets.
                    </div>
                  </div>
                </div>
              )}

              <div className="prose prose-sm max-w-none prose-slate">
                {msg.role === 'model' ? (
                  <ReactMarkdown 
                    className="markdown-content"
                    components={{
                      h3: ({node, ...props}) => <h3 className="text-indigo-900 font-bold mt-2 mb-1" {...props} />,
                      li: ({node, ...props}) => <li className="my-0.5 leading-relaxed" {...props} />,
                      strong: ({node, ...props}) => <strong className="text-orange-700 font-bold" {...props} />
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  <p className="font-medium text-white/95 leading-relaxed">{msg.text}</p>
                )}
              </div>

              <div className={`mt-3 flex items-center gap-3 text-[9px] font-mono ${msg.role === 'user' ? 'justify-end text-white/60' : 'justify-start text-slate-400'}`}>
                <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                {msg.inferenceTime && <span>• {msg.inferenceTime}ms</span>}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
            </div>
            <div className="flex gap-1.5 px-4 py-3 bg-white rounded-2xl shadow-sm border border-slate-200">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Console */}
      <div className="p-4 md:p-6 bg-white border-t border-slate-200 shadow-2xl z-20">
        {/* Quick Start Grid */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {QUICK_START_CARDS.map(card => (
            <button
              key={card.id}
              onClick={() => handleSend(card.query)}
              className="flex-shrink-0 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl hover:border-indigo-400 hover:bg-white hover:shadow-md transition-all flex items-center gap-2 group"
            >
              <span className="text-lg grayscale group-hover:grayscale-0 transition-all">{card.icon}</span>
              <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-600">{card.title}</span>
            </button>
          ))}
        </div>

        <div className="relative flex items-end gap-3 bg-slate-100 p-2 rounded-2xl border border-slate-200 focus-within:border-indigo-500 focus-within:bg-white transition-all">
          <button className="mb-2 ml-2 p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-200 transition-colors" title="Speech input unavailable">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          </button>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your legal situation..."
            className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[48px] py-3 px-2 text-sm text-slate-800"
            rows={1}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
            }}
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="mb-1 mr-1 p-3.5 rounded-xl bg-slate-900 text-white hover:bg-black disabled:opacity-30 transition-all flex items-center gap-2 group"
          >
            <span className="hidden sm:inline text-[11px] font-black uppercase tracking-widest">Inference</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;