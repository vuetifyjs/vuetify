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

    if (opts.directives) {
      Object.keys(opts.directives).forEach(key => {
        const d = opts.directives[key]
        if (d.name !== undefined && d.name.startsWith('v-')) {
          Vue.use(d)
        }
      })
    }

    if (opts.components) {
      Object.keys(opts.components).forEach(key => {
        const c = opts.components[key]
        if (c.name !== undefined && c.name.startsWith('v-')) {
          Vue.use(c)
        }
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
