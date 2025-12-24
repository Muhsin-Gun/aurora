import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MarketData } from './types';
import { SYMBOLS } from './constants';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';

const MotionDiv = motion.div as any;

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeSymbol, setActiveSymbol] = useState('XAUUSD');
  const [marketData, setMarketData] = useState<Record<string, MarketData>>({});
  const [role, setRole] = useState<'CLIENT' | 'ADMIN' | 'EMPLOYEE'>('CLIENT');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => {
        const newData = { ...prev };
        SYMBOLS.forEach(sym => {
          const isCrypto = sym.includes('BTC') || sym.includes('ETH');
          const isGold = sym.includes('XAU');
          const base = isGold ? 2641.68 : isCrypto ? 93000 : 1.08;
          const current = prev[sym] || {
            symbol: sym, price: base, change: 0, changePercent: 0,
            volume: Math.random() * 1000000, high: base * 1.002, low: base * 0.998,
            lastUpdate: Date.now()
          };
          const vol = isCrypto ? 35.0 : isGold ? 0.35 : 0.00015;
          const delta = (Math.random() - 0.5) * vol;
          const newPrice = current.price + delta;
          newData[sym] = {
            ...current, price: newPrice,
            change: newPrice - base,
            changePercent: ((newPrice - base) / base) * 100,
            lastUpdate: Date.now()
          };
        });
        return newData;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    setRole('CLIENT');
    setIsAuthenticated(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 60,
      y: (e.clientY / window.innerHeight - 0.5) * 60
    });
  };

  return (
    <div 
      className="h-screen w-screen bg-[#000205] text-slate-100 flex flex-col font-sans overflow-hidden select-none"
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>
        {isInitializing && (
          <MotionDiv
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 border-t-2 border-cyan-500 rounded-full mb-8"
            />
            <h1 className="text-2xl font-black tracking-[1em] text-white uppercase chromatic-text">AURORA PRO</h1>
            <p className="text-[10px] font-black text-cyan-500/60 uppercase tracking-[0.5em] mt-4">Synchronizing Neural Interface...</p>
          </MotionDiv>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {isAuthenticated && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: window.innerWidth + 800, y: Math.random() * window.innerHeight }}
            animate={{ 
              x: [-1500],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              rotate: [0, i % 2 === 0 ? 1 : -1]
            }}
            transition={{ 
              duration: 100 + i * 30, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 4
            }}
            className="absolute opacity-[0.04]"
          >
             <div className="relative">
                <div className="w-[800px] h-[1px] bg-gradient-to-l from-transparent via-cyan-400/30 to-transparent blur-3xl"></div>
                <div className="absolute top-[-20px] left-1/2 -translate-x-1/2">
                   <svg width="400" height="80" viewBox="0 0 400 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 40L80 0H320L400 40L320 80H80L0 40Z" fill="#0c4a6e" fillOpacity="0.4" />
                      <rect x="100" y="35" width="200" height="10" fill="#00f2ff" fillOpacity="0.05" />
                      <circle cx="50" cy="40" r="2" fill="#00f2ff" className="animate-pulse" />
                      <circle cx="350" cy="40" r="2" fill="#00f2ff" className="animate-pulse" />
                   </svg>
                </div>
             </div>
          </motion.div>
        ))}
        <motion.div
           animate={{ 
             x: mousePos.x * 0.15,
             y: mousePos.y * 0.15
           }}
           className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_75%)]"
        />
      </div>

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <MotionDiv
            key="auth"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center relative z-20"
          >
            <Auth onLogin={handleLogin} />
          </MotionDiv>
        ) : (
          <MotionDiv
            key="terminal"
            className="flex-1 flex flex-col h-full overflow-hidden relative z-10 preserve-3d"
            initial={{ opacity: 0, rotateX: 5 }}
            animate={{ 
              opacity: 1,
              rotateX: mousePos.y * 0.01,
              rotateY: mousePos.x * 0.01,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 60 }}
          >
            {role === 'CLIENT' && (
              <Dashboard 
                user={user!} 
                marketData={marketData} 
                activeSymbol={activeSymbol}
                setActiveSymbol={setActiveSymbol}
                onLogout={() => setIsAuthenticated(false)}
                setRole={setRole}
                currentRole={role}
              />
            )}
            {role === 'ADMIN' && <AdminDashboard setRole={setRole} />}
            {role === 'EMPLOYEE' && <EmployeeDashboard setRole={setRole} />}
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;