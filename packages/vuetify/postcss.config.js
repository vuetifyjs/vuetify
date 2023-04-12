const autoprefixer = require('autoprefixer')

module.exports = ctx => ({
  plugins: [
    autoprefixer({
      remove: false,
    }),
    css => {
      css.walk(node => {
        if (node.type === 'atrule' && node.name === 'charset') {
          node.remove()
        }
      })
    },
  ],
})
