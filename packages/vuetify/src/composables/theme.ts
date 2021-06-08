// Utilities
import { computed, getCurrentInstance, inject, provide, ref, watch } from 'vue'
import { colorToInt, colorToRGB, createRange, darken, getLuma, intToHex, lighten, propsFactory } from '@/util'

// Types
import type { InjectionKey, Ref } from 'vue'
import { consoleError } from '@/util/console'

interface BaseColors {
  background: string
  surface: string
  primary: string
  secondary: string
  success: string
  warning: string
  error: string
  info: string
}

interface OnColors {
  'on-background': string
  'on-surface': string
  'on-primary': string
  'on-secondary': string
  'on-success': string
  'on-warning': string
  'on-error': string
  'on-info': string
}

interface Colors extends BaseColors, OnColors {
  [key: string]: string
}

interface InternalThemeDefinition {
  dark: boolean
  colors: Colors
  variables: Record<string, string | number>
}

interface ThemeDefinitionColors extends BaseColors, Partial<OnColors> {
  [key: string]: string | undefined
}

export interface ThemeDefinition {
  dark: boolean
  colors: ThemeDefinitionColors
  variables: Record<string, string | number>
}

interface VariationsOptions {
  colors: string[]
  lighten: number
  darken: number
}

interface InternalThemeOptions {
  isDisabled: boolean
  defaultTheme: string
  variations: VariationsOptions
  themes: Record<string, ThemeDefinition>
}

export type ThemeOptions = false | {
  defaultTheme?: string
  variations?: false | VariationsOptions
  themes?: Record<string, ThemeDefinition>
}

export interface ThemeInstance {
  isDisabled: boolean
  themes: Ref<Record<string, InternalThemeDefinition>>
  current: Ref<string>
  themeClasses: Ref<string | undefined>
  setTheme: (key: string, theme: ThemeDefinition) => void
  getTheme: (key: string) => InternalThemeDefinition
}

export const VuetifyThemeSymbol: InjectionKey<ThemeInstance> = Symbol.for('vuetify:theme')

export const makeThemeProps = propsFactory({
  theme: String,
}, 'theme')

const defaultThemeOptions: ThemeOptions = {
  defaultTheme: 'light',
  variations: { colors: [], lighten: 0, darken: 0 },
  themes: {
    light: {
      dark: false,
      colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
      variables: {
        'border-color': '#000000',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
        'kbd-background-color': '#212529',
        'kbd-color': '#FFFFFF',
        'code-background-color': '#C2C2C2',
      },
    },
    dark: {
      dark: true,
      colors: {
        background: '#121212',
        surface: '#212121',
        primary: '#BB86FC',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC5',
        'secondary-darken-1': '#03DAC5',
        error: '#CF6679',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
      variables: {
        'border-color': '#FFFFFF',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
        'kbd-background-color': '#212529',
        'kbd-color': '#FFFFFF',
        'code-background-color': '#B7B7B7',
      },
    },
  },
}

const parseThemeOptions = (options: ThemeOptions = defaultThemeOptions): InternalThemeOptions => {
  if (!options) return { ...defaultThemeOptions, isDisabled: true } as InternalThemeOptions

  return {
    ...defaultThemeOptions,
    ...options,
    variations: options?.variations == null || options?.variations === false ? defaultThemeOptions.variations : options.variations,
  } as InternalThemeOptions
}

// Composables
export function createTheme (options?: ThemeOptions): ThemeInstance {
  const parsedOptions = parseThemeOptions(options)
  const styleEl = ref<HTMLStyleElement>()
  const current = ref(parsedOptions.defaultTheme)
  const themes = ref(parsedOptions.themes)
  const variations = ref(parsedOptions.variations)

  const computedThemes = computed(() => {
    return Object.keys(themes.value).reduce((obj, key) => {
      const theme: ThemeDefinition = {
        ...themes.value[key],
        colors: {
          ...themes.value[key].colors,
          ...(parsedOptions.variations.colors ?? []).reduce((obj, color) => {
            return { ...obj, ...genColorVariations(color, themes.value[key].colors[color]!) }
          }, {}),
        },
      }

      for (const color of Object.keys(theme.colors)) {
        if (/on-[a-z]/.test(color) || theme.colors[`on-${color}`]) continue

        const onColor = `on-${color}` as keyof OnColors
        theme.colors[onColor] = intToHex(getLuma(theme.colors[color]!) > 0.18 ? 0x0 : 0xffffff)
      }

      obj[key] = theme as InternalThemeDefinition

      return obj
    }, {} as Record<string, InternalThemeDefinition>)
  })

  function genColorVariations (name: string, color: string) {
    const obj: Record<string, string> = {}
    for (const variation of (['lighten', 'darken'] as const)) {
      const fn = variation === 'lighten' ? lighten : darken
      for (const amount of createRange(variations.value[variation], 1)) {
        obj[`${name}-${variation}-${amount}`] = intToHex(fn(colorToInt(color), amount))
      }
    }

    return obj
  }

  function genCssVariables (name: string) {
    const theme = computedThemes.value[name]

    if (!theme) throw new Error(`Could not find theme ${name}`)

    const lightOverlay = theme.dark ? 2 : 1
    const darkOverlay = theme.dark ? 1 : 2

    const variables: string[] = []
    for (const [key, value] of Object.entries(theme.colors)) {
      const rgb = colorToRGB(value!)
      variables.push(`--v-theme-${key}: ${rgb.r},${rgb.g},${rgb.b}`)
      if (!key.startsWith('on-')) {
        variables.push(`--v-theme-${key}-overlay-multiplier: ${getLuma(value) > 0.18 ? lightOverlay : darkOverlay}`)
      }
    }

    return variables
  }

  function genStyleElement () {
    if (typeof document === 'undefined' || styleEl.value) return

    const el = document.createElement('style')
    el.type = 'text/css'
    el.id = 'vuetify-theme-stylesheet'

    styleEl.value = el
    document.head.appendChild(styleEl.value)
  }

  function createCssClass (selector: string, content: string[]) {
    return [
      `${selector} {\n`,
      ...content.map(line => `  ${line};\n`),
      '}\n',
    ]
  }

  function updateStyles () {
    if (parsedOptions.isDisabled) return

    genStyleElement()

    const lines = []

    for (const themeName of Object.keys(computedThemes.value)) {
      const variables = computedThemes.value[themeName].variables

      lines.push(...createCssClass(`.v-theme--${themeName}`, [
        ...genCssVariables(themeName),
        ...Object.keys(variables).map(key => {
          const value = variables[key]
          const color = typeof value === 'string' && value.startsWith('#') ? colorToRGB(value) : undefined
          const rgb = color ? `${color.r}, ${color.g}, ${color.b}` : undefined

          return `--v-${key}: ${rgb ?? value}`
        }),
      ]))
    }

    // Assumption is that all theme objects have the same keys, so it doesn't matter which one
    // we use since the values are all css variables.
    const firstTheme = Object.keys(computedThemes.value)[0]
    for (const key of Object.keys(computedThemes.value[firstTheme].colors)) {
      if (/on-[a-z]/.test(key)) {
        lines.push(...createCssClass(`.${key}`, [`color: rgb(var(--v-theme-${key}))`]))
      } else {
        lines.push(
          ...createCssClass(`.bg-${key}`, [
            `--v-theme-overlay-multiplier: var(--v-theme-${key}-overlay-multiplier)`,
            `background: rgb(var(--v-theme-${key}))`,
            `color: rgb(var(--v-theme-on-${key}))`,
          ]),
          ...createCssClass(`.text-${key}`, [`color: rgb(var(--v-theme-${key}))`]),
          ...createCssClass(`.border-${key}`, [`--v-border-color: var(--v-theme-${key})`]),
        )
      }
    }

    if (styleEl.value) styleEl.value.innerHTML = lines.map((str, i) => i === 0 ? str : `    ${str}`).join('')
  }

  watch(themes, updateStyles, { deep: true, immediate: true })

  return {
    isDisabled: parsedOptions.isDisabled,
    themes: computedThemes,
    setTheme: (key: string, theme: ThemeDefinition) => themes.value[key] = theme,
    getTheme: (key: string) => computedThemes.value[key],
    current,
    themeClasses: computed(() => parsedOptions.isDisabled ? undefined : `v-theme--${current.value}`),
  }
}

/**
 * Used to either set up and provide a new theme instance, or to pass
 * along the closest available already provided instance.
 */
export function useTheme (props: { theme?: string }) {
  const vm = getCurrentInstance()
  const theme = inject(VuetifyThemeSymbol, null)

  if (!vm) consoleError('provideTheme must be called from inside a setup function')
  if (!theme) throw new Error('Could not find Vuetify theme injection')

  const current = computed<string>(() => {
    return props.theme ?? theme?.current.value
  })

  const themeClasses = computed(() => theme.isDisabled ? undefined : `v-theme--${current.value}`)

  const newTheme: ThemeInstance = {
    ...theme,
    current,
    themeClasses,
  }

  provide(VuetifyThemeSymbol, newTheme)

  return newTheme
}
