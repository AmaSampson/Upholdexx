import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Loader, LogOut } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import DepositModal from './components/DepositModal';
import TradeModal from './components/TradeModal';
import LandingPage from './pages/LandingPage';
import TradePage from './pages/TradePage';
import PricingPage from './pages/PricingPage';
import FeaturesPage from './pages/FeaturesPage';
import MarketPage from './pages/MarketPage';
import ContactPage from './pages/ContactPage';

export interface UserData {
  id: string;
  email: string;
  balance: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'deposit';
  amount: number;
  token: string;
  price: number;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
}

const App: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([
    { symbol: 'BTC', name: 'Bitcoin', price: 60000, change24h: 2.5, volume: 35000000000, marketCap: 1200000000000 },
    { symbol: 'ETH', name: 'Ethereum', price: 4000, change24h: -1.2, volume: 15000000000, marketCap: 480000000000 },
    { symbol: 'BNB', name: 'Binance Coin', price: 600, change24h: 0.8, volume: 2000000000, marketCap: 90000000000 },
    { symbol: 'ADA', name: 'Cardano', price: 2.5, change24h: 3.1, volume: 1000000000, marketCap: 80000000000 },
    { symbol: 'SOL', name: 'Solana', price: 150, change24h: -0.5, volume: 800000000, marketCap: 45000000000 },
    { symbol: 'XRP', name: 'XRP', price: 1.1, change24h: 1.7, volume: 1200000000, marketCap: 55000000000 },
    { symbol: 'DOT', name: 'Polkadot', price: 30, change24h: -2.0, volume: 600000000, marketCap: 30000000000 },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.25, change24h: 5.0, volume: 500000000, marketCap: 33000000000 },
  ]);
  const [showAuthModal, setShowAuthModal] = useState<'login' | 'signup' | null>(null);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState<{ crypto: CryptoPrice; type: 'buy' | 'sell' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrices((prev) =>
        prev.map((crypto) => ({
          ...crypto,
          price: crypto.price * (1 + (Math.random() - 0.5) * 0.05),
          change24h: (Math.random() - 0.5) * 10,
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      id: 'user123',
      email,
      balance: 10000,
      transactions: [],
    });
    setShowAuthModal(null);
    setIsLoading(false);
  };

  const handleSignup = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      id: 'user123',
      email,
      balance: 0,
      transactions: [],
    });
    setShowAuthModal(null);
    setIsLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleDeposit = async (amount: number) => {
    if (!user) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUser({
      ...user,
      balance: user.balance + amount,
      transactions: [
        ...user.transactions,
        {
          id: Math.random().toString(),
          type: 'deposit',
          amount,
          token: 'USD',
          price: 1,
          timestamp: new Date().toISOString(),
          status: 'completed',
        },
      ],
    });
    setShowDepositModal(false);
    setIsLoading(false);
  };

  const handleTrade = async (crypto: CryptoPrice, type: 'buy' | 'sell', amount: number) => {
    if (!user) return;
    const totalCost = crypto.price * amount;
    if (type === 'buy' && totalCost > user.balance) {
      alert('Insufficient balance');
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setUser({
      ...user,
      balance: type === 'buy' ? user.balance - totalCost : user.balance + totalCost,
      transactions: [
        ...user.transactions,
        {
          id: Math.random().toString(),
          type,
          amount,
          token: crypto.symbol,
          price: crypto.price,
          timestamp: new Date().toISOString(),
          status: 'completed',
        },
      ],
    });
    setShowTradeModal(null);
    setIsLoading(false);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark-bg text-white-text">
        <Header
          user={user}
          onLogin={() => setShowAuthModal('login')}
          onSignup={() => setShowAuthModal('signup')}
          onLogout={handleLogout}
        />
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Loader className="w-12 h-12 text-gold-accent animate-spin" />
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={user ? (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h1 className="text-4xl font-bold mb-8 text-white-text">Dashboard</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  <div className="bg-dark-bg/90 backdrop-blur-md rounded-lg p-6 border border-gold-accent/20">
                    <h2 className="text-xl font-semibold mb-2 text-white-text">Balance</h2>
                    <p className="text-3xl font-bold text-gold-accent">${user.balance.toFixed(2)}</p>
                    <button
                      onClick={() => setShowDepositModal(true)}
                      className="mt-4 bg-gold-gradient hover:opacity-90 text-dark-bg px-4 py-2 rounded-lg font-semibold transition-all duration-200"
                    >
                      Deposit
                    </button>
                  </div>
                  <div className="bg-dark-bg/90 backdrop-blur-md rounded-lg p-6 border border-gold-accent/20">
                    <h2 className="text-xl font-semibold mb-2 text-white-text">Portfolio Value</h2>
                    <p className="text-3xl font-bold text-gold-accent">$12,345.67</p>
                    <p className="text-green-400">+5.2% (24h)</p>
                  </div>
                  <div className="bg-dark-bg/90 backdrop-blur-md rounded-lg p-6 border border-gold-accent/20">
                    <h2 className="text-xl font-semibold mb-2 text-white-text">Total Trades</h2>
                    <p className="text-3xl font-bold text-gold-accent">{user.transactions.length}</p>
                    <p className="text-white-text/70">This month</p>
                  </div>
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-white-text">Recent Transactions</h2>
                <div className="bg-dark-bg/90 backdrop-blur-md rounded-lg p-6 border border-gold-accent/20">
                  {user.transactions.length > 0 ? (
                    <div className="space-y-4">
                      {user.transactions.slice(0, 5).map((tx) => (
                        <div key={tx.id} className="flex justify-between">
                          <div>
                            <p className="font-semibold text-white-text">{tx.type.toUpperCase()} {tx.token}</p>
                            <p className="text-white-text/70 text-sm">{new Date(tx.timestamp).toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gold-accent">{tx.amount} {tx.token}</p>
                            <p className="text-white-text/70 text-sm">${tx.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white-text/70">No transactions yet.</p>
                  )}
                </div>
              </div>
            ) : (
              <LandingPage cryptoPrices={cryptoPrices} onGetStarted={() => setShowAuthModal('signup')} />
            )}
          />
          <Route
            path="/trade"
            element={
              <TradePage
                user={user}
                cryptoPrices={cryptoPrices}
                onTrade={(crypto, type) => setShowTradeModal({ crypto, type })}
                onLogin={() => setShowAuthModal('login')}
              />
            }
          />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/market" element={<MarketPage cryptoPrices={cryptoPrices} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {showAuthModal && (
          <AuthModal
            mode={showAuthModal}
            onAuth={showAuthModal === 'login' ? handleLogin : handleSignup}
            onClose={() => setShowAuthModal(null)}
            onSwitchMode={() => setShowAuthModal(showAuthModal === 'login' ? 'signup' : 'login')}
          />
        )}
        {showDepositModal && user && (
          <DepositModal onDeposit={handleDeposit} onClose={() => setShowDepositModal(false)} />
        )}
        {showTradeModal && user && (
          <TradeModal
            crypto={showTradeModal.crypto}
            type={showTradeModal.type}
            userBalance={user.balance}
            onTrade={handleTrade}
            onClose={() => setShowTradeModal(null)}
          />
        )}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;