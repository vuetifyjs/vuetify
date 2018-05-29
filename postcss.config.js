const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')

module.exports = (ctx) => ({
  plugins: [
    autoprefixer({
      browsers: ['>0.5%', 'last 2 versions', 'not dead', 'not op_mini all']
    }),
    mqpacker()
  ]
})
