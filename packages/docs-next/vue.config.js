
// Utilities
const path = require('path')
const Mode = require('frontmatter-markdown-loader/mode')
const { md } = require('./build/markdown-it')

module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  chainWebpack: config => {
    config
      .plugin('drawer-items-plugin')
      .use(path.resolve('./build/drawer-items-plugin.js'))

    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('frontmatter-markdown-loader')
        .loader('frontmatter-markdown-loader')
        .tap(() => ({
          markdown: body => md.render(body),
          mode: [Mode.VUE_COMPONENT],
          vue: { root: 'markdown-body' },
        }))
  },
  pwa: {
    name: 'Vuetify-Docs',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      // swSrc: 'dist/service-worker.js',
      // ...other Workbox options...
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
}
