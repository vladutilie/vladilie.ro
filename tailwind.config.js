/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#3598db' // curious blue
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
