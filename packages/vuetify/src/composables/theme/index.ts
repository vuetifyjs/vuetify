// Utilities
import {
  createTheme as createV0Theme,
  usePrefersDark,
} from '@vuetify/v0'
import {
  computed,
  inject,
  provide,
  ref,
  shallowRef,
  toRef,
  watch,
} from 'vue'
import {
  genVariations,
  parseThemeOptions,
} from './colors'
import { VuetifyThemeAdapter } from './adapter'
import {
  consoleWarn,
  getCurrentInstance,
  mergeDeep,
  propsFactory,
} from '@/util'

// Types
import type { App, DeepReadonly, InjectionKey, Ref } from 'vue'
import type { Colors, InternalThemeDefinition, ThemeOptions } from './colors'

export type { Colors, ThemeDefinition, ThemeOptions } from './colors'

export interface ThemeInstance {
  change: (themeName: string) => void
  cycle: (themeArray?: string[]) => void
  toggle: (themeArray?: [string, string]) => void

  readonly themes: Ref<Record<string, InternalThemeDefinition>>

  readonly name: Readonly<Ref<string>>
  readonly current: DeepReadonly<Ref<InternalThemeDefinition>>
  readonly computedThemes: DeepReadonly<Ref<Record<string, InternalThemeDefinition>>>
  readonly prefix: string

  readonly themeClasses: Readonly<Ref<string | undefined>>
}

export const ThemeSymbol: InjectionKey<ThemeInstance> = Symbol.for('vuetify:theme')

export const makeThemeProps = propsFactory({
  theme: String,
}, 'theme')

// Composables
export function createTheme (options?: ThemeOptions): ThemeInstance & { install: (app: App) => void } {
  const parsedOptions = parseThemeOptions(options)
  const themes = ref(parsedOptions.themes)

  // Build processed themes with variations + on-colors for v0 registration
  function buildV0Themes () {
    const processed: Record<string, { dark: boolean, colors: Record<string, string> }> = {}
    for (const [themeName, original] of Object.entries(themes.value)) {
      const defaultTheme = original.dark || themeName === 'dark'
        ? themes.value.dark
        : themes.value.light

      const merged = mergeDeep(defaultTheme, original) as InternalThemeDefinition
      const colors = {
        ...merged.colors,
        ...genVariations(merged.colors, parsedOptions.variations),
      }

      processed[themeName] = {
        dark: merged.dark,
        colors: colors as Record<string, string>,
      }
    }
    return processed
  }

  // Resolve default theme — v0 doesn't understand 'system'
  const isSystemDefault = parsedOptions.defaultTheme === 'system'
  const { matches: prefersDark } = usePrefersDark()
  const resolvedDefault = isSystemDefault
    ? (prefersDark.value ? 'dark' : 'light')
    : parsedOptions.defaultTheme

  // Create v0 theme instance
  const v0Theme = createV0Theme({
    reactive: true,
    foreground: true,
    default: resolvedDefault,
    themes: buildV0Themes(),
  })

  // Bridge v0's selectedId to Vuetify's name ref
  const _name = shallowRef(parsedOptions.defaultTheme)

  const name = computed({
    get () {
      if (_name.value === 'system') {
        return prefersDark.value ? 'dark' : 'light'
      }
      return String(v0Theme.selectedId.value ?? resolvedDefault)
    },
    set (val: string) {
      _name.value = val
      if (val !== 'system') {
        v0Theme.select(val)
      }
    },
  })

  // When system preference changes and we're in system mode, update v0 selection
  watch(prefersDark, dark => {
    if (_name.value === 'system') {
      v0Theme.select(dark ? 'dark' : 'light')
    }
  })

  const computedThemes = computed(() => {
    const acc: Record<string, InternalThemeDefinition> = {}
    const v0Colors = v0Theme.colors.value

    for (const [themeName, original] of Object.entries(themes.value)) {
      const defaultTheme = original.dark || themeName === 'dark'
        ? themes.value.dark
        : themes.value.light

      const merged = mergeDeep(defaultTheme, original) as InternalThemeDefinition

      acc[themeName] = {
        dark: merged.dark,
        variables: merged.variables,
        colors: (v0Colors[themeName] ?? merged.colors) as Colors,
      }
    }
    return acc
  })

  const current = toRef(() => computedThemes.value[name.value])

  const themeClasses = toRef(() => parsedOptions.isDisabled ? undefined : `${parsedOptions.prefix}theme--${name.value}`)
  const themeNames = toRef(() => Object.keys(computedThemes.value))

  const adapter = new VuetifyThemeAdapter({
    cspNonce: parsedOptions.cspNonce,
    scope: parsedOptions.scope,
    stylesheetId: parsedOptions.stylesheetId,
    prefix: parsedOptions.prefix,
    utilities: parsedOptions.utilities,
  })

  function install (app: App) {
    if (parsedOptions.isDisabled) return

    adapter.setThemes(computedThemes.value)
    adapter.setup(app, {
      colors: v0Theme.colors,
      selectedId: v0Theme.selectedId as Ref<string | null | undefined>,
      isDark: v0Theme.isDark,
    })

    watch(computedThemes, val => {
      adapter.setThemes(val)
    })
  }

  function change (themeName: string) {
    if (themeName !== 'system' && !themeNames.value.includes(themeName)) {
      consoleWarn(`Theme "${themeName}" not found on the Vuetify theme instance`)
      return
    }

    name.value = themeName
  }

  function cycle (themeArray: string[] = themeNames.value) {
    const currentIndex = themeArray.indexOf(name.value)
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % themeArray.length

    change(themeArray[nextIndex])
  }

  function toggle (themeArray: [string, string] = ['light', 'dark']) {
    cycle(themeArray)
  }

  return {
    install,
    change,
    cycle,
    toggle,
    name,
    themes,
    current,
    computedThemes,
    prefix: parsedOptions.prefix,
    themeClasses,
  }
}

export function provideTheme (props: { theme?: string }) {
  getCurrentInstance('provideTheme')

  const theme = inject(ThemeSymbol, null)

  if (!theme) throw new Error('Could not find Vuetify theme injection')

  const name = toRef(() => props.theme ?? theme.name.value)
  const current = toRef(() => theme.themes.value[name.value])

  const themeClasses = toRef(() => `${theme.prefix}theme--${name.value}`)

  const newTheme: ThemeInstance = {
    ...theme,
    name,
    current,
    themeClasses,
  }

  provide(ThemeSymbol, newTheme)

  return newTheme
}

export function useTheme () {
  getCurrentInstance('useTheme')

  const theme = inject(ThemeSymbol, null)

  if (!theme) throw new Error('Could not find Vuetify theme injection')

  return theme
}
