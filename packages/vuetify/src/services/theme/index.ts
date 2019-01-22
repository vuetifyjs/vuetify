// Utilities
import * as ThemeUtils from './utils/theme'

// Types
import { VuetifyThemeOptions } from 'vuetify/types/services/theme'
import { VuetifyServiceInstance } from 'vuetify/types/services'

export class Theme implements VuetifyServiceInstance {
  static property = 'theme'

  public default = 'light'
  public options: VuetifyThemeOptions['options'] = {
    cspNonce: null,
    customProperties: false,
    minifyTheme: null,
    themeCache: undefined
  }
  public style?: HTMLStyleElement
  public themes: VuetifyThemeOptions['themes'] = {
    dark: {
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

  constructor (options: Partial<VuetifyThemeOptions> = {}) {
    if (options.disable) return

    this.options = {
      ...this.options,
      ...options.options
    }

    // Grab light and dark variants then
    // move remaining into own object
    const { light = {}, dark = {}, ...themes } = {
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

    this.applyTheme()
  }

  set css (val: string) {
    /* istanbul ignore else */
    if (this.style) {
      this.style.innerHTML = val
    }
  }

  public applyTheme (theme = this.default) {
    this.genStyleElement()

    if (!this.themes) return this.clearCss()
    if (typeof theme !== 'string') return this.clearCss()

    const activeTheme = this.themes[theme]

    if (!activeTheme) return this.clearCss()

    const parsedTheme = ThemeUtils.parse(activeTheme)

    let css: string | null = ''

    // Theme cache get
    if (this.options.themeCache != null) {
      css = this.options.themeCache.get(parsedTheme)
      if (css != null) return (this.css = css)
    }

    // Generate styles
    css = ThemeUtils.genStyles(
      parsedTheme,
      this.options.customProperties
    )

    // Minify theme
    if (this.options.minifyTheme != null) {
      css = this.options.minifyTheme(css)
    }

    // Theme cache set
    if (this.options.themeCache != null) {
      this.options.themeCache.set(parsedTheme, css)
    }

    this.css = css
  }

  public clearCss () {
    this.css = ''
  }

  private genStyleElement () {
    if (this.style) return

    let style = document.getElementById('vuetify-theme-stylesheet') as HTMLStyleElement

    /* istanbul ignore else */
    if (!style) {
      style = document.createElement('style')
      style.type = 'text/css'
      style.id = 'vuetify-theme-stylesheet'
      if (this.options.cspNonce) {
        style.setAttribute('nonce', this.options.cspNonce)
      }
      document.head!.appendChild(style)
    }

    this.style = style
  }
}
