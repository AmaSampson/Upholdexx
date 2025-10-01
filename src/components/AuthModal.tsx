import React, { useState } from 'react';
import { X, Mail, Lock } from 'lucide-react';

interface AuthModalProps {
  mode: 'login' | 'signup';
  onAuth: (email: string, password: string, mode: 'login' | 'signup') => void;
  onClose: () => void;
  onSwitchMode: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onAuth, onClose, onSwitchMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'signup' && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (mode === 'signup' && phone.trim().length < 7) {
      alert('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (mode === 'signup') {
        onAuth(email, password, mode, phone);
      } else {
        onAuth(email, password, mode);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/80 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-gold-accent transition-colors duration-200"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-gold-accent transition-colors duration-200"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-gold-accent transition-colors duration-200"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          )}
          {mode === 'signup' && (
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-4 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-gold-accent transition-colors duration-200"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold-gradient hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-dark-bg py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            {isLoading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/60">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={onSwitchMode}
              className="text-gold-accent hover:text-gold-accent/80 ml-2 font-medium transition-colors duration-200"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;