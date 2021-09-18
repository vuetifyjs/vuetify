// const { IS_SERVER } = require('./src/util/globals')
const IS_SERVER = false

module.exports = {
  css: {
    extract: !IS_SERVER,
    sourceMap: !IS_SERVER,
  },
  configureWebpack: {
    devtool: 'source-map',
  },
  transpileDependencies: ['vuetify', 'markdown-it-prism'],
  lintOnSave: false,
}
