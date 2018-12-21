import OurVue from 'vue'

import application from './mixins/application'
import breakpoint from './mixins/breakpoint'
import theme from './mixins/theme'
import icons from './mixins/icons'
import options from './mixins/options'
import genLang from './mixins/lang'
import goTo from './goTo'

// Utils
import { consoleWarn, consoleError } from '../../util/console'

// Types
import { VueConstructor } from 'vue/types'
import { Vuetify as VuetifyPlugin, VuetifyUseOptions } from 'vuetify/types'

const Vuetify: VuetifyPlugin = {
  install (Vue, opts = {}) {
    if ((this as any).installed) return
    ;(this as any).installed = true

    if (OurVue !== Vue) {
      consoleError('Multiple instances of Vue detected\nSee https://github.com/vuetifyjs/vuetify/issues/4068\n\nIf you\'re seeing "$attrs is readonly", it\'s caused by this')
    }

    checkVueVersion(Vue)

    const lang = genLang(opts.lang)

    Vue.prototype.$vuetify = new Vue({
      mixins: [
        breakpoint(opts.breakpoint)
      ],
      data: {
        application,
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

    if (opts.directives) {
      for (const name in opts.directives) {
        Vue.directive(name, opts.directives[name])
      }
    }

    (function registerComponents (components: VuetifyUseOptions['components']) {
      if (components) {
        for (const key in components) {
          const component = components[key]
          if (component && !registerComponents(component.$_vuetify_subcomponents)) {
            Vue.component(key, component as typeof Vue)
          }
        }
        return true
      }
      return false
    })(opts.components)
  },
  version: __VUETIFY_VERSION__
}

export function checkVueVersion (Vue: VueConstructor, requiredVue?: string) {
  const vueDep = requiredVue || __REQUIRED_VUE__

  const required = vueDep.split('.', 3).map(v => v.replace(/\D/g, '')).map(Number)
  const actual = Vue.version.split('.', 3).map(n => parseInt(n, 10))

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
