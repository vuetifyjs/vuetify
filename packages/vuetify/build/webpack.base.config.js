require('dotenv').config()

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const extractCSS = isProd || process.env.TARGET === 'development'

const resolve = file => require('path').resolve(__dirname, file)

const cssLoaders = [
  // https://github.com/webpack-contrib/mini-css-extract-plugin#user-content-advanced-configuration-example
  // TODO: remove style-loader: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/34
  extractCSS ? MiniCssExtractPlugin.loader : 'style-loader',
  { loader: 'css-loader', options: { sourceMap: !isProd } },
  { loader: 'postcss-loader', options: { sourceMap: !isProd } }
]

const sassLoaders = [
  ...cssLoaders,
  {
    loader: 'sass-loader',
    options: {
      implementation: require('sass'),
      sassOptions: {
        indentedSyntax: true
      }
    }
  }
]

const scssLoaders = [
  ...cssLoaders,
  {
    loader: 'sass-loader',
    options: {
      implementation: require('sass'),
      sassOptions: {
        indentedSyntax: false
      }
    }
  }
]

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        use: sassLoaders
      },
      {
        test: /\.scss$/,
        use: scssLoaders
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: resolve('../tsconfig.checks.json'),
        mode: 'write-references'
      }
    }),
  ],
  performance: {
    hints: false
  },
  stats: { children: false }
}
