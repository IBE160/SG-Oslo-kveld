
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#4deeea',
        'neon-pink': '#f000b8',
        'dark-bg-start': '#0f0c29',
        'dark-bg-mid': '#302b63',
        'dark-bg-end': '#24243e',
      },
      boxShadow: {
        'neon-glow-blue': '0 0 5px #4deeea, 0 0 10px #4deeea',
        'neon-glow-green': '0 0 8px #2dd4bf, 0 0 20px #2dd4bf', // Using teal for green
      },
      keyframes: {
        'card-pop': {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'card-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'card-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        'score-pop': {
          '0%': { transform: 'translateY(5px) scale(0.9)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
      },
      animation: {
        'card-pop': 'card-pop 0.2s ease-out',
        'card-pulse': 'card-pulse 0.6s ease-in-out infinite', // Infinite for matched cards
        'card-shake': 'card-shake 0.4s ease-in-out',
        'score-pop': 'score-pop 0.3s ease-out forwards',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-neon-blue': {
          textShadow: '0 0 5px #4deeea, 0 0 10px #4deeea, 0 0 20px #4deeea',
        },
        '.text-shadow-neon-pink': {
          textShadow: '0 0 5px #f000b8, 0 0 10px #f000b8, 0 0 20px #f000b8',
        },
        '.text-shadow-neon-green': {
          textShadow: '0 0 5px #2dd4bf, 0 0 10px #2dd4bf',
        },
      })
    },
  ],
}
export default config
