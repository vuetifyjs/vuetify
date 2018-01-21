import './stylus/app.styl'
import Semver from 'semver'
import { peerDependencies, version } from '../package.json'
import * as components from './components'
import * as directives from './directives'
import { consoleWarn } from './util/console'

function Vuetify (Vue, args) {
  const Vuetify = components.Vuetify

  Vue.use(Vuetify, {
    components,
    directives,
    ...args
  })
}

Vuetify.version = version

function checkVueVersion () {
  const vueDep = peerDependencies.vue
  if (!Semver.satisfies(window.Vue.version, vueDep)) {
    consoleWarn(`Vuetify requires Vue version ${vueDep}`)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.version && checkVueVersion()
  window.Vue.use(Vuetify)
}

export default Vuetify
