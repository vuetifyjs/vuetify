// Utilities
import * as ThemeUtils from './utils/theme'

// Types
import { VuetifyThemeOptions } from 'vuetify/types/services/theme'
import { VuetifyServiceInstance } from 'vuetify/types/services'

export class Theme implements VuetifyServiceInstance {
  static property = 'theme'

  public style?: HTMLStyleElement
  public options: VuetifyThemeOptions

  constructor (options?: VuetifyThemeOptions) {
    this.options = options || {}

    if (this.options.disable) return

    this.applyTheme()
  }

  set css (val: string) {
    /* istanbul ignore else */
    if (this.style) {
      this.style.innerHTML = val
    }
  }

  public applyTheme (theme = this.options.default) {
    this.genStyleElement()

    if (!this.options.themes) return this.clearCss()
    if (typeof theme !== 'string') return this.clearCss()

    const activeTheme = this.options.themes[theme]

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
