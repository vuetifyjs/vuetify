require('dotenv').config()

const os = require('os')
const HappyPack = require('happypack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const extractCSS = isProd || process.env.TARGET === 'development'

exports.happyThreadPool = HappyPack.ThreadPool({
  size: Math.min(os.cpus().length, 4),
})

const cssLoaders = [
  // https://github.com/webpack-contrib/mini-css-extract-plugin#user-content-advanced-configuration-example
  // TODO: remove style-loader: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/34
  extractCSS ? MiniCssExtractPlugin.loader : 'style-loader',
  { loader: 'css-loader', options: { sourceMap: !isProd } },
  { loader: 'postcss-loader', options: { sourceMap: !isProd } },
]

const sassLoaders = [
  ...cssLoaders,
  {
    loader: 'sass-loader',
    options: {
      implementation: require('sass'),
      sassOptions: {
        indentedSyntax: true,
      },
    },
  },
]

const scssLoaders = [
  ...cssLoaders,
  {
    loader: 'sass-loader',
    options: {
      implementation: require('sass'),
      sassOptions: {
        indentedSyntax: false,
      },
    },
  },
]

const plugins = [
  new FriendlyErrorsWebpackPlugin({
    clearConsole: true,
  }),
]

exports.config = {
  mode: isProd ? 'production' : 'development',
  resolve: {
    extensions: ['*', '.js', '.json', '.vue', '.ts'],
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: sassLoaders,
      },
      {
        test: /\.scss$/,
        use: scssLoaders,
      },
    ],
  },
  plugins,
  performance: {
    hints: false,
  },
  stats: { children: false },
}
