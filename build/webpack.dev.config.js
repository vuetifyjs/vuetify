require('dotenv').config()
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WriteFilePlugin = require('write-file-webpack-plugin')
const webpack = require('webpack')

// Helpers
const resolve = file => require('path').resolve(__dirname, file)

const extractPlugin = ExtractTextPlugin.extract({
  use: [
    { loader: 'css-loader', options: { sourceMap: true } },
    { loader: 'postcss-loader', options: { sourceMap: true } },
    { loader: 'stylus-loader', options: { sourceMap: true } }
  ]
})

module.exports = merge(baseWebpackConfig, {
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
    publicPath: '/dev/',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '8080',
    disableHostCheck: true
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'development'"
    }),
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
    new WriteFilePlugin({
      test: /\.css$/
    })
  ]
})
