import { inject } from 'vue'
import { createTheme } from './composables'

// Types
import type { InjectionKey, App } from 'vue'
import type { ThemeInstance } from './composables'

export interface VuetifyComponentDefaults {
  [key: string]: Record<string, unknown>
  global: Record<string, unknown>
}

export interface VuetifyInstance {
  defaults: VuetifyComponentDefaults
  theme: ThemeInstance
}

export interface VuetifyOptions {
  components?: Record<string, any>
  directives?: Record<string, any>
  defaults?: Partial<VuetifyComponentDefaults>
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
      defaults: {
        global: {},
        ...defaults,
      },
      theme: createTheme(),
    }

    app.provide(VuetifySymbol, vuetify)
    app.config.globalProperties.$vuetify = vuetify
  }

  return { install }
}
