const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')

function rtl () {
  const dir = process.env.DIRECTION
  if (!dir) return undefined
  const options = dir === 'bidi' ? undefined : { onlyDirection: dir }
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
