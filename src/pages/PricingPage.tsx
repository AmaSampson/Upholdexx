import React from 'react';
import { Check, Star, Zap, Shield } from 'lucide-react';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for beginners getting started with crypto trading',
      features: [
        'Basic trading features',
        'Real-time market data',
        'Mobile app access',
        'Email support',
        '0.25% trading fee',
        'Basic portfolio tracking'
      ],
      icon: Star,
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'Advanced tools for serious traders and investors',
      features: [
        'Advanced trading tools',
        'Priority customer support',
        'Advanced charting',
        'API access',
        '0.15% trading fee',
        'Portfolio analytics',
        'Stop-loss orders',
        'Margin trading'
      ],
      icon: Zap,
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'Complete solution for institutional traders',
      features: [
        'All Pro features',
        'Dedicated account manager',
        'Custom integrations',
        'White-label solutions',
        '0.1% trading fee',
        'Advanced risk management',
        'Institutional-grade security',
        'Custom reporting'
      ],
      icon: Shield,
      popular: false
    }
  ];

  return (
    <div className="pt-8 pb-20 bg-dark-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-white-text mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-white-text/80 max-w-3xl mx-auto">
            Choose the perfect plan for your trading needs. All plans include our core features with no hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative bg-dark-bg/90 backdrop-blur-md rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'border-gold-accent ring-2 ring-gold-accent/20'
                    : 'border-gold-accent/20 hover:border-gold-accent/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gold-gradient text-dark-bg px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r gold-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white-text" />
                  </div>
                  <h3 className="text-2xl font-bold text-white-text mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white-text">{plan.price}</span>
                    {plan.period && <span className="text-white-text/60">{plan.period}</span>}
                  </div>
                  <p className="text-white-text/70">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white-text/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-gold-gradient hover:opacity-90 text-dark-bg'
                      : 'bg-white/10 hover:bg-white/20 text-white-text border border-white/20 hover:border-gold-accent'
                  }`}
                >
                  {plan.price === 'Free' ? 'Get Started' : 'Choose Plan'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Trading Fees */}
        <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-8 border border-gold-accent/20 mb-16">
          <h2 className="text-3xl font-bold text-white-text mb-8 text-center">Trading Fees</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold-accent/20">
                  <th className="text-left text-white-text/80 font-medium py-4">Trading Volume (30 days)</th>
                  <th className="text-center text-white-text/80 font-medium py-4">Maker Fee</th>
                  <th className="text-center text-white-text/80 font-medium py-4">Taker Fee</th>
                  <th className="text-right text-white-text/80 font-medium py-4">Plan Required</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-4 text-white-text">$0 - $10,000</td>
                  <td className="py-4 text-center text-white-text">0.25%</td>
                  <td className="py-4 text-center text-white-text">0.25%</td>
                  <td className="py-4 text-right text-green-400">Free</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 text-white-text">$10,000 - $50,000</td>
                  <td className="py-4 text-center text-white-text">0.20%</td>
                  <td className="py-4 text-center text-white-text">0.22%</td>
                  <td className="py-4 text-right text-gold-accent">Pro</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 text-white-text">$50,000 - $100,000</td>
                  <td className="py-4 text-center text-white-text">0.15%</td>
                  <td className="py-4 text-center text-white-text">0.18%</td>
                  <td className="py-4 text-right text-gold-accent">Pro</td>
                </tr>
                <tr>
                  <td className="py-4 text-white-text">$100,000+</td>
                  <td className="py-4 text-center text-white-text">0.10%</td>
                  <td className="py-4 text-center text-white-text">0.12%</td>
                  <td className="py-4 text-right text-blue-400">Enterprise</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white-text mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20">
              <h3 className="text-xl font-semibold text-white-text mb-3">Can I change my plan anytime?</h3>
              <p className="text-white-text/70">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20">
              <h3 className="text-xl font-semibold text-white-text mb-3">Are there any hidden fees?</h3>
              <p className="text-white-text/70">No hidden fees. All costs are transparent and clearly displayed in your account.</p>
            </div>
            <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20">
              <h3 className="text-xl font-semibold text-white-text mb-3">Do you offer refunds?</h3>
              <p className="text-white-text/70">We offer a 30-day money-back guarantee for all paid plans if you're not satisfied.</p>
            </div>
            <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20">
              <h3 className="text-xl font-semibold text-white-text mb-3">Is there a free trial?</h3>
              <p className="text-white-text/70">Yes, all paid plans come with a 14-day free trial. No credit card required to start.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;