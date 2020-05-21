
// Utilities
const Mode = require('frontmatter-markdown-loader/mode')
const prism = require('markdown-it-prism')
const md = require('markdown-it')({
  html: true,
}).use(prism)
const { VuetifyMDCompiler } = require('./build/vuetify-md')

module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  chainWebpack: config => {
    VuetifyMDCompiler(md)

    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('frontmatter-markdown-loader')
        .loader('frontmatter-markdown-loader')
        .tap(options => {
          return {
            markdown: body => {
              const render = md.render(body)

              return render
            },
            mode: [Mode.VUE_COMPONENT],
            vue: { root: 'markdown-body' },
          }
        })
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
