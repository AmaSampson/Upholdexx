/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1A1A1A',
        'gold-accent': '#D4AF37',
        'bitcoin-gold': '#D4AF37',
        'light-gray': '#E0E0E0',
        'white-text': '#FFFFFF',
        'gold-light': '#F4D03F',
        'gold-dark': '#B7950B',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 50%, #B7950B 100%)',
        'dark-gradient': 'linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 50%, #1A1A1A 100%)',
      },
    },
  },
  plugins: [],
};
