// Config and utils
const path = require('path')
const webpack = require('webpack')

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// Helpers
const resolve = file => path.resolve(__dirname, file)

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    app: './dev/index.js'
  },
  output: {
    path: resolve('../dev'),
    publicPath: '/dev/',
    library: 'Vuetify'
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      '~components': resolve('../src/components'),
      '~directives': resolve('../src/directives'),
      '~mixins': resolve('../src/mixins'),
      '~stylus': resolve('../src/stylus'),
      '~util': resolve('../src/util'),
      'dist': resolve('../dist'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  node: {
    fs: 'empty'
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loaders: ['vue-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        loaders: ['css-loader', 'postcss-loader', 'stylus-loader'],
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: 'warning'
  },
  devServer: {
    contentBase: resolve('../dev')
  }
}
