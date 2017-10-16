import load from '../../util/load'

const THEME_DEFAULTS = {
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}

const Vuetify = {
  install (Vue, opts = {}) {
    if (Vue.prototype.$vuetify) return

    const $vuetify = {
      load,
      application: {
        bar: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      breakpoint: {},
      theme: Object.assign({}, THEME_DEFAULTS, opts.theme),
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
