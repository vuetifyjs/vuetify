// Composables
import { genCssVariables } from './colors'

// Utilities
import { ThemeAdapter } from '@vuetify/v0/theme/adapters'
import { watch } from 'vue'
import { IN_BROWSER } from '@/util'

// Types
import type { App, ComputedRef, Ref } from 'vue'
import type { InternalThemeDefinition } from './colors'

interface AdapterSetupContext {
  colors: ComputedRef<Record<string, Record<string, string>>>
  selectedId: Ref<string | null | undefined>
  isDark: Readonly<Ref<boolean>>
}

export interface VuetifyThemeAdapterOptions {
  cspNonce?: string
  scope?: string
  stylesheetId?: string
  prefix?: string
  utilities?: boolean
}

interface HeadEntry {
  patch (input: () => Record<string, unknown>): void
}

interface HeadClient {
  push (input: Record<string, unknown>): HeadEntry
}

/**
 * Theme adapter that generates Vuetify-specific CSS with layered
 * utility classes and RGB-decomposed custom properties.
 *
 * Receives fully-resolved themes (including on-* colors, variations,
 * and variables) from the theme composable and formats them as CSS.
 */
export class VuetifyThemeAdapter extends ThemeAdapter {
  cspNonce?: string
  scope?: string
  utilities: boolean

  private sheet?: CSSStyleSheet
  private themes: Record<string, InternalThemeDefinition> = {}

  constructor (options: VuetifyThemeAdapterOptions = {}) {
    super(options.prefix ?? 'v-')
    this.cspNonce = options.cspNonce
    this.scope = options.scope
    this.utilities = options.utilities ?? true
    this.stylesheetId = options.stylesheetId ?? 'vuetify-theme-stylesheet'

    // Vuetify always outputs RGB-decomposed values
    this.rgb = true
  }

  /**
   * Provide the full theme definitions (with dark, colors, variables)
   * so that generate() can produce complete Vuetify CSS.
   */
  setThemes (themes: Record<string, InternalThemeDefinition>) {
    this.themes = themes
  }

  override generate (
    _colors: Record<string, Record<string, string>>,
    isDark?: boolean,
  ): string {
    const lines: string[] = []

    lines.push('@layer theme-base {\n')

    if (isDark) {
      this.pushCssClass(lines, ':root', ['color-scheme: dark'])
    }

    // Root CSS variables for current theme
    const currentThemeName = isDark ? 'dark' : 'light'
    const currentTheme = this.themes[currentThemeName]
    if (currentTheme) {
      this.pushCssClass(lines, ':root', genCssVariables(currentTheme, this.prefix))
    }

    // Per-theme classes
    for (const [themeName, theme] of Object.entries(this.themes)) {
      this.pushCssClass(lines, `.${this.prefix}theme--${themeName}`, [
        `color-scheme: ${theme.dark ? 'dark' : 'normal'}`,
        ...genCssVariables(theme, this.prefix),
      ])
    }

    lines.push('}\n')

    if (this.utilities) {
      const bgLines: string[] = []
      const fgLines: string[] = []

      const scoped = this.scope ? this.prefix : ''
      const colors = new Set(
        Object.values(this.themes).flatMap(theme => Object.keys(theme.colors))
      )

      for (const key of colors) {
        if (key.startsWith('on-')) {
          this.pushCssClass(fgLines, `.${key}`, [
            `color: rgb(var(--${this.prefix}theme-${key}))`,
          ])
        } else {
          this.pushCssClass(bgLines, `.${scoped}bg-${key}`, [
            `--${this.prefix}theme-overlay-multiplier: var(--${this.prefix}theme-${key}-overlay-multiplier)`,
            `background-color: rgb(var(--${this.prefix}theme-${key}))`,
            `color: rgb(var(--${this.prefix}theme-on-${key}))`,
          ])
          this.pushCssClass(fgLines, `.${scoped}text-${key}`, [
            `color: rgb(var(--${this.prefix}theme-${key}))`,
          ])
          this.pushCssClass(fgLines, `.${scoped}border-${key}`, [
            `--${this.prefix}border-color: var(--${this.prefix}theme-${key})`,
          ])
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
  }

  // @ts-expect-error Vue types mismatch between v0 and vuetify packages
  setup <T extends AdapterSetupContext> (
    app: App,
    context: T,
    _target?: string | HTMLElement | null,
  ): void {
    const head = app._context?.provides?.usehead as HeadClient | undefined

    if (head) {
      function getHead (adapter: VuetifyThemeAdapter) {
        return {
          style: [{
            textContent: adapter.generate(context.colors.value, context.isDark.value),
            id: adapter.stylesheetId,
            nonce: adapter.cspNonce || false as never,
            tagPosition: 'bodyOpen' as const,
          }],
        }
      }

      const entry = head.push(getHead(this))

      if (IN_BROWSER) {
        watch([context.colors, context.isDark], () => {
          entry.patch(() => getHead(this))
        })
      }
    } else if (IN_BROWSER) {
      this.update(context.colors.value, context.isDark.value)

      watch([context.colors, context.isDark], ([colors, isDark]) => {
        this.update(
          colors as Record<string, Record<string, string>>,
          isDark as boolean,
        )
      })
    } else {
      // SSR without head — generate but cannot inject
      this.generate(context.colors.value, context.isDark.value)
    }
  }

  update (
    colors: Record<string, Record<string, string>>,
    isDark?: boolean,
  ): void {
    if (!IN_BROWSER) return

    this.upsert(this.generate(colors, isDark))
  }

  private upsert (styles: string): void {
    if (!IN_BROWSER) return

    if (!this.sheet) {
      this.sheet = new CSSStyleSheet()
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, this.sheet]
    }

    this.sheet.replaceSync(styles)
  }

  private pushCssClass (lines: string[], selector: string, content: string[]): void {
    const scoped = this.getScopedSelector(selector)
    lines.push(
      `${scoped} {\n`,
      ...content.map(line => `  ${line};\n`),
      '}\n',
    )
  }

  private getScopedSelector (selector: string): string {
    if (!this.scope) return selector

    const scopeSelector = `:where(${this.scope})`

    return selector === ':root' ? scopeSelector : `${scopeSelector} ${selector}`
  }
}
