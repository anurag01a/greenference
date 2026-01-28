/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        // Custom slate tones matching ChatGPT/Claude
        surface: {
          DEFAULT: '#0f172a',
          50: '#1e293b',
          100: '#334155',
          200: '#475569',
        },
        // Eco green accent
        eco: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        // High energy orange accent
        energy: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        }
      },
      boxShadow: {
        'glow-eco': '0 0 20px rgba(16, 185, 129, 0.15)',
        'glow-energy': '0 0 20px rgba(249, 115, 22, 0.15)',
        'card': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'input': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'bounce-slow': 'bounce 1.4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
