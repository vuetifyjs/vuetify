require('./stylus/main.styl')

import Components from './components/_index'
import Directives from './directives/_index'
import Load from './util/load'

function plugin (Vue) {
  Object.keys(Components).forEach(key => {
    Vue.component(`V${key}`, Components[key])
  })

  Object.keys(Directives).forEach(key => {
    Vue.directive(key, Directives[key])
  })

  Vue.prototype.$vuetify = {
    load: Load
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
