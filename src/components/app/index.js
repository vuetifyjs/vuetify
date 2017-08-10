import load from '../../util/load'
import VApp from './VApp.vue'

export default function install (Vue) {
  Vue.component('v-app', VApp)

  // Putting this here for now
  Vue.prototype.$vuetify = {
    load
  }
}
