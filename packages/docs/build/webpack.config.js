require('dotenv').config()

const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const resolve = file => path.resolve(__dirname, file)

const plugins = [
  new webpack.DefinePlugin({
    'process.env': JSON.stringify(process.env),
    'process.env.VUE_ENV': '"client"', // strip dev-only code in Vue source
  }),
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    template: resolve('../src/index.template.html')
  }),
  new CopyPlugin([
    { from: 'src/public' },
  ]),
]

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
  {
    loader: 'sass-loader',
    options: {
      implementation: require('sass'),
      fiber: require('fibers'),
      indentedSyntax: true
    }
  }
]

const scssLoaders = [
  ...cssLoaders,
  {
    loader: 'sass-loader',
    options: {
      implementation: require('sass'),
      fiber: require('fibers'),
      indentedSyntax: false
    }
  }
]

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'none' : 'source-map',
  entry: {
    app: './src/entry-client.js'
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/',
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: isProd ? '[name].[chunkhash].js' : '[name].js'
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'vue$': 'vue/dist/vue.runtime.esm.js'
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
        include: /vuetify[\\/](dist|es5|lib|src)/,
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
      },
      {
        test: /\.txt$/,
        use: ['raw-loader']
      },
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
  performance: {
    hints: false
  },
  stats: {
    children: false,
    assets: false
  },
  plugins,
  devServer: {
    publicPath: '/',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '8095',
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: '/dist/index.html' },
      ],
    },
    serveIndex: true,
    quiet: true
  },
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
}

if (isProd) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'common.[chunkhash].css'
    })
  )
}

plugins.push(
  new FriendlyErrorsPlugin()
)
