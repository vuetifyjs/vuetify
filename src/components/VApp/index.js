import load from '../../util/load'
import VApp from './VApp'

console.log(VApp)

VApp.install = function install (Vue) {
  Vue.component(VApp.name, VApp)

  // Putting this here for now
  Vue.prototype.$vuetify = {
    load
  }
}

export default VApp
