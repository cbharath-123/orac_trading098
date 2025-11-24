'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Symbol } from '@/types';
import { ApiService } from '@/lib/api';

interface SymbolSelectorProps {
  onSymbolSelect: (symbol: string) => void;
  currentSymbol: string;
}

export default function SymbolSelector({ onSymbolSelect, currentSymbol }: SymbolSelectorProps) {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSymbols();
  }, []);

  const loadSymbols = async () => {
    setLoading(true);
    try {
      const data = await ApiService.searchSymbols();
      setSymbols(data);
    } catch (error) {
      console.error('Failed to load symbols:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSymbols = symbols.filter(
    (s) =>
      s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (symbol: string) => {
    onSymbolSelect(symbol);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search symbols..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-blue-500"
        />
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-400">Loading...</div>
          ) : filteredSymbols.length > 0 ? (
            filteredSymbols.map((symbol) => (
              <button
                key={symbol.symbol}
                onClick={() => handleSelect(symbol.symbol)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
                  symbol.symbol === currentSymbol ? 'bg-gray-700' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{symbol.symbol}</span>
                  <span className="text-sm text-gray-400">{symbol.name}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-gray-400">No symbols found</div>
          )}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
