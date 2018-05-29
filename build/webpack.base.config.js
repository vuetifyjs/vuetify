require('dotenv').config()

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

let plugins = [
  new FriendlyErrorsWebpackPlugin({
    clearConsole: true
  })
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
    rules: [
      {
        test: /\.styl$/,
        use: [
          // https://github.com/webpack-contrib/mini-css-extract-plugin#user-content-advanced-configuration-example
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          { loader: 'css-loader', options: { sourceMap: !isProd } },
          { loader: 'postcss-loader', options: { sourceMap: !isProd } },
          { loader: 'stylus-loader', options: { sourceMap: !isProd } }
        ]
      }
    ]
  },
  plugins,
  performance: {
    hints: false
  }
}
