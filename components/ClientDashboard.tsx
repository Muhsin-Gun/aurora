
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ClientDashboard: React.FC = () => {
  const [activeAccount, setActiveAccount] = useState('ALPHA-LIVE-01');
  const [modal, setModal] = useState<'DEPOSIT' | 'WITHDRAW' | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, z: -500 }}
      animate={{ opacity: 1, z: 0 }}
      className="h-full flex flex-col lg:grid lg:grid-cols-12 gap-6 spatial-layer relative overflow-y-auto lg:overflow-hidden"
    >
      {/* Sidebar: Accounts & Security */}
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 shrink-0 h-auto lg:h-full">
        <div className="tactical-glass p-6 flex flex-col h-[350px] lg:h-1/2">
          <div className="flex items-center gap-2 mb-6 shrink-0">
            <div className="w-1 h-4 bg-cyan-400"></div>
            <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Vault Node List</h3>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
            <AccountCard id="ALPHA-LIVE-01" type="Institutional STP" bal="$250,000.00" active={activeAccount === 'ALPHA-LIVE-01'} onClick={() => setActiveAccount('ALPHA-LIVE-01')} />
            <AccountCard id="NEBULA-DEMO-02" type="Tactical Sandbox" bal="$50,000.00" active={activeAccount === 'NEBULA-DEMO-02'} onClick={() => setActiveAccount('NEBULA-DEMO-02')} />
          </div>
          <button className="w-full mt-4 py-3 bg-cyan-500/5 border border-cyan-500/20 text-[9px] font-black hover:bg-cyan-500/20 transition-all tracking-[0.2em] text-cyan-400 shrink-0">
            DEPLOY NEW NODE
          </button>
        </div>
        
        <div className="tactical-glass p-6 flex-1 h-auto lg:h-auto min-h-[250px]">
          <div className="flex items-center gap-2 mb-6 shrink-0">
            <div className="w-1 h-4 bg-cyan-400"></div>
            <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Hardware Link</h3>
          </div>
          <div className="space-y-4">
            <SecurityNode label="Biometric ID" status="LOCKED" active />
            <SecurityNode label="Hardware Key" status="ACTIVE" active />
            <div className="p-4 bg-cyan-900/10 border border-cyan-500/10 mt-6 rounded-sm">
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                Terminal Sync: <span className="text-cyan-400">NY-442-12</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main View: Account Details */}
      <div className="col-span-12 lg:col-span-9 tactical-glass p-6 lg:p-10 flex flex-col relative overflow-hidden min-h-[600px] lg:h-full">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none -mr-12 -mt-12 hidden lg:block">
            <i className="fas fa-microchip text-[250px] text-cyan-500"></i>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start justify-between mb-8 lg:mb-12 relative z-10 gap-6">
          <div className="w-full sm:w-auto">
            <span className="text-cyan-500 font-black text-[9px] tracking-[0.8em] uppercase mb-2 block chromatic-text">COMMAND AUTHORIZATION LEVEL 3</span>
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tighter uppercase mb-1">{activeAccount}</h2>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f2ff]"></span>
                <span className="text-[9px] lg:text-[10px] text-cyan-500/60 font-black tracking-widest uppercase">Encryption: AES-4096 Quantum-Secure</span>
            </div>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
             <button 
              onClick={() => setModal('DEPOSIT')}
              className="flex-1 sm:flex-none px-6 lg:px-8 py-3 bg-cyan-500 text-black font-black text-[9px] lg:text-[10px] tracking-widest shadow-[0_0_25px_rgba(0,242,255,0.4)] hover:brightness-125 transition-all whitespace-nowrap"
             >
               INJECT ASSETS
             </button>
             <button 
              onClick={() => setModal('WITHDRAW')}
              className="flex-1 sm:flex-none px-6 lg:px-8 py-3 border border-cyan-500/40 text-cyan-400 font-black text-[9px] lg:text-[10px] tracking-widest hover:bg-cyan-500/10 transition-all whitespace-nowrap"
             >
               EXTRACT LIQUIDITY
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12 relative z-10">
          <DetailTile label="Credit Ceiling" value="1:500" />
          <DetailTile label="Gateway Router" value="LDN-NY-4" />
          <DetailTile label="Yield Velocity" value="2.41x" />
        </div>

        <div className="flex-1 flex flex-col relative z-10 overflow-hidden min-h-[300px]">
           <div className="flex justify-between items-center mb-4 shrink-0">
             <h4 className="text-[9px] lg:text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Network Transaction Log</h4>
             <button className="text-[8px] lg:text-[9px] text-cyan-500 font-black uppercase hover:text-white transition-colors">Generate Decrypted Report</button>
           </div>
           <div className="flex-1 bg-black/40 p-4 lg:p-5 overflow-y-auto space-y-2 mono text-[10px] lg:text-[11px] border border-cyan-500/10 custom-scrollbar">
              <LedgerRow time="16:04" type="TRANS" msg="LIQUIDITY RECONCILIATION: NY HUB" val="OK" color="text-cyan-400" />
              <LedgerRow time="14:22" type="INJECT" msg="WIRE DEPOSIT: INSTITUTIONAL A-1" val="+$250k" color="text-emerald-400" />
              <LedgerRow time="12:15" type="SECURE" msg="UPLINK ESTABLISHED: QUANT-NODE-7" val="AUTH" color="text-cyan-400" />
              <LedgerRow time="11:30" type="TRADE" msg="SHORT XAUUSD 5.00 LOTS (OPEN)" val="PEND" color="text-rose-500" />
              <LedgerRow time="10:12" type="TRANS" msg="INTERNAL SWAP: USD TO BTC" val="+$12.4k" color="text-emerald-400" />
              <LedgerRow time="09:00" type="ADMIN" msg="QUARTERLY AUDIT COMPLETED" val="PASS" color="text-cyan-400" />
           </div>
        </div>
      </div>

      {/* MODAL SYSTEM */}
      <AnimatePresence>
        {modal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center modal-overlay p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className="w-full max-w-xl tactical-glass p-6 lg:p-12 border-cyan-400/50 relative overflow-hidden"
            >
              {/* Sci-fi Decorative background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>
              
              <div className="flex items-center gap-3 mb-6 lg:mb-8">
                  <div className="w-1 h-6 bg-cyan-500"></div>
                  <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tighter uppercase">{modal} <span className="text-cyan-500">PROTOCOL</span></h2>
              </div>
              
              <div className="space-y-8 lg:space-y-10 relative z-10">
                <div className="space-y-4">
                  <label className="text-[9px] lg:text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-2 block">Define Asset Quantity</label>
                  <div className="relative group">
                    <input 
                        className="w-full bg-black/80 border border-cyan-500/30 px-6 py-6 lg:py-8 text-2xl lg:text-4xl font-black text-white focus:outline-none focus:border-cyan-400 mono placeholder:text-slate-800 transition-all" 
                        placeholder="0.00 USD" 
                        autoFocus
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2">
                        <span className="text-cyan-500/40 font-black text-[10px] uppercase tracking-widest">Global Unit</span>
                        <i className="fas fa-globe text-cyan-500/40"></i>
                    </div>
                  </div>
                </div>

                <div className="bg-cyan-900/10 p-4 border border-cyan-500/20 rounded-sm">
                   <div className="flex justify-between items-center text-[9px] lg:text-[10px] font-black">
                       <span className="text-slate-500 uppercase tracking-widest">Estimated Gas Fee</span>
                       <span className="text-cyan-400 mono">2.42 GWEI</span>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                   <button className="flex-1 py-4 lg:py-5 bg-cyan-500 text-black font-black uppercase tracking-[0.2em] lg:tracking-[0.3em] text-[10px] lg:text-xs shadow-[0_0_40px_rgba(0,242,255,0.4)] hover:brightness-125 transition-all">
                     AUTHORIZE TRANSFER
                   </button>
                   <button 
                    onClick={() => setModal(null)} 
                    className="px-8 lg:px-10 py-4 lg:py-5 border border-white/10 text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] lg:text-xs hover:text-white hover:border-white/30 transition-all"
                   >
                     ABORT
                   </button>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute bottom-4 left-4 opacity-20 text-[7px] lg:text-[8px] font-mono text-cyan-500 hidden sm:block">
                  SYSTEM_UID: 0x88F2A...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const DetailTile = ({ label, value }: any) => (
  <div className="p-4 lg:p-6 bg-slate-900/40 border border-cyan-500/10 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-500/5 rotate-45 translate-x-4 -translate-y-4"></div>
    <span className="text-[8px] lg:text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 block group-hover:text-cyan-400 transition-colors">{label}</span>
    <span className="text-2xl lg:text-3xl font-black text-white tracking-tighter mono">{value}</span>
  </div>
);

const LedgerRow = ({ time, type, msg, val, color }: any) => (
  <div className="flex justify-between items-center py-2 lg:py-2.5 border-b border-white/5 hover:bg-white/5 px-2 lg:px-4 transition-all">
    <div className="flex gap-2 lg:gap-6 items-center overflow-hidden">
      <span className="text-slate-600 text-[8px] lg:text-[9px] shrink-0">[{time}]</span>
      <span className={`font-black text-[9px] lg:text-[10px] w-12 lg:w-14 shrink-0 ${color}`}>[{type}]</span>
      <span className="text-slate-400 text-[9px] lg:text-[10px] tracking-tight truncate">{msg}</span>
    </div>
    <span className={`font-black mono text-[9px] lg:text-[11px] shrink-0 ml-2 ${color}`}>{val}</span>
  </div>
);

const SecurityNode = ({ label, status, active }: any) => (
  <div className="flex items-center justify-between p-3 lg:p-4 bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-all cursor-crosshair">
    <span className="text-[9px] lg:text-[10px] font-black text-slate-400 tracking-widest uppercase">{label}</span>
    <span className={`text-[8px] lg:text-[9px] font-black px-2 lg:px-3 py-1 border transition-all ${
        active ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' : 'text-slate-700 bg-slate-900 border-slate-800'
    }`}>{status}</span>
  </div>
);

const AccountCard = ({ id, type, bal, active, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`p-4 lg:p-5 border cursor-pointer transition-all relative overflow-hidden group ${
      active ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_20px_rgba(0,242,255,0.1)]' : 'bg-black/40 border-white/5 hover:border-white/20'
    }`}
  >
    {active && <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400 shadow-[0_0_10px_#00f2ff]"></div>}
    <div className="flex justify-between items-start mb-2">
      <span className={`text-[9px] lg:text-[10px] font-black ${active ? 'text-white' : 'text-slate-500'}`}>{id}</span>
      <i className={`fas fa-check-circle text-[9px] lg:text-[10px] ${active ? 'text-cyan-400' : 'text-slate-800'}`}></i>
    </div>
    <div className={`text-xl lg:text-2xl font-black mb-1 mono tracking-tighter transition-all ${active ? 'text-white' : 'text-slate-400'}`}>{bal}</div>
    <span className="text-[7px] lg:text-[8px] font-black text-slate-600 uppercase tracking-widest group-hover:text-slate-400 truncate block">{type}</span>
  </div>
);

export default ClientDashboard;
