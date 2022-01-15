module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      lineHeight: {
        'extra-loose': '3.5',
      }
    },
    fontFamily: {
      'cursive': ['Lobster']
    }
  },
  plugins: [],
}
