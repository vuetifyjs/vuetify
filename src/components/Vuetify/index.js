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

    for (const t of Object.values(Object(opts.transitions))) {
      if (t.name !== undefined && t.name.startsWith('v-')) {
        Vue.component(t.name, t)
      }
    }

    for (const d of Object.values(Object(opts.directives))) {
      Vue.directive(d.name, d)
    }

    for (const c of Object.values(Object(opts.components))) {
      Vue.use(c)
    }
  }
}

export default Vuetify
