const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const base = require('./webpack.prod.config')

const builds = {
  development: {
    mode: 'development',
    output: {
      filename: 'vuetify.js',
      libraryTarget: 'umd'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'vuetify.css'
      })
    ]
  },
  production: {
    mode: 'production',
    output: {
      filename: 'vuetify.min.js',
      libraryTarget: 'umd'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'vuetify.min.css'
      })
    ],
    performance: {
      hints: false,
    },
    optimization: {
      minimizer: [
        new CssMinimizerPlugin({
          minimizerOptions: {
            discardComments: { removeAll: true },
            postcssZindex: false,
            reduceIdents: false
          },
        })
      ],
    },
  },
}

function genConfig (name) {
  const config = merge({}, base, builds[name])

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.mode)
    })
  )

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  module.exports = Object.keys(builds).map(name => genConfig(name))
}
