// Imports
const path = require('path')
const resolve = file => path.resolve(__dirname, file)

// Globals
const { IS_PROD, IS_SERVER } = require('./src/util/globals')

// Data
const metadata = require(resolve('./src/data/metadata.json'))

// Entry path
const entry = resolve('./src/main.js')

module.exports = {
  css: {
    extract: !IS_SERVER,
    sourceMap: !IS_SERVER,
  },
  configureWebpack: {
    devtool: 'source-map',
  },
  pages: IS_SERVER || !IS_PROD ? undefined : {
    index: {
      ...metadata,
      entry,
      filename: '_fallback.html',
    },
    crowdin: {
      ...metadata,
      entry,
      template: resolve('./src/crowdin.template.html'),
      filename: '_crowdin.html',
    },
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: [
        // { from: /eo-UY\/.*/, to: '/_crowdin.html' },
        // { from: /.*/, to: '/index.html' },
      ],
    },
  },
  pwa: {
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
  },
  transpileDependencies: ['vuetify'],
  lintOnSave: false,
}
