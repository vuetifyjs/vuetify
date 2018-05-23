const vuetifyPackage = require('../package.json')

module.exports = {
  __VUETIFY_VERSION__: vuetifyPackage.version,
  __REQUIRED_VUE__: vuetifyPackage.peerDependencies.vue
}
