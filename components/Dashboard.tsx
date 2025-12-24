import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MarketData } from '../types';
import TradingChart from './TradingChart';
import OrderPanel from './OrderPanel';
import Watchlist from './Watchlist';
import OrderBook from './OrderBook';
import PositionsTable from './PositionsTable';
import StrategyStudio from './StrategyStudio';
import Analytics from './Analytics';
import ClientDashboard from './ClientDashboard';

interface DashboardProps {
  user: User;
  marketData: Record<string, MarketData>;
  activeSymbol: string;
  setActiveSymbol: (s: string) => void;
  onLogout: () => void;
  setRole: (r: 'CLIENT' | 'ADMIN' | 'EMPLOYEE') => void;
  currentRole: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user, marketData, activeSymbol, setActiveSymbol, onLogout, setRole, currentRole }) => {
  const [view, setView] = useState<'TRADE' | 'STRATEGY' | 'ANALYTICS' | 'CLIENT'>('TRADE');

  return (
    <div className="flex flex-col h-full overflow-hidden bg-transparent relative z-10">
      <div className="scanlines"></div>
      
      {/* HEADER */}
      <header className="h-20 shrink-0 flex items-center justify-between px-8 bg-black/70 backdrop-blur-2xl border-b border-cyan-500/10 z-[100]">
        <div className="flex items-center gap-8">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 90 }}
            className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center cursor-pointer"
          >
             <i className="fas fa-atom text-cyan-400 text-2xl"></i>
          </motion.div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-white tracking-[0.2em] leading-none">AURORA <span className="text-cyan-500">QUANTUM</span></h1>
            <span className="text-[9px] text-cyan-500/40 uppercase font-black tracking-[0.5em] mt-1.5">Neural Terminal v8.4.1</span>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {(['TRADE', 'STRATEGY', 'ANALYTICS', 'CLIENT'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`text-[10px] font-black tracking-[0.3em] transition-all relative uppercase px-8 py-3 rounded-lg overflow-hidden group ${
                view === v 
                ? 'text-white bg-cyan-500/10 border border-cyan-500/40 shadow-[0_0_20px_rgba(0,242,255,0.15)]' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {v}
              {view === v && (
                <motion.div 
                  layoutId="navGlow"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_10px_#00f2ff]"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-8">
           <div className="flex flex-col items-end gap-1">
              <span className="text-[8px] font-black text-cyan-500/60 uppercase tracking-widest">Clearance</span>
              <div className="flex bg-black/80 border border-white/5 p-1 rounded-lg">
                {(['CLIENT', 'ADMIN', 'EMPLOYEE'] as const).map(r => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`px-4 py-1.5 rounded-md text-[9px] font-black tracking-widest uppercase transition-all ${
                      currentRole === r
                      ? 'bg-cyan-500 text-black shadow-[0_0_15px_#00f2ff]'
                      : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
           </div>

           <div className="h-10 w-px bg-white/5 mx-2"></div>

           <button onClick={onLogout} className="text-red-500/40 hover:text-red-500 transition-all hover:scale-110">
              <i className="fas fa-power-off text-2xl"></i>
           </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {view === 'TRADE' ? (
            <motion.div 
              key="trade"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-12 grid-rows-6 h-full p-6 gap-6 overflow-hidden"
            >
              {/* Left Column: Watchlist & DOM */}
              <div className="col-span-3 row-span-6 flex flex-col gap-6">
                 <div className="flex-[4] tactical-glass overflow-hidden">
                   <Watchlist marketData={marketData} activeSymbol={activeSymbol} setActiveSymbol={setActiveSymbol} />
                 </div>
                 <div className="flex-[6] tactical-glass overflow-hidden">
                   <OrderBook symbol={activeSymbol} currentPrice={marketData[activeSymbol]?.price || 0} />
                 </div>
              </div>

              {/* Center Column: Chart & Positions */}
              <div className="col-span-6 row-span-6 flex flex-col gap-6">
                 <div className="flex-[7] tactical-glass border-cyan-500/20 overflow-hidden group">
                    <div className="scanner-beam"></div>
                    <TradingChart symbol={activeSymbol} data={marketData[activeSymbol]} />
                 </div>
                 <div className="flex-[3] tactical-glass overflow-hidden shadow-inner">
                    <PositionsTable />
                 </div>
              </div>

              {/* Right Column: Execution & AI */}
              <div className="col-span-3 row-span-6 flex flex-col gap-6">
                 <div className="shrink-0 tactical-glass p-1">
                    <OrderPanel symbol={activeSymbol} data={marketData[activeSymbol]} />
                 </div>
                 <div className="flex-1 tactical-glass p-8 overflow-hidden flex flex-col">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-1.5 h-6 bg-cyan-400 animate-pulse"></div>
                      <h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.5em]">Neural Signal Hub</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-5 custom-scrollbar pr-2">
                       <IntelligenceItem type="BULLISH" title="FVG Migation" msg="XAUUSD 15m Fair Value Gap re-filled. Bias confirmed." />
                       <IntelligenceItem type="WARNING" title="Liquidity Pool" msg="Asian Session highs detected. Stop-hunt risk high." />
                       <IntelligenceItem type="SUCCESS" title="BOS Detected" msg="Market structure break in EURUSD. Shift verified." />
                       <IntelligenceItem type="INFO" title="Orderflow Delta" msg="Aggressive buyers entering near demand zone." />
                    </div>
                 </div>
              </div>
            </motion.div>
          ) : view === 'STRATEGY' ? (
            <motion.div 
              key="strategy" 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="h-full p-8 overflow-y-auto"
            >
               <StrategyStudio />
            </motion.div>
          ) : view === 'ANALYTICS' ? (
            <motion.div 
              key="analytics" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="h-full p-8"
            >
              <Analytics />
            </motion.div>
          ) : (
            <motion.div 
              key="client" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="h-full p-8"
            >
              <ClientDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="h-10 bg-black/90 border-t border-white/5 flex items-center justify-between px-10 text-[10px] font-black text-slate-500 z-[100] backdrop-blur-3xl">
         <div className="flex items-center gap-12">
           <span className="flex items-center gap-2">UPLINK STATUS: <span className="text-cyan-400">ENCRYPTED-A9</span></span>
           <span className="flex items-center gap-2">LATENCY: <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-emerald-400">14.2 MS</motion.span></span>
           <span className="flex items-center gap-2">SECURITY: <span className="text-slate-400">QUANTUM-GUARD ACTIVE</span></span>
         </div>
         <div className="bg-cyan-500/5 px-6 py-1.5 border border-cyan-500/20 text-cyan-400 rounded-md mono">
            <i className="fas fa-clock mr-3"></i>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
         </div>
      </footer>
    </div>
  );
};

const IntelligenceItem = ({ type, title, msg }: any) => (
  <motion.div 
    whileHover={{ x: 5, backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
    className="p-5 bg-white/5 border-l-2 border-cyan-500/40 cursor-crosshair transition-all"
  >
    <div className="flex justify-between items-center mb-3">
      <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">{title}</span>
      <span className={`text-[8px] font-black px-2 py-0.5 rounded-sm bg-black border ${
        type === 'WARNING' ? 'text-amber-500 border-amber-500/30' : 
        type === 'SUCCESS' ? 'text-emerald-500 border-emerald-500/30' : 
        'text-cyan-500 border-cyan-500/30'
      }`}>{type}</span>
    </div>
    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{msg}</p>
  </motion.div>
);

export default Dashboard;