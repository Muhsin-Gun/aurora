
export const COLORS = {
  bg: '#020617',
  surface: '#0f172a',
  primary: '#3b82f6',
  secondary: '#6366f1',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  text: '#f8fafc',
  textMuted: '#94a3b8',
  border: '#1e293b'
};

export const SYMBOLS = [
  'EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD', 'BTCUSD', 'ETHUSD', 'NAS100', 'US30'
];

export const MOCK_CHART_DATA = Array.from({ length: 100 }, (_, i) => ({
  time: Date.now() - (100 - i) * 60000,
  open: 1.0850 + Math.random() * 0.002,
  high: 1.0855 + Math.random() * 0.002,
  low: 1.0845 + Math.random() * 0.002,
  close: 1.0851 + Math.random() * 0.002,
  volume: Math.floor(Math.random() * 1000)
}));
