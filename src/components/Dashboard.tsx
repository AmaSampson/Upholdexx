import React, { useState } from 'react';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Plus, Minus, BarChart3, Clock, CheckCircle, XCircle } from 'lucide-react';
import { UserData, CryptoPrice, Transaction } from '../App';
import TradingChart from './TradingChart';
import DepositModal from './DepositModal';
import TradeModal from './TradeModal';
import WithdrawModal from './WithdrawModal';

interface DashboardProps {
  user: UserData;
  cryptoPrices: CryptoPrice[];
  onDeposit: (amount: number) => void;
  onTrade: (type: 'buy' | 'sell', amount: number, token: string, price: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, cryptoPrices, onDeposit, onTrade }) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoPrice | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const totalPortfolioValue = user.balance + user.transactions
    .filter(t => t.type === 'buy' && t.status === 'completed')
    .reduce((sum, t) => sum + (t.amount * t.price), 0);

  const handleTradeClick = (crypto: CryptoPrice, type: 'buy' | 'sell') => {
    setSelectedCrypto(crypto);
    setTradeType(type);
    setShowTradeModal(true);
  };

  const handleWithdraw = (amount: number, cryptoType: string, address: string) => {
    if (amount > user.balance) {
      alert('Insufficient balance');
      return;
    }
    onDeposit(-amount); // Subtract from balance
    // Optionally, add a withdrawal transaction here if needed
  };

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
    }
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'buy':
        return <ArrowUpRight className="w-4 h-4 text-green-400" />;
      case 'sell':
        return <ArrowDownRight className="w-4 h-4 text-red-400" />;
      case 'deposit':
        return <Plus className="w-4 h-4 text-blue-400" />;
      case 'withdraw':
        return <Minus className="w-4 h-4 text-orange-400" />;
    }
  };

  return (
    <div className="pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
          <p className="text-white/70">Here's what's happening with your portfolio today.</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/80 font-medium">Available Balance</h3>
              <Wallet className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowDepositModal(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
              >
                Add Funds
              </button>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
              >
                Withdraw
              </button>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/80 font-medium">Portfolio Value</h3>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="text-green-400 text-sm flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +12.5% (24h)
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/80 font-medium">Total Trades</h3>
              <BarChart3 className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {user.transactions.length}
            </div>
            <div className="text-blue-400 text-sm">
              {user.transactions.filter(t => t.status === 'completed').length} completed
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Trading Chart */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Price Chart</h3>
            <TradingChart />
          </div>

          {/* Live Market */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
              Live Exchange
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {cryptoPrices.map((crypto) => (
                <div key={crypto.symbol} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                      {crypto.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-medium">{crypto.symbol}</div>
                      <div className="text-white/60 text-sm">{crypto.name}</div>
                    </div>
                  </div>
                  <div className="text-right mr-4">
                    <div className="text-white font-semibold">
                      ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className={`text-sm flex items-center ${crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {crypto.change24h >= 0 ? (
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 mr-1" />
                      )}
                      {Math.abs(crypto.change24h).toFixed(2)}%
                    </div>
                  </div>
                  <div className="flex space-x-2">
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
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-8 bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Transaction History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/80 font-medium py-3">Type</th>
                  <th className="text-left text-white/80 font-medium py-3">Asset</th>
                  <th className="text-left text-white/80 font-medium py-3">Amount</th>
                  <th className="text-left text-white/80 font-medium py-3">Price</th>
                  <th className="text-left text-white/80 font-medium py-3">Total</th>
                  <th className="text-left text-white/80 font-medium py-3">Date</th>
                  <th className="text-left text-white/80 font-medium py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {user.transactions.slice(0, 10).map((transaction) => (
                  <tr key={transaction.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        {getTransactionIcon(transaction.type)}
                        <span className="text-white capitalize">{transaction.type}</span>
                      </div>
                    </td>
                    <td className="py-4 text-white">{transaction.token}</td>
                    <td className="py-4 text-white">
                      {transaction.amount.toLocaleString(undefined, { 
                        minimumFractionDigits: transaction.token === 'USD' ? 2 : 6,
                        maximumFractionDigits: transaction.token === 'USD' ? 2 : 6
                      })}
                    </td>
                    <td className="py-4 text-white">
                      ${transaction.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 text-white">
                      ${(transaction.amount * transaction.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 text-white/70">
                      {transaction.timestamp.toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(transaction.status)}
                        <span className={`text-sm capitalize ${
                          transaction.status === 'completed' ? 'text-green-400' :
                          transaction.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showDepositModal && (
        <DepositModal
          onDeposit={onDeposit}
          onClose={() => setShowDepositModal(false)}
        />
      )}

      {showTradeModal && selectedCrypto && (
        <TradeModal
          crypto={selectedCrypto}
          type={tradeType}
          userBalance={user.balance}
          onTrade={onTrade}
          onClose={() => setShowTradeModal(false)}
        />
      )}

      {showWithdrawModal && (
        <WithdrawModal
          userBalance={user.balance}
          onWithdraw={handleWithdraw}
          onClose={() => setShowWithdrawModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;