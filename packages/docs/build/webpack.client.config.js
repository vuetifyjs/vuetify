const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const sitemap = require('./sitemap')


const isProd = process.env.NODE_ENV === 'production'

const resolve = file => path.resolve(__dirname, file)

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
    new CopyPlugin([
      { from: 'public' },
    ]),
    new HtmlWebpackPlugin({
      filename: '_crowdin.html',
      template: resolve('../src/crowdin.template.html')
    }),
    new HtmlWebpackPlugin({
      filename: '_fallback.html',
      template: resolve('../src/spa.template.html')
    }),
    sitemap
  ],
  devServer: {
    publicPath: '/',
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || '8095',
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: [
        { from: /eo-UY\/.*/, to: '/_crowdin.html' },
        { from: /.*/, to: '/_fallback.html' },
      ],
    },
    serveIndex: true,
    quiet: true
  },
  optimization: {
    minimize: isProd,
    minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})],
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
    }),
    new VueSSRClientPlugin(),
  )
}

module.exports = config
