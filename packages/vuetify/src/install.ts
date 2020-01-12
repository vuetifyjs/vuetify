import Vuetify, { VuetifySymbol } from './framework'
import { App, Component } from 'vue'
import { GlobalVuetifyPreset } from 'types'

export function flattenComponents (
  components: GlobalVuetifyPreset['components'],
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

export function install (app: App, args: GlobalVuetifyPreset = {}) {
  const {
    components = {},
    directives = {},
    transitions = {}, // TODO: Is this needed? We never registered this before to my knowledge
    ...preset
  } = args

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
