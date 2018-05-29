const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')

module.exports = (ctx) => ({
  plugins: [
    autoprefixer({
      browsers: ['>0.5%', 'not ie < 11', 'not safari < 9', 'not dead', 'not op_mini all']
    }),
    mqpacker()
  ]
})
