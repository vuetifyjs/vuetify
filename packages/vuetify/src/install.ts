import Vuetify, { VuetifySymbol } from './framework'
import { App, Component } from 'vue'
import { VuetifyUseOptions } from 'types'

export function flattenComponents (
  components: VuetifyUseOptions['components'],
  flattenedComponents: Dictionary<Component> = {},
) {
  if (!components) return flattenedComponents

  for (const key in components) {
    const component = components[key]

    // Check for and register subcomponents
    if (
      component &&
      component.$_vuetify_subcomponents
    ) {
      flattenComponents(
        component.$_vuetify_subcomponents,
        flattenedComponents,
      )

      continue
    }

    flattenedComponents[key] = component
  }

  return flattenedComponents
}

export function install (app: App, options: VuetifyUseOptions = {}) {
  const {
    components = {},
    directives = {},
    ...preset
  } = options

  const flattenedComponents = flattenComponents(components)

  for (const key in directives) {
    const directive = directives[key]

    app.directive(key, directive)
  }

  for (const key in flattenedComponents) {
    const component = flattenedComponents[key]

    app.component(key, component)
  }

  const vuetify = new Vuetify(preset)

  app.provide(VuetifySymbol, vuetify.framework)
}

install.version = __VUETIFY_VERSION__
