import application from './mixins/application'
import theme from './mixins/theme'

const Vuetify = {
  install (Vue, opts = {}) {
    if (this.installed) return

    this.installed = true

    const $vuetify = {}
    Vue.util.defineReactive($vuetify, 'inspire', {
      breakpoint: {},
      application,
      dark: false,
      theme: theme(opts.theme),
      touchSupport: false
    })

    Vue.prototype.$vuetify = $vuetify.inspire

    if (opts.transitions) {
      for (const t of Object.values(opts.transitions)) {
        if (t.name !== undefined && t.name.startsWith('v-')) {
          Vue.component(t.name, t)
        }
      }
    }

    if (opts.directives) {
      for (const d of Object.values(opts.directives)) {
        Vue.directive(d.name, d)
      }
    }

    if (opts.components) {
      for (const c of Object.values(opts.components)) {
        Vue.use(c)
      }
    }
  }
}

export default Vuetify
