'use client';

import { AggregatedBias, TimeframeScore } from '@/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface BiasMatrixProps {
  analysis: AggregatedBias | null;
  loading: boolean;
}

export default function BiasMatrix({ analysis, loading }: BiasMatrixProps) {
  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="text-center text-gray-400 py-12">
          <p>No analysis data available</p>
          <p className="text-sm mt-2">Select a symbol to start analyzing</p>
        </div>
      </div>
    );
  }

  const getBiasColor = (bias: string) => {
    switch (bias) {
      case 'Bullish':
        return 'text-green-500';
      case 'Bearish':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  const getBiasIcon = (bias: string) => {
    switch (bias) {
      case 'Bullish':
        return <TrendingUp className="w-5 h-5" />;
      case 'Bearish':
        return <TrendingDown className="w-5 h-5" />;
      default:
        return <Minus className="w-5 h-5" />;
    }
  };

  const getScoreColor = (score: number) => {
    const absScore = Math.abs(score);
    if (absScore >= 60) return score > 0 ? 'bg-green-600' : 'bg-red-600';
    if (absScore >= 40) return score > 0 ? 'bg-green-500' : 'bg-red-500';
    if (absScore >= 20) return score > 0 ? 'bg-green-400' : 'bg-red-400';
    return 'bg-gray-600';
  };

  const formatTimeframe = (timeframe: string) => {
    const map: { [key: string]: string } = {
      '15min': '15m',
      '1hour': '1H',
      '60min': '1H',
      '4hour': '4H',
      '4h': '4H',
      '1day': '1D',
      '1D': '1D',
      'daily': '1D',
      '1week': '1W',
      '1W': '1W',
      'weekly': '1W'
    };
    return map[timeframe] || timeframe;
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      {/* Header */}
      <div className="border-b border-gray-700 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Multi-Timeframe Bias Matrix</h2>
        <div className="flex items-center space-x-6">
          <div>
            <span className="text-gray-400 text-sm">Aggregate Bias: </span>
            <span className={`text-xl font-bold ${getBiasColor(analysis.bias)}`}>
              {analysis.overallScore > 0 ? '+' : ''}
              {analysis.overallScore}
            </span>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Grade: </span>
            <span className="text-xl font-bold text-white">{analysis.grade}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`flex items-center space-x-1 ${getBiasColor(analysis.bias)}`}>
              {getBiasIcon(analysis.bias)}
              <span className="font-semibold">{analysis.bias}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 font-medium pb-3 px-2">Timeframe</th>
              <th className="text-center text-gray-400 font-medium pb-3 px-2">Score</th>
              <th className="text-center text-gray-400 font-medium pb-3 px-2">Confidence</th>
              <th className="text-center text-gray-400 font-medium pb-3 px-2">EMA</th>
              <th className="text-center text-gray-400 font-medium pb-3 px-2">RSI</th>
              <th className="text-center text-gray-400 font-medium pb-3 px-2">MACD</th>
              <th className="text-center text-gray-400 font-medium pb-3 px-2">Supertrend</th>
            </tr>
          </thead>
          <tbody>
            {analysis.timeframes.map((tf: TimeframeScore, index: number) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="py-3 px-2">
                  <span className="font-semibold text-white">{formatTimeframe(tf.timeframe)}</span>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center justify-center">
                    <div className={`px-3 py-1 rounded font-semibold ${getScoreColor(tf.score)} text-white`}>
                      {tf.score > 0 ? '+' : ''}
                      {tf.score}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex items-center justify-center">
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${tf.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-gray-400 text-xs">
                      {Math.round(tf.confidence * 100)}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <span className={`${tf.indicators.emaSlope > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {tf.indicators.emaSlope > 0 ? '+' : ''}
                    {tf.indicators.emaSlope.toFixed(2)}
                  </span>
                </td>
                <td className="py-3 px-2 text-center">
                  <span className={`${tf.indicators.rsi > 50 ? 'text-green-400' : 'text-red-400'}`}>
                    {tf.indicators.rsi.toFixed(1)}
                  </span>
                </td>
                <td className="py-3 px-2 text-center">
                  <span className={`${tf.indicators.macdHist > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {tf.indicators.macdHist > 0 ? '+' : ''}
                    {tf.indicators.macdHist.toFixed(2)}
                  </span>
                </td>
                <td className="py-3 px-2 text-center">
                  <span className={`flex items-center justify-center ${tf.indicators.supertrendDirection > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {tf.indicators.supertrendDirection > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500">
          <strong>Score:</strong> Aggregate trend signal from -100 (bearish) to +100 (bullish) | 
          <strong> Confidence:</strong> Based on ADX (trend strength) | 
          <strong> Color Coding:</strong> Green = Bullish, Red = Bearish, Gray = Neutral
        </p>
      </div>
    </div>
  );
}
