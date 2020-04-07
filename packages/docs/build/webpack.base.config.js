require('dotenv').config()

const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isProd = process.env.NODE_ENV === 'production'
const resolve = file => path.resolve(__dirname, file)

const plugins = [
  new webpack.DefinePlugin({
    'process.env': JSON.stringify(process.env)
  }),
  new VueLoaderPlugin()
]

const devtool = isProd ? 'none' : 'source-map'

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool,
  output: {
    path: resolve('../dist'),
    publicPath: '/',
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: isProd ? '[name].[chunkhash].js' : '[name].js'
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue', '.pug'],
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
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            loader: 'pug-plain-loader'
          },
          { loader: require.resolve('./pug-to-json') }
        ]
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
      }
    ]
  },
  performance: {
    hints: false
  },
  stats: {
    children: false,
    assets: !isProd
  },
  plugins
}

plugins.push(
  new FriendlyErrorsPlugin()
)
