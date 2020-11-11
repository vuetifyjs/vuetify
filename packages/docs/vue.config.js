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
  pwa: {
    name: 'Vuetify Documentation',
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
      swSrc: './src/service-worker.js',
      additionalManifestEntries: [
        { url: '/_crowdin.html', revision: Date.now().toString(16) },
        { url: '/_fallback.html', revision: Date.now().toString(16) },
      ],
      exclude: [/\.map$/],
      dontCacheBustURLsMatching: /^\/(js|css).+[A-Za-z0-9]{8}\.(js|css)$/,
      maximumFileSizeToCacheInBytes: 5 * 1024 ** 2,
      // ...other Workbox options...
    },
  },
  transpileDependencies: ['vuetify', 'markdown-it-prism'],
  lintOnSave: false,
}
