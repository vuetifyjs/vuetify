const autoprefixer = require('autoprefixer')
const postcssVuetifyBidiPluginFactory = require('./build/postcssVuetifyBidiPluginFactory')

module.exports = ctx => ({
  plugins: [
    autoprefixer({
      remove: false,
    }),
    postcssVuetifyBidiPluginFactory(process.env.VUETIFY_DIRECTION),
  ],
})
