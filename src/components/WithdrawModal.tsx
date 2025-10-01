import React, { useState } from 'react';
import { X, DollarSign, Wallet } from 'lucide-react';

interface WithdrawModalProps {
  userBalance: number;
  onWithdraw: (amount: number, cryptoType: string, address: string) => void;
  onClose: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ userBalance, onWithdraw, onClose }) => {
  const [amount, setAmount] = useState('');
  const [cryptoType, setCryptoType] = useState('BTC');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0 || withdrawAmount > userBalance) {
      alert('Please enter a valid amount (not exceeding your balance)');
      return;
    }
    if (!address) {
      alert('Please enter a destination wallet address');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      onWithdraw(withdrawAmount, cryptoType, address);
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/80 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Withdraw Funds</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Amount (USD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors duration-200"
                placeholder="Enter amount"
                min="1"
                max={userBalance}
                step="0.01"
                required
              />
            </div>
            <div className="text-white/60 text-xs mt-1">Available: ${userBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-3">
              Cryptocurrency
            </label>
            <select
              value={cryptoType}
              onChange={e => setCryptoType(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-400 transition-colors duration-200"
            >
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT">Tether (USDT)</option>
            </select>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-3">
              Destination {cryptoType} Wallet Address
            </label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors duration-200"
                placeholder={`Enter destination ${cryptoType} address`}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading || !amount || !address}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            {isLoading ? 'Processing...' : `Withdraw $${amount || '0'}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawModal;
