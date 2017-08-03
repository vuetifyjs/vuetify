require('./stylus/main.styl')

import { devDependencies } from '../package.json'
import Components from './components'
import * as Directives from './directives'
import Load from './util/load'
import semver from 'semver'

function plugin (Vue) {
  Object.keys(Components).forEach(key => {
    Vue.component(key, Components[key])
  })

  Object.keys(Directives).forEach(key => {
    Vue.directive(key, Directives[key])
  })

  Vue.prototype.$vuetify = {
    load: Load
  }
}

function checkVueVersion () {
  const vueDep = devDependencies.vue
  if (!semver.satisfies(window.Vue.version, vueDep)) {
    console.warn(`Vuetify requires Vue version ${vueDep}`)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  if (window.Vue.version) {
    checkVueVersion()
  }
  window.Vue.use(plugin)
}

export default plugin
