require('dotenv').config()

const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isProd = process.env.NODE_ENV === 'production'
const resolve = (file) => path.resolve(__dirname, file)

let plugins = [
  new webpack.DefinePlugin({
    'process.env': JSON.stringify(process.env)
  }),
  new VueLoaderPlugin(),
  new HardSourceWebpackPlugin({
    info: {
      level: 'info'
    },
    cachePrune: {
      // Prune once cache reaches 250MB
      sizeThreshold: 250 * 1024 * 1024
    }
  }),
  new HardSourceWebpackPlugin.ExcludeModulePlugin([
    { test: /mini-css-extract-plugin[\\/]dist[\\/]loader/ },
    { test: /vuetify[\\/](dist|es5)/ }
  ])
]

module.exports = {
  mode: isProd ? 'production' : 'development',
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      // Make sure *our* version of vue is always loaded. This is needed for `yarn link vuetify` to work
      'vue$': path.resolve(__dirname, '../node_modules/vue/dist/vue.common.js')
    },
    symlinks: false
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        // Load sourcemaps from vuetify, both css + js
        test: /\.(js|css)$/,
        loader: 'source-map-loader',
        include: path.resolve(__dirname, '../node_modules/vuetify'),
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  stats: { children: false },
  plugins
}

plugins.push(
  new FriendlyErrorsPlugin()
)
