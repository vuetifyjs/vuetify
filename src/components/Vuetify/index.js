import application from './mixins/application'
import breakpoint from './mixins/breakpoint'
import icons from './mixins/icons'
import methods from './mixins/methods'
import options from './mixins/options'
import theme from './mixins/theme'
import { consoleWarn } from '../../util/console'

const Vuetify = {
  install (Vue, opts = {}) {
    if (this.installed) return

    this.installed = true

    checkVueVersion(Vue)

    Vue.prototype.$vuetify = new Vue({
      mixins: [
        application,
        breakpoint,
        icons(opts.iconfont, opts.icons),
        methods,
        options(opts.options),
        theme(opts.theme)
      ]
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
  const vueDep = process.env.REQUIRED_VUE

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
