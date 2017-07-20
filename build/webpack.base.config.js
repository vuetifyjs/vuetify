// Config and utils
const path = require('path')
const webpack = require('webpack')

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// Helpers
const isProd = process.env.NODE_ENV === 'production'
const resolve = file => path.resolve(__dirname, file)

module.exports = {
  devtool: isProd
    ? '#source-map'
    : '#cheap-module-eval-source-map',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    library: 'Vuetify'
  },
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
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'stylus-loader']
        }),
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: isProd ? 'warning' : false
  },
  plugins: [
    new ExtractTextPlugin('vuetify.min.css')
  ]
}
