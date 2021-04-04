const merge = require('webpack-merge')
const HappyPack = require('happypack')
const { config: baseWebpackConfig, happyThreadPool } = require('./webpack.base.config')

// Helpers
const resolve = file => require('path').resolve(__dirname, file)

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: './src/index.ts',
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    library: 'Vuetify',
    libraryTarget: 'umd',
    libraryExport: 'default',
    // See https://github.com/webpack/webpack/issues/6522
    globalObject: `typeof self !== 'undefined' ? self : this`,
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue',
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        use: 'happypack/loader?id=scripts',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // TODO: hangs build
    // new ForkTsCheckerWebpackPlugin({
    //   checkSyntacticErrors: true,
    //   tsconfig: resolve('../tsconfig.json')
    // }),
    new HappyPack({
      id: 'scripts',
      threadPool: happyThreadPool,
      loaders: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: { happyPackMode: true },
        },
      ],
    }),
  ],
})
