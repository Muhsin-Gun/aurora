
import React from 'react';
import { motion } from 'framer-motion';

interface AdminProps {
  setRole: (r: any) => void;
}

const AdminDashboard: React.FC<AdminProps> = ({ setRole }) => {
  return (
    <div className="h-full w-full flex flex-col bg-[#000205] spatial-layer p-10">
      <header className="h-24 flex items-center justify-between px-10 tactical-glass mb-10 border-cyan-500/30">
        <div className="flex items-center gap-8">
          <div className="w-16 h-16 bg-cyan-500/10 border-2 border-cyan-500/40 rounded-sm flex items-center justify-center shadow-[0_0_30px_rgba(0,242,255,0.3)]">
             <i className="fas fa-shield-halved text-cyan-400 text-3xl"></i>
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">High Commander <span className="text-cyan-400">Terminal</span></h1>
            <p className="text-[10px] font-black text-cyan-500/60 uppercase tracking-[0.8em]">Orbital Authority Override Active</p>
          </div>
        </div>
        <button 
          onClick={() => setRole('CLIENT')}
          className="px-12 py-4 bg-cyan-500 text-black font-black tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(0,242,255,0.4)]"
        >
          RETURN TO BRIDGE
        </button>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-8">
        <div className="col-span-8 flex flex-col gap-8 layer-depth-1">
          <div className="grid grid-cols-3 gap-8">
            <StatBlock label="System TVL" value="$482.4B" trend="+12.4%" />
            <StatBlock label="Active Pilots" value="128,492" trend="+4.1%" />
            <StatBlock label="Neural Flux" value="14.2ms" trend="LOW" />
          </div>
          
          <div className="flex-1 tactical-glass p-10 border-cyan-500/10 flex flex-col">
             <h3 className="text-xs font-black text-cyan-500 tracking-[0.6em] uppercase mb-10">Real-time Node Telemetry</h3>
             <div className="flex-1 flex items-center justify-center gap-20">
                <NodeView label="NY-SEC-1" active />
                <div className="w-32 h-px bg-cyan-500/20"></div>
                <NodeView label="LD-SEC-4" active />
                <div className="w-32 h-px bg-cyan-500/20"></div>
                <NodeView label="HK-HUB-9" warning />
             </div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-8 layer-depth-2">
           <div className="tactical-glass p-8 flex flex-col gap-6">
             <h3 className="text-xs font-black text-red-500 tracking-[0.6em] uppercase">Emergency Protocols</h3>
             <button className="w-full py-5 bg-red-600/20 text-red-500 border border-red-500/40 font-black text-[10px] tracking-widest hover:bg-red-600/40 transition-all">SYSTEM KILL-SWITCH</button>
             <button className="w-full py-5 bg-white/5 text-slate-400 border border-white/5 font-black text-[10px] tracking-widest hover:text-white">FREEZE GLOBAL WITHDRAWALS</button>
             <button className="w-full py-5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-black text-[10px] tracking-widest hover:bg-cyan-500/20">FLUSH CACHE GATES</button>
           </div>
           <div className="flex-1 tactical-glass p-8 overflow-hidden flex flex-col">
             <h3 className="text-xs font-black text-slate-500 tracking-[0.6em] uppercase mb-6">Command Logs</h3>
             <div className="flex-1 space-y-4 mono text-[10px] overflow-y-auto">
               <div className="text-emerald-400">[14:02] AUTHORITY: KYC VERIFIED #88219</div>
               <div className="text-rose-500">[13:58] WARNING: LATENCY SPIKE HK-HUB-9</div>
               <div className="text-cyan-400">[13:42] SYSTEM: OPTIMIZING GAS ROUTE</div>
               <div className="text-slate-600">[13:30] LOG: SESSION PURGE COMPLETE</div>
             </div>
           </div>
        </div>
      </main>
    </div>
  );
};

const NodeView = ({ label, active, warning }: any) => (
  <motion.div 
    animate={active ? { y: [0, -10, 0], opacity: [0.8, 1, 0.8] } : {}}
    transition={{ duration: 4, repeat: Infinity }}
    className="flex flex-col items-center gap-4"
  >
    <div className={`w-24 h-24 rounded-sm border-2 flex items-center justify-center relative ${
      warning ? 'border-amber-500 bg-amber-500/10' : 'border-cyan-500/40 bg-cyan-500/10 shadow-[0_0_30px_rgba(0,242,255,0.2)]'
    }`}>
      <i className={`fas ${warning ? 'fa-triangle-exclamation text-amber-500' : 'fa-server text-cyan-400'} text-3xl`}></i>
      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${warning ? 'bg-amber-500 animate-pulse' : 'bg-cyan-400'}`}></div>
    </div>
    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
  </motion.div>
);

const StatBlock = ({ label, value, trend }: any) => (
  <div className="tactical-glass p-8 border-white/5 hover:border-cyan-500/20 transition-all">
    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2 block">{label}</span>
    <div className="flex justify-between items-end">
      <span className="text-3xl font-black text-white tracking-tighter mono">{value}</span>
      <span className="text-[10px] font-black text-emerald-400">{trend}</span>
    </div>
  </div>
);

export default AdminDashboard;
