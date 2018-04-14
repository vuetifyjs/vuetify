const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Only enable CSS sourcemaps when using `yarn watch`
const cssSourceMaps = process.env.TARGET === 'development'
const extractPlugin = ExtractTextPlugin.extract({
  use: [
    { loader: 'css-loader', options: { sourceMap: cssSourceMaps } },
    { loader: 'postcss-loader', options: { sourceMap: cssSourceMaps } },
    { loader: 'stylus-loader', options: { sourceMap: cssSourceMaps } }
  ]
})

// Helpers
const resolve = file => require('path').resolve(__dirname, file)

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    library: 'Vuetify',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                stylus: extractPlugin
              }
            }
          },
          'eslint-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: extractPlugin,
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  }
})
