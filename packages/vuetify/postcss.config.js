const autoprefixer = require('autoprefixer')

module.exports = ctx => ({
  plugins: [
    autoprefixer({
      remove: false
    })
  ]
})
