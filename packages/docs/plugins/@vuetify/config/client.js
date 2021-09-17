// Imports
const HtmlWebpackPlugin = require('html-webpack-plugin')
const metadata = require('../../../src/data/metadata')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

// Globals
const IS_PROD = process.env.NODE_ENV === 'production'
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

  config.optimization
    .minimize(IS_PROD)
    .minimizer('css')
    .use(require('terser-webpack-plugin'))
    .use(require('optimize-css-assets-webpack-plugin'), [{
      cssProcessorOptions: { safe: true },
    }])

  config.target('web')

  config.module
    .rule('json')
    .resourceQuery(/blockType=codepen-resources/)
    .use('json')
    .loader('json-loader')
    .end()
}
