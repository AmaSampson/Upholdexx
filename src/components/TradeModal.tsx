import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoPrice } from '../App';

interface TradeModalProps {
  crypto: CryptoPrice;
  type: 'buy' | 'sell';
  userBalance: number;
  onTrade: (type: 'buy' | 'sell', amount: number, token: string, price: number) => void;
  onClose: () => void;
}

const TradeModal: React.FC<TradeModalProps> = ({ crypto, type, userBalance, onTrade, onClose }) => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const tradeAmount = parseFloat(amount) || 0;
  const totalCost = tradeAmount * crypto.price;
  const canAfford = type === 'sell' || totalCost <= userBalance;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canAfford) {
      alert('Insufficient balance');
      return;
    }

    if (tradeAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    
    // Simulate trade execution
    setTimeout(() => {
      onTrade(type, tradeAmount, crypto.symbol, crypto.price);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/80 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            {type === 'buy' ? (
              <TrendingUp className="w-6 h-6 text-green-400" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-400" />
            )}
            <span>{type === 'buy' ? 'Buy' : 'Sell'} {crypto.symbol}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Crypto Info */}
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                {crypto.symbol.charAt(0)}
              </div>
              <div>
                <div className="text-white font-medium">{crypto.name}</div>
                <div className="text-white/60 text-sm">{crypto.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-semibold">
                ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`text-sm ${crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Amount ({crypto.symbol})
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 transition-colors duration-200"
              placeholder={`Enter ${crypto.symbol} amount`}
              min="0"
              step="0.000001"
              required
            />
          </div>

          {/* Trade Summary */}
          <div className="bg-white/5 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-white/80">
              <span>Price per {crypto.symbol}:</span>
              <span>${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Amount:</span>
              <span>{tradeAmount.toFixed(6)} {crypto.symbol}</span>
            </div>
            <div className="flex justify-between text-white font-semibold border-t border-white/10 pt-2">
              <span>Total:</span>
              <span>${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Balance Info */}
          <div className="text-white/60 text-sm">
            Available balance: ${userBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>

          {!canAfford && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
              Insufficient balance for this trade
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !canAfford || tradeAmount <= 0}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
              type === 'buy'
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
            }`}
          >
            {isLoading ? 'Processing...' : `${type === 'buy' ? 'Buy' : 'Sell'} ${crypto.symbol}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TradeModal;