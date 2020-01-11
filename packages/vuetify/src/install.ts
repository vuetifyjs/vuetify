import Vuetify, { VuetifySymbol } from './framework'
import { App } from 'vue'
import { GlobalVuetifyPreset } from 'types'

export function install (app: App, args: GlobalVuetifyPreset = {}) {
  const {
    components = {},
    directives = {},
    transitions = {},
    ...preset
  } = args

  for (const key in directives) {
    const directive = directives[key]

    app.directive(key, directive)
  }

  (function registerComponents (components: GlobalVuetifyPreset['components']) {
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

  const vuetify = new Vuetify(preset)

  app.provide(VuetifySymbol, vuetify.framework)
}
