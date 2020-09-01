// Imports
const { md } = require('../../../build/markdown-it')
const Mode = require('frontmatter-markdown-loader/mode')
const path = require('path')

// Globals
const { IS_PROD } = require('../../../src/util/globals')

module.exports = config => {
  config
    .plugin('api-plugin')
    .use(path.resolve('./build/api-plugin.js'))

  config
    .plugin('pages-plugin')
    .use(path.resolve('./build/pages-plugin.js'))

  config.module
    .rule('markdown')
    .test(/\.md$/)
    .use('toc-loader')
      .loader(path.resolve('./build/toc-loader.js'))
      .end()
    .use('frontmatter-markdown-loader')
      .loader('frontmatter-markdown-loader')
      .tap(() => ({
        markdown: body => md.render(body),
        mode: [Mode.VUE_COMPONENT, Mode.BODY],
        vue: { root: 'markdown-body' },
      }))

  config
    .plugin('html')
    .tap(args => {
      return [
        {
          ...args[0],
          title: 'Welcome to Vuetify | Vuetify.js',
          description: 'Vuetify is a Material Design component framework for Vue.js. It aims to provide all the tools necessary to create beautiful content rich applications.',
          keywords: 'vue, material design components, vue components, material design components, vuetify, vuetify.js, component framework',
        },
      ]
    })

  config.resolve.alias
    .set('vue$', 'vue/dist/vue.runtime.common.js')

  config.optimization
    .removeAvailableModules(IS_PROD)
    .removeEmptyChunks(IS_PROD)

  if (IS_PROD) {
    config.plugin('sitemap')
      .use(path.resolve('./build/sitemap.js'))
  }

  if (process.env.ANALYZE === 'true') {
    config.plugin('BundleAnalyzerPlugin')
      .use(require('webpack-bundle-analyzer'))
  }
}
