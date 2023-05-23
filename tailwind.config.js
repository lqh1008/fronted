/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        '520px': '520px'
      },
      height: {
        200: '50rem'
      }
    }
  },
  plugins: []
}
