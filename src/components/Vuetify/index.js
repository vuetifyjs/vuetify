import load from '../../util/load'
import application from './mixins/application'
import theme from './mixins/theme'

const Vuetify = {
  install (Vue, opts = {}) {
    if (Vue.prototype.$vuetify) return

    const $vuetify = {
      load,
      application,
      breakpoint: {},
      theme: theme(opts),
      touchSupport: false
    }

    Vue.util.defineReactive({}, 'application', $vuetify)
    Vue.util.defineReactive({}, 'breakpoint', $vuetify)
    Vue.util.defineReactive({}, 'theme', $vuetify)

    Vue.prototype.$vuetify = $vuetify

    if (opts.transitions) {
      Object.values(opts.transitions).forEach(t => {
        if (t.name !== undefined && t.name.startsWith('v-')) {
          Vue.component(t.name, t)
        }
      })
    }

    if (opts.directives) {
      Object.values(opts.directives).forEach(d => {
        Vue.directive(d.name, d)
      })
    }

    if (opts.components) {
      Object.values(opts.components).forEach(c => {
        Vue.use(c)
      })
    }
  }
}

export default Vuetify
