import application from './mixins/application'
import theme from './mixins/theme'
import icons from './mixins/icons'
import options from './mixins/options'
import genLang from './mixins/lang.ts'
import { consoleWarn } from '../../util/console'
import goTo from './util/goTo'

const Vuetify = {
  install (Vue, opts = {}) {
    if (this.installed) return

    this.installed = true

    checkVueVersion(Vue)

    const lang = genLang(opts.lang)

    Vue.prototype.$vuetify = new Vue({
      data: {
        application,
        breakpoint: {},
        dark: false,
        icons: icons(opts.iconfont, opts.icons),
        lang,
        options: options(opts.options),
        rtl: opts.rtl,
        theme: theme(opts.theme)
      },
      methods: {
        goTo,
        t: lang.t.bind(lang)
      }
    })

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

/* istanbul ignore next */
function checkVueVersion (Vue) {
  const vueDep = __REQUIRED_VUE__

  const required = vueDep.split('.').map(v => v.replace(/\D/g, ''))
  const actual = Vue.version.split('.')

  // Simple semver caret range comparison
  const passes =
    actual[0] === required[0] && // major matches
    (actual[1] > required[1] || // minor is greater
      (actual[1] === required[1] && actual[2] >= required[2]) // or minor is eq and patch is >=
    )

  if (!passes) {
    consoleWarn(`Vuetify requires Vue version ${vueDep}`)
  }
}

export default Vuetify
