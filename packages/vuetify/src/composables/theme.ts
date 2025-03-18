// Utilities
import {
  computed,
  inject,
  provide,
  ref,
  watch,
  watchEffect,
} from 'vue'
import {
  createRange,
  darken,
  getCurrentInstance,
  getForeground,
  getLuma,
  IN_BROWSER,
  lighten,
  mergeDeep,
  parseColor,
  propsFactory,
  RGBtoHex,
} from '@/util'

// Types
import type { VueHeadClient } from '@unhead/vue'
import type { HeadClient } from '@vueuse/head'
import type { App, DeepReadonly, InjectionKey, Ref } from 'vue'

type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T

export type ThemeOptions = false | {
  cspNonce?: string
  defaultTheme?: string
  variations?: false | VariationsOptions
  themes?: Record<string, ThemeDefinition>
}
export type ThemeDefinition = DeepPartial<InternalThemeDefinition>

interface InternalThemeOptions {
  cspNonce?: string
  isDisabled: boolean
  defaultTheme: string
  variations: false | VariationsOptions
  themes: Record<string, InternalThemeDefinition>
}

interface VariationsOptions {
  colors: string[]
  lighten: number
  darken: number
}

interface InternalThemeDefinition {
  dark: boolean
  colors: Colors
  variables: Record<string, string | number>
}

export interface Colors extends BaseColors, OnColors {
  [key: string]: string
}

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

export interface ThemeInstance {
  readonly isDisabled: boolean
  readonly themes: Ref<Record<string, InternalThemeDefinition>>

  readonly name: Readonly<Ref<string>>
  readonly current: DeepReadonly<Ref<InternalThemeDefinition>>
  readonly computedThemes: DeepReadonly<Ref<Record<string, InternalThemeDefinition>>>

  readonly themeClasses: Readonly<Ref<string | undefined>>
  readonly styles: Readonly<Ref<string>>

  readonly global: {
    readonly name: Ref<string>
    readonly current: DeepReadonly<Ref<InternalThemeDefinition>>
  }
}

export const ThemeSymbol: InjectionKey<ThemeInstance> = Symbol.for('vuetify:theme')

export const makeThemeProps = propsFactory({
  theme: String,
}, 'theme')

function genDefaults () {
  return {
    defaultTheme: 'light',
    variations: { colors: [], lighten: 0, darken: 0 },
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          'surface-bright': '#FFFFFF',
          'surface-light': '#EEEEEE',
          'surface-variant': '#424242',
          'on-surface-variant': '#EEEEEE',
          primary: '#1867C0',
          'primary-darken-1': '#1F5592',
          secondary: '#48A9A6',
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
          'idle-opacity': 0.04,
          'hover-opacity': 0.04,
          'focus-opacity': 0.12,
          'selected-opacity': 0.08,
          'activated-opacity': 0.12,
          'pressed-opacity': 0.12,
          'dragged-opacity': 0.08,
          'theme-kbd': '#212529',
          'theme-on-kbd': '#FFFFFF',
          'theme-code': '#F5F5F5',
          'theme-on-code': '#000000',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#212121',
          'surface-bright': '#ccbfd6',
          'surface-light': '#424242',
          'surface-variant': '#a3a3a3',
          'on-surface-variant': '#424242',
          primary: '#2196F3',
          'primary-darken-1': '#277CC1',
          secondary: '#54B6B2',
          'secondary-darken-1': '#48A9A6',
          error: '#CF6679',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
        variables: {
          'border-color': '#FFFFFF',
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
          'theme-kbd': '#212529',
          'theme-on-kbd': '#FFFFFF',
          'theme-code': '#343434',
          'theme-on-code': '#CCCCCC',
        },
      },
    },
  }
}

function parseThemeOptions (options: ThemeOptions = genDefaults()): InternalThemeOptions {
  const defaults = genDefaults()

  if (!options) return { ...defaults, isDisabled: true } as any

  const themes: Record<string, InternalThemeDefinition> = {}
  for (const [key, theme] of Object.entries(options.themes ?? {})) {
    const defaultTheme = theme.dark || key === 'dark'
      ? defaults.themes?.dark
      : defaults.themes?.light
    themes[key] = mergeDeep(defaultTheme, theme) as InternalThemeDefinition
  }

  return mergeDeep(
    defaults,
    { ...options, themes },
  ) as InternalThemeOptions
}

// Composables
export function createTheme (options?: ThemeOptions): ThemeInstance & { install: (app: App) => void } {
  const parsedOptions = parseThemeOptions(options)
  const name = ref(parsedOptions.defaultTheme)
  const themes = ref(parsedOptions.themes)

  const computedThemes = computed(() => {
    const acc: Record<string, InternalThemeDefinition> = {}
    for (const [name, original] of Object.entries(themes.value)) {
      const theme: InternalThemeDefinition = acc[name] = {
        ...original,
        colors: {
          ...original.colors,
        },
      }

      if (parsedOptions.variations) {
        for (const name of parsedOptions.variations.colors) {
          const color = theme.colors[name]

          if (!color) continue

          for (const variation of (['lighten', 'darken'] as const)) {
            const fn = variation === 'lighten' ? lighten : darken
            for (const amount of createRange(parsedOptions.variations[variation], 1)) {
              theme.colors[`${name}-${variation}-${amount}`] = RGBtoHex(fn(parseColor(color), amount))
            }
          }
        }
      }

      for (const color of Object.keys(theme.colors)) {
        if (/^on-[a-z]/.test(color) || theme.colors[`on-${color}`]) continue

        const onColor = `on-${color}` as keyof OnColors
        const colorVal = parseColor(theme.colors[color]!)

        theme.colors[onColor] = getForeground(colorVal)
      }
    }

    return acc
  })
  const current = computed(() => computedThemes.value[name.value])

  const styles = computed(() => {
    const lines: string[] = []

    if (current.value?.dark) {
      createCssClass(lines, ':root', ['color-scheme: dark'])
    }

    createCssClass(lines, ':root', genCssVariables(current.value))

    for (const [themeName, theme] of Object.entries(computedThemes.value)) {
      createCssClass(lines, `.v-theme--${themeName}`, [
        `color-scheme: ${theme.dark ? 'dark' : 'normal'}`,
        ...genCssVariables(theme),
      ])
    }

    const bgLines: string[] = []
    const fgLines: string[] = []

    const colors = new Set(Object.values(computedThemes.value).flatMap(theme => Object.keys(theme.colors)))
    for (const key of colors) {
      if (/^on-[a-z]/.test(key)) {
        createCssClass(fgLines, `.${key}`, [`color: rgb(var(--v-theme-${key})) !important`])
      } else {
        createCssClass(bgLines, `.bg-${key}`, [
          `--v-theme-overlay-multiplier: var(--v-theme-${key}-overlay-multiplier)`,
          `background-color: rgb(var(--v-theme-${key})) !important`,
          `color: rgb(var(--v-theme-on-${key})) !important`,
        ])
        createCssClass(fgLines, `.text-${key}`, [`color: rgb(var(--v-theme-${key})) !important`])
        createCssClass(fgLines, `.border-${key}`, [`--v-border-color: var(--v-theme-${key})`])
      }
    }

    lines.push(...bgLines, ...fgLines)

    return lines.map((str, i) => i === 0 ? str : `    ${str}`).join('')
  })

  function getHead () {
    return {
      style: [{
        textContent: styles.value,
        id: 'vuetify-theme-stylesheet',
        nonce: parsedOptions.cspNonce || false as never,
      }],
    }
  }

  function install (app: App) {
    if (parsedOptions.isDisabled) return

    const head = app._context.provides.usehead as HeadClient & VueHeadClient<any> | undefined
    if (head) {
      if (head.push) {
        const entry = head.push(getHead)
        if (IN_BROWSER) {
          watch(styles, () => { entry.patch(getHead) })
        }
      } else {
        if (IN_BROWSER) {
          head.addHeadObjs(computed(getHead))
          watchEffect(() => head.updateDOM())
        } else {
          head.addHeadObjs(getHead())
        }
      }
    } else {
      let styleEl = IN_BROWSER
        ? document.getElementById('vuetify-theme-stylesheet')
        : null

      if (IN_BROWSER) {
        watch(styles, updateStyles, { immediate: true })
      } else {
        updateStyles()
      }

      function updateStyles () {
        if (typeof document !== 'undefined' && !styleEl) {
          const el = document.createElement('style')
          el.type = 'text/css'
          el.id = 'vuetify-theme-stylesheet'
          if (parsedOptions.cspNonce) el.setAttribute('nonce', parsedOptions.cspNonce)

          styleEl = el
          document.head.appendChild(styleEl)
        }

        if (styleEl) styleEl.innerHTML = styles.value
      }
    }
  }

  const themeClasses = computed(() => parsedOptions.isDisabled ? undefined : `v-theme--${name.value}`)

  return {
    install,
    isDisabled: parsedOptions.isDisabled,
    name,
    themes,
    current,
    computedThemes,
    themeClasses,
    styles,
    global: {
      name,
      current,
    },
  }
}

export function provideTheme (props: { theme?: string }) {
  getCurrentInstance('provideTheme')

  const theme = inject(ThemeSymbol, null)

  if (!theme) throw new Error('Could not find Vuetify theme injection')

  const name = computed<string>(() => {
    return props.theme ?? theme.name.value
  })
  const current = computed(() => theme.themes.value[name.value])

  const themeClasses = computed(() => theme.isDisabled ? undefined : `v-theme--${name.value}`)

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

function createCssClass (lines: string[], selector: string, content: string[]) {
  lines.push(
    `${selector} {\n`,
    ...content.map(line => `  ${line};\n`),
    '}\n',
  )
}

function genCssVariables (theme: InternalThemeDefinition) {
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

  for (const [key, value] of Object.entries(theme.variables)) {
    const color = typeof value === 'string' && value.startsWith('#') ? parseColor(value) : undefined
    const rgb = color ? `${color.r}, ${color.g}, ${color.b}` : undefined
    variables.push(`--v-${key}: ${rgb ?? value}`)
  }

  return variables
}
