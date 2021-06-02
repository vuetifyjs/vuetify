// Composables
import { createDisplay, VuetifyDisplaySymbol } from '@/composables/display'
import { createTheme, VuetifyThemeSymbol } from '@/composables/theme'
import { defaultSets, VuetifyIconSymbol } from '@/composables/icons'
import { createDefaults, VuetifyDefaultsSymbol } from '@/composables/defaults'
import { createLocaleAdapter, VuetifyLocaleAdapterSymbol } from '@/composables/locale'
import { createRtl, VuetifyRtlSymbol } from '@/composables/rtl'
import { aliases, mdi } from '@/iconsets/mdi'

// Utilities
import { inject } from 'vue'
import { mergeDeep } from '@/util'

// Types
import type { App, InjectionKey } from 'vue'
import type { DisplayOptions } from '@/composables/display'
import type { ThemeOptions } from '@/composables/theme'
import type { IconOptions } from '@/composables/icons'
import type { LocaleAdapter, LocaleOptions } from '@/composables/locale'
import type { RtlOptions } from '@/composables/rtl'
import type { DefaultsOptions } from '@/composables/defaults'

export interface VuetifyInstance {}

export interface VuetifyOptions {
  components?: Record<string, any>
  directives?: Record<string, any>
  defaults?: DefaultsOptions
  display?: DisplayOptions
  theme?: ThemeOptions
  icons?: IconOptions
  locale?: (LocaleOptions & RtlOptions) | (LocaleAdapter & RtlOptions)
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

    const vuetify = {}

    app.provide(VuetifySymbol, vuetify)
    app.provide(VuetifyDefaultsSymbol, createDefaults(options.defaults))
    app.provide(VuetifyDisplaySymbol, createDisplay(options.display))
    app.provide(VuetifyThemeSymbol, createTheme(options.theme))
    app.provide(VuetifyIconSymbol, mergeDeep({
      defaultSet: 'mdi',
      sets: {
        ...defaultSets,
        mdi,
      },
      aliases,
    }, icons))
    const { adapter, rootInstance } = createLocaleAdapter(app, options?.locale)
    app.provide(VuetifyLocaleAdapterSymbol, adapter)
    app.provide(VuetifyRtlSymbol, createRtl(rootInstance, options?.locale))
    app.config.globalProperties.$vuetify = vuetify
  }

  return { install }
}
