import React from 'react';
import { TrendingUp, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-bg/50 backdrop-blur-md border-t border-light-gray/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gold-gradient p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-dark-bg" />
              </div>
              <span className="text-2xl font-bold bg-gold-gradient bg-clip-text text-transparent">
                Upholdexx
              </span>
            </div>
            <p className="text-white-text/70 text-sm leading-relaxed">
              The world's most trusted cryptocurrency exchange platform. Trade with confidence and security.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white-text/60 hover:text-gold-accent transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white-text/60 hover:text-gold-accent transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white-text/60 hover:text-gold-accent transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white-text/60 hover:text-gold-accent transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white-text font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white-text/70 hover:text-white-text transition-colors duration-200">Spot Trading</a></li>
              <li><a href="#" className="text-white-text/70 hover:text-white-text transition-colors duration-200">Futures Trading</a></li>
              <li><a href="#" className="text-white-text/70 hover:text-white-text transition-colors duration-200">Margin Trading</a></li>
              <li><a href="#" className="text-white-text/70 hover:text-white-text transition-colors duration-200">Staking</a></li>
              <li><a href="#" className="text-white-text/70 hover:text-white-text transition-colors duration-200">NFT Marketplace</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white-text font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white-text/70 hover:text-white-text transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-white-text/70 hover:text-white-text transition-colors duration-200">API Documentation</a></li>
              <li><a href="#" className="text-white-text/70 hover:text-white-text transition-colors duration-200">Trading Fees</a></li>
              <li><a href="#" className="text-white-text/70 hover:text-white-text transition-colors duration-200">Security</a></li>
              <li><a href="#" className="text-white-text/70 hover:text-white-text transition-colors duration-200">Bug Bounty</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white-text font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-white-text/70">
                <Mail className="w-4 h-4" />
                <span>uphold.dexx@mail.com</span>
              </li>
              <li className="flex items-center space-x-2 text-white-text/70">
                <Phone className="w-4 h-4" />
                <span>406 808 0117</span>
              </li>
              <li className="flex items-center space-x-2 text-white-text/70">
                <Phone className="w-4 h-4" />
                <span>(561) 949-1071</span>
              </li>
              <li className="flex items-start space-x-2 text-white-text/70">
                <MapPin className="w-4 h-4 mt-1" />
                <span>456 Blockchain Ave<br />New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-light-gray/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white-text/60 text-sm">
            © 2024 Upholdexx. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white-text/60 hover:text-white-text text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-white-text/60 hover:text-white-text text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-white-text/60 hover:text-white-text text-sm transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;