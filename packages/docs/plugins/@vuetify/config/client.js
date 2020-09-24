// Imports
const HtmlWebpackPlugin = require('html-webpack-plugin')
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

  config.plugin('html-spa').use(HtmlWebpackPlugin, [{
    template: 'src/spa.template.html',
    filename: '_fallback.html',
  }])

  config.plugin('html-crowdin').use(HtmlWebpackPlugin, [{
    template: 'src/crowdin.template.html',
    filename: '_crowdin.html',
  }])

  config.plugin('pwa').after('html-spa')

  config.optimization
    .minimize(IS_PROD)
    .splitChunks({
      cacheGroups: {
        vuetify: {
          test: /[\\/]vuetify[\\/]lib[\\/]/,
          enforce: true,
        },
      },
      chunks: 'all',
      maxAsyncRequests: 20,
      maxInitialRequests: 5,
      minSize: 20000,
    })

  config.target('web')

  config.module
    .rule('json')
    .resourceQuery(/blockType=codepen-resources/)
    .use('json')
    .loader('json-loader')
    .end()
}
