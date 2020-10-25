import { inject } from 'vue'

// Types
import type { InjectionKey, App } from 'vue'

export interface VuetifyComponentDefaults {}

export interface VuetifyInstance {
  defaults: VuetifyComponentDefaults
}

export interface VuetifyOptions {
  components?: Record<string, any>
  directives?: Record<string, any>
  defaults?: VuetifyComponentDefaults
}

export const VuetifySymbol: InjectionKey<VuetifyInstance> = Symbol.for('vuetify')

export const useVuetify = () => {
  const vuetify = inject(VuetifySymbol)

  if (!vuetify) {
    throw new Error('Vuetify has not been installed on this app')
  }

  return vuetify
}

export const createVuetify = (options: VuetifyOptions = {}) => {
  const install = (app: App) => {
    console.log('Installing Vuetify...')

    const {
      components = {},
      directives = {},
      defaults = {},
    } = options

    for (const key in directives) {
      const directive = directives[key]

      app.directive(key, directive)
    }

    for (const key in components) {
      const component = components[key]

      app.component(key, component)
    }

    const vuetify: VuetifyInstance = {
      defaults,
    }

    app.provide(VuetifySymbol, vuetify)
    app.config.globalProperties.$vuetify = vuetify
  }

  return { install }
}
