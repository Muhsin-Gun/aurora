
import React from 'react';

interface EmployeeProps {
  setRole: (r: any) => void;
}

const EmployeeDashboard: React.FC<EmployeeProps> = ({ setRole }) => {
  return (
    <div className="h-full w-full flex flex-col bg-[#000205] spatial-layer p-10">
      <header className="h-20 flex items-center justify-between px-10 tactical-glass mb-8 border-emerald-500/30">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/40 rounded-sm flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
             <i className="fas fa-headset text-emerald-400"></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tighter">Ops <span className="text-emerald-400">Support</span></h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Operations & Monitoring Hub</p>
          </div>
        </div>
        <button 
          onClick={() => setRole('CLIENT')}
          className="px-10 py-3 bg-emerald-500 text-black font-black tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]"
        >
          DISCONNECT OPS
        </button>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-8">
        <div className="col-span-5 flex flex-col gap-8 layer-depth-1">
           <div className="tactical-glass p-8">
             <h3 className="text-[10px] font-black text-emerald-500 tracking-[0.4em] uppercase mb-8">Incident Queue</h3>
             <div className="space-y-4">
               <IncidentCard user="Alpha-Trader-9" issue="Withdrawal Lock" priority="URGENT" />
               <IncidentCard user="Nebula-User-4" issue="API Key Leak" priority="CRITICAL" />
               <IncidentCard user="Zenith-Trader-2" issue="Slippage Audit" priority="LOW" />
             </div>
           </div>
           <div className="flex-1 tactical-glass p-8 flex flex-col">
             <h3 className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase mb-6">Real-time Stream Audit</h3>
             <div className="flex-1 bg-black/60 p-4 border border-white/5 mono text-[10px] space-y-2 overflow-y-auto">
               <div className="text-slate-500">[14:10] WATCHING: User-9 Session</div>
               <div className="text-slate-500">[14:09] LOG: Deposit Detected #552</div>
               <div className="text-emerald-500">[14:05] SYSTEM: Route Optimized</div>
               <div className="text-slate-700">[14:00] LOG: Market Data Heartbeat</div>
             </div>
           </div>
        </div>

        <div className="col-span-7 tactical-glass p-12 border-emerald-500/10 layer-depth-2">
          <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-emerald-500/30 overflow-hidden">
                <img src="https://i.pravatar.cc/100?u=alpha" className="w-full h-full object-cover opacity-80" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-white tracking-tighter">Alpha-Trader-9 Monitoring</h4>
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">Tier 1 Pro Entity</p>
              </div>
            </div>
            <div className="flex gap-4">
               <button className="px-6 py-2 bg-red-600/20 text-red-500 border border-red-500/30 text-[9px] font-black uppercase">LOCK ACCOUNT</button>
               <button className="px-6 py-2 bg-emerald-500 text-black text-[9px] font-black uppercase shadow-lg shadow-emerald-500/20">RESOLVE TICKET</button>
            </div>
          </div>
          
          <div className="h-64 bg-black/40 rounded-sm border border-white/5 p-8 mb-10">
             <div className="flex flex-col gap-6">
                <div className="bg-slate-900/50 p-6 border-l-2 border-emerald-500 text-slate-300">
                  <span className="text-[9px] font-black text-emerald-400 block mb-2">SYSTEM TRANSCRIPTION (RECAP)</span>
                  <p className="text-sm italic">"User requested a status update on their $250k wire. Compliance check NY-04 passed. Awaiting final relay."</p>
                </div>
                <div className="p-4 bg-red-500/5 border border-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-widest text-center">
                  DIRECT CLIENT MESSAGING IS DISABLED FOR SECURITY COMPLIANCE
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
             <InfoTile label="Account Value" val="$2,492,000" />
             <InfoTile label="Open Exposure" val="$12,000" />
          </div>
        </div>
      </main>
    </div>
  );
};

const InfoTile = ({ label, val }: any) => (
  <div className="p-6 bg-white/5 border border-white/5">
    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 block">{label}</span>
    <span className="text-2xl font-black text-white mono">{val}</span>
  </div>
);

const IncidentCard = ({ user, issue, priority }: any) => (
  <div className="p-4 bg-white/5 border border-white/5 hover:bg-emerald-500/5 transition-all cursor-pointer group">
    <div className="flex justify-between items-start mb-2">
      <span className="text-xs font-black text-white group-hover:text-emerald-400">{user}</span>
      <span className={`text-[8px] font-black px-2 py-0.5 rounded ${
        priority === 'CRITICAL' ? 'bg-red-500/20 text-red-500' : 'bg-slate-800 text-slate-400'
      }`}>{priority}</span>
    </div>
    <p className="text-[11px] text-slate-500 font-medium">{issue}</p>
  </div>
);

export default EmployeeDashboard;
