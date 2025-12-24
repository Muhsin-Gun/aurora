
import React from 'react';
import { motion } from 'framer-motion';

const MOCK_POSITIONS = [
  { id: 'pos_1', symbol: 'XAUUSD', side: 'BUY', size: '2.50', openPrice: '2645.12', currentPrice: '2651.45', pl: '+1,582.50' },
  { id: 'pos_2', symbol: 'EURUSD', side: 'SELL', size: '5.00', openPrice: '1.08542', currentPrice: '1.08411', pl: '+655.00' },
  { id: 'pos_3', symbol: 'NAS100', side: 'BUY', size: '1.00', openPrice: '19842.00', currentPrice: '19790.00', pl: '-520.00' },
];

const PositionsTable: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-1 p-3 border-b border-white/5 bg-slate-900/50">
        {['POSITIONS (3)', 'ORDERS (0)', 'HISTORY', 'ALERTS'].map((tab, i) => (
          <button 
            key={tab}
            className={`px-4 py-1 rounded text-[10px] font-bold tracking-widest transition-all ${
              i === 0 ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] uppercase font-bold text-slate-500 border-b border-white/5 bg-slate-950/30 sticky top-0">
              <th className="p-3">Symbol</th>
              <th className="p-3">Side</th>
              <th className="p-3">Size</th>
              <th className="p-3">Open Price</th>
              <th className="p-3">Current</th>
              <th className="p-3 text-right">Profit/Loss</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[11px] mono">
            {MOCK_POSITIONS.map((pos) => {
              const isProfit = pos.pl.startsWith('+');
              return (
                <tr key={pos.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-3 font-bold text-slate-200">{pos.symbol}</td>
                  <td className="p-3">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      pos.side === 'BUY' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {pos.side}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{pos.size}</td>
                  <td className="p-3 text-slate-400">{pos.openPrice}</td>
                  <td className="p-3 text-slate-200">{pos.currentPrice}</td>
                  <td className={`p-3 text-right font-bold ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                    {pos.pl}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 hover:text-white text-slate-500"><i className="fas fa-edit"></i></button>
                      <button className="p-1 hover:text-red-500 text-slate-500"><i className="fas fa-times-circle"></i></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionsTable;
