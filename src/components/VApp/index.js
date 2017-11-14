import VApp from './VApp'

/* istanbul ignore next */
VApp.install = function install (Vue) {
  Vue.component(VApp.name, VApp)
}

export default VApp
