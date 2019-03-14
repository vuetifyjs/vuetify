// Types
import { VuetifyUseOptions } from 'types'
import { VueConstructor } from 'vue'

export function install (Vue: VueConstructor, args: VuetifyUseOptions = {}) {
  if ((install as any).installed) return
  (install as any).installed = true

  const components = args.components || {}
  const directives = args.directives || {}

  for (const name in directives) {
    const directive = directives[name]

    Vue.directive(name, directive)
  }

  (function registerComponents (components: any) {
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
  })(components)

  Vue.mixin({
    beforeCreate () {
      const options = this.$options as any

      if (options.vuetify) {
        options.vuetify.init(options.ssrContext)
        this.$vuetify = Vue.observable(options.vuetify.framework)
      } else {
        this.$vuetify = (options.parent && options.parent.$vuetify) || this
      }
    }
  })
}
