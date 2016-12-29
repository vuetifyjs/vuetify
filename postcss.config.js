const precss = require('precss')
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    precss,
    autoprefixer({
      browsers: ['> 1%', 'last 4 versions']
    })
  ]
}