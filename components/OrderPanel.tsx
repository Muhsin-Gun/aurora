
import React, { useState } from 'react';
import { MarketData, OrderSide, OrderType } from '../types';

interface OrderPanelProps {
  symbol: string;
  data: MarketData;
}

const OrderPanel: React.FC<OrderPanelProps> = ({ symbol, data }) => {
  const [side, setSide] = useState<OrderSide>(OrderSide.BUY);
  const [type, setType] = useState<OrderType>(OrderType.MARKET);
  const [volume, setVolume] = useState('1.00');
  const [takeProfit, setTakeProfit] = useState('');
  const [stopLoss, setStopLoss] = useState('');

  return (
    <div className="glass rounded-xl p-4 flex flex-col gap-4">
      <div className="flex p-1 bg-slate-900 rounded-lg border border-slate-800">
        <button 
          onClick={() => setSide(OrderSide.BUY)}
          className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${
            side === OrderSide.BUY ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'text-slate-500'
          }`}
        >
          LONG / BUY
        </button>
        <button 
          onClick={() => setSide(OrderSide.SELL)}
          className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${
            side === OrderSide.SELL ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-slate-500'
          }`}
        >
          SHORT / SELL
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
           {Object.values(OrderType).map((t) => (
             <button
               key={t}
               onClick={() => setType(t)}
               className={`py-1.5 rounded border text-[10px] font-bold tracking-widest uppercase transition-all ${
                 type === t ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-800 text-slate-500'
               }`}
             >
               {t}
             </button>
           ))}
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Quantity (Lots)</label>
          <div className="relative">
            <input 
              type="text" 
              value={volume} 
              onChange={(e) => setVolume(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 px-3 text-sm mono text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="absolute right-2 top-1.5 flex gap-1">
              <button className="px-1.5 py-1 bg-slate-800 rounded text-[9px] text-slate-400 hover:text-white">MIN</button>
              <button className="px-1.5 py-1 bg-slate-800 rounded text-[9px] text-slate-400 hover:text-white">MAX</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Stop Loss</label>
            <input 
              type="text" 
              value={stopLoss} 
              placeholder="0.0000"
              onChange={(e) => setStopLoss(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 px-3 text-sm mono text-white focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Take Profit</label>
            <input 
              type="text" 
              value={takeProfit} 
              placeholder="0.0000"
              onChange={(e) => setTakeProfit(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 px-3 text-sm mono text-white focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-lg space-y-2">
           <div className="flex justify-between text-[10px]">
             <span className="text-slate-500 uppercase font-bold">Margin Req</span>
             <span className="text-slate-300 mono">$450.00</span>
           </div>
           <div className="flex justify-between text-[10px]">
             <span className="text-slate-500 uppercase font-bold">Est. Comm</span>
             <span className="text-slate-300 mono">$7.00</span>
           </div>
           <div className="flex justify-between text-[10px]">
             <span className="text-slate-500 uppercase font-bold">Slippage Tolerance</span>
             <span className="text-slate-300 mono">0.5 Pips</span>
           </div>
        </div>

        <button 
          className={`w-full py-4 rounded-xl text-sm font-bold tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
            side === OrderSide.BUY 
              ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/30' 
              : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
          }`}
        >
          <i className={`fas ${side === OrderSide.BUY ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
          EXECUTE {side} {volume} {symbol}
        </button>

        <div className="flex items-center justify-center gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-tighter">
           <div className="flex items-center gap-1.5">
             <i className="fas fa-lock"></i>
             <span>SSL SECURE</span>
           </div>
           <div className="flex items-center gap-1.5">
             <i className="fas fa-route"></i>
             <span>DIRECT ROUTING</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPanel;
