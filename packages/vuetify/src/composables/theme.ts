// Utilities
import { computed, inject, provide, ref, watch } from 'vue'
import { useVuetify } from '@/framework'
import { colorToInt, colorToRGB, createRange, intToHex, lighten, darken, getLuma } from '@/util'

// Types
import type { InjectionKey, Ref } from 'vue'

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

interface InternalTheme extends BaseColors, OnColors {
  [key: string]: string
}

export interface ThemeOption extends BaseColors, Partial<OnColors> {
  [key: string]: string | undefined
}

interface InternalThemeOptions {
  defaultTheme: string
  variations: {
    lighten: number
    darken: number
  }
  themes: Record<string, ThemeOption>
}

export type ThemeOptions = Partial<InternalThemeOptions>

export interface ThemeInstance {
  themes: Ref<Record<string, InternalTheme>>
  defaultTheme: Ref<string>
  setTheme: (key: string, theme: ThemeOption) => void
}

interface ThemeProvide {
  themeClass: Ref<string>
  current: Ref<string>
  next: () => void
  prev: () => void
  setTheme: (key: string, theme: ThemeOption) => void
}

const VuetifyThemeSymbol: InjectionKey<ThemeProvide> = Symbol.for('vuetify:theme')

const step = <T>(arr: T[], current: T, steps: number): T => arr[(arr.indexOf(current) + arr.length + steps) % arr.length]

export const provideTheme = (props: { theme?: string } = {}): ThemeProvide => {
  const vuetify = useVuetify()
  const themeProvide = inject(VuetifyThemeSymbol, null)

  const internal = ref<string | null>(null)
  const current = computed<string>({
    get: () => {
      return props.theme ?? internal.value ?? themeProvide?.current.value ?? vuetify.theme.defaultTheme.value
    },
    set (theme: string) {
      internal.value = theme
    },
  })

  const themeClass = computed(() => `theme--${current.value}`)

  const next = () => current.value = step(Object.keys(vuetify.theme.themes.value), current.value, 1)
  const prev = () => current.value = step(Object.keys(vuetify.theme.themes.value), current.value, -1)

  const newThemeProvide: ThemeProvide = {
    themeClass,
    current,
    next,
    prev,
    setTheme: vuetify.theme.setTheme,
  }

  provide(VuetifyThemeSymbol, newThemeProvide)

  return newThemeProvide
}

export const useTheme = () => {
  const theme = inject(VuetifyThemeSymbol)

  if (!theme) throw new Error('Could not find vuetify theme provider')

  return theme
}

const defaultThemeOptions: ThemeOptions = {
  defaultTheme: 'light',
  variations: {
    darken: 1,
    lighten: 2,
  },
  themes: {
    light: {
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
    dark: {
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
}

export const createTheme = (options?: ThemeOptions): ThemeInstance => {
  const combinedOptions = {
    ...defaultThemeOptions,
    ...(options as InternalThemeOptions),
  }
  const styleEl = ref<HTMLStyleElement | undefined>()
  const defaultTheme = ref<string>(combinedOptions.defaultTheme)
  const themes = ref<Record<string, ThemeOption>>(combinedOptions.themes)
  const variations = ref(combinedOptions.variations)

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
      const theme = {
        ...genColorVariations('primary', themes.value[key].primary),
        ...genColorVariations('secondary', themes.value[key].secondary),
        ...themes.value[key],
      }

      for (const color of Object.keys(theme)) {
        if (/on-[a-z]/.test(color) || theme[`on-${color}`]) continue

        const onColor = `on-${color}` as keyof OnColors
        theme[onColor] = genOnColor(theme[color]!)
      }

      obj[key] = theme as InternalTheme

      return obj
    }, {} as Record<string, InternalTheme>)
  })

  const genCssVariables = (name: string) => {
    const theme = computedThemes.value[name]

    if (!theme) throw new Error(`Could not find theme ${name}`)

    const variables: string[] = []
    for (const [key, value] of Object.entries(theme)) {
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
    genStyleElement()

    const lines = []
    for (const themeName of Object.keys(computedThemes.value)) {
      lines.push(...createCssClass(`.theme--${themeName}`, genCssVariables(themeName)))
    }

    // Assumption is that all theme objects have the same keys, so it doesn't matter which one
    // we use since the values are all css variables.
    const firstTheme = Object.keys(computedThemes.value)[0]
    for (const key of Object.keys(computedThemes.value[firstTheme])) {
      if (/on-[a-z]/.test(key)) {
        lines.push(...createCssClass(`.v-theme-provider .${key}`, [`color: rgb(var(--v-theme-${key}))`]))
      } else {
        lines.push(
          ...createCssClass(`.v-theme-provider .bg-${key}`, [`background: rgb(var(--v-theme-${key}))`]),
          ...createCssClass(`.v-theme-provider .text-${key}`, [`color: rgb(var(--v-theme-${key}))`]),
          ...createCssClass(`.v-theme-provider .border-${key}`, [`border-color: rgb(var(--v-theme-${key}))`]),
        )
      }
    }

    if (styleEl.value) styleEl.value.innerHTML = lines.map((str, i) => i === 0 ? str : `    ${str}`).join('')
  }

  watch(themes, updateStyles, { deep: true, immediate: true })

  return {
    themes: computedThemes,
    defaultTheme,
    setTheme: (key: string, theme: ThemeOption) => themes.value[key] = theme,
  }
}
