import { inject } from 'vue'
import { createTheme, VuetifyThemeSymbol } from './composables/theme'
import { defaultSets, VuetifyIconSymbol } from '@/composables/icons'
import { mergeDeep } from './util'
import { aliases, mdi } from '@/iconsets/mdi'

// Types
import type { InjectionKey, App } from 'vue'
import type { ThemeOptions } from '@/composables/theme'
import type { IconOptions } from '@/composables/icons'

export interface VuetifyComponentDefaults {
  [key: string]: undefined | Record<string, unknown>
  global: Record<string, unknown>
}

export interface VuetifyInstance {
  defaults: VuetifyComponentDefaults
}

export interface VuetifyOptions {
  components?: Record<string, any>
  directives?: Record<string, any>
  defaults?: Partial<VuetifyComponentDefaults>
  theme?: ThemeOptions
  icons?: IconOptions
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
      icons = {},
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
    }

    app.provide(VuetifySymbol, vuetify)
    app.provide(VuetifyThemeSymbol, createTheme(options.theme))
    app.provide(VuetifyIconSymbol, mergeDeep({
      defaultSet: 'mdi',
      sets: {
        ...defaultSets,
        mdi,
      },
      aliases,
    }, icons))
    app.config.globalProperties.$vuetify = vuetify
  }

  return { install }
}
