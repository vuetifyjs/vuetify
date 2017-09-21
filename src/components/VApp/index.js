import VApp from './VApp'

VApp.install = function install (Vue) {
  Vue.component(VApp.name, VApp)
}

export default VApp
