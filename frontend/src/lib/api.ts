import axios from 'axios';
import { AggregatedBias, TimeSeriesData, Symbol } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class ApiService {
  static async getAnalysis(symbol: string, timeframes?: string[]): Promise<AggregatedBias> {
    const response = await axios.post(`${API_URL}/api/analysis`, {
      symbol,
      timeframes: timeframes || ['15min', '1hour', '4hour', '1day', '1week']
    });
    return response.data;
  }

  static async getChartData(symbol: string, interval: string = '15min'): Promise<TimeSeriesData[]> {
    const response = await axios.get(`${API_URL}/api/chart/${symbol}`, {
      params: { interval }
    });
    return response.data;
  }

  static async searchSymbols(query: string = ''): Promise<Symbol[]> {
    const response = await axios.get(`${API_URL}/api/symbols/search`, {
      params: { query }
    });
    return response.data;
  }

  static async healthCheck(): Promise<any> {
    const response = await axios.get(`${API_URL}/api/health`);
    return response.data;
  }
}
