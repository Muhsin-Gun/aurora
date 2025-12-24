
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MarketData } from '../types';
import { MOCK_CHART_DATA } from '../constants';

interface TradingChartProps {
  symbol: string;
  data: MarketData;
}

const TradingChart: React.FC<TradingChartProps> = ({ symbol, data }) => {
  const [chartData, setChartData] = useState(MOCK_CHART_DATA);
  const [timeframe, setTimeframe] = useState('1M');

  useEffect(() => {
    if (!data) return;
    setChartData(prev => {
      const last = prev[prev.length - 1];
      const now = Date.now();
      
      if (now - last.time > 60000) {
        return [...prev.slice(1), {
          time: now,
          open: data.price,
          high: data.price,
          low: data.price,
          close: data.price,
          volume: data.volume
        }];
      } else {
        const newData = [...prev];
        const lastIndex = newData.length - 1;
        const current = newData[lastIndex];
        newData[lastIndex] = {
          ...current,
          close: data.price,
          high: Math.max(current.high, data.price),
          low: Math.min(current.low, data.price)
        };
        return newData;
      }
    });
  }, [data]);

  return (
    <div className="h-full w-full flex flex-col p-4 md:p-8 bg-black/40 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 lg:mb-10 relative z-10 gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-12 w-full lg:w-auto">
          <div className="flex flex-col">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">{symbol}</h2>
            <div className="flex items-center gap-4 mt-2">
              <span className={`text-xl md:text-2xl font-black mono text-rose-500`}>
                {data?.price.toFixed(5)}
              </span>
              <span className="text-[8px] md:text-[10px] font-black text-slate-600 tracking-widest uppercase bg-white/5 px-2 md:px-4 py-1 rounded-sm">Spot Market</span>
            </div>
          </div>
          
          <div className="flex bg-black/80 border border-white/10 p-1 overflow-x-auto no-scrollbar max-w-full">
            {['1M', '5M', '15M', '1H', '4H', 'D'].map(tf => (
              <button 
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 md:px-5 py-2 text-[8px] md:text-[10px] font-black transition-all whitespace-nowrap ${
                  timeframe === tf ? 'bg-cyan-400 text-black' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 md:gap-4 self-end lg:self-auto">
           {['wave-square', 'pen-nib', 'camera', 'expand-alt'].map(icon => (
             <button key={icon} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:border-cyan-400 transition-all text-sm md:text-base">
               <i className={`fas fa-${icon}`}></i>
             </button>
           ))}
        </div>
      </div>

      <div className="flex-1 w-full relative min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="glowPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f2ff" stopOpacity={0.2}/>
                <stop offset="100%" stopColor="#00f2ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="1 10" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis 
              domain={['auto', 'auto']} 
              orientation="right" 
              stroke="rgba(255,255,255,0.1)" 
              fontSize={10}
              tickFormatter={(v) => v.toFixed(2)}
              width={45}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(2, 6, 23, 0.95)', border: '1px solid #00f2ff', borderRadius: '0' }}
              itemStyle={{ color: '#00f2ff', fontSize: '12px', fontWeight: '900' }}
              labelStyle={{ display: 'none' }}
            />
            <Area 
              type="monotone" 
              dataKey="close" 
              stroke="#00f2ff" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#glowPrice)" 
              isAnimationActive={false}
            />
            <ReferenceLine y={data?.price} stroke="rgba(0,242,255,0.4)" strokeDasharray="3 3" />
          </AreaChart>
        </ResponsiveContainer>
        
        {/* Volatility Index Overlay Box */}
        <div className="absolute top-4 right-4 md:top-10 md:right-10 pointer-events-none text-right">
           <div className="flex flex-col items-end gap-1 md:gap-2">
              <span className="text-[8px] md:text-[10px] font-black text-cyan-400 uppercase tracking-widest">Volatility Index</span>
              <span className="text-2xl md:text-4xl font-black text-white mono opacity-80 leading-none">74.2%</span>
              <div className="w-20 md:w-32 h-1 bg-white/10 mt-1 md:mt-2 relative overflow-hidden">
                <motion.div 
                  animate={{ width: ['20%', '85%', '45%', '98%'] }}
                  transition={{ duration: 15, repeat: Infinity }}
                  className="h-full bg-cyan-400"
                />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TradingChart;
