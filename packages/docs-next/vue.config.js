
// Utilities
const Mode = require('frontmatter-markdown-loader/mode')
const prism = require('markdown-it-prism')
const md = require('markdown-it')({
  html: true,
}).use(prism)

function VuetifyMDCompiler (md) {
  addBlockQuoteRules(md)
  addHeadingRules(md)
  addImageRules(md)
}

function addImageRules (md) {
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const alt = token.content
    const src = token.attrGet('src')
    const title = token.attrGet('title')

    return `<app-img src="${src}" alt="${alt}" title="${title}" />`
  }
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

function addBlockQuoteRules (md) {
  md.renderer.rules.blockquote_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const paragraph = tokens[idx + 1]
    const inline = tokens[idx + 2]
    const text = inline.children.find(child => child.type === 'text')
    const [type, ...content] = text.content.split(' ')

    paragraph.attrSet('class', 'mb-0')

    text.content = content.join(' ')

    token.attrSet('type', type)
    token.type = 'inline'
    token.tag = 'app-alert'

    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.blockquote_close = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    token.type = 'inline'
    token.tag = 'app-alert'

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
