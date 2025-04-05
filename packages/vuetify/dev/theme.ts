import { mergeDeep } from '@/util'
import { computed, inject, provide, reactive, ref, watch } from 'vue'
import type { App, InjectionKey, Reactive, Ref } from 'vue'
import { createRange, darken, getForeground, getLuma, lighten, parseColor, RGBtoHex, wrapInArray } from '../src/util'
import { palette } from '../src/blueprints/palette'

interface ThemeCache {
  variations: Record<string, string>
  onColors: Record<string, string>
  unwatch?: () => void
}

export type ThemeInstance = {
  current: Readonly<ThemeOptions>
  themes: Reactive<Record<string, InternalThemeOptions>>
  stylesheetId: string
  styles: Ref<string>
  themeClasses: Ref<string | undefined>
  toggle: (themeName?: string | string[] | Event) => void
  debug: () => {
    cache: WeakMap<InternalThemeOptions, ThemeCache>
    currentTheme: {
      name: string
      colors: Record<string, string>
      variations: Record<string, string>
      onColors: Record<string, string>
    }
  }
}

export type ThemePluginOptions = {
  cspNonce?: string
  isDisabled?: boolean
  defaultTheme?: string
  variations?: false | ThemeVariationsOptions
  themes?: Record<string, Partial<ThemeOptions>>
  stylesheetId?: string
  scope?: string
}

export type ThemeOptions = {
  dark?: boolean
  colors?: Record<string, string>
  variables?: Record<string, string | number>
}

interface ThemeVariationsOptions {
  colors: string[]
  lighten: number
  darken: number
}

export type InternalThemeOptions = Required<ThemeOptions> & {
  id: symbol
}
export type InternalThemePluginOptions = Required<ThemePluginOptions>

export const ThemeSymbol: InjectionKey<ThemeInstance> = Symbol.for('vuetify:theme-plugin')

const IN_BROWSER = typeof window !== 'undefined'
const IN_DOCUMENT = typeof document !== 'undefined'

function genLightDefaults (): ThemeOptions {
  return {
    dark: false,
    colors: {
      // Primary colors
      primary: '#0F172A',
      'primary-container': '#E2E8F0',

      // Secondary colors
      secondary: '#1E293B',
      'secondary-container': '#F1F5F9',

      // Tertiary colors
      tertiary: '#334155',
      'tertiary-container': '#F8FAFC',

      // Success colors
      success: '#15803D',
      'success-container': '#DCFCE7',

      // Info colors
      info: '#0369A1',
      'info-container': '#E0F2FE',

      // Warning colors
      warning: '#C2410C',
      'warning-container': '#FFEDD5',

      // Error colors
      error: '#BE123C',
      'error-container': '#FEE2E2',

      // Surface colors
      surface: '#FFFFFF',
      background: '#FFFFFF',
      'surface-variant': '#F1F5F9',
      'surface-container-highest': '#F8FAFC',
      'surface-container-high': '#F1F5F9',
      'surface-container': '#E2E8F0',
      'surface-container-low': '#CBD5E1',
      'surface-container-lowest': '#94A3B8',
      'inverse-surface': '#1E293B',
      'inverse-on-surface': '#FFFFFF',
      'surface-tint': '#0F172A',
      'surface-tint-color': '#0F172A',

      // Outline colors
      outline: '#CBD5E1',
      'outline-variant': '#E2E8F0',

      // Add-on Primary colors
      'primary-fixed': '#E2E8F0',
      'primary-fixed-dim': '#CBD5E1',
      'inverse-primary': '#FFFFFF',

      // Add-on Secondary colors
      'secondary-fixed': '#F1F5F9',
      'secondary-fixed-dim': '#E2E8F0',

      // Add-on Tertiary colors
      'tertiary-fixed': '#F8FAFC',
      'tertiary-fixed-dim': '#F1F5F9',

      // Add-ons Surface colors
      'surface-bright': '#FFFFFF',
      'surface-dim': '#F8FAFC',
      scrim: '#000000',
      shadow: '#000000',
    },
    variables: {
      'border-color': '#E2E8F0',
      'border-opacity': 0.12,
      'high-emphasis-opacity': 0.87,
      'medium-emphasis-opacity': 0.60,
      'disabled-opacity': 0.38,
      'idle-opacity': 0.04,
      'hover-opacity': 0.04,
      'focus-opacity': 0.12,
      'selected-opacity': 0.08,
      'activated-opacity': 0.12,
      'pressed-opacity': 0.12,
      'dragged-opacity': 0.08,
      'theme-kbd': '#F1F5F9',
      'theme-on-kbd': '#0F172A',
      'theme-code': '#F8FAFC',
      'theme-on-code': '#0F172A',
    }
  }
}

function genDarkDefaults (): ThemeOptions {
  return {
    dark: true,
    colors: {
      // Primary colors
      primary: '#E2E8F0',
      'primary-container': '#1E293B',

      // Secondary colors
      secondary: '#CBD5E1',
      'secondary-container': '#334155',

      // Tertiary colors
      tertiary: '#94A3B8',
      'tertiary-container': '#475569',

      // Success colors
      success: '#4ADE80',
      'success-container': '#166534',

      // Info colors
      info: '#38BDF8',
      'info-container': '#075985',

      // Warning colors
      warning: '#FB923C',
      'warning-container': '#9A3412',

      // Error colors
      error: '#FB7185',
      'error-container': '#9F1239',

      // Surface colors
      surface: '#0F172A',
      background: '#0F172A',
      'surface-variant': '#1E293B',
      'surface-container-highest': '#334155',
      'surface-container-high': '#1E293B',
      'surface-container': '#0F172A',
      'surface-container-low': '#0F172A',
      'surface-container-lowest': '#020617',
      'inverse-surface': '#E2E8F0',
      'inverse-on-surface': '#0F172A',
      'surface-tint': '#E2E8F0',
      'surface-tint-color': '#E2E8F0',

      // Outline colors
      outline: '#475569',
      'outline-variant': '#1E293B',

      // Add-on Primary colors
      'primary-fixed': '#1E293B',
      'primary-fixed-dim': '#0F172A',
      'inverse-primary': '#0F172A',

      // Add-on Secondary colors
      'secondary-fixed': '#334155',
      'secondary-fixed-dim': '#1E293B',

      // Add-on Tertiary colors
      'tertiary-fixed': '#475569',
      'tertiary-fixed-dim': '#334155',

      // Add-ons Surface colors
      'surface-bright': '#1E293B',
      'surface-dim': '#0F172A',
      scrim: '#000000',
      shadow: '#000000',
    },
    variables: {
      'border-color': '#1E293B',
      'border-opacity': 0.12,
      'high-emphasis-opacity': 1,
      'medium-emphasis-opacity': 0.70,
      'disabled-opacity': 0.50,
      'idle-opacity': 0.10,
      'hover-opacity': 0.04,
      'focus-opacity': 0.12,
      'selected-opacity': 0.08,
      'activated-opacity': 0.12,
      'pressed-opacity': 0.16,
      'dragged-opacity': 0.08,
      'theme-kbd': '#1E293B',
      'theme-on-kbd': '#E2E8F0',
      'theme-code': '#1E293B',
      'theme-on-code': '#E2E8F0',
    }
  }
}

function genThemePluginDefaults (options: Partial<ThemePluginOptions> = {}) {
  return mergeDeep({
    defaultTheme: 'light',
    themes: {
      light: {
        ...genLightDefaults(),
        id: Symbol('light')
      },
      dark: {
        ...genDarkDefaults(),
        id: Symbol('dark')
      },
    },
    stylesheetId: 'vuetify-theme-sheet',
    scope: undefined,
  }, options) as InternalThemePluginOptions
}

export function createTheme (options: ThemeOptions = {}): Reactive<InternalThemeOptions> {
  const defaults = !options.dark ? genLightDefaults() : genDarkDefaults()
  const merged = mergeDeep(defaults, options) as InternalThemeOptions

  return reactive(merged)
}

export function createThemePlugin (options: Partial<ThemePluginOptions> | false = {}) {
  return {
    install (app: App) {
      if (options === false || options.isDisabled) return

      const themeInstance = createThemeInstance(options)
      const callback = () => upsertStyles(themeInstance.stylesheetId, themeInstance.styles.value)

      if (IN_BROWSER) {
        watch(
          [() => themeInstance.current, () => themeInstance.styles.value],
          callback,
          { immediate: true, deep: true }
        )
      } else {
        callback()
      }

      app.provide(ThemeSymbol, themeInstance)
    },
  }
}

function genVariations (theme: ThemeOptions, variations?: false | ThemeVariationsOptions): Record<string, string> {
  if (!variations) return {}

  const result: Record<string, string> = {}
  const { colors, lighten: lightenAmount, darken: darkenAmount } = variations

  for (const name of colors) {
    const color = theme.colors?.[name]
    if (!color) continue

    const parsedColor = parseColor(color)

    for (const amount of createRange(lightenAmount, 1)) {
      result[`${name}-lighten-${amount}`] = RGBtoHex(lighten(parsedColor, amount))
    }

    for (const amount of createRange(darkenAmount, 1)) {
      result[`${name}-darken-${amount}`] = RGBtoHex(darken(parsedColor, amount))
    }
  }

  return result
}

function genOnColors (colors: Record<string, string>) {
  const onColors: Record<string, string> = {}

  for (const [key, value] of Object.entries(colors)) {
    if (key.startsWith('on-')) continue

    const onKey = `on-${key}`
    if (colors[onKey]) {
      onColors[onKey] = colors[onKey]
    } else {
      onColors[onKey] = getForeground(value)
    }
  }

  return onColors
}

function genCssVariables (theme: InternalThemeOptions) {
  const lightOverlay = theme.dark ? 2 : 1
  const darkOverlay = theme.dark ? 1 : 2

  const variables: string[] = []
  for (const [key, value] of Object.entries(theme.colors)) {
    const rgb = parseColor(value)
    variables.push(`--v-theme-${key}: ${rgb.r},${rgb.g},${rgb.b}`)
    if (!key.startsWith('on-')) {
      variables.push(`--v-theme-${key}-overlay-multiplier: ${getLuma(value) > 0.18 ? lightOverlay : darkOverlay}`)
    }
  }

  if (theme.variables) {
    for (const [key, value] of Object.entries(theme.variables)) {
      const color = typeof value === 'string' && value.startsWith('#') ? parseColor(value) : undefined
      const rgb = color ? `${color.r},${color.g},${color.b}` : undefined
      variables.push(`--v-${key}: ${rgb ?? value}`)
    }
  }

  return variables
}

function genCssClasses (namespace: string, theme: InternalThemeOptions, scope?: string) {
  const lines: string[] = []
  const scopePrefix = scope ? `:where(${scope})` : ''

  if (theme.dark) {
    lines.push(`${scopePrefix || ':root'} { color-scheme: dark }`)
  }

  lines.push(`${scopePrefix || ':root'} {`)
  lines.push(...genCssVariables(theme).map(line => `  ${line};`))
  lines.push('}')

  for (const key of Object.keys(theme.colors)) {
    if (key.startsWith('on-')) {
      lines.push(`${scopePrefix} .${key} { color: rgb(var(--v-theme-${key})) !important }`)
    } else {
      lines.push(
        `${scopePrefix} .bg-${key} {`,
        `  --v-theme-overlay-multiplier: var(--v-theme-${key}-overlay-multiplier);`,
        `  background-color: rgb(var(--v-theme-${key})) !important;`,
        `  color: rgb(var(--v-theme-on-${key})) !important`,
        '}',
        `${scopePrefix} .text-${key} { color: rgb(var(--v-theme-${key})) !important }`,
        `${scopePrefix} .border-${key} { --v-border-color: var(--v-theme-${key}) }`
      )
    }
  }

  return lines.join('\n')
}

export function createThemeInstance (options?: Partial<ThemePluginOptions>): ThemeInstance {
  const pluginOptions = genThemePluginDefaults(options)
  const name = ref<keyof typeof themes>(pluginOptions.defaultTheme)
  const themes = reactive(pluginOptions.themes as Record<string, InternalThemeOptions>)
  const themeCache = new WeakMap<InternalThemeOptions, ThemeCache>()

  function getCachedTheme (theme: InternalThemeOptions): ThemeCache {
    let cached = themeCache.get(theme)
    if (!cached) {
      const variations = genVariations(theme, pluginOptions.variations)
      const onColors = genOnColors(theme.colors)

      cached = {
        variations,
        onColors,
        unwatch: watch(() => ({ ...theme.colors }), () => {
          const newVariations = genVariations(theme, pluginOptions.variations)
          const newOnColors = genOnColors(theme.colors)

          if (cached) {
            cached.variations = newVariations
            cached.onColors = newOnColors
          }
        }, { deep: true })
      }
      themeCache.set(theme, cached)
    }
    return cached
  }

  const current = computed(() => {
    const theme = themes[name.value]
    const cached = getCachedTheme(theme)
    return {
      ...theme,
      colors: {
        ...theme.colors,
        ...cached.variations,
        ...cached.onColors
      } as Record<string, string>
    }
  })

  const styles = computed(() => {
    return genCssClasses('root', current.value, pluginOptions.scope)
  })

  const themeClasses = computed(() => `v-theme--${name.value}`)

  function set (themeName: string) {
    if (themeName in themes) {
      name.value = themeName
    } else {
      console.warn(`Theme "${themeName}" does not exist`)
    }
  }

  return {
    current: current.value,
    themes,
    styles,
    stylesheetId: pluginOptions.stylesheetId,
    themeClasses,
    toggle: function (themeName: string | string[] | Event = ['light', 'dark']) {
      const themeArray = wrapInArray(themeName instanceof Event ? ['light', 'dark'] : themeName)
      const currentIndex = themeArray.indexOf(name.value)
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % themeArray.length
      set(themeArray[nextIndex])
    },
    debug: function () {
      const currentTheme = themes[name.value]
      const cached = getCachedTheme(currentTheme)

      return {
        cache: themeCache,
        currentTheme: {
          name: name.value,
          colors: currentTheme.colors,
          variations: cached.variations,
          onColors: cached.onColors
        }
      }
    }
  }
}

export function provideTheme () {
  const theme = inject(ThemeSymbol, null)

  if (!theme) throw new Error('Could not find Vuetify theme injection')

  const instance: ThemeInstance = {
    ...theme,
  }

  provide(ThemeSymbol, instance)

  return instance
}

export function useTheme () {
  const theme = inject(ThemeSymbol, null)

  if (!theme) throw new Error('Could not find Vuetify theme injection')

  return theme
}

function upsertStyles (id: string, styles: string) {
  const style = getOrCreateStyleElement(id)

  if (!style) return

  style.innerHTML = styles
}

function getOrCreateStyleElement (id: string) {
  if (!IN_DOCUMENT) return null

  let style = document.getElementById(id) as HTMLStyleElement

  if (!style) {
    style = document.createElement('style')
    style.id = id
    document.head.appendChild(style)
  }

  return style
}
