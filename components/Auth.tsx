import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5),
        y: (e.clientY / window.innerHeight - 0.5)
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin({
        id: 'usr_1',
        email: email || 'trader@aurora.io',
        name: 'Vanguard Operator',
        role: 'CLIENT',
        balance: 250000.00,
        equity: 250000.00
      });
    }, 1500);
  };

  const debris = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    z: Math.random() * 1000 - 500,
    rotation: Math.random() * 360,
    speed: Math.random() * 20 + 10
  })), []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden perspective-[2000px]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          style={{ 
            x: mousePos.x * -100, 
            y: mousePos.y * -100,
            scale: 1.2
          }}
          className="relative w-[1000px] h-[1000px]"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-400 rounded-full blur-[80px] opacity-40"></div>
          {[0, 120, 240].map((rotation) => (
            <div key={rotation} className="absolute inset-0" style={{ transform: `rotate(${rotation}deg)` }}>
              <div className="absolute top-1/2 left-1/2 w-[500px] h-[300px] border-t-4 border-l-4 border-cyan-500/10 rounded-[100%] blur-[40px]"></div>
              <div className="absolute top-1/2 left-1/2 w-[400px] h-[200px] border-t-2 border-cyan-400/5 rounded-[100%] blur-[20px] scale-75 origin-top-left"></div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-0">
        {debris.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              z: [d.z, d.z + 1000],
              x: [`${d.x}vw`, `${d.x + mousePos.x * 20}vw`],
              y: [`${d.y}vh`, `${d.y + mousePos.y * 20}vh`],
              rotate: d.rotation + 360
            }}
            transition={{ 
              duration: d.speed, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * d.speed
            }}
            style={{ 
              width: d.size, 
              height: d.size,
              backgroundColor: i % 2 === 0 ? '#00f2ff' : '#fff',
              position: 'absolute',
              top: '50%',
              left: '50%',
              boxShadow: '0 0 10px rgba(0, 242, 255, 0.5)'
            }}
            className="rounded-full blur-[1px]"
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotateX: 25, y: 100 }}
        animate={{ opacity: 1, scale: 1, rotateX: mousePos.y * -15, rotateY: mousePos.x * 15, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 w-full max-w-lg tactical-glass p-12 border border-cyan-500/30 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,242,255,0.15)] group hologram-flicker"
      >
        <div className="scanlines"></div>
        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

        <div className="flex flex-col items-center mb-10 relative z-20">
          <motion.div 
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 0.95, 1]
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="w-24 h-24 bg-gradient-to-tr from-cyan-600 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(6,182,212,0.5)] relative"
          >
            <i className="fas fa-atom text-4xl text-white group-hover:scale-110 transition-transform"></i>
            <div className="absolute -inset-2 border border-cyan-500/20 rounded-3xl animate-spin-slow"></div>
            <div className="absolute -inset-4 border border-purple-500/10 rounded-3xl animate-reverse-spin-slow"></div>
          </motion.div>
          
          <h1 className="text-4xl font-black tracking-[0.25em] text-white chromatic-text uppercase">
            AURORA <span className="text-cyan-400">QUANTUM</span>
          </h1>
          <div className="flex items-center gap-4 mt-3">
            <div className="h-[1px] w-12 bg-cyan-500/30"></div>
            <p className="text-cyan-400/70 text-[10px] font-black uppercase tracking-[0.6em]">System Uplink 8.4.1</p>
            <div className="h-[1px] w-12 bg-cyan-500/30"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-20">
          <div className="space-y-1">
            <label className="block text-[10px] font-black text-cyan-400/60 uppercase tracking-[0.4em] mb-3 ml-2">Neural Identity</label>
            <div className="relative group/input">
              <i className="fas fa-user-astronaut absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/30 group-focus-within/input:text-cyan-400 transition-colors"></i>
              <input 
                type="email" 
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/60 border border-cyan-500/20 rounded-xl pl-12 pr-4 py-5 text-white focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-500/40 transition-all font-medium placeholder:text-slate-800 text-sm tracking-wide"
                placeholder="OPERATOR_SIGNATURE"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-black text-cyan-400/60 uppercase tracking-[0.4em] mb-3 ml-2">Secure Link-Key</label>
            <div className="relative group/input">
              <i className="fas fa-key absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/30 group-focus-within/input:text-cyan-400 transition-colors"></i>
              <input 
                type="password" 
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/60 border border-cyan-500/20 rounded-xl pl-12 pr-4 py-5 text-white focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-500/40 transition-all font-medium placeholder:text-slate-800 text-sm tracking-wide"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-6 rounded-xl font-black text-xs uppercase tracking-[0.5em] transition-all relative overflow-hidden group/btn ${
              loading ? 'bg-slate-900 text-slate-700' : 'bg-cyan-500 text-black'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-4">
                <i className="fas fa-circle-notch animate-spin"></i>
                Synchronizing...
              </span>
            ) : (
              'Initiate Command Link'
            )}
            {!loading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
            )}
          </motion.button>
        </form>

        <div className="mt-12 flex items-center justify-between text-[9px] font-black text-slate-600 pt-8 border-t border-white/5 relative z-20">
          <button className="hover:text-cyan-400 transition-colors tracking-[0.2em] uppercase">New Operator Enrollment</button>
          <button className="hover:text-cyan-400 transition-colors tracking-[0.2em] uppercase">Override Credentials</button>
        </div>

        <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-500/60 transition-colors"></div>
        <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-500/60 transition-colors"></div>
        <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-500/60 transition-colors"></div>
        <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-500/60 transition-colors"></div>
      </motion.div>
    </div>
  );
};

export default Auth;