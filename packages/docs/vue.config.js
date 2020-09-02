// Globals
const { IS_SERVER } = require('./src/util/globals')

module.exports = {
  css: {
    extract: !IS_SERVER,
    sourceMap: !IS_SERVER,
  },
  configureWebpack: {
    devtool: 'source-map',
  },
  devServer: {
    publicPath: '/',
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: [
        { from: /eo-UY\/.*/, to: '/_crowdin.html' },
        { from: /.*/, to: '/_fallback.html' },
      ],
    },
    serveIndex: true,
    quiet: true,
  },
  transpileDependencies: ['vuetify'],
  lintOnSave: false,
}
