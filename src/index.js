require('./stylus/main.styl')

import Components from './components/_index'
import Directives from './directives/_index'
import Load from './util/load'

const defaults = {
  componentPrefix: 'V',
  directivePrefix: ''
}

function plugin (Vue, options) {
  options = Object.assign(defaults, (options || {}))

  Object.keys(Directives).forEach(key => {
    Vue.directive(`${options.directivePrefix}${key}`, Directives[key])
  })

  Object.keys(Components).forEach(key => {
    Vue.component(`${options.componentPrefix}${key}`, Components[key])
  })

  Vue.prototype.$vuetify = {
    load: Load
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
