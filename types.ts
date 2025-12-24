
export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL'
}

export enum OrderType {
  MARKET = 'MARKET',
  LIMIT = 'LIMIT',
  STOP = 'STOP'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  FILLED = 'FILLED',
  CANCELLED = 'CANCELLED'
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  lastUpdate: number;
}

export interface Position {
  id: string;
  symbol: string;
  side: OrderSide;
  avgPrice: number;
  quantity: number;
  unrealizedPL: number;
}

export interface Trade {
  id: string;
  symbol: string;
  side: OrderSide;
  price: number;
  quantity: number;
  timestamp: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'CLIENT' | 'EMPLOYEE' | 'ADMIN';
  balance: number;
  equity: number;
}
