// Imports
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

// Globals
const { IS_PROD } = require('../../../src/util/globals')

process.env.VUE_ENV = 'client'

module.exports = config => {
  require('./base')(config)

  config
    .entry('app')
    .clear()
    .add('./src/entry-client.js')
    .end()

  config.plugin('VueSSRClientPlugin')
    .use(VueSSRClientPlugin)

  config.devtool('source-map')

  config.optimization
    .minimize(IS_PROD)
    .splitChunks({
      chunks: 'all',
      minSize: 30000,
      maxSize: 100000,
      maxAsyncRequests: 20,
      maxInitialRequests: 5,
    })

  config.target('web')

  config.module
    .rule('json')
    .resourceQuery(/blockType=codepen-resources/)
    .use('json')
      .loader('json-loader')
      .end()
}
