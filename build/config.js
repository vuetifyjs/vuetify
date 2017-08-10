const base = require('./webpack.prod.config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const OptimizeJsPlugin = require('optimize-js-plugin')
const version = process.env.VERSION || require('../package.json').version

const builds = {
  development: {
    filename: 'vuetify.js',
    libraryTarget: 'umd'
  },
  production: {
    filename: 'vuetify.min.js',
    libraryTarget: 'umd',
    env: 'production'
  },
  /*
  esm: {
    filename: 'vuetify.esm.js',
    libraryTarget: 'esm',
    env: 'production'
  },
  */
  commonjs: {
    filename: 'vuetify.common.js',
    libraryTarget: 'commonjs',
    env: 'production'
  }
}

function genConfig (opts) {
  const config = merge({}, base, {
    output: {
      filename: opts.filename,
      libraryTarget: opts.libraryTarget
    }
  })

  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': opts.env || 'development'
    })
  ])

  if (opts.env) {
    config.plugins = config.plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false
      }),
      new webpack.BannerPlugin({
        banner: `/*!
* Vuetify v${version}
* Forged by John Leider
* Released under the MIT License.
*/   `,
      raw: true,
      entryOnly: true
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true }},
        canPrint: true
      }),
      new OptimizeJsPlugin({
        sourceMap: false
      }),
      new webpack.optimize.ModuleConcatenationPlugin()
    ])
  }

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(builds[process.env.TARGET])
} else {
  exports.getBuild = name => genConfig(builds[name])
  exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]))
}
