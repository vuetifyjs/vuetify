// Imports
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const metadata = require('../../../src/data/metadata')

// Globals
const { IS_PROD } = require('../../../src/util/globals')

process.env.VUE_ENV = 'client'

function useMetadata (template, filename) {
  return [{
    template: `src/${template}.template.html`,
    filename: `${filename || `_${template}`}.html`,
    ...metadata,
  }]
}

module.exports = config => {
  require('./base')(config)

  config
    .entry('app')
    .clear()
    .add('./src/entry-client.js')
    .end()

  config.plugin('VueSSRClientPlugin')
    .use(VueSSRClientPlugin)

  config.plugin('html-spa')
    .use(HtmlWebpackPlugin, useMetadata('spa', '_fallback'))

  config.plugin('html-crowdin')
    .use(HtmlWebpackPlugin, useMetadata('crowdin'))

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
