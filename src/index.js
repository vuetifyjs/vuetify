require('./stylus/app.styl')
import { devDependencies, version } from '../package.json'
import * as Components from './components'
import Directives from './directives'
import Load from './util/load'
import Semver from 'semver'

const Vuetify = Vue => {
  Object.values(Components).forEach(Component => {
    Vue.use(Component)
  })

  Vue.use(Directives)

  Vue.prototype.$vuetify = {
    load: Load,
    breakpoint: {}
  }
}

Vuetify.version = version

function checkVueVersion () {
  const vueDep = devDependencies.vue
  if (!Semver.satisfies(window.Vue.version, vueDep)) {
    console.warn(`Vuetify requires Vue version ${vueDep}`)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.version && checkVueVersion()
  window.Vue.use(Vuetify)
}

export default Vuetify
