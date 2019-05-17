const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const extractCSS = isProd || process.env.TARGET === 'development'

// Helpers
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
  { loader: 'sass-loader', options: {
    implementation: require('sass'),
    fiber: require('fibers'),
    indentedSyntax: true
  } }
]

const scssLoaders = [
  ...cssLoaders,
  { loader: 'sass-loader', options: {
    implementation: require('sass'),
    fiber: require('fibers'),
    indentedSyntax: false
  } }
]

module.exports = {
  mode: isProd ? 'production' : 'development',
  resolve: {
    extensions: ['*', '.js', '.json', '.vue', '.ts']
  },
  node: {
    fs: 'empty'
  },
  entry: {
    app: './src/index.ts'
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    library: 'LegacyGrid',
    libraryTarget: 'umd',
    libraryExport: 'default',
    // See https://github.com/webpack/webpack/issues/6522
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    }
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tsconfig: resolve('../tsconfig.json')
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: { happyPackMode: true }
          }
        ],
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
  performance: {
    hints: false
  },
  stats: { children: false }
}
