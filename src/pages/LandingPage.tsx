import React from 'react';
import { ArrowRight, ArrowUpRight, ArrowDownRight, User, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import Hero from '../components/Hero';
import { CryptoPrice } from '../App';

interface LandingPageProps {
  cryptoPrices: CryptoPrice[];
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ cryptoPrices, onGetStarted }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section (includes hero and features) */}
      <Hero cryptoPrices={cryptoPrices} onGetStarted={onGetStarted} />

      {/* Market Trends/Insights Section */}
      <section id="market-trends" className="py-20 bg-dark-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white-text mb-4">Market Trends & Insights</h2>
            <p className="text-xl text-white-text/80 max-w-3xl mx-auto">
              Stay ahead with the latest cryptocurrency market trends and insights.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Top Gainers */}
            <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20 hover:border-gold-accent/50 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-white-text mb-4 flex items-center">
                <ArrowUpRight className="w-6 h-6 text-green-400 mr-2" />
                Top Gainers (24h)
              </h3>
              <div className="space-y-4">
                {cryptoPrices
                  .filter((crypto) => crypto.change24h > 0)
                  .sort((a, b) => b.change24h - a.change24h)
                  .slice(0, 3)
                  .map((crypto) => (
                    <div key={crypto.symbol} className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-white-text font-semibold">{crypto.name}</span>
                        <span className="text-white-text/60 text-sm">({crypto.symbol})</span>
                      </div>
                      <div className="text-right">
                        <div className="text-gold-accent font-bold">${crypto.price.toFixed(2)}</div>
                        <div className="text-green-400 text-sm">+{crypto.change24h}%</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* Top Losers */}
            <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20 hover:border-gold-accent/50 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-white-text mb-4 flex items-center">
                <ArrowDownRight className="w-6 h-6 text-red-400 mr-2" />
                Top Losers (24h)
              </h3>
              <div className="space-y-4">
                {cryptoPrices
                  .filter((crypto) => crypto.change24h < 0)
                  .sort((a, b) => a.change24h - b.change24h)
                  .slice(0, 3)
                  .map((crypto) => (
                    <div key={crypto.symbol} className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-white-text font-semibold">{crypto.name}</span>
                        <span className="text-white-text/60 text-sm">({crypto.symbol})</span>
                      </div>
                      <div className="text-right">
                        <div className="text-gold-accent font-bold">${crypto.price.toFixed(2)}</div>
                        <div className="text-red-400 text-sm">{crypto.change24h}%</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <button
              onClick={onGetStarted}
              className="bg-gold-gradient hover:opacity-90 text-dark-bg px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center mx-auto space-x-2"
            >
              <span>Explore Market</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Getting Started Guide Section */}
      <section id="get-started" className="py-20 bg-dark-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white-text mb-4">Start Trading in Minutes</h2>
            <p className="text-xl text-white-text/80 max-w-3xl mx-auto">
              Follow these simple steps to begin your crypto trading journey with Upholdexx.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Sign Up',
                description: 'Create your free account in seconds.',
                icon: User,
              },
              {
                step: 2,
                title: 'Deposit Funds',
                description: 'Add funds via card or bank transfer.',
                icon: DollarSign,
              },
              {
                step: 3,
                title: 'Start Trading',
                description: 'Buy and sell 100+ cryptocurrencies.',
                icon: TrendingUp,
              },
              {
                step: 4,
                title: 'Track Portfolio',
                description: 'Monitor your investments with real-time analytics.',
                icon: BarChart3,
              },
            ].map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20 hover:border-gold-accent/50 transition-all duration-300 text-center"
                >
                  <div className="bg-gold-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-dark-bg" />
                  </div>
                  <div className="text-2xl font-bold text-gold-accent mb-2">Step {step.step}</div>
                  <h3 className="text-xl font-semibold text-white-text mb-2">{step.title}</h3>
                  <p className="text-white-text/70">{step.description}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={onGetStarted}
              className="bg-gold-gradient hover:opacity-90 text-dark-bg px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center mx-auto space-x-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;