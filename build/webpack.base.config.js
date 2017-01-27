const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: '#source-map',
  watch: process.env.TARGET === 'dev',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    library: 'Vuetify'
  },
  node: {
    fs: 'empty'
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'eslint-loader!vue-loader',
        include: [
          path.resolve(__dirname, '../src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loaders: ['eslint-loader', 'buble-loader'],
        include: [
          path.resolve(__dirname, '../src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        loaders: ExtractTextPlugin.extract({
          loader: ['eslint-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
        }),
        include: [
          path.resolve(__dirname, '../src')
        ],
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      progress: true,
      hide_modules: true
    }),
    new ExtractTextPlugin('vuetify.min.css')
  ]
}
