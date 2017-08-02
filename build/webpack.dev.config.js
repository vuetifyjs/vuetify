const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// Helpers
const resolve = file => require('path').resolve(__dirname, file)

module.exports = merge(baseWebpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    app: './dev/index.js'
  },
  output: {
    path: resolve('../dev'),
    publicPath: '/dev/',
    library: 'Vuetify'
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
})
