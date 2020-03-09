const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
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
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: isProd ? undefined : /^vuetify/,
    modulesDir: path.resolve(__dirname, '../../../node_modules')
  }),
  module: {
    rules: [
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
    new VueSSRServerPlugin(),
  ],
  optimization: {
    minimize: false,
    splitChunks: false,
    removeAvailableModules: isProd,
    removeEmptyChunks: isProd
  }
})
