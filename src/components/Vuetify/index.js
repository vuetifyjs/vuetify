import Semver from 'semver'
import { devDependencies, version } from '../../../package.json'
import load from '../../util/load'

const Vuetify = {
  install (Vue, opts = {}) {
    const $vuetify = {
      load,
      breakpoint: {}
    }

    Vue.util.defineReactive($vuetify, 'breakpoint')

    Vue.prototype.$vuetify = $vuetify

    if (opts.transitions) {
      Object.keys(opts.transitions).forEach(key => {
        const t = opts.transitions[key]
        if (t.name !== undefined && t.name.startsWith('v-')) {
          Vue.component(t.name, t)
        }
      })
    }

    if (opts.directives) {
      Object.keys(opts.directives).forEach(key => {
        const d = opts.directives[key]
        Vue.directive(d.name, d)
      })
    }

    if (opts.components) {
      Object.keys(opts.components).forEach(key => {
        const c = opts.components[key]
        Vue.use(c)
      })
    }
  },
  version
}

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
