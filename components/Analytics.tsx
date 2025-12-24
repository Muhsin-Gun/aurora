
import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DATA = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  equity: 250000 + Math.random() * 50000 + i * 2000,
  drawdown: Math.random() * 5
}));

const Analytics: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full flex flex-col gap-4 overflow-hidden"
    >
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Profit Factor" value="2.84" delta="+0.12" />
        <MetricCard label="Recovery Factor" value="1.45" delta="Stable" />
        <MetricCard label="Expectancy" value="$1,242" delta="+$200" />
        <MetricCard label="Max Drawdown" value="4.21%" delta="-0.5%" reverse />
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        <div className="flex-1 glass rounded-3xl p-8 border border-white/10 flex flex-col">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Equity Growth Curve</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" hide />
                <YAxis domain={['auto', 'auto']} orientation="right" mirror stroke="#475569" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="equity" stroke="#3b82f6" strokeWidth={3} fill="url(#colorEquity)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-96 flex flex-col gap-4">
           <div className="glass rounded-3xl p-6 border border-white/10">
             <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Trade Statistics</h4>
             <div className="space-y-4">
               <StatRow label="Win Rate" value="64.2%" color="text-emerald-400" />
               <StatRow label="Avg Win" value="$4,520" color="text-white" />
               <StatRow label="Avg Loss" value="($2,100)" color="text-red-400" />
               <StatRow label="Largest Win" value="$21,400" color="text-emerald-400" />
             </div>
           </div>
           <div className="flex-1 glass rounded-3xl p-6 border border-white/10 overflow-hidden relative">
             <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-sm flex items-center justify-center p-8 text-center">
               <div>
                <i className="fas fa-microchip text-blue-500 text-3xl mb-4"></i>
                <p className="text-xs font-bold text-slate-200">QUANTUM AI RECOMMENDATION</p>
                <p className="text-[10px] text-slate-500 mt-2">Reduce position size on GBPUSD during London Open due to high ATR expansion forecast.</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const MetricCard = ({ label, value, delta, reverse }: any) => (
  <div className="glass rounded-3xl p-6 border border-white/10 hover:border-blue-500/50 transition-all">
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    <div className="flex items-end justify-between mt-2">
      <span className="text-3xl font-black text-white leading-none">{value}</span>
      <span className={`text-[10px] font-bold ${reverse ? 'text-red-400' : 'text-emerald-400'}`}>{delta}</span>
    </div>
  </div>
);

const StatRow = ({ label, value, color }: any) => (
  <div className="flex justify-between items-center py-2 border-b border-white/5">
    <span className="text-[11px] text-slate-500 font-bold uppercase">{label}</span>
    <span className={`text-[11px] font-black ${color} mono`}>{value}</span>
  </div>
);

export default Analytics;
