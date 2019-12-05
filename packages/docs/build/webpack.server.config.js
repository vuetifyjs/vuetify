const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = merge(base, {
  name: 'server',
  target: 'node',
  entry: './src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.common.js'
    }
  },
  externals: ['dotenv', 'lodash', '@mdi/js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          envName: 'server'
        },
        exclude: /node_modules/
      },
      {
        // TODO: maybe don't use MiniCssExtractPlugin? It really doesn't like SSR
        // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/90
        test: /\.(css|styl(us)?|s(a|c)ss)$/,
        use: 'null-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ],
  optimization: {
    minimize: false,
    splitChunks: false,
    removeAvailableModules: isProd,
    removeEmptyChunks: isProd
  }
})
