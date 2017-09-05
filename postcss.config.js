const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')
const postcss = require('postcss')

module.exports = (ctx) => ({
  plugins: [
    autoprefixer({
      browsers: ['ie >= 11', 'safari >= 9', 'last 2 versions', '> 1%']
    }),
    mqpacker()
  ]
})
