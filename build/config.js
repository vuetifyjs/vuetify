const base = require('./webpack.base.config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const OptimizeJsPlugin = require('optimize-js-plugin')

const builds = {
  'dev': {
    filename: 'vuetify.js',
    libraryTarget: 'umd'
  },
  'prod': {
    filename: 'vuetify.min.js',
    libraryTarget: 'umd',
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
        compress: {
          warnings: false
        }
      }),
      new OptimizeCssAssetsPlugin(),
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
