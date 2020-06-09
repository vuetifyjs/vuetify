
// Utilities
const path = require('path')
const Mode = require('frontmatter-markdown-loader/mode')
const { md } = require('./build/markdown-it')
const resolve = file => path.resolve(__dirname, file)

module.exports = {
  devServer: {
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: [
        // { from: /eo-UY\/.*/, to: '/_crowdin.html' },
        { from: /.*/, to: '/_fallback.html' },
      ],
    },
  },
  chainWebpack: config => {
    config
      .entry('app')
      .add('./src/entry-client.js')
      .end()

    config
      .plugin('html')
      .tap(args => {
        return [
          {
            ...args[0],
            filename: '_fallback.html',
            template: resolve('./public/index.html'),
            title: 'Welcome to Vuetify | Vuetify.js',
            description: 'Vuetify is a Material Design component framework for Vue.js. It aims to provide all the tools necessary to create beautiful content rich applications.',
            keywords: 'vue, material design components, vue components, material design components, vuetify, vuetify.js, component framework',
          },
        ]
      })

    config
      .plugin('api-plugin')
      .use(path.resolve('./build/api-plugin.js'))

    config
      .plugin('pages-plugin')
      .use(path.resolve('./build/pages-plugin.js'))

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
