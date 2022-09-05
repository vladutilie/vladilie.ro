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
        slide2: 'slide2 50s linear infinite'
      },
      keyframes: {
        slide: {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(-100%)' }
        },
        slide2: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0%)' }
        },
        loading: {
          '0%': {
            opacity: '.2'
          },
          '20%': {
            opacity: '1',
            transform: 'translateX(1px)'
          },
          to: {
            opacity: '.2'
          }
        }
      },
      boxShadow: ({ theme }) => ({
        // inspired by https://www.joshwcomeau.com/shadow-palette/
        'surface-glass': `
          inset 0.25px 1px 0 0 ${theme('colors.rose.200 / 3%')},
          0px 0.3px 0.3px rgba(3, 2, 2, 0.02),
          0px 2.2px 2.5px -0.4px rgba(3, 2, 2, 0.02),
          0px 4.3px 4.8px -0.8px rgba(3, 2, 2, 0.02),
          0px 7.5px 8.4px -1.2px rgba(3, 2, 2, 0.02),
          0px 12.8px 14.4px -1.7px rgba(3, 2, 2, 0.02),
          0px 21px 23.6px -2.1px rgba(3, 2, 2, 0.02),
          0px 33.2px 37.4px -2.5px rgba(3, 2, 2, 0.02)`
      })
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      quicksand: ['Quicksand', 'sans-serif']
    }
  },
  plugins: []
};
