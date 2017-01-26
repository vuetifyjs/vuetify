require('./stylus/main.styl')

import Bus from './util/bus'
import Components from './components/_index'
import Directives from './directives/_index'
import Init from './util/init'
import Load from './util/load'
import Event from './util/event'
import Toast from './functions/toast'
import Store from './store/index'

function plugin(Vue) {
  Object.keys(Directives).forEach(key => {
    Vue.directive(key, Directives[key])
  })
  
  Object.keys(Components).forEach(key => {
    Vue.component(key, Components[key])
  })

  Vue.prototype.$vuetify = function () {
    return {
      bus: Bus,
      event: Event.bind(this),
      load: Load,
      init: Init.bind(this),
      toast: Toast
    }
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

module.exports = plugin

module.exports.vuetifySync = (store) => {
  store.registerModule('vuetify', Store)
}