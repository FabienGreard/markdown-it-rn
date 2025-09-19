/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{js,jsx,ts,tsx}', '!./node_modules/**'],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [require('nativewind/preset')],
};
