// Composables
import { createDefaults, DefaultsSymbol } from '@/composables/defaults'
import { createDisplay, DisplaySymbol } from '@/composables/display'
import { createIcons, IconSymbol } from '@/composables/icons'
import { createLocale, LocaleSymbol } from '@/composables/locale'
import { createTheme, ThemeSymbol } from '@/composables/theme'
import { createDate, DateAdapterSymbol } from '@/labs/date/date'

// Utilities
import { nextTick, reactive } from 'vue'
import { defineComponent, getUid, IN_BROWSER, mergeDeep } from '@/util'

// Types
import type { App, ComponentPublicInstance, InjectionKey } from 'vue'
import type { DefaultsOptions } from '@/composables/defaults'
import type { DisplayOptions, SSROptions } from '@/composables/display'
import type { IconOptions } from '@/composables/icons'
import type { LocaleOptions, RtlOptions } from '@/composables/locale'
import type { ThemeOptions } from '@/composables/theme'
import type { DateOptions } from '@/labs/date'

export * from './composables'
export type { DateOptions, DateInstance } from '@/labs/date'

export interface VuetifyOptions {
  aliases?: Record<string, any>
  blueprint?: Blueprint
  components?: Record<string, any>
  date?: DateOptions
  directives?: Record<string, any>
  defaults?: DefaultsOptions
  display?: DisplayOptions
  theme?: ThemeOptions
  icons?: IconOptions
  locale?: LocaleOptions & RtlOptions
  ssr?: SSROptions
}

export interface Blueprint extends Omit<VuetifyOptions, 'blueprint'> {}

export function createVuetify (vuetify: VuetifyOptions = {}) {
  const { blueprint, ...rest } = vuetify
  const options: VuetifyOptions = mergeDeep(blueprint, rest)
  const {
    aliases = {},
    components = {},
    directives = {},
  } = options

  const defaults = createDefaults(options.defaults)
  const display = createDisplay(options.display, options.ssr)
  const theme = createTheme(options.theme)
  const icons = createIcons(options.icons)
  const locale = createLocale(options.locale)
  const date = createDate(options.date)

  const install = (app: App) => {
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
        aliasName: aliases[key].name,
      }))
    }

    theme.install(app)

    app.provide(DefaultsSymbol, defaults)
    app.provide(DisplaySymbol, display)
    app.provide(ThemeSymbol, theme)
    app.provide(IconSymbol, icons)
    app.provide(LocaleSymbol, locale)
    app.provide(DateAdapterSymbol, date)

    if (IN_BROWSER && options.ssr) {
      if (app.$nuxt) {
        app.$nuxt.hook('app:suspense:resolve', () => {
          display.update()
        })
      } else {
        const { mount } = app
        app.mount = (...args) => {
          const vm = mount(...args)
          nextTick(() => display.update())
          app.mount = mount
          return vm
        }
      }
    }

    getUid.reset()

    if (typeof __VUE_OPTIONS_API__ !== 'boolean' || __VUE_OPTIONS_API__) {
      app.mixin({
        computed: {
          $vuetify () {
            return reactive({
              defaults: inject.call(this, DefaultsSymbol),
              display: inject.call(this, DisplaySymbol),
              theme: inject.call(this, ThemeSymbol),
              icons: inject.call(this, IconSymbol),
              locale: inject.call(this, LocaleSymbol),
              date: inject.call(this, DateAdapterSymbol),
            })
          },
        },
      })
    }
  }

  return {
    install,
    defaults,
    display,
    theme,
    icons,
    locale,
    date,
  }
}

export const version = __VUETIFY_VERSION__
createVuetify.version = version

// Vue's inject() can only be used in setup
function inject (this: ComponentPublicInstance, key: InjectionKey<any> | string) {
  const vm = this.$

  const provides = vm.parent?.provides ?? vm.vnode.appContext?.provides

  if (provides && (key as any) in provides) {
    return provides[(key as string)]
  }
}
