// Extensions
import { Service } from '../service'

// Utilities
import * as ThemeUtils from './utils'

// Types
import { VuetifyParsedTheme, VuetifyThemeOptions } from 'vuetify/types/services/theme'

export class Theme extends Service {
  static property = 'theme'

  public dark = false
  public disabled = false
  public options: VuetifyThemeOptions['options']
  public styleEl?: HTMLStyleElement
  public themes: VuetifyThemeOptions['themes'] = {
    dark: { // Maybe use variables here?
      primary: '#1976D2', // blue.darken2
      secondary: '#424242', // grey.darken3
      accent: '#82B1FF', // blue.accent1
      error: '#FF5252', // red.accent2
      info: '#2196F3', // blue.base
      success: '#4CAF50', // green.base
      warning: '#FFC107' // amber.base
    },
    light: {
      primary: '#FF5252', // blue.darken2
      secondary: '#424242', // grey.darken3
      accent: '#82B1FF', // blue.accent1
      error: '#FF5252', // red.accent2
      info: '#2196F3', // blue.base
      success: '#4CAF50', // green.base
      warning: '#FFC107' // amber.base
    }
  }

  private ssr = false
  private default = 'light'

  constructor (options: Partial<VuetifyThemeOptions> = {}) {
    super()
    if (options.disable) {
      this.disabled = true

      return
    }

    this.options = {
      ...this.options,
      ...options.options
    }

    this.default = options.default || 'light'
    this.dark = Boolean(options.dark)

    // Grab light and dark defaults then
    // move remaining into own object
    const {
      light = {},
      dark = {},
      ...themes
    } = {
      light: {},
      dark: {},
      ...options.themes
    }

    // Light and dark should always be defined
    this.themes = {
      light: {
        ...this.themes!.light,
        ...light
      },
      dark: {
        ...this.themes!.dark,
        ...dark
      },
      ...themes
    }
  }

  // When setting css, check for element
  // and apply new values
  set css (val: string) {
    this.checkStyleElement() && (this.styleEl!.innerHTML = val)
  }

  // Getter for current default
  get current (): string {
    return this.default
    // this isn't a Vue instance so we can't watch the value
    // we need getters/setters so we can interact with it
  }

  // When the current theme
  // changes, re-init
  set current (val: string) {
    this.default = val
    this.init()
  }

  // Apply current theme default
  // only called on client side
  public applyTheme (theme = this.default): void {
    const activeTheme = this.themes![theme]

    if (this.disabled || !activeTheme) return this.clearCss()

    const options = this.options || {}
    const parsedTheme = ThemeUtils.parse(activeTheme)

    let css: string | null = ''

    // Theme cache get
    if (options.themeCache != null) {
      this.css = options.themeCache.get(parsedTheme) || this.css
    }

    // Generate styles
    css = ThemeUtils.genStyles(
      parsedTheme,
      options.customProperties
    )

    // Minify theme
    if (options.minifyTheme != null) {
      css = options.minifyTheme(css)
    }

    // Theme cache set
    if (options.themeCache != null) {
      options.themeCache.set(parsedTheme, css)
    }

    this.css = css
  }

  public clearCss (): void {
    this.css = ''
  }

  // Initialize theme for SSR and SPA
  // Attach to ssrContext head or
  // apply new theme to document
  public init (ssrContext?: any): void {
    if (this.disabled) return

    this.ssr = Boolean(ssrContext)

    if (this.ssr) {
      const options = this.options || {}
      // SSR
      const nonce = options.cspNonce ? ` nonce="${options.cspNonce}"` : ''
      ssrContext.head = ssrContext.head || ''
      ssrContext.head += `<style type="text/css" id="vuetify-theme-stylesheet"${nonce}>${this.generatedStyles}</style>`
    } else if (typeof document !== 'undefined') {
      // Client-side
      this.applyTheme()
    }
  }

  // Check for existence of style element
  private checkStyleElement (): boolean {
    if (this.ssr) return false // SSR
    if (this.styleEl) return true

    this.genStyleElement() // If doesn't have it, create it

    this.styleEl = document.getElementById('vuetify-theme-stylesheet') as HTMLStyleElement
    return Boolean(this.styleEl)
  }

  // Generate the style element
  // if applicable
  private genStyleElement (): void {
    const options = this.options || {}

    this.styleEl = document.createElement('style')
    this.styleEl.type = 'text/css'
    this.styleEl.id = 'vuetify-theme-stylesheet'

    if (options.cspNonce) {
      this.styleEl.setAttribute('nonce', options.cspNonce)
    }

    // Asserts that document could
    // be null typescript is hard
    document!.head!.appendChild(this.styleEl)
  }

  get currentTheme () {
    return this.themes ? this.themes[this.default] : {}
  }

  get generatedStyles (): string {
    const theme = this.parsedTheme
    const options = this.options || {}
    let css

    if (options.themeCache != null) {
      css = options.themeCache.get(theme)
      /* istanbul ignore if */
      if (css != null) return css
    }

    css = ThemeUtils.genStyles(theme, options.customProperties)

    if (options.minifyTheme != null) {
      css = options.minifyTheme(css)
    }

    if (options.themeCache != null) {
      options.themeCache.set(theme, css)
    }

    return css
  }

  get parsedTheme (): VuetifyParsedTheme {
    return ThemeUtils.parse(this.currentTheme)
  }
}
