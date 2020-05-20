
// Utilities
const Mode = require('frontmatter-markdown-loader/mode')
const md = require('markdown-it')({
  // html: true,
  // xhtmlOut: true,
  // breaks: true,
})

module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  chainWebpack: config => {
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('frontmatter-markdown-loader')
        .loader('frontmatter-markdown-loader')
        .tap(options => {
          return {
            markdown: body => {
              return VuetifyMDCompiler(body)
            },
            mode: [Mode.VUE_COMPONENT],
          }
        })
  },
  transpileDependencies: [
    'vuetify',
  ],
}

function VuetifyMDCompiler (body) {
  const page = []

  const render = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    tokens[idx].attrSet('class', 'text-h3')

    // console.log(args)
    return render(tokens, idx, options, env, self)
  }

  return md.render(body)
}
