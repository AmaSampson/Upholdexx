import React from 'react';
import { ArrowRight, Shield, Zap, Globe, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { CryptoPrice } from '../App';

interface HeroProps {
  cryptoPrices: CryptoPrice[];
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ cryptoPrices, onGetStarted }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section id="home" className="pt-20 pb-32 bg-dark-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold text-white-text mb-6 leading-tight">
                GROW YOUR CAPITAL
                <span className="block bg-gold-gradient bg-clip-text text-transparent">
                  WITH UPHOLDEX
                </span>
              </h1>
              <p className="text-xl text-white-text/80 mb-8 leading-relaxed">
                Initiate your financial evolution through Upholdexx. Our advanced trading platform 
                provides secure, fast, and reliable cryptocurrency trading for investors worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={onGetStarted}
                  className="bg-gold-gradient hover:opacity-90 text-dark-bg px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border border-gold-accent/30 hover:border-gold-accent/60 text-gold-accent px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-gold-accent/10">
                  Learn More
                </button>
              </div>
            </div>

            {/* Live Market Data */}
            <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20">
              <h3 className="text-xl font-semibold text-white-text mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-gold-accent" />
                Live Market
              </h3>
              <div className="space-y-3">
                {cryptoPrices.slice(0, 6).map((crypto) => (
                  <div key={crypto.symbol} className="flex items-center justify-between p-3 bg-light-gray/5 rounded-lg hover:bg-light-gray/10 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gold-accent rounded-full flex items-center justify-center text-dark-bg font-bold text-sm">
                        {crypto.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white-text font-medium">{crypto.symbol}</div>
                        <div className="text-white-text/60 text-sm">{crypto.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gold-accent font-semibold">
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-dark-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white-text mb-4">Why Choose Upholdexx?</h2>
            <p className="text-xl text-white-text/80">Experience the future of cryptocurrency trading</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-8 border border-gold-accent/20 text-center hover:border-gold-accent/50 transition-all duration-300">
              <div className="bg-gold-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-dark-bg" />
              </div>
              <h3 className="text-xl font-semibold text-white-text mb-4">Secure & Reliable</h3>
              <p className="text-white-text/70">Your funds are protected by industry-leading security measures and cold storage.</p>
            </div>
            <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-8 border border-gold-accent/20 text-center hover:border-gold-accent/50 transition-all duration-300">
              <div className="bg-gold-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-dark-bg" />
              </div>
              <h3 className="text-xl font-semibold text-white-text mb-4">Fast Trading</h3>
              <p className="text-white-text/70">Execute trades in milliseconds with our high-performance trading engine.</p>
            </div>
            <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-8 border border-gold-accent/20 text-center hover:border-gold-accent/50 transition-all duration-300">
              <div className="bg-gold-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-dark-bg" />
              </div>
              <h3 className="text-xl font-semibold text-white-text mb-4">Global Access</h3>
              <p className="text-white-text/70">Trade 24/7 from anywhere in the world with our mobile and web platforms.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;