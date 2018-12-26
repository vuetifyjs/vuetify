const merge = require('webpack-merge')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { config: baseWebpackConfig, happyThreadPool } = require('./webpack.base.config')

// Helpers
const resolve = file => require('path').resolve(__dirname, file)

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: './src/index.ts'
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    library: 'Vuetify',
    libraryTarget: 'umd',
    libraryExport: 'default',
    // See https://github.com/webpack/webpack/issues/6522
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader!ts-loader?transpileOnly=true',
      },
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tsconfig: resolve('../tsconfig.json')
    })
  ]
})
