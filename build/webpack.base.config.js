const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var projectRoot = path.resolve(__dirname, '../')

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
  resolve: {
    extensions: ['*', '.js', '.json', '.vue']
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
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loaders: ['buble-loader', 'eslint-loader'],
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        loaders: ExtractTextPlugin.extract({
          loader: ['eslint-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
        }),
        include: projectRoot,
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
    new ExtractTextPlugin('vuetify.min.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}
