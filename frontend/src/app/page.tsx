'use client';

import { useState, useEffect } from 'react';
import TradingChart from '@/components/TradingChart';
import BiasMatrix from '@/components/BiasMatrix';
import SymbolSelector from '@/components/SymbolSelector';
import { ApiService } from '@/lib/api';
import { AggregatedBias, TimeSeriesData } from '@/types';
import { Activity, RefreshCw } from 'lucide-react';

export default function Home() {
  const [symbol, setSymbol] = useState('IBM');
  const [analysis, setAnalysis] = useState<AggregatedBias | null>(null);
  const [chartData, setChartData] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (symbol) {
      fetchData();
    }
  }, [symbol]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch analysis and chart data in parallel
      const [analysisData, chartDataResult] = await Promise.all([
        ApiService.getAnalysis(symbol),
        ApiService.getChartData(symbol, '15min')
      ]);

      setAnalysis(analysisData);
      setChartData(chartDataResult);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <main className="min-h-screen bg-gray-950 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-white">ORAC Trading Dashboard</h1>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Symbol Selector */}
          <div className="max-w-md">
            <SymbolSelector onSymbolSelect={setSymbol} currentSymbol={symbol} />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-red-400">
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6">
          {/* Chart Section */}
          <div>
            {loading && !chartData.length ? (
              <div className="bg-gray-900 rounded-lg p-6 h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">Loading chart data...</p>
                </div>
              </div>
            ) : chartData.length > 0 ? (
              <TradingChart data={chartData} symbol={symbol} />
            ) : (
              <div className="bg-gray-900 rounded-lg p-6 h-[500px] flex items-center justify-center">
                <p className="text-gray-400">No chart data available</p>
              </div>
            )}
          </div>

          {/* Bias Matrix Section */}
          <div>
            <BiasMatrix analysis={analysis} loading={loading} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Data provided by Alpha Vantage | Multi-timeframe analysis using EMA, RSI, MACD, Supertrend, and ADX</p>
          <p className="mt-2">
            <span className="text-xs">
              Note: For demonstration purposes. This dashboard uses the demo API key with limited requests.
              Replace with your own Alpha Vantage API key for production use.
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
