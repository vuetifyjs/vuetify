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
      theme: theme(opts.theme)
    })

    Vue.prototype.$vuetify = $vuetify.inspire

    if (opts.transitions) {
      Object.values(opts.transitions).forEach(transition => {
        if (transition.name !== undefined && transition.name.startsWith('v-')) {
          Vue.component(transition.name, transition)
        }
      })
    }

    if (opts.directives) {
      Object.values(opts.directives).forEach(directive => {
        Vue.directive(directive.name, directive)
      })
    }

    if (opts.components) {
      Object.values(opts.components).forEach(component => {
        Vue.use(component)
      })
    }
  }
}

export default Vuetify
