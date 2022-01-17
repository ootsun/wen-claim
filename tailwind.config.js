module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      lineHeight: {
        'extra-loose': '2.8',
      }
    },
    fontFamily: {
      'cursive': ['Lobster'],
      'sans-serif': ['Lato']
    }
  },
  plugins: [],
}
