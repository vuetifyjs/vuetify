const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

const version = require('../package.json').version

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: './src/entry-bundler.ts'
  },
  output: {
    publicPath: '/dist/',
    library: 'Vuetify',
    libraryTarget: 'umd',
    // See https://github.com/webpack/webpack/issues/6522
    globalObject: `typeof self !== 'undefined' ? self : this`,
    chunkLoading: false,
    wasmLoading: false,
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
    new webpack.BannerPlugin({
      banner: `/*!
* Vuetify v${version}
* Forged by John Leider
* Released under the MIT License.
*/     `,
      raw: true,
      entryOnly: true
    })
  ]
})
