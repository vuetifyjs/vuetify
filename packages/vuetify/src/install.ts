import { VueConstructor } from 'vue'
import * as components from './components'
import * as directives from './directives'

export function install (Vue: VueConstructor, args?: object) {
  if ((install as any).installed) return
  (install as any).installed = true

  for (const name in directives) {
    Vue.directive(name, directives[name])
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
        options.vuetify.rootInstance = this

        Vue.util.defineReactive(this, '$vuetify', options.vuetify.framework)
      } else {
        this.$vuetify = options.parent && options.parent.$vuetify || this
      }
    }
  })
}
