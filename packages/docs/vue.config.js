const { IS_SERVER } = require('./src/util/globals')

module.exports = {
  css: {
    extract: !IS_SERVER && { ignoreOrder: true },
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
        { from: /.*/, to: '/_fallback.html' },
      ],
    },
    serveIndex: true,
    quiet: true,
  },
  pwa: {
    name: 'Vuetify Documentation',
    themeColor: '#1867C0',
    msTileColor: '#1867C0',
    manifestOptions: {
      background_color: '#1867C0',
    },
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    description: 'Vuetify UI Library Documentation',
    icons: [
      {
        src: 'img/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'img/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: './src/service-worker.js',
      additionalManifestEntries: [
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
