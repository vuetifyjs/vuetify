// Composables
import { createDefaults, DefaultsSymbol } from '@/composables/defaults'
import { createDisplay, DisplaySymbol } from '@/composables/display'
import { createIcons, IconSymbol } from '@/composables/icons'
import { createLocale, LocaleAdapterSymbol } from '@/composables/locale'
import { createTheme, ThemeSymbol } from '@/composables/theme'
import { RtlSymbol } from '@/composables/rtl'

// Utilities
import { defineComponent } from '@/util'
import { reactive } from 'vue'

// Types
import type { App, ComponentPublicInstance, InjectionKey } from 'vue'
import type { DefaultsOptions } from '@/composables/defaults'
import type { DisplayOptions } from '@/composables/display'
import type { IconOptions } from '@/composables/icons'
import type { LocaleAdapter, LocaleOptions } from '@/composables/locale'
import type { RtlOptions } from '@/composables/rtl'
import type { ThemeOptions } from '@/composables/theme'

export * from './composables'

export interface VuetifyOptions {
  aliases?: Record<string, any>
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
      aliases = {},
      components = {},
      directives = {},
    } = options

    for (const key in directives) {
      app.directive(key, directives[key])
    }

    for (const key in components) {
      app.component(key, components[key])
    }

    for (const key in aliases) {
      app.component(key, defineComponent({
        ...aliases[key],
        name: key,
      }))
    }

    app.provide(DefaultsSymbol, createDefaults(options.defaults))
    app.provide(DisplaySymbol, createDisplay(options.display))
    app.provide(ThemeSymbol, createTheme(app, options.theme))
    app.provide(IconSymbol, createIcons(options.icons))
    app.provide(LocaleAdapterSymbol, createLocale(app, options.locale))

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
