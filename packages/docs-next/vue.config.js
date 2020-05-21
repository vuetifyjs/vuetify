
// Utilities
const Mode = require('frontmatter-markdown-loader/mode')
const md = require('markdown-it')({
  html: true,
  xhtmlOut: true,
  breaks: true,
})

function VuetifyMDCompiler (md) {
  addHeadingRules(md)
}

function addHeadingRules (md) {
  const map = {
    h1: 'text-h3',
    h2: 'text-h4',
    h3: 'text-h5',
  }

  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    token.attrSet('class', map[token.tag])

    return self.renderToken(tokens, idx, options)
  }
}

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
              return md.render(body)
            },
            mode: [Mode.VUE_COMPONENT],
            vue: {
              root: 'markdown-body',
            },
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
