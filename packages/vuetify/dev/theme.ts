import { mergeDeep } from '@/util'
import { computed, inject, provide, reactive, ref, watch } from 'vue'
import type { App, InjectionKey, Reactive, Ref, WritableComputedRef } from 'vue'

type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T

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
}

export type ThemeInstance = {
  current: WritableComputedRef<ThemeOptions, string>
  themes: Reactive<Record<string, ThemeOptions>>
  stylesheetId: string
  styles: Ref<string>
}

interface ThemeVariationsOptions {
  colors: string[]
  lighten: number
  darken: number
}

export type InternalThemeOptions = Required<ThemeOptions>
export type InternalThemePluginOptions = Required<ThemePluginOptions>

export const ThemeSymbol: InjectionKey<ThemeInstance> = Symbol.for('vuetify:theme-plugin')

const IN_BROWSER = typeof window !== 'undefined'
const IN_DOCUMENT = typeof document !== 'undefined'

// Use-cases
const palette = {
  primary: {
    0: '#000000',
    10: '#21005d',
    20: '#381e72',
    30: '#4f378b',
    40: '#6750a4',
    50: '#7f67be',
    60: '#9a82db',
    70: '#b69df8',
    80: '#d0bcff',
    90: '#eaddff',
    95: '#f6edff',
    99: '#fffbfe',
    100: '#ffffff',
  },
  secondary: {
    0: '#000000',
    10: '#1d192b',
    20: '#332d41',
    30: '#4a4458',
    40: '#625b71',
    50: '#7a7289',
    60: '#958da5',
    70: '#b0a7c0',
    80: '#ccc2dc',
    90: '#e8def8',
    95: '#f6edff',
    99: '#fffbfe',
    100: '#ffffff',
  },
  tertiary: {
    0: '#000000',
    10: '#31111d',
    20: '#492532',
    30: '#633b48',
    40: '#7d5260',
    50: '#986977',
    60: '#b58392',
    70: '#d29dac',
    80: '#efb8c8',
    90: '#ffd8e4',
    95: '#ffecf1',
    99: '#fffbfa',
    100: '#ffffff',
  },
  success: {
    0: '#000000',
    10: '#1f311d',
    20: '#2b4a2b',
    30: '#3b6341',
    40: '#4b7d56',
    50: '#5c9c6b',
    60: '#6dbf7f',
    70: '#7fe493',
    80: '#93f3a0',
    90: '#b3f8c8',
    95: '#d1fce0',
    99: '#f3fdf7',
    100: '#ffffff',
  },
  info: {
    0: '#000000',
    10: '#1d4e89',
    20: '#1e88e5',
    30: '#2196f3',
    40: '#42a5f5',
    50: '#64b5f6',
    60: '#90caf9',
    70: '#bbdefb',
    80: '#e3f2fd',
    90: '#bbdefb',
    95: '#e1f5fe',
    99: '#fffbfe',
    100: '#ffffff',
  },
  warning: {
    0: '#000000',
    10: '#4e3b00',
    20: '#7b5f00',
    30: '#a68300',
    40: '#c6a700',
    50: '#e2b700',
    60: '#f0c200',
    70: '#f6d600',
    80: '#fce77f',
    90: '#fff9c4',
    95: '#fffde7',
    99: '#fffbf9',
    100: '#ffffff',
  },
  error: {
    0: '#000000',
    10: '#410e0b',
    20: '#601410',
    30: '#8c1d18',
    40: '#b3261e',
    50: '#dc362e',
    60: '#e46962',
    70: '#ec928e',
    80: '#f2b8b5',
    90: '#f9dedc',
    95: '#fceeee',
    99: '#fffbf9',
    100: '#ffffff',
  },
  neutral: {
    0: '#000000',
    10: '#1c1b1f',
    20: '#313033',
    30: '#484649',
    40: '#605d62',
    50: '#787579',
    60: '#939094',
    70: '#aeaaae',
    80: '#c9c5ca',
    87: '#DED8E1',
    90: '#e6e1e5',
    92: '#ece6f0',
    94: '#f3edf7',
    95: '#f4eff4',
    96: '#f7f2fa',
    98: '#FEF7FF',
    99: '#fffbfe',
    100: '#ffffff',
  },
  neutralVariant: {
    0: '#000000',
    10: '#1d1a22',
    20: '#322f37',
    30: '#49454f',
    40: '#605d66',
    50: '#79747e',
    60: '#938f99',
    70: '#aea9b4',
    80: '#cac4d0',
    90: '#e7e0ec',
    95: '#f5eefa',
    99: '#fffbfe',
    100: '#ffffff',
  },
}

function genLightDefaults (): ThemeOptions {
  return {
    dark: false,
    colors: {
      // Primary colors
      primary: palette.primary[40],
      'on-primary': palette.primary[100],
      'primary-container': palette.primary[90],
      'on-primary-container': palette.primary[30],

      // Secondary colors
      secondary: palette.secondary[40],
      'on-secondary': palette.secondary[100],
      'secondary-container': palette.secondary[90],
      'on-secondary-container': palette.secondary[30],

      // Tertiary colors
      tertiary: palette.tertiary[40],
      'on-tertiary': palette.tertiary[100],
      'tertiary-container': palette.tertiary[90],
      'on-tertiary-container': palette.tertiary[30],

      // Success colors
      success: palette.success[40],
      'on-success': palette.success[100],
      'success-container': palette.success[90],
      'on-success-container': palette.success[30],

      // Info colors
      info: palette.info[40],
      'on-info': palette.info[100],
      'info-container': palette.info[90],
      'on-info-container': palette.info[30],

      // Warning colors
      warning: palette.warning[40],
      'on-warning': palette.warning[100],
      'warning-container': palette.warning[90],
      'on-warning-container': palette.warning[30],

      // Error colors
      error: palette.error[40],
      'on-error': palette.error[100],
      'error-container': palette.error[90],
      'on-error-container': palette.error[30],

      // Surface colors
      surface: palette.neutral[98],
      'on-surface': palette.neutral[10],
      'surface-variant': palette.neutralVariant[90],
      'on-surface-variant': palette.neutralVariant[30],
      'surface-container-highest': palette.neutral[90],
      'surface-container-high': palette.neutral[92],
      'surface-container': palette.neutral[94],
      'surface-container-low': palette.neutral[96],
      'surface-container-lowest': palette.neutral[100],
      'inverse-surface': palette.neutral[20],
      'inverse-on-surface': palette.neutral[95],
      'surface-tint': palette.primary[40],
      'surface-tint-color': palette.primary[40],

      // Outline colors
      outline: palette.neutralVariant[50],
      'outline-variant': palette.neutralVariant[80],

      // Add-on Primary colors
      'primary-fixed': palette.primary[90],
      'on-primary-fixed': palette.primary[10],
      'primary-fixed-dim': palette.primary[80],
      'on-primary-fixed-dim': palette.primary[30],
      'inverse-primary': palette.primary[80],

      // Add-on Secondary colors
      'secondary-fixed': palette.secondary[90],
      'on-secondary-fixed': palette.secondary[10],
      'secondary-fixed-dim': palette.secondary[80],
      'on-secondary-fixed-dim': palette.secondary[30],

      // Add-on Tertiary colors
      'tertiary-fixed': palette.tertiary[90],
      'on-tertiary-fixed': palette.tertiary[10],
      'tertiary-fixed-dim': palette.tertiary[80],
      'on-tertiary-fixed-dim': palette.tertiary[30],

      // Add-ons Surface colors
      background: palette.neutral[98],
      'on-background': palette.neutral[10],
      'surface-bright': palette.neutral[98],
      'surface-dim': palette.neutral[87],
      scrim: palette.neutral[0],
      shadow: palette.neutral[0],
    },
  }
}

function genDarkDefaults (): ThemeOptions {
  return {
    dark: true,
    colors: {},
  }
}

function genThemePluginDefaults (options: Partial<ThemePluginOptions> = {}) {
  return mergeDeep({
    defaultTheme: 'light',
    themes: {
      light: genLightDefaults(),
      dark: genDarkDefaults(),
    },
    stylesheetId: 'vuetify-theme-sheet',
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
          [themeInstance.current, themeInstance.styles],
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

export function createThemeInstance (options?: Partial<ThemePluginOptions>): ThemeInstance {
  const pluginOptions = genThemePluginDefaults(options)
  const name = ref<keyof typeof themes>(pluginOptions.defaultTheme)
  const themes = reactive(pluginOptions.themes)

  const current = computed({
    get () {
      return themes[name.value] as InternalThemeOptions
    },
    set (val: keyof typeof themes) {
      name.value = val
    },
  })

  const styles = computed(() => {
    return genCssClasses('root', current.value)
  })

  return {
    current,
    themes,
    styles,
    stylesheetId: pluginOptions.stylesheetId,
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

function genCssClasses (namespace: string, theme: InternalThemeOptions) {
  return `:${namespace} {
    ${genCssVariables(theme)}
  }`
}

function genCssVariable (name: string, value: string, prefix = '--v-theme-') {
  return `${prefix}${name}: ${value};`
}

function genCssVariables (theme: InternalThemeOptions) {
  return Object.entries(theme.colors).map(([key, value]) => {
    return genCssVariable(key, value)
  }).join('\n')
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
