const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const webpack = require('webpack')

// Helpers
const resolve = file => require('path').resolve(__dirname, file)

const extractPlugin = ExtractTextPlugin.extract({
  use: ['css-loader', 'postcss-loader', 'stylus-loader']
})

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: ['babel-polyfill', './dev/index.js'],
  output: {
    filename: '[name].js',
    path: resolve('../dev'),
    publicPath: '/dev/',
    library: 'Vuetify'
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      vuetify: resolve('../src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loaders: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              stylus: extractPlugin
            }
          }
        }, 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        loaders: extractPlugin,
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  },
  devServer: {
    contentBase: resolve('../dev'),
    publicPath: '/dev/'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'development'"
    }),
    new BundleAnalyzerPlugin(),
    new WriteFilePlugin({
      test: /\.css$/
    })
  ]
}
