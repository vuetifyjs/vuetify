const webpack = require('webpack')
const vuetifyPackage = require('../package.json')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const resolve = file => require('path').resolve(__dirname, file)

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      '@components': resolve('../src/components'),
      '@directives': resolve('../src/directives'),
      '@mixins': resolve('../src/mixins'),
      '@util': resolve('../src/util'),
      'stylus': resolve('../src/stylus')
    }
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true
    }),
    new webpack.DefinePlugin({
      'process.env.VUETIFY_VERSION': JSON.stringify(vuetifyPackage.version),
      'process.env.REQUIRED_VUE': JSON.stringify(vuetifyPackage.peerDependencies.vue)
    })
  ]
}
