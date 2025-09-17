import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Shield } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We\'ll get back to you within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@upholdexx.com',
      availability: 'Response within 24 hours'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      contact: 'Available 24/7',
      availability: 'Instant response'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+1 (555) 123-4567',
      availability: 'Mon-Fri, 9AM-6PM EST'
    },
    {
      icon: HelpCircle,
      title: 'Help Center',
      description: 'Browse our knowledge base',
      contact: 'Self-service portal',
      availability: 'Available 24/7'
    }
  ];

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Crypto Street, San Francisco, CA 94105',
      phone: '+1 (555) 123-4567',
      email: 'sf@upholdexx.com'
    },
    {
      city: 'New York',
      address: '456 Blockchain Ave, New York, NY 10001',
      phone: '+1 (555) 987-6543',
      email: 'ny@upholdexx.com'
    },
    {
      city: 'London',
      address: '789 Digital Lane, London, UK EC1A 1BB',
      phone: '+44 20 7123 4567',
      email: 'london@upholdexx.com'
    }
  ];

  return (
    <div className="pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-dark-bg-text mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-dark-bg-text-text/80 max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out to our support team or visit one of our offices.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div key={index} className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20 text-center hover:border-gold-accent/50 transition-all duration-300">
                <div className="bg-gold-gradient w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-dark-bg" />
                </div>
                <h3 className="text-lg font-semibold text-dark-bg-text-text mb-2">{method.title}</h3>
                <p className="text-dark-bg-text-text/70 text-sm mb-3">{method.description}</p>
                <div className="text-gold-accent font-medium text-sm mb-1">{method.contact}</div>
                <div className="text-dark-bg-text-text/60 text-xs">{method.availability}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-8 border border-gold-accent/20">
            <h2 className="text-2xl font-bold text-dark-bg-text-text mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-bg-text-text/80 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-dark-bg-text placeholder-white/40 focus:outline-none focus:border-gold-accent transition-colors duration-200"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-dark-bg-text-text/80 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-dark-bg-text placeholder-white/40 focus:outline-none focus:border-gold-accent transition-colors duration-200"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-dark-bg-text-text/80 text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-dark-bg-text focus:outline-none focus:border-gold-accent transition-colors duration-200"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="trading">Trading Questions</option>
                  <option value="account">Account Issues</option>
                  <option value="partnership">Partnership</option>
                  <option value="press">Press & Media</option>
                </select>
              </div>

              <div>
                <label className="block text-dark-bg-text-text/80 text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-dark-bg-text placeholder-white/40 focus:outline-none focus:border-gold-accent transition-colors duration-200"
                  placeholder="Brief description of your inquiry"
                  required
                />
              </div>

              <div>
                <label className="block text-dark-bg-text-text/80 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-dark-bg-text placeholder-white/40 focus:outline-none focus:border-gold-accent transition-colors duration-200 resize-none"
                  placeholder="Please provide details about your inquiry..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r gold-gradient hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-dark-bg-text py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          {/* Office Locations */}
          <div>
            <h2 className="text-2xl font-bold text-dark-bg-text mb-6">Our Offices</h2>
            <div className="space-y-6">
              {offices.map((office, index) => (
                <div key={index} className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20">
                  <h3 className="text-xl font-semibold text-dark-bg-text mb-4">{office.city}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gold-accent mt-0.5 flex-shrink-0" />
                      <span className="text-dark-bg-text/70">{office.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gold-accent flex-shrink-0" />
                      <span className="text-dark-bg-text/70">{office.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gold-accent flex-shrink-0" />
                      <span className="text-dark-bg-text/70">{office.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="mt-8 bg-dark-bg/90 backdrop-blur-md rounded-2xl p-6 border border-gold-accent/20">
              <h3 className="text-xl font-semibold text-dark-bg-text mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gold-accent" />
                Business Hours
              </h3>
              <div className="space-y-2 text-dark-bg-text/70">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gold-accent/20 rounded-lg border border-gold-accent/30">
                <div className="flex items-center space-x-2 text-gold-accent text-sm">
                  <Shield className="w-4 h-4" />
                  <span>24/7 Emergency Support Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-dark-bg/90 backdrop-blur-md rounded-2xl p-8 border border-gold-accent/20">
          <h2 className="text-2xl font-bold text-dark-bg-text mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-dark-bg-text mb-3">How can I reset my password?</h3>
              <p className="text-dark-bg-text/70 mb-6">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</p>
              
              <h3 className="text-lg font-semibold text-dark-bg-text mb-3">What are your trading fees?</h3>
              <p className="text-dark-bg-text/70 mb-6">Our trading fees start from 0.1% and decrease based on your trading volume. Check our Pricing page for details.</p>
              
              <h3 className="text-lg font-semibold text-dark-bg-text mb-3">How long do withdrawals take?</h3>
              <p className="text-dark-bg-text/70">Cryptocurrency withdrawals are processed within 30 minutes. Bank transfers take 1-3 business days.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-dark-bg-text mb-3">Is my money safe with Upholdexx?</h3>
              <p className="text-dark-bg-text/70 mb-6">Yes, we use bank-level security with cold storage for 95% of funds and comprehensive insurance coverage.</p>
              
              <h3 className="text-lg font-semibold text-dark-bg-text mb-3">Do you offer mobile apps?</h3>
              <p className="text-dark-bg-text/70 mb-6">Yes, we have native iOS and Android apps with full trading functionality available on app stores.</p>
              
              <h3 className="text-lg font-semibold text-dark-bg-text mb-3">Can I use the API for automated trading?</h3>
              <p className="text-dark-bg-text/70">Absolutely! We provide comprehensive REST and WebSocket APIs for algorithmic trading.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;