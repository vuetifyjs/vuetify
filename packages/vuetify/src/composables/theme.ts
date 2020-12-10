// Utilities
import { computed, inject, provide, ref, watch } from 'vue'
import { colorToInt, colorToRGB, createRange, intToHex, lighten, darken, getLuma } from '@/util'

// Types
import type { InjectionKey, Ref, SetupContext } from 'vue'

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
}

interface ThemeDefinitionColors extends BaseColors, Partial<OnColors> {
  [key: string]: string | undefined
}

export interface ThemeDefinition {
  dark: boolean
  colors: ThemeDefinitionColors
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
  themeClass: Ref<string>
  setTheme: (key: string, theme: ThemeDefinition) => void
  getTheme: (key: string) => InternalThemeDefinition
  prev: () => void
  next: () => void
}

export const VuetifyThemeSymbol: InjectionKey<ThemeInstance> = Symbol.for('vuetify:theme')

const defaultThemeOptions: InternalThemeOptions = {
  isDisabled: false,
  defaultTheme: 'light',
  variations: {
    colors: ['primary', 'secondary'],
    darken: 1,
    lighten: 2,
  },
  themes: {
    light: {
      dark: false,
      colors: {
        background: '#eeeeee',
        surface: '#aaaaaa',
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
    },
    dark: {
      dark: true,
      colors: {
        background: '#555555',
        surface: '#333333',
        primary: '#2196F3',
        secondary: '#424242',
        accent: '#FF4081',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
    },
  },
}

const step = <T>(arr: T[], current: T, steps: number): T => arr[(arr.indexOf(current) + arr.length + steps) % arr.length]

const next = (
  current: Ref<string>,
  themes: Ref<Record<string, InternalThemeDefinition>>
) => () => current.value = step(Object.keys(themes.value), current.value, 1)

const prev = (
  current: Ref<string>,
  themes: Ref<Record<string, InternalThemeDefinition>>
) => () => current.value = step(Object.keys(themes.value), current.value, -1)

const parseThemeOptions = (options?: ThemeOptions): InternalThemeOptions => {
  if (options == null) return defaultThemeOptions
  if (options === false) return { ...defaultThemeOptions, isDisabled: true } as InternalThemeOptions
  return {
    ...defaultThemeOptions,
    ...options,
    variations: options.variations === false ? { colors: [], lighten: 0, darken: 0 } : options.variations ?? defaultThemeOptions.variations,
  } as InternalThemeOptions
}

export const createTheme = (options?: ThemeOptions): ThemeInstance => {
  const parsedOptions = parseThemeOptions(options)

  const styleEl = ref<HTMLStyleElement | undefined>()
  const current = ref<string>(parsedOptions.defaultTheme)
  const themes = ref<Record<string, ThemeDefinition>>(parsedOptions.themes)
  const variations = ref(parsedOptions.variations)
  const themeClass = computed(() => parsedOptions.isDisabled ? '' : `v-theme--${current.value}`)

  const genOnColor = (color: string) => intToHex(getLuma(color) > 0.18 ? 0x0 : 0xffffff)

  const genColorVariations = (name: string, color: string) => {
    const obj: Record<string, string> = {}
    for (const variation of (['lighten', 'darken'] as const)) {
      const fn = variation === 'lighten' ? lighten : darken
      for (const amount of createRange(variations.value[variation], 1)) {
        obj[`${name}-${variation}-${amount}`] = intToHex(fn(colorToInt(color), amount))
      }
    }
    return obj
  }

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
        theme.colors[onColor] = genOnColor(theme.colors[color]!)
      }

      obj[key] = theme as InternalThemeDefinition

      return obj
    }, {} as Record<string, InternalThemeDefinition>)
  })

  const genCssVariables = (name: string) => {
    const theme = computedThemes.value[name]

    if (!theme) throw new Error(`Could not find theme ${name}`)

    const variables: string[] = []
    for (const [key, value] of Object.entries(theme.colors)) {
      const rgb = colorToRGB(value!)
      variables.push(`--v-theme-${key}: ${rgb.r},${rgb.g},${rgb.b}`)
    }

    return variables
  }

  const genStyleElement = () => {
    if (typeof document === 'undefined' || styleEl.value) return

    const el = document.createElement('style')
    el.type = 'text/css'
    el.id = 'vuetify-theme-stylesheet'

    styleEl.value = el
    document.head.appendChild(styleEl.value)
  }

  const createCssClass = (selector: string, content: string[]) => {
    return [
      `${selector} {\n`,
      ...content.map(line => `  ${line};\n`),
      '}\n',
    ]
  }

  const updateStyles = () => {
    if (parsedOptions.isDisabled) return

    genStyleElement()

    const lines = []
    for (const themeName of Object.keys(computedThemes.value)) {
      lines.push(...createCssClass(`.v-theme--${themeName}`, genCssVariables(themeName)))
      lines.push(...createCssClass(`.v-theme--${themeName}`, [
        `background: rgb(var(--v-theme-background))`,
        `color: rgb(var(--v-theme-on-background))`,
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
          ...createCssClass(`.bg-${key}`, [`background: rgb(var(--v-theme-${key}))`]),
          ...createCssClass(`.text-${key}`, [`color: rgb(var(--v-theme-${key}))`]),
          ...createCssClass(`.border-${key}`, [`border-color: rgb(var(--v-theme-${key}))`]),
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
    themeClass,
    prev: prev(current, computedThemes),
    next: next(current, computedThemes),
  }
}

export const provideTheme = (props: { theme?: string, newContext?: boolean } = {}, context: SetupContext) => {
  const theme = inject(VuetifyThemeSymbol, null)
  if (!theme) throw new Error('Could not find vuetify theme provider')

  const internal = ref<string | null>(null)
  const current = computed<string>({
    get: () => {
      return internal.value ?? props.theme ?? theme?.current.value
    },
    set (value: string) {
      if (theme && !props.theme && !props.newContext) {
        theme.current.value = value
      } else {
        internal.value = value
        context.emit('update:theme', value)
      }
    },
  })

  const themeClass = computed(() => theme.isDisabled ? '' : `v-theme--${current.value}`)

  const newTheme: ThemeInstance = {
    isDisabled: theme.isDisabled,
    themes: theme.themes,
    setTheme: theme.setTheme,
    getTheme: theme.getTheme,
    current,
    themeClass,
    prev: prev(current, theme.themes),
    next: next(current, theme.themes),
  }

  provide(VuetifyThemeSymbol, newTheme)

  return newTheme
}

export const useTheme = () => {
  const theme = inject(VuetifyThemeSymbol)

  if (!theme) throw new Error('Could not find theme')

  return theme
}
