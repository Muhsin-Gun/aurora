
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { geminiService } from '../services/geminiService';

const StrategyStudio: React.FC = () => {
  const [isResearching, setIsResearching] = useState(false);
  const [researchData, setResearchData] = useState<string | null>(null);
  const [topic, setTopic] = useState('ICT 2022 Mentorship & Silver Bullet Core Logic');
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const performDeepResearch = async () => {
    setIsResearching(true);
    setResearchData(null);
    setGeneratedVideoUrl(null);
    try {
      const result = await geminiService.conductDeepResearch(topic);
      setResearchData(result);
    } catch (error) {
      console.error("Research failed:", error);
    } finally {
      setIsResearching(false);
    }
  };

  const initiateTacticalBriefing = async () => {
    if (window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
      }
    }

    setIsVideoGenerating(true);
    setGeneratedVideoUrl(null);
    setGenerationProgress('Synthesizing Tactical Visuals...');
    
    try {
      setTimeout(() => setGenerationProgress('Analyzing Algorithmic Footprints...'), 5000);
      setTimeout(() => setGenerationProgress('Rendering High-Fidelity 1080p Stream...'), 15000);

      const videoPrompt = `Cinematic technical trading breakdown: ${topic}. Detailed ICT/SMC charts with glowing market structure markings, liquidity heatmaps, and institutional order blocks. 4K high-density data overlays. Destiny 2 HUD aesthetic. Professional narration visual cues.`;
      
      const videoUrl = await geminiService.generateTeachingVideo(videoPrompt);
      setGeneratedVideoUrl(videoUrl);
    } catch (error) {
      console.error("Tactical briefing synthesis failed:", error);
      if (error.message?.includes("Requested entity was not found")) {
         window.aistudio?.openSelectKey();
      }
    } finally {
      setIsVideoGenerating(false);
      setGenerationProgress('');
    }
  };

  const TOPICS = [
    'ICT 2022 Mentorship & Silver Bullet Core Logic',
    'Market Maker Models (MMBM/MMSM) Deep Analysis',
    'Advanced Orderflow & Liquidity Heatmap Decoding',
    'The Power of Three (PO3) & Daily Bias Engineering',
    'High-Frequency Algorithm Footprint Recognition'
  ];

  return (
    <div className="h-full flex flex-col gap-6 bg-transparent relative min-h-0">
      {/* Top Status Header - Responsive padding */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between tactical-glass p-6 md:p-8 border-cyan-500/20 shrink-0 gap-6">
        <div>
          <h2 className="text-xl md:text-3xl font-black text-white tracking-[0.2em] uppercase flex items-center gap-4">
            <motion.i 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="fas fa-satellite-dish text-cyan-400"
            ></motion.i>
            STRATEGY <span className="text-cyan-400">COMMAND</span> LAB
          </h2>
          <p className="text-[8px] md:text-[10px] font-black text-cyan-500/40 uppercase tracking-[0.6em] mt-2">Deep Intelligence & Tactical Visualization Engine</p>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
           {researchData && !generatedVideoUrl && !isVideoGenerating && (
             <motion.button 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               onClick={initiateTacticalBriefing}
               className="group relative px-6 md:px-10 py-3 md:py-4 bg-purple-600/20 text-purple-400 border border-purple-500/30 font-black text-[9px] md:text-[10px] tracking-[0.3em] uppercase hover:bg-purple-600 hover:text-white transition-all shadow-[0_0_30px_rgba(139,92,246,0.2)] flex-1 md:flex-none"
             >
               <i className="fas fa-film mr-3"></i>
               Synthesize Video
             </motion.button>
           )}
           
           <div className="flex flex-col items-end border-l border-white/5 pl-4 md:pl-6">
             <span className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Neural Uplink Status</span>
             <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <motion.div 
                    key={i} 
                    animate={i <= 4 ? { opacity: [0.4, 1, 0.4] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    className={`w-3 h-1 md:w-4 md:h-1.5 ${i <= 4 ? 'bg-cyan-500 shadow-[0_0_8px_#00f2ff]' : 'bg-slate-800'} rounded-full`}
                  ></motion.div>
                ))}
             </div>
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 lg:gap-8 min-h-0 overflow-hidden relative">
        {/* Left Control Column - Responsive sizing */}
        <div className="w-full md:w-[320px] lg:w-[400px] flex flex-col gap-6 shrink-0 h-auto md:h-full">
           <div className="tactical-glass p-6 md:p-8 flex flex-col gap-6 md:gap-8 h-full">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                 <i className="fas fa-crosshairs text-cyan-400 text-[10px]"></i>
                 <h3 className="text-[9px] md:text-[11px] font-black text-white uppercase tracking-widest">Select Target Vector</h3>
              </div>
              
              <div className="flex-1 space-y-3 md:space-y-4 overflow-y-auto custom-scrollbar pr-2 max-h-[300px] md:max-h-none">
                 {TOPICS.map(t => (
                   <button 
                    key={t}
                    onClick={() => setTopic(t)}
                    className={`w-full text-left p-4 md:p-5 transition-all relative overflow-hidden group border-l-2 ${
                      topic === t 
                      ? 'bg-cyan-500/10 border-cyan-400 shadow-[inset_0_0_30px_rgba(0,242,255,0.05)]' 
                      : 'bg-black/20 border-white/5 border-l-transparent hover:border-l-white/20 hover:bg-white/5'
                    }`}
                   >
                     <span className={`text-[9px] md:text-[11px] font-black leading-relaxed transition-colors tracking-wide ${topic === t ? 'text-white' : 'text-slate-500'}`}>{t}</span>
                   </button>
                 ))}
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={performDeepResearch}
                disabled={isResearching || isVideoGenerating}
                className={`w-full py-5 md:py-7 font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs transition-all relative overflow-hidden group ${
                  isResearching || isVideoGenerating
                  ? 'bg-slate-900 text-slate-700 cursor-not-allowed border border-white/5' 
                  : 'bg-cyan-500 text-black shadow-[0_0_50px_rgba(0,242,255,0.3)] hover:brightness-125'
                }`}
              >
                {isResearching ? 'Analyzing...' : isVideoGenerating ? 'Rendering...' : 'Initiate Research'}
              </motion.button>
           </div>
        </div>

        {/* Right Content Engine - Main Display */}
        <div className="flex-1 tactical-glass overflow-hidden relative border-cyan-500/10 flex flex-col shadow-inner min-h-[500px] md:min-h-0">
          <AnimatePresence mode="wait">
            {!researchData && !isResearching && !isVideoGenerating ? (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col items-center justify-center p-10 md:p-20 text-center"
              >
                <div className="relative mb-8 md:mb-16">
                   <div className="absolute inset-0 bg-cyan-500 blur-[80px] md:blur-[120px] opacity-10 animate-pulse"></div>
                   <motion.i 
                      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="fas fa-ghost text-[100px] md:text-[180px] text-cyan-500/5 relative z-10"
                   ></motion.i>
                </div>
                <h3 className="text-xl md:text-4xl font-black text-white tracking-[0.4em] md:tracking-[0.6em] uppercase mb-4 md:mb-6 chromatic-text">Awaiting Synchronization</h3>
                <p className="text-[10px] md:text-sm font-bold text-slate-600 max-w-lg leading-loose uppercase tracking-[0.2em] px-4">
                  Connect to the neural infrastructure to begin exhaustive knowledge transfer of institutional trade logic.
                </p>
              </motion.div>
            ) : isResearching || isVideoGenerating ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center p-10 md:p-20 bg-black/40"
              >
                <div className="relative w-24 h-24 md:w-40 md:h-40 mb-8 md:mb-12">
                   <motion.div 
                     animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
                     transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 border-2 md:border-4 border-cyan-500/5 border-t-cyan-500/40 rounded-full"
                   />
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <i className="fas fa-satellite text-cyan-400 text-xl md:text-3xl animate-bounce"></i>
                   </div>
                </div>
                <h4 className="text-lg md:text-2xl font-black text-cyan-400 tracking-[0.4em] md:tracking-[0.8em] uppercase animate-pulse mb-6 text-center">
                  {isVideoGenerating ? 'Synthesizing Briefing' : 'Downloading Intel'}
                </h4>
                <div className="space-y-3 text-center px-4">
                   <p className="text-[9px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.4em]">
                     {generationProgress || 'Accessing encrypted historical archives...'}
                   </p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                {/* Briefing Player */}
                <div className="h-64 md:h-1/2 bg-black/90 relative border-b border-cyan-500/20 shrink-0">
                   {generatedVideoUrl ? (
                     <video src={generatedVideoUrl} controls autoPlay className="w-full h-full object-contain" />
                   ) : (
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 p-8 text-center">
                        <h5 className="text-[9px] md:text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">Briefing Visuals Offline</h5>
                        <button 
                          onClick={initiateTacticalBriefing}
                          className="px-6 md:px-10 py-2.5 md:py-3 bg-cyan-500/5 border border-cyan-500/40 text-cyan-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-cyan-500 hover:text-black transition-all"
                        >
                          Synthesize Feed
                        </button>
                     </div>
                   )}
                </div>

                {/* Intelligence Reader - Improved padding and typography for mobile */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-16 lg:p-24 bg-black/60" ref={scrollRef}>
                   <div className="max-w-4xl mx-auto">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-10 md:mb-16">
                        <div className="w-12 md:w-20 h-1 bg-cyan-500 shadow-[0_0_20px_#00f2ff]"></div>
                        <h1 className="text-2xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">{topic}</h1>
                      </div>
                      <div className="prose prose-invert max-w-none">
                         <div className="whitespace-pre-wrap font-medium text-slate-300 leading-[1.8] md:leading-[2.2] text-sm md:text-xl selection:bg-cyan-500/30">
                            {researchData}
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default StrategyStudio;
