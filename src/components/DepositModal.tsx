import React, { useState } from 'react';
import { X, DollarSign, CreditCard, Banknote } from 'lucide-react';

interface DepositModalProps {
  onDeposit: (amount: number) => void;
  onClose: () => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ onDeposit, onClose }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [isLoading, setIsLoading] = useState(false);

  const quickAmounts = [100, 500, 1000, 5000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onDeposit(depositAmount);
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/80 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Add Funds</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Amount Buttons */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-3">
              Quick Select
            </label>
            <div className="grid grid-cols-2 gap-2">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  type="button"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-purple-400 text-white py-2 px-4 rounded-lg transition-all duration-200"
                >
                  ${quickAmount}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Amount (USD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="Enter amount"
                min="1"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-3">
              Payment Method
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`w-full flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 ${
                  paymentMethod === 'card'
                    ? 'bg-purple-500/20 border-purple-400 text-white'
                    : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Credit/Debit Card</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('bank')}
                className={`w-full flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 ${
                  paymentMethod === 'bank'
                    ? 'bg-purple-500/20 border-purple-400 text-white'
                    : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
                }`}
              >
                <Banknote className="w-5 h-5" />
                <span>Bank Transfer</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !amount}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            {isLoading ? 'Processing...' : `Deposit $${amount || '0'}`}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-white/60 text-sm">
            Funds will be available immediately after confirmation
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;