import React, { useState } from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, BarChart3, DollarSign } from 'lucide-react';
import { UserData, CryptoPrice } from '../App';
import TradingChart from '../components/TradingChart';
import TradeModal from '../components/TradeModal';

interface TradePageProps {
  user: UserData | null;
  cryptoPrices: CryptoPrice[];
  onTrade: (type: 'buy' | 'sell', amount: number, token: string, price: number) => void;
  onLogin: () => void;
}

const TradePage: React.FC<TradePageProps> = ({ user, cryptoPrices, onTrade, onLogin }) => {
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoPrice | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  const handleTradeClick = (crypto: CryptoPrice, type: 'buy' | 'sell') => {
    if (!user) {
      onLogin();
      return;
    }
    setSelectedCrypto(crypto);
    setTradeType(type);
    setShowTradeModal(true);
  };

  return (
    <div className="pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-white-text mb-4">
            Advanced Trading
          </h1>
          <p className="text-xl text-white-text/80 max-w-3xl mx-auto">
            Trade cryptocurrencies with professional-grade tools and real-time market data
          </p>
        </div>

        {/* Trading Interface */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Trading Chart */}
          <div className="lg:col-span-2 bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white-text flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-gold-accent" />
                BTC/USD Chart
              </h2>
              <div className="flex space-x-2">
                <button className="bg-gold-accent/20 text-gold-accent px-3 py-1 rounded text-sm">1H</button>
                <button className="bg-light-gray/10 text-light-gray/60 px-3 py-1 rounded text-sm">4H</button>
                <button className="bg-light-gray/10 text-light-gray/60 px-3 py-1 rounded text-sm">1D</button>
                <button className="bg-light-gray/10 text-light-gray/60 px-3 py-1 rounded text-sm">1W</button>
              </div>
            </div>
            <TradingChart />
          </div>

          {/* Order Book */}
          <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20">
            <h3 className="text-xl font-semibold text-white-text mb-4">Order Book</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4 text-sm text-white-text/60 mb-2">
                <span>Price (USD)</span>
                <span className="text-right">Amount (BTC)</span>
              </div>
              {/* Sell Orders */}
              <div className="space-y-1">
                {[43280, 43275, 43270, 43265, 43260].map((price, index) => (
                  <div key={price} className="grid grid-cols-2 gap-4 text-sm">
                    <span className="text-red-400">${price.toLocaleString()}</span>
                    <span className="text-right text-white-text/70">{(Math.random() * 2).toFixed(4)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-light-gray/20 my-2 pt-2">
                <div className="text-center text-gold-accent font-semibold">
                  ${cryptoPrices[0]?.price.toLocaleString() || '43,250'}
                </div>
              </div>
              {/* Buy Orders */}
              <div className="space-y-1">
                {[43245, 43240, 43235, 43230, 43225].map((price, index) => (
                  <div key={price} className="grid grid-cols-2 gap-4 text-sm">
                    <span className="text-green-400">${price.toLocaleString()}</span>
                    <span className="text-right text-white-text/70">{(Math.random() * 2).toFixed(4)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="bg-dark-bg/80 backdrop-blur-md rounded-2xl p-6 border border-light-gray/20 mb-8">
          <h2 className="text-2xl font-bold text-white-text mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-gold-accent" />
            Live Markets
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-light-gray/20">
                  <th className="text-left text-white-text/80 font-medium py-3">Asset</th>
                  <th className="text-right text-white-text/80 font-medium py-3">Price</th>
                  <th className="text-right text-white-text/80 font-medium py-3">24h Change</th>
                  <th className="text-right text-white-text/80 font-medium py-3">Volume</th>
                  <th className="text-right text-white-text/80 font-medium py-3">Market Cap</th>
                  <th className="text-right text-white-text/80 font-medium py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cryptoPrices.map((crypto) => (
                  <tr key={crypto.symbol} className="border-b border-light-gray/5 hover:bg-light-gray/5">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gold-accent rounded-full flex items-center justify-center text-dark-bg font-bold">
                          {crypto.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white-text font-medium">{crypto.symbol}</div>
                          <div className="text-white-text/60 text-sm">{crypto.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-right text-gold-accent font-semibold">
                      ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className={`py-4 text-right font-medium ${crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      <div className="flex items-center justify-end">
                        {crypto.change24h >= 0 ? (
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 mr-1" />
                        )}
                        {Math.abs(crypto.change24h).toFixed(2)}%
                      </div>
                    </td>
                    <td className="py-4 text-right text-white-text/70">
                      ${(crypto.volume / 1000000).toFixed(0)}M
                    </td>
                    <td className="py-4 text-right text-white-text/70">
                      ${(crypto.marketCap / 1000000000).toFixed(0)}B
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleTradeClick(crypto, 'buy')}
                          className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
                        >
                          Buy
                        </button>
                        <button
                          onClick={() => handleTradeClick(crypto, 'sell')}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
                        >
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

        {/* Trading Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20 text-center">
            <div className="bg-gold-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-dark-bg" />
            </div>
            <h3 className="text-xl font-semibold text-white-text mb-2">Advanced Charts</h3>
            <p className="text-white-text/70">Professional trading charts with technical indicators and analysis tools.</p>
          </div>
          <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20 text-center">
            <div className="bg-gold-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-dark-bg" />
            </div>
            <h3 className="text-xl font-semibold text-white-text mb-2">Real-time Data</h3>
            <p className="text-white-text/70">Live market data and order book updates for informed trading decisions.</p>
          </div>
          <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20 text-center">
            <div className="bg-gold-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-dark-bg" />
            </div>
            <h3 className="text-xl font-semibold text-white-text mb-2">Low Fees</h3>
            <p className="text-white-text/70">Competitive trading fees starting from 0.1% for all cryptocurrency pairs.</p>
          </div>
        </div>
      </div>

      {/* Trade Modal */}
      {showTradeModal && selectedCrypto && user && (
        <TradeModal
          crypto={selectedCrypto}
          type={tradeType}
          userBalance={user.balance}
          onTrade={onTrade}
          onClose={() => setShowTradeModal(false)}
        />
      )}
    </div>
  );
};

export default TradePage;