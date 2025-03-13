import autoprefixer from 'autoprefixer'
// const autoprefixer = require('autoprefixer')

export default ctx => ({
  plugins: [
    autoprefixer({
      remove: false
    })
  ]
})
