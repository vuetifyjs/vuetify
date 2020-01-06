// import OurVue, { VueConstructor } from 'vue'
import { VuetifyUseOptions } from 'types'

export function install (app: any, args: VuetifyUseOptions = {}) {
  const components = args.components || {}
  const directives = args.directives || {}

  for (const name in directives) {
    const directive = directives[name]

    app.directive(name, directive)
  }

  (function registerComponents (components: any) {
    if (components) {
      for (const key in components) {
        const component = components[key]
        if (component && !registerComponents(component.$_vuetify_subcomponents)) {
          app.component(key, component)
        }
      }
      return true
    }
    return false
  })(components)
}
