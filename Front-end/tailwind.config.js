/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F2FF',
          100: '#CCE5FF',
          200: '#99CBFF',
          300: '#66B0FF',
          400: '#d1594b',
          500: '#B62F33', // Red
          600: '#0060AC',
          700: '#001219',
          800: '#003057',
          900: '#1b263b', // Gray
        },
        secondary: {
          50: '#E5F8F6',
          100: '#CCF2EE',
          200: '#99E5DD',
          300: '#66D9CB',
          400: '#33CCBA',
          500: '#00B294', // Windows teal
          600: '#008E76',
          700: '#006B59',
          800: '#00473B',
          900: '#00241E',
        },
        accent: {
          50: '#FFF3E6',
          100: '#FFE7CC',
          200: '#FFCF99',
          300: '#FFB766',
          400: '#FF9F33',
          500: '#B62F33', // Windows orange
          600: '#CC7000',
          700: '#995400',
          800: '#663800',
          900: '#331C00',
        },
        success: {
          500: '#107C10', // Windows green
        },
        warning: {
          500: '#FFC83D',
        },
        error: {
          500: '#E81123', // Windows red
        },
        gray: {
          50: '#F8F8F8',
          100: '#F2F2F2',
          200: '#E6E6E6',
          300: '#D9D9D9',
          400: '#CCCCCC',
          500: '#ADADAD',
          600: '#8E8E8E',
          700: '#707070',
          800: '#505050',
          900: '#212121',
        },
      },
      fontFamily: {
        sans: [
          'Segoe UI', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};