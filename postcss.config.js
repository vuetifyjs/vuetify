const precss = require('precss')
const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')

module.exports = {
  plugins: [
    precss,
    autoprefixer({
      browsers: ['ie >= 11', 'safari >= 9', 'last 2 versions', '> 1%']
    }),
    mqpacker()
  ]
}
