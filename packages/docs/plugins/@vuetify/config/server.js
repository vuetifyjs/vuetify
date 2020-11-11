// Imports
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

process.env.VUE_ENV = 'server'

module.exports = config => {
  require('./base')(config)

  config
    .entry('app')
    .clear()
    .add('./src/entry-server.js')
    .end()

  config.plugin('VueSSRServerPlugin')
    .use(VueSSRServerPlugin)

  config.plugins.delete('pwa')

  config.module
    .rule('vue')
    .use('vue-loader')
    .tap(options => {
      options.optimizeSSR = false

      return options
    })

  if (config.plugins.has('extract-css')) {
    const langs = ['css', 'postcss', 'scss', 'sass', 'less', 'stylus']
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    for (const lang of langs) {
      for (const type of types) {
        const rule = config.module.rule(lang).oneOf(type)

        rule.uses.delete('extract-css-loader')
      }
    }

    config.plugins.delete('extract-css')
  }

  config.externals(
    nodeExternals({
      // do not externalize CSS files in case we need to import it from a dep
      allowlist: [/^vuetify/, /\.css*/, /^core-js/],
    }),
  )

  config.target('node')

  config.output
    .libraryTarget('commonjs2')
    .filename('server-bundle.js')

  config.optimization
    .minimize(false)
    .splitChunks(false)
}
