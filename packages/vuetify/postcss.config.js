const autoprefixer = require('autoprefixer')

module.exports = ctx => ({
  plugins: [
    autoprefixer({
      browsers: ['>0.5%', 'last 2 versions', 'not dead', 'not op_mini all'],
      remove: false
    })
  ]
})
