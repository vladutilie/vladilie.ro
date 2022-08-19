/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#3598db' // curious blue
        }
      },
      animation: {
        slide: 'slide 50s linear infinite',
        slide2: 'slide2 50s linear infinite',
        'slide-slow': 'slide 80s linear infinite',
        'slide-slow2': 'slide2 80s linear infinite'
      },
      keyframes: {
        slide: {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(-100%)' }
        },
        slide2: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0%)' }
        }
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      quicksand: ['Quicksand', 'sans-serif']
    }
  },
  plugins: []
};
