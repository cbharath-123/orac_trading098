// Frontend Type Definitions

export interface TimeSeriesData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TechnicalIndicators {
  ema: number;
  emaSlope: number;
  rsi: number;
  rsiMomentum: number;
  macd: number;
  macdSignal: number;
  macdHist: number;
  macdHistSlope: number;
  supertrend: number;
  supertrendDirection: number;
  adx: number;
  atr: number;
}

export interface TimeframeScore {
  timeframe: string;
  score: number;
  confidence: number;
  indicators: TechnicalIndicators;
  bias: 'Bullish' | 'Bearish' | 'Neutral';
}

export interface AggregatedBias {
  overallScore: number;
  grade: string;
  bias: 'Bullish' | 'Bearish' | 'Neutral';
  confidence: number;
  timeframes: TimeframeScore[];
}

export interface Symbol {
  symbol: string;
  name: string;
}
