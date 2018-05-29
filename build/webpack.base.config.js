require('dotenv').config()

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production'

let plugins = [
  new FriendlyErrorsWebpackPlugin({
    clearConsole: true
  }),
  new webpack.DefinePlugin({
    'process.env': JSON.stringify(process.env)
  }),
  new VueLoaderPlugin()
]

module.exports = {
  mode: isProd ? 'production' : 'development',
  resolve: {
    extensions: ['*', '.js', '.json', '.vue', '.ts']
  },
  node: {
    fs: 'empty'
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.styl$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          { loader: 'css-loader', options: { sourceMap: isProd } },
          { loader: 'postcss-loader', options: { sourceMap: isProd } },
          { loader: 'stylus-loader', options: { sourceMap: isProd } }
        ]
      }
    ]
  },
  plugins,
  performance: {
    hints: isProd ? 'warning' : false
  }
}

isProd && plugins.push(
  new MiniCssExtractPlugin({
    // Options simlar to same options in webpackOptions.output
    // both options are optional
    filename: '[name].css'
  })
)
