// Imports
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlPwaPlugin = require('@vue/cli-plugin-pwa')

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

  config.plugin('pwa').after('html-spa').tap(() => ([{
    name: 'Vuetify-Docs',
    themeColor: '#094A7F',
    msTileColor: '#5CBBF6',
    manifestOptions: {
      background_color: '#5CBBF6',
    },
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js',
      exclude: [
        /index\.html$/,
      ],
      // ...other Workbox options...
    },
  }]))

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
