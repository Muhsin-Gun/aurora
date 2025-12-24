
import React from 'react';
import { MarketData } from '../types';
import { SYMBOLS } from '../constants';

interface WatchlistProps {
  marketData: Record<string, MarketData>;
  activeSymbol: string;
  setActiveSymbol: (s: string) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ marketData, activeSymbol, setActiveSymbol }) => {
  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="p-3 border-b border-white/5 flex items-center justify-between shrink-0 bg-slate-900/40">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Uplink Watchlist</h3>
        <i className="fas fa-crosshairs text-[10px] text-slate-600"></i>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {SYMBOLS.map((sym) => {
          const data = marketData[sym];
          const isUp = data?.change >= 0;
          const isActive = activeSymbol === sym;
          
          return (
            <button 
              key={sym}
              onClick={() => setActiveSymbol(sym)}
              className={`w-full p-3 border-b border-white/5 transition-all flex items-center justify-between group relative min-h-[48px] shrink-0 ${
                isActive ? 'bg-cyan-500/10 border-l-2 border-l-cyan-500' : 'hover:bg-white/5'
              }`}
            >
              <div className="flex flex-col items-start overflow-hidden">
                <span className={`text-xs font-black transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{sym}</span>
                <span className="text-[8px] text-slate-600 font-bold tracking-tighter uppercase truncate">Institutional Hub</span>
              </div>
              
              <div className="flex flex-col items-end shrink-0">
                <span className={`text-[11px] font-bold mono transition-colors ${isUp ? 'text-emerald-400' : 'text-rose-500'}`}>
                  {data?.price.toFixed(sym.includes('USD') && !sym.includes('BTC') ? 5 : 2)}
                </span>
                <span className={`text-[8px] font-black mono flex items-center gap-1 ${isUp ? 'text-emerald-500/60' : 'text-rose-500/60'}`}>
                   <i className={`fas fa-caret-${isUp ? 'up' : 'down'}`}></i>
                   {data?.changePercent.toFixed(2)}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Watchlist;
