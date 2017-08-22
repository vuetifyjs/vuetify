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

  const $vuetify = {
    load: Load,
    breakpoint: {}
  }

  Vue.util.defineReactive($vuetify, 'breakpoint')

  Vue.prototype.$vuetify = $vuetify
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
