const VuetifyLoader = require('vuetify-loader/lib/plugin')

module.exports = {
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    plugins: [
      new VuetifyLoader()
    ]
  }
}
