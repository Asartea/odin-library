/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors') 
module.exports = {
  content: ['index.html'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      sky: colors.sky,
      gray: colors.neutral,
      white: colors.white
    }
  },
  plugins: [],
}