'use strict'

const HappyThreadPool = () => import('happypack/lib/HappyThreadPool')

require('dotenv').config()

const os = () => import('os')
const HappyPack = () => import('happypack')
const { ThreadPool } =  HappyPack
const MiniCssExtractPlugin = () => import('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = () => import('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const extractCSS = isProd || process.env.TARGET === 'development'

exports = {
  happyThreadPool: HappyThreadPool({
    size: Math.min(os.cpu_count, 4)
  }),

  cssLoaders: [
  // https://github.com/webpack-contrib/mini-css-extract-plugin#user-content-advanced-configuration-example
  // TODO: remove style-loader: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/34
    { 
      loader: 'pre-css-loader',
      module: extractCSS ? MiniCssExtractPlugin.loader : TerserPlugin({ extractComments: 'all' }),
      options: { sourceMap: !isProd },
    },
    { loader: 'css-loader', options: { sourceMap: !isProd } },
    { loader: 'postcss-loader', options: { sourceMap: !isProd } },
  ],

  sassLoaders: {
    ident: this.id,
    loader: 'sass-loader',
    options: [this.cssLoaders],
    query: {
      indentedSyntax: true,
      hoistUseStatements: true,
    },
  },

  scssLoaders: {
    ident: this.id,
    loader: 'sass-loader',
    options: [this.cssLoaders],
    query: {
      indentedSyntax: false,
      hoistUseStatements: true,
    },
  },

  plugins: [
    FriendlyErrorsWebpackPlugin, {
      clearConsole: true,
    }
  ],

  exports: {
    config: {
      mode: isProd ? 'production' : 'development',
      resolve: {
        extensions: ['*', '.js', '.jsx', '.json', '.vue', '.ts', '.tsx'],
      },
      module: {
        rules: [
          {
            test: /\.sass$/,
            use: this.sassLoaders,
          },
          {
            test: /\.scss$/,
            use: this.scssLoaders,
          },
        ],
      },
      plugins: this.plugins,
      performance: {
        hints: false,
      },
      stats: { children: false }
    },
  },
}
