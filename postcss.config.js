const precss = require('precss')
const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')
const cssnano = require('cssnano')

module.exports = (ctx) => ({
  plugins: [
    precss(),
    autoprefixer({
      browsers: ['ie >= 11', 'safari >= 9', 'last 2 versions', '> 1%']
    }),
    mqpacker(),
    ctx.env === "production" ? cssnano() : null
  ]
})
