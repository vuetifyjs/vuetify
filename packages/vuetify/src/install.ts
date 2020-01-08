import { App } from 'vue'
import Vuetify, { VuetifySymbol } from './framework'
import { ComponentOrPack, VuetifyUseOptions } from 'types'

export function install (app: App, args: VuetifyUseOptions = {}) {
  const components = args.components || {}
  const directives = args.directives || {}

  for (const key in directives) {
    const directive = directives[key]

    app.directive(key, directive)
  }

  (function registerComponents (components: Dictionary<ComponentOrPack>) {
    if (!components) return false

    for (const key in components) {
      const component = components[key]

      // Check for and register subcomponents
      if (
        component &&
        component.$_vuetify_subcomponents
      ) {
        registerComponents(component.$_vuetify_subcomponents)

        continue
      }

      app.component(key, component)
    }

    return true
  })(components)

  const vuetify = new Vuetify(args)

  app.provide(VuetifySymbol, vuetify.framework)
}
