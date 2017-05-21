const precss = require('precss')
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    precss,
    autoprefixer({
      browsers: ['> 1%', 'ie >= 11', 'last 3 versions']
    })
  ]
}
