
import React, { useMemo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderBookProps {
  symbol: string;
  currentPrice: number;
}

const OrderBook: React.FC<OrderBookProps> = ({ symbol, currentPrice }) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 800);
    return () => clearInterval(timer);
  }, []);

  const data = useMemo(() => {
    const spread = 0.0002;
    const rows = 15;
    const asks = Array.from({ length: rows }, (_, i) => ({
      price: currentPrice + spread + (rows - i) * 0.0001,
      size: Math.random() * 8 + 0.1,
      type: 'ASK'
    }));
    const bids = Array.from({ length: rows }, (_, i) => ({
      price: currentPrice - spread - i * 0.0001,
      size: Math.random() * 8 + 0.1,
      type: 'BID'
    }));
    return { asks, bids };
  }, [currentPrice, tick]);

  return (
    <div className="h-full flex flex-col min-h-0 bg-black/40">
      <div className="p-3 border-b border-white/5 flex items-center justify-between shrink-0">
        <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Orderflow Depth (DOM)</h3>
        <div className="flex gap-2">
           <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[8px] rounded font-bold border border-blue-500/30 uppercase">Uplink Active</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 px-4 py-2 text-[8px] font-black text-slate-500 uppercase border-b border-white/5 bg-black/40 shrink-0">
        <span>Price Point</span>
        <span className="text-right">Volume (Lot)</span>
        <span className="text-right">Tactical Liquidity</span>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden min-h-0 relative font-mono text-[10px]">
        {/* Ask Wall */}
        <div className="flex-1 overflow-hidden flex flex-col-reverse justify-end">
          {data.asks.map((ask, i) => (
            <DOMRow key={`ask-${i}`} price={ask.price} size={ask.size} type="ASK" />
          ))}
        </div>

        {/* Spread Interface */}
        <div className="py-3 bg-cyan-500/5 border-y border-cyan-500/20 flex flex-col items-center justify-center shrink-0 relative">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_70%)] animate-pulse"></div>
           <span className="text-lg font-black text-white relative z-10">{currentPrice.toFixed(5)}</span>
           <span className="text-[8px] font-black text-cyan-400/60 uppercase tracking-widest relative z-10">Spread: 0.1 Pips</span>
        </div>

        {/* Bid Wall */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {data.bids.map((bid, i) => (
            <DOMRow key={`bid-${i}`} price={bid.price} size={bid.size} type="BID" />
          ))}
        </div>
      </div>
    </div>
  );
};

const DOMRow = ({ price, size, type }: any) => {
  const isAsk = type === 'ASK';
  const width = `${Math.min((size / 8) * 100, 100)}%`;
  
  return (
    <div className="grid grid-cols-3 px-4 py-0.5 group hover:bg-white/5 transition-colors relative min-h-[16px] items-center shrink-0">
      <div 
        className={`absolute inset-0 opacity-10 ${isAsk ? 'bg-red-500' : 'bg-emerald-500'} transition-all duration-700`} 
        style={{ width, left: isAsk ? 'auto' : 0, right: isAsk ? 0 : 'auto' }}
      />
      <span className={`z-10 font-bold ${isAsk ? 'text-red-400' : 'text-emerald-400'}`}>{price.toFixed(5)}</span>
      <span className="z-10 text-right text-slate-300 font-bold">{size.toFixed(2)}</span>
      <div className="z-10 flex justify-end items-center pl-4">
        <div className={`h-1 w-full bg-slate-800 rounded-full overflow-hidden`}>
          <motion.div 
            initial={false}
            animate={{ width }}
            className={`h-full ${isAsk ? 'bg-red-500' : 'bg-emerald-500'} shadow-[0_0_8px_rgba(0,0,0,0.5)]`}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderBook;
