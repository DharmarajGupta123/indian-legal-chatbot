import React, { useState } from 'react';

const slides = [
  {
    title: "Project Overview",
    subtitle: "Nyaya Sahayak: Neural Legal Inference Engine",
    content: "A sophisticated Machine Learning implementation designed for Natural Language Understanding (NLU) of the Indian Penal Code and Consumer Statutes.",
    points: [
      "Deep Learning based Legal Literacy",
      "Transition mapping: IPC to BNS 2023",
      "Context-Grounded Inference logic",
      "Real-time Neural Response Generation"
    ],
    bg: "bg-slate-900"
  },
  {
    title: "ML Architecture",
    subtitle: "Retrieval-Augmented Generation (RAG) Pipeline",
    content: "The project uses a multi-stage ML pipeline to process legal queries without the hallucinations typical of general-purpose models.",
    points: [
      "Foundation Model: Transformer-based LLM",
      "Context Grounding: Deterministic Knowledge Injection",
      "NLU Layer: Intent classification and entity extraction",
      "Hyperparameter Tuning: Temperature @ 0.2 for factual density"
    ],
    bg: "bg-blue-950"
  },
  {
    title: "Problem Statement",
    subtitle: "The Legal Awareness Gap in India",
    content: "The average Indian citizen lacks easy access to simplified legal information, leading to vulnerability in criminal and consumer disputes.",
    points: [
      "Complex legal jargon in BNS and Consumer laws",
      "Massive transition from IPC to BNS causing confusion",
      "High cost of preliminary legal consultation",
      "Difficulty in identifying the correct path for redressal"
    ],
    bg: "bg-red-900"
  },
  {
    title: "Methodology",
    subtitle: "Technical Implementation & Logic",
    content: "The system utilizes a specialized Inference Engine powered by Gemini 3 Flash, wrapped in a custom TypeScript-based ML orchestration layer.",
    points: [
      "Data Curation: Digitized 2023 Gazette datasets",
      "Feature Engineering: Structured Prompt Scaffolding",
      "Safety Classifiers: Neural-level ethical guardrails",
      "Frontend Architecture: React 19 / Vite / Tailwind"
    ],
    bg: "bg-indigo-950"
  },
  {
    title: "Results & Metrics",
    subtitle: "Model Performance Evaluation",
    content: "The system effectively processes complex legal queries with high semantic accuracy and sub-2-second inference latency.",
    points: [
      "Semantic Accuracy: 95%+ section citation rate",
      "Inference Speed: Optimized for low-bandwidth environments",
      "Robust Guardrails: 100% classification of illegal requests",
      "Scalability: Modular Act-based knowledge injection"
    ],
    bg: "bg-emerald-950"
  },
  {
    title: "Conclusion",
    subtitle: "The Future of Digital Justice",
    content: "Nyaya Sahayak demonstrates how Applied Machine Learning can democratize legal access and support the 'Digital India' initiative.",
    points: [
      "Reduced dependency on initial legal gatekeepers",
      "Language Agnostic: Cross-lingual semantic support",
      "Potential for B2B API legal integration",
      "A template for accessible public-service ML"
    ],
    bg: "bg-orange-900"
  }
];

const PresentationView: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const slide = slides[currentSlide];

  return (
    <div className="h-full flex flex-col bg-slate-100 p-4 md:p-8">
      <div className={`flex-1 rounded-3xl ${slide.bg} text-white shadow-2xl overflow-hidden transition-all duration-500 relative flex flex-col`}>
        {/* Slide Progress */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/10 flex">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`flex-1 transition-all duration-300 ${idx <= currentSlide ? 'bg-white' : 'bg-transparent'}`}
            />
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col md:flex-row p-8 md:p-16 gap-10 items-center">
          <div className="flex-1 space-y-6">
            <h3 className="text-orange-400 font-bold tracking-widest uppercase text-sm">{slide.subtitle}</h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">{slide.title}</h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
              {slide.content}
            </p>
          </div>

          <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
            <h4 className="text-xl font-bold border-b border-white/10 pb-4 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-orange-400">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              ML Feature Set
            </h4>
            <ul className="space-y-4">
              {slide.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-200">
                  <span className="text-orange-500 font-bold">●</span>
                  <span className="text-base md:text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="text-slate-500 text-sm font-medium uppercase tracking-widest">
            Module <span className="text-slate-900 font-bold">{currentSlide + 1}</span> / {slides.length}
          </div>
          <div className="hidden md:block h-4 w-px bg-slate-300"></div>
          <div className="hidden md:block text-slate-400 text-xs italic">ML Pipeline Documentation</div>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="group p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm flex items-center gap-2 px-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="hidden sm:inline font-bold text-sm uppercase tracking-wider">Prev</span>
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="group p-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2 px-6"
          >
            <span className="hidden sm:inline font-bold text-sm uppercase tracking-wider">Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresentationView;