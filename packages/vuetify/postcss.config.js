const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')

function rtl () {
  if (process.env.NODE_ENV === 'production') return undefined

  const dir = process.env.DIRECTION
  if (!dir) return undefined

  const options = { removeComments: false }
  if (dir !== 'bidi') options.onlyDirection = dir

  return require('postcss-rtl')(options)
}

module.exports = ctx => ({
  plugins: [
    mqpacker(),
    rtl(),
    autoprefixer({
      browsers: ['>0.5%', 'last 2 versions', 'not dead', 'not op_mini all']
    })
  ]
})
