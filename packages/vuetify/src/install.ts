import { App } from 'vue'
import { VuetifyUseOptions } from 'types'
import Vuetify, { VuetifySymbol } from './framework'

export function install (app: App, args: VuetifyUseOptions = {}) {
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

  const vuetify = new Vuetify(args)
  vuetify.init()

  app.provide(VuetifySymbol, vuetify.framework)
}
