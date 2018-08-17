const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')

function rtl () {
  const { DIRECTION: dir = 'ltr' } = process.env
  if (dir === 'ltr') return undefined
  const options = dir === 'rtl' ? { onlyDirection: 'rtl' } : undefined
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
