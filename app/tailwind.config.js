/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#0A0A0B',
          light: '#1A1A1C',
        },
        amber: {
          warm: '#F59E0B',
          coral: '#F97316',
        },
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'spin-slow': 'spin 1.2s linear infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typing-dots': 'typing-dots 1.4s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'typing-dots': {
          '0%, 60%, 100%': { opacity: '0.3' },
          '30%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
