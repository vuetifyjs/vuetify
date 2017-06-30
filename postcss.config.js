const precss = require('precss')
const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')

module.exports = {
  plugins: [
    precss,
    autoprefixer({
      browsers: ['ie >= 11', 'last 3 versions']
    }),
    mqpacker()
  ]
}
