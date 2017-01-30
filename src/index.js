require('./stylus/main.styl')

import Components from './components/_index'
import Directives from './directives/_index'
import Init from './util/init'
import Load from './util/load'
import Event from './util/event'
import Toast from './functions/toast'
import Store from './store/index'

const defaults = {
  componentPrefix: 'V',
  directivePrefix: ''
}

function plugin (Vue, options) {
  options = Object.assign(defaults, (options || {}))

  if (!options.store) {
    throw {
      message: 'Vuetify requires a Vuex store to initialize',
      name: 'VuetifyVuex'
    }
  }

  Object.keys(Directives).forEach(key => {
    Vue.directive(`${options.directivePrefix}${key}`, Directives[key])
  })

  Object.keys(Components).forEach(key => {
    Vue.component(`${options.componentPrefix}${key}`, Components[key])
  })

  Vue.prototype.$vuetify = function () {
    return {
      event: Event.bind(this),
      load: Load,
      init: Init.bind(this),
      toast: Toast
    }
  }

  options.store.registerModule('vuetify', Store)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin, window.store)
}

export default plugin
