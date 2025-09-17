import React from 'react';
import { Shield, Zap, Globe, BarChart3, Smartphone, Lock, TrendingUp, Users, Clock, Award } from 'lucide-react';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your funds are protected by industry-leading security measures including cold storage, multi-signature wallets, and advanced encryption.',
      details: ['Cold storage for 95% of funds', 'Multi-signature technology', 'Regular security audits', 'Insurance coverage']
    },
    {
      icon: Zap,
      title: 'Lightning Fast Trading',
      description: 'Execute trades in milliseconds with our high-performance matching engine that can handle millions of orders per second.',
      details: ['Sub-millisecond execution', 'High-frequency trading support', '99.9% uptime guarantee', 'Global server network']
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Trade 24/7 from anywhere in the world with support for multiple languages and local payment methods.',
      details: ['Available in 180+ countries', '50+ supported languages', 'Local payment methods', '24/7 customer support']
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Professional-grade charting tools and technical indicators to help you make informed trading decisions.',
      details: ['100+ technical indicators', 'Custom chart layouts', 'Price alerts', 'Market analysis tools']
    },
    {
      icon: Smartphone,
      title: 'Mobile Trading',
      description: 'Full-featured mobile apps for iOS and Android with all the functionality of our web platform.',
      details: ['Native mobile apps', 'Biometric authentication', 'Push notifications', 'Offline portfolio tracking']
    },
    {
      icon: Lock,
      title: 'Regulatory Compliance',
      description: 'Fully compliant with international regulations and licensed in multiple jurisdictions for your peace of mind.',
      details: ['Licensed exchange', 'KYC/AML compliance', 'Regular audits', 'Transparent operations']
    }
  ];

  const stats = [
    { icon: Users, value: '10M+', label: 'Active Users' },
    { icon: TrendingUp, value: '$50B+', label: 'Trading Volume' },
    { icon: Clock, value: '24/7', label: 'Support' },
    { icon: Award, value: '5 Years', label: 'Experience' }
  ];

  return (
    <div className="pt-8 pb-20 bg-dark-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-white-text mb-4">
            Powerful Features for
            <span className="block bg-gradient-to-r gold-gradient bg-clip-text text-transparent">
              Professional Trading
            </span>
          </h1>
          <p className="text-xl text-white-text/80 max-w-3xl mx-auto">
            Discover the advanced features that make Upholdexx the preferred choice for millions of traders worldwide.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20 text-center">
                <div className="bg-gradient-to-r gold-gradient w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-white-text" />
                </div>
                <div className="text-3xl font-bold text-white-text mb-2">{stat.value}</div>
                <div className="text-white-text/70">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-8 border border-gold-accent/20 hover:border-gold-accent/50 transition-all duration-300">
                <div className="bg-gradient-to-r gold-gradient w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <IconComponent className="w-8 h-8 text-white-text" />
                </div>
                <h3 className="text-xl font-semibold text-white-text mb-4">{feature.title}</h3>
                <p className="text-white-text/70 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center space-x-2 text-white-text/60 text-sm">
                      <div className="w-1.5 h-1.5 bg-gold-accent rounded-full"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Trading Tools Section */}
        <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-8 border border-gold-accent/20 mb-16">
          <h2 className="text-3xl font-bold text-white-text mb-8 text-center">Professional Trading Tools</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white-text mb-4">Advanced Order Types</h3>
              <ul className="space-y-3 text-white-text/70">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Market Orders - Execute immediately at current market price</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Limit Orders - Set your desired price and wait for execution</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Stop-Loss Orders - Automatically sell to limit losses</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Take-Profit Orders - Lock in profits automatically</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white-text mb-4">Risk Management</h3>
              <ul className="space-y-3 text-white-text/70">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Portfolio diversification tools</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Real-time risk assessment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Position sizing calculator</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <span>Automated risk alerts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Section */}
        <div className="text-center bg-gradient-to-r from-gold-accent/20 to-gold-accent/10 rounded-2xl p-12 border border-gold-accent/30">
          <h2 className="text-3xl font-bold text-white-text mb-4">Developer API</h2>
          <p className="text-xl text-white-text/80 mb-8 max-w-2xl mx-auto">
            Build custom trading applications with our comprehensive REST and WebSocket APIs. 
            Perfect for algorithmic trading and portfolio management.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-accent mb-2">REST API</div>
              <div className="text-white-text/70">Complete trading functionality</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-accent mb-2">WebSocket</div>
              <div className="text-white-text/70">Real-time market data</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-accent mb-2">SDKs</div>
              <div className="text-white-text/70">Python, Node.js, Java</div>
            </div>
          </div>
          <button className="bg-gold-gradient hover:opacity-90 text-dark-bg px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
            View API Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;