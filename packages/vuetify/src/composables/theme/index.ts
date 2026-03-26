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
  watchEffect,
} from 'vue'
import {
  genCssVariables,
  genOnColors,
  genVariations,
  parseThemeOptions,
} from './colors'
import {
  consoleWarn,
  deprecate,
  getCurrentInstance,
  IN_BROWSER,
  mergeDeep,
  propsFactory,
} from '@/util'

// Types
import type { VueHeadClient } from '@unhead/vue/client'
import type { HeadClient } from '@vueuse/head'
import type { App, DeepReadonly, InjectionKey, Ref } from 'vue'
import type { InternalThemeDefinition, ThemeOptions } from './colors'

export type { Colors, ThemeDefinition, ThemeOptions } from './colors'

export interface ThemeInstance {
  change: (themeName: string) => void
  cycle: (themeArray?: string[]) => void
  toggle: (themeArray?: [string, string]) => void

  readonly isDisabled: boolean
  readonly isSystem: Readonly<Ref<boolean>>
  readonly themes: Ref<Record<string, InternalThemeDefinition>>

  readonly name: Readonly<Ref<string>>
  readonly current: DeepReadonly<Ref<InternalThemeDefinition>>
  readonly computedThemes: DeepReadonly<Ref<Record<string, InternalThemeDefinition>>>
  readonly prefix: string

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

function createCssClass (lines: string[], selector: string, content: string[], scope?: string) {
  lines.push(
    `${getScopedSelector(selector, scope)} {\n`,
    ...content.map(line => `  ${line};\n`),
    '}\n',
  )
}

function getScopedSelector (selector: string, scope?: string) {
  if (!scope) return selector

  const scopeSelector = `:where(${scope})`

  return selector === ':root' ? scopeSelector : `${scopeSelector} ${selector}`
}

function upsertStyles (id: string, cspNonce: string | undefined, styles: string) {
  const styleEl = getOrCreateStyleElement(id, cspNonce)

  if (!styleEl) return

  styleEl.textContent = styles
}

function getOrCreateStyleElement (id: string, cspNonce?: string) {
  if (!IN_BROWSER) return null

  let style = document.getElementById(id) as HTMLStyleElement | null

  if (!style) {
    style = document.createElement('style')
    style.id = id
    style.type = 'text/css'

    if (cspNonce) style.setAttribute('nonce', cspNonce)

    document.head.appendChild(style)
  }

  return style
}

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
      const fullColors = {
        ...colors,
        ...genOnColors(colors, merged.variables),
      }

      processed[themeName] = {
        dark: merged.dark,
        colors: fullColors as Record<string, string>,
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
    foreground: false, // We handle on-colors ourselves via genOnColors
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
    for (const [themeName, original] of Object.entries(themes.value)) {
      const defaultTheme = original.dark || themeName === 'dark'
        ? themes.value.dark
        : themes.value.light

      const merged = mergeDeep(defaultTheme, original) as InternalThemeDefinition

      const colors = {
        ...merged.colors,
        ...genVariations(merged.colors, parsedOptions.variations),
      }

      acc[themeName] = {
        ...merged,
        colors: {
          ...colors,
          ...genOnColors(colors, merged.variables),
        },
      }
    }
    return acc
  })

  const current = toRef(() => computedThemes.value[name.value])

  const isSystem = toRef(() => _name.value === 'system')

  const styles = computed(() => {
    const lines: string[] = []
    const scoped = parsedOptions.scoped ? parsedOptions.prefix : ''

    lines.push('@layer theme-base {\n')

    if (current.value?.dark) {
      createCssClass(lines, ':root', ['color-scheme: dark'], parsedOptions.scope)
    }

    createCssClass(lines, ':root', genCssVariables(current.value, parsedOptions.prefix), parsedOptions.scope)

    for (const [themeName, theme] of Object.entries(computedThemes.value)) {
      createCssClass(lines, `.${parsedOptions.prefix}theme--${themeName}`, [
        `color-scheme: ${theme.dark ? 'dark' : 'normal'}`,
        ...genCssVariables(theme, parsedOptions.prefix),
      ], parsedOptions.scope)
    }

    lines.push('}\n')

    if (parsedOptions.utilities) {
      const bgLines: string[] = []
      const fgLines: string[] = []

      const colors = new Set(Object.values(computedThemes.value).flatMap(theme => Object.keys(theme.colors)))
      for (const key of colors) {
        if (key.startsWith('on-')) {
          createCssClass(fgLines, `.${key}`, [`color: rgb(var(--${parsedOptions.prefix}theme-${key}))`], parsedOptions.scope)
        } else {
          createCssClass(bgLines, `.${scoped}bg-${key}`, [
            `--${parsedOptions.prefix}theme-overlay-multiplier: var(--${parsedOptions.prefix}theme-${key}-overlay-multiplier)`,
            `background-color: rgb(var(--${parsedOptions.prefix}theme-${key}))`,
            `color: rgb(var(--${parsedOptions.prefix}theme-on-${key}))`,
          ], parsedOptions.scope)
          createCssClass(fgLines, `.${scoped}text-${key}`, [`color: rgb(var(--${parsedOptions.prefix}theme-${key}))`], parsedOptions.scope)
          createCssClass(fgLines, `.${scoped}border-${key}`, [`--${parsedOptions.prefix}border-color: var(--${parsedOptions.prefix}theme-${key})`], parsedOptions.scope)
        }
      }

      lines.push(
        '@layer theme-background {\n',
        ...bgLines.map(v => `  ${v}`),
        '}\n',
        '@layer theme-foreground {\n',
        ...fgLines.map(v => `  ${v}`),
        '}\n',
      )
    }

    return '@layer vuetify-utilities {\n' + lines.map(v => `  ${v}`).join('') + '\n}'
  })

  const themeClasses = toRef(() => parsedOptions.isDisabled ? undefined : `${parsedOptions.prefix}theme--${name.value}`)
  const themeNames = toRef(() => Object.keys(computedThemes.value))

  function install (app: App) {
    if (parsedOptions.isDisabled) return

    const head = app._context.provides.usehead as HeadClient & VueHeadClient<any> | undefined
    if (head) {
      function getHead () {
        return {
          style: [{
            textContent: styles.value,
            id: parsedOptions.stylesheetId,
            nonce: parsedOptions.cspNonce || false as never,
            tagPosition: 'bodyOpen' as const,
          }],
        }
      }

      if (head.push) {
        const entry = head.push(getHead)
        if (IN_BROWSER) {
          watch(styles, () => { entry.patch(getHead) })
        }
      } else {
        if (IN_BROWSER) {
          head.addHeadObjs(toRef(getHead))
          watchEffect(() => head.updateDOM())
        } else {
          head.addHeadObjs(getHead())
        }
      }
    } else {
      if (IN_BROWSER) {
        watch(styles, updateStyles, { immediate: true })
      } else {
        updateStyles()
      }

      function updateStyles () {
        upsertStyles(parsedOptions.stylesheetId, parsedOptions.cspNonce, styles.value)
      }
    }
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

  const globalName = new Proxy(name, {
    get (target, prop) {
      return Reflect.get(target, prop)
    },
    set (target, prop, val) {
      if (prop === 'value') {
        deprecate(`theme.global.name.value = ${val}`, `theme.change('${val}')`)
      }
      return Reflect.set(target, prop, val)
    },
  })

  return {
    install,
    change,
    cycle,
    toggle,
    isDisabled: parsedOptions.isDisabled,
    isSystem,
    name,
    themes,
    current,
    computedThemes,
    prefix: parsedOptions.prefix,
    themeClasses,
    styles,
    global: {
      name: globalName,
      current,
    },
  }
}

export function provideTheme (props: { theme?: string }) {
  getCurrentInstance('provideTheme')

  const theme = inject(ThemeSymbol, null)

  if (!theme) throw new Error('Could not find Vuetify theme injection')

  const name = toRef(() => props.theme ?? theme.name.value)
  const current = toRef(() => theme.themes.value[name.value])

  const themeClasses = toRef(() => theme.isDisabled ? undefined : `${theme.prefix}theme--${name.value}`)

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
