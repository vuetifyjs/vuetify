// Composables
import { ClientFeaturesSymbol, createClientFeatures } from '@/composables/clientFeatures'
import { createDate, DateAdapterSymbol, DateOptionsSymbol } from '@/composables/date/date'
import { createDefaults, DefaultsSymbol } from '@/composables/defaults'
import { createDisplay, DisplaySymbol } from '@/composables/display'
import { createGoTo, GoToSymbol } from '@/composables/goto'
import { createIcons, IconSymbol } from '@/composables/icons'
import { createLocale, LocaleSymbol } from '@/composables/locale'
import { createSSRHandler, SSRSymbol } from '@/composables/ssr'
import { createTheme, ThemeSymbol } from '@/composables/theme'

// Utilities
import { nextTick, reactive } from 'vue'
import { defineComponent, getUid, mergeDeep } from '@/util'

// Types
import type { App, ComponentPublicInstance, InjectionKey } from 'vue'
import type { DateOptions } from '@/composables/date'
import type { DefaultsOptions } from '@/composables/defaults'
import type { DisplayOptions, SSROptions } from '@/composables/display'
import type { GoToOptions } from '@/composables/goto'
import type { IconOptions } from '@/composables/icons'
import type { LocaleOptions, RtlOptions } from '@/composables/locale'
import type { SSRHandler } from '@/composables/ssr'
import type { ThemeOptions } from '@/composables/theme'
export * from './composables'
export type { DateOptions, DateInstance, DateModule } from '@/composables/date'

export interface VuetifyOptions {
  aliases?: Record<string, any>
  blueprint?: Blueprint
  components?: Record<string, any>
  date?: DateOptions
  directives?: Record<string, any>
  defaults?: DefaultsOptions
  display?: DisplayOptions
  goTo?: GoToOptions
  theme?: ThemeOptions
  icons?: IconOptions
  locale?: LocaleOptions & RtlOptions
  ssr?: SSROptions
  ssrHandler?: SSRHandler
}

export interface Blueprint extends Omit<VuetifyOptions, 'blueprint'> {}

export function createVuetify (vuetify: VuetifyOptions = {}) {
  const { blueprint, ssrHandler, ...rest } = vuetify
  const options: VuetifyOptions = mergeDeep(blueprint, rest)
  const {
    aliases = {},
    components = {},
    directives = {},
  } = options

  const ssr = createSSRHandler(ssrHandler)
  const clientFeatures = createClientFeatures(ssr)
  const defaults = createDefaults(options.defaults)
  const display = createDisplay(ssr, clientFeatures, options.display, options.ssr)
  const theme = createTheme(ssr, options.theme)
  const icons = createIcons(options.icons)
  const locale = createLocale(options.locale)
  const date = createDate(options.date, locale)
  const goTo = createGoTo(options.goTo, locale)

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

    app.provide(SSRSymbol, ssr)
    app.provide(ClientFeaturesSymbol, clientFeatures)
    app.provide(DefaultsSymbol, defaults)
    app.provide(DisplaySymbol, display)
    app.provide(ThemeSymbol, theme)
    app.provide(IconSymbol, icons)
    app.provide(LocaleSymbol, locale)
    app.provide(DateOptionsSymbol, date.options)
    app.provide(DateAdapterSymbol, date.instance)
    app.provide(GoToSymbol, goTo)

    if (ssr.isClient && options.ssr) {
      if (typeof ssr.registerHydratedCallback === 'function') {
        ssr.registerHydratedCallback(() => {
          display.update()
        })
      } else if (app.$nuxt) {
        app.$nuxt.hook('app:suspense:resolve', () => {
          ssr.isHydrated.value = true
          display.update()
        })
      } else {
        const { mount } = app
        app.mount = (...args) => {
          const vm = mount(...args)
          nextTick(() => {
            ssr.isHydrated.value = true
            display.update()
          })
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
              ssr: inject.call(this, SSRSymbol),
              clientFeatures: inject.call(this, ClientFeaturesSymbol),
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
    ssr,
    clientFeatures,
    defaults,
    display,
    theme,
    icons,
    locale,
    date,
    goTo,
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
