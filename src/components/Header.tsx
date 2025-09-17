import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp, User, LogOut } from 'lucide-react';
import { UserData } from '../App';

interface HeaderProps {
  user: UserData | null;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogin, onSignup, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Trade', path: '/trade' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Features', path: '/features' },
    { name: 'Market', path: '/market' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="bg-dark-bg/80 backdrop-blur-md border-b border-light-gray/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gold-gradient p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-dark-bg" />
              </div>
              <span className="text-2xl font-bold bg-gold-gradient bg-clip-text text-transparent">
                Upholdexx
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`transition-colors duration-200 font-medium ${
                  location.pathname === item.path
                    ? 'text-gold-accent'
                    : 'text-white-text/80 hover:text-white-text'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-light-gray/10 rounded-lg px-3 py-2">
                  <User className="w-4 h-4 text-gold-accent" />
                  <span className="text-white-text text-sm">{user.email}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onLogin}
                  className="text-white-text/80 hover:text-white-text transition-colors duration-200 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={onSignup}
                  className="bg-gold-gradient hover:opacity-90 text-dark-bg px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white-text p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-light-gray/20">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`transition-colors duration-200 font-medium ${
                    location.pathname === item.path
                      ? 'text-gold-accent'
                      : 'text-white-text/80 hover:text-white-text'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <div className="pt-4 border-t border-light-gray/20">
                  <div className="flex items-center space-x-2 mb-4">
                    <User className="w-4 h-4 text-gold-accent" />
                    <span className="text-white-text text-sm">{user.email}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-light-gray/20 space-y-2">
                  <button
                    onClick={() => {
                      onLogin();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-white-text/80 hover:text-white-text transition-colors duration-200 font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      onSignup();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full bg-gold-gradient hover:opacity-90 text-dark-bg px-6 py-2 rounded-lg font-medium transition-all duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;