const resolve = file => require('path').resolve(__dirname, file)

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      '~components': resolve('../src/components'),
      '~directives': resolve('../src/directives'),
      '~mixins': resolve('../src/mixins'),
      '~stylus': resolve('../src/stylus'),
      '~util': resolve('../src/util')
    }
  },
  node: {
    fs: 'empty'
  }
}
