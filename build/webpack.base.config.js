const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const projectRoot = path.resolve(__dirname, '../')
const version = process.env.VERSION || require('../package.json').version
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
        loaders: ['babel-loader', 'eslint-loader'],
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        loaders: ExtractTextPlugin.extract({
          use: ['eslint-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
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
    new BundleAnalyzerPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      progress: true,
      hide_modules: true
    }),
    new webpack.BannerPlugin({
      banner: `/*!
* Vuetify v${version}
* Forged by John Leider
* Released under the MIT License.
*/   `,
      raw: true,
      entryOnly: true
    }),
    new ExtractTextPlugin('vuetify.min.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}
