const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const isProd = process.env.NODE_ENV === 'production'

const cssLoaders = [
  isProd ? MiniCssExtractPlugin.loader : {
    loader: 'vue-style-loader',
    options: { sourceMap: !isProd }
  },
  {
    loader: 'css-loader',
    options: { sourceMap: !isProd }
  }
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

const config = merge(base, {
  name: 'client',
  entry: {
    app: './src/entry-client.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders
      },
      {
        test: /\.stylus$/,
        use: [
          ...cssLoaders,
          {
            loader: 'stylus-loader',
            options: { sourceMap: false } // stylus-loader sucks at sourcemaps
          }
        ]
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
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin()
  ],
  optimization: {
    minimize: isProd,
    runtimeChunk: true,
    removeAvailableModules: isProd,
    removeEmptyChunks: isProd,
    splitChunks: isProd && {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 20,
      maxInitialRequests: 5,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  }
})

if (isProd) {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'common.[chunkhash].css'
    })
  )
}

module.exports = config
