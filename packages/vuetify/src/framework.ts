import { createDisplay, DisplaySymbol } from '@/composables/display'
import { createTheme, ThemeSymbol } from '@/composables/theme'
import { defaultSets, IconSymbol } from '@/composables/icons'
import { createDefaults, DefaultsSymbol } from '@/composables/defaults'
import { createLocaleAdapter, LocaleAdapterSymbol } from '@/composables/locale'
import { createRtl, RtlSymbol } from '@/composables/rtl'
import { aliases, mdi } from '@/iconsets/mdi'

// Utilities
import { reactive } from 'vue'
import { mergeDeep } from '@/util'

// Types
import type { App, ComponentPublicInstance, InjectionKey } from 'vue'
import type { DisplayOptions } from '@/composables/display'
import type { ThemeOptions } from '@/composables/theme'
import type { IconOptions } from '@/composables/icons'
import type { LocaleAdapter, LocaleOptions } from '@/composables/locale'
import type { RtlOptions } from '@/composables/rtl'
import type { DefaultsOptions } from '@/composables/defaults'

export * from './composables'

export interface VuetifyOptions {
  components?: Record<string, any>
  directives?: Record<string, any>
  defaults?: DefaultsOptions
  display?: DisplayOptions
  theme?: ThemeOptions
  icons?: IconOptions
  locale?: (LocaleOptions & RtlOptions) | (LocaleAdapter & RtlOptions)
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

    app.provide(DefaultsSymbol, createDefaults(options.defaults))
    app.provide(DisplaySymbol, createDisplay(options.display))
    app.provide(ThemeSymbol, createTheme(options.theme))
    app.provide(IconSymbol, mergeDeep({
      defaultSet: 'mdi',
      sets: {
        ...defaultSets,
        mdi,
      },
      aliases,
    }, icons))
    const { adapter, rootInstance } = createLocaleAdapter(app, options?.locale)
    app.provide(LocaleAdapterSymbol, adapter)
    app.provide(RtlSymbol, createRtl(rootInstance, options?.locale))

    // Vue's inject() can only be used in setup
    function inject (this: ComponentPublicInstance, key: InjectionKey<any> | string) {
      const vm = this.$

      const provides = vm.parent?.provides ?? vm.vnode.appContext?.provides

      if (provides && (key as any) in provides) {
        return provides[(key as string)]
      }
    }

    app.mixin({
      computed: {
        $vuetify () {
          return reactive({
            defaults: inject.call(this, DefaultsSymbol),
            display: inject.call(this, DisplaySymbol),
            theme: inject.call(this, ThemeSymbol),
            icons: inject.call(this, IconSymbol),
            locale: inject.call(this, LocaleAdapterSymbol),
            rtl: inject.call(this, RtlSymbol),
          })
        },
      },
    })
  }

  return { install }
}
