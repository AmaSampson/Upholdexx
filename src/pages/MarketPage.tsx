import React, { useState } from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Search, Filter, Star } from 'lucide-react';
import { CryptoPrice } from '../App';

interface MarketPageProps {
  cryptoPrices: CryptoPrice[];
}

const MarketPage: React.FC<MarketPageProps> = ({ cryptoPrices }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'change' | 'volume' | 'marketCap'>('marketCap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [favorites, setFavorites] = useState<string[]>(['BTC', 'ETH']);

  const filteredAndSortedCryptos = cryptoPrices
    .filter(crypto => 
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const marketStats = {
    totalMarketCap: cryptoPrices.reduce((sum, crypto) => sum + crypto.marketCap, 0),
    total24hVolume: cryptoPrices.reduce((sum, crypto) => sum + crypto.volume, 0),
    btcDominance: (cryptoPrices.find(c => c.symbol === 'BTC')?.marketCap || 0) / cryptoPrices.reduce((sum, crypto) => sum + crypto.marketCap, 0) * 100,
    activeCoins: cryptoPrices.length
  };

  return (
    <div className="pt-8 pb-20 bg-dark-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-white-text mb-4">
            Cryptocurrency Market
          </h1>
          <p className="text-xl text-white-text/80 max-w-3xl mx-auto">
            Real-time cryptocurrency prices, market cap, and trading volume data
          </p>
        </div>

        {/* Market Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20">
            <div className="text-white-text/60 text-sm mb-2">Total Market Cap</div>
            <div className="text-2xl font-bold text-white-text">
              ${(marketStats.totalMarketCap / 1000000000000).toFixed(2)}T
            </div>
            <div className="text-green-400 text-sm flex items-center mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +2.4%
            </div>
          </div>
          <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20">
            <div className="text-white-text/60 text-sm mb-2">24h Volume</div>
            <div className="text-2xl font-bold text-white-text">
              ${(marketStats.total24hVolume / 1000000000).toFixed(0)}B
            </div>
            <div className="text-red-400 text-sm flex items-center mt-1">
              <ArrowDownRight className="w-3 h-3 mr-1" />
              -1.2%
            </div>
          </div>
          <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20">
            <div className="text-white-text/60 text-sm mb-2">BTC Dominance</div>
            <div className="text-2xl font-bold text-white-text">
              {marketStats.btcDominance.toFixed(1)}%
            </div>
            <div className="text-blue-400 text-sm mt-1">
              Market Leader
            </div>
          </div>
          <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20">
            <div className="text-white-text/60 text-sm mb-2">Active Coins</div>
            <div className="text-2xl font-bold text-white-text">
              {marketStats.activeCoins}
            </div>
            <div className="text-gold-accent text-sm mt-1">
              Available
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white-text/40" />
              <input
                type="text"
                placeholder="Search cryptocurrencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white-text placeholder-white/40 focus:outline-none focus:border-purple-400 transition-colors duration-200"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-white-text/60" />
                <span className="text-white-text/60">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white-text focus:outline-none focus:border-purple-400"
                >
                  <option value="marketCap">Market Cap</option>
                  <option value="price">Price</option>
                  <option value="change">24h Change</option>
                  <option value="volume">Volume</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Market Table */}
        <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl border border-gold-accent/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left text-white-text/80 font-medium py-4 px-6">#</th>
                  <th className="text-left text-white-text/80 font-medium py-4 px-6">Name</th>
                  <th 
                    className="text-right text-white-text/80 font-medium py-4 px-6 cursor-pointer hover:text-white-text transition-colors"
                    onClick={() => handleSort('price')}
                  >
                    Price {sortBy === 'price' && (sortOrder === 'desc' ? '↓' : '↑')}
                  </th>
                  <th 
                    className="text-right text-white-text/80 font-medium py-4 px-6 cursor-pointer hover:text-white-text transition-colors"
                    onClick={() => handleSort('change')}
                  >
                    24h % {sortBy === 'change' && (sortOrder === 'desc' ? '↓' : '↑')}
                  </th>
                  <th 
                    className="text-right text-white-text/80 font-medium py-4 px-6 cursor-pointer hover:text-white-text transition-colors"
                    onClick={() => handleSort('volume')}
                  >
                    24h Volume {sortBy === 'volume' && (sortOrder === 'desc' ? '↓' : '↑')}
                  </th>
                  <th 
                    className="text-right text-white-text/80 font-medium py-4 px-6 cursor-pointer hover:text-white-text transition-colors"
                    onClick={() => handleSort('marketCap')}
                  >
                    Market Cap {sortBy === 'marketCap' && (sortOrder === 'desc' ? '↓' : '↑')}
                  </th>
                  <th className="text-center text-white-text/80 font-medium py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedCryptos.map((crypto, index) => (
                  <tr key={crypto.symbol} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleFavorite(crypto.symbol)}
                          className={`transition-colors ${
                            favorites.includes(crypto.symbol) ? 'text-yellow-400' : 'text-white-text/40 hover:text-yellow-400'
                          }`}
                        >
                          <Star className="w-4 h-4" fill={favorites.includes(crypto.symbol) ? 'currentColor' : 'none'} />
                        </button>
                        <span className="text-white-text/60">{index + 1}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r gold-gradient rounded-full flex items-center justify-center text-white-text font-bold">
                          {crypto.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white-text font-medium">{crypto.name}</div>
                          <div className="text-white-text/60 text-sm">{crypto.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right text-white-text font-semibold">
                      ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className={`py-4 px-6 text-right font-medium ${crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      <div className="flex items-center justify-end">
                        {crypto.change24h >= 0 ? (
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 mr-1" />
                        )}
                        {Math.abs(crypto.change24h).toFixed(2)}%
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right text-white-text/70">
                      ${(crypto.volume / 1000000).toFixed(0)}M
                    </td>
                    <td className="py-4 px-6 text-right text-white-text/70">
                      ${(crypto.marketCap / 1000000000).toFixed(1)}B
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center space-x-2">
                        <button className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1 rounded text-sm font-medium transition-colors duration-200">
                          Buy
                        </button>
                        <button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1 rounded text-sm font-medium transition-colors duration-200">
                          Sell
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Market Insights */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20">
            <h3 className="text-xl font-semibold text-white-text mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
              Top Gainers (24h)
            </h3>
            <div className="space-y-3">
              {cryptoPrices
                .filter(crypto => crypto.change24h > 0)
                .sort((a, b) => b.change24h - a.change24h)
                .slice(0, 3)
                .map(crypto => (
                  <div key={crypto.symbol} className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r gold-gradient rounded-full flex items-center justify-center text-white-text font-bold text-sm">
                        {crypto.symbol.charAt(0)}
                      </div>
                      <span className="text-white-text font-medium">{crypto.symbol}</span>
                    </div>
                    <div className="text-green-400 font-semibold">
                      +{crypto.change24h.toFixed(2)}%
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20">
            <h3 className="text-xl font-semibold text-white-text mb-4 flex items-center">
              <ArrowDownRight className="w-5 h-5 mr-2 text-red-400" />
              Top Losers (24h)
            </h3>
            <div className="space-y-3">
              {cryptoPrices
                .filter(crypto => crypto.change24h < 0)
                .sort((a, b) => a.change24h - b.change24h)
                .slice(0, 3)
                .map(crypto => (
                  <div key={crypto.symbol} className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r gold-gradient rounded-full flex items-center justify-center text-white-text font-bold text-sm">
                        {crypto.symbol.charAt(0)}
                      </div>
                      <span className="text-white-text font-medium">{crypto.symbol}</span>
                    </div>
                    <div className="text-red-400 font-semibold">
                      {crypto.change24h.toFixed(2)}%
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;