/* eslint-disable no-multi-spaces */
// Extensions
import { Service } from '../service'

// Utilities
import * as ThemeUtils from './utils'
import { getNestedValue } from '../../util/helpers'

// Types
import Vue from 'vue'
import { VuetifyPreset } from 'vuetify/types/services/presets'
import {
  VuetifyParsedTheme,
  VuetifyThemes,
  VuetifyThemeVariant,
  Theme as ITheme,
} from 'vuetify/types/services/theme'

export class Theme extends Service {
  static property: 'theme' = 'theme'

  public disabled = false

  public options: ITheme['options']

  public styleEl?: HTMLStyleElement

  public themes: VuetifyThemes

  public defaults: VuetifyThemes

  private isDark = null as boolean | null

  private unwatch = null as (() => void) | null

  private vueMeta = null as any | null

  constructor (preset: VuetifyPreset) {
    super()

    const {
      dark,
      disable,
      options,
      themes,
    } = preset[Theme.property]

    this.dark = Boolean(dark)
    this.defaults = this.themes = themes
    this.options = options

    if (disable) {
      this.disabled = true

      return
    }

    this.themes = {
      dark: this.fillVariant(themes.dark, true),
      light: this.fillVariant(themes.light, false),
    }
  }

  // When setting css, check for element and apply new values
  /* eslint-disable-next-line accessor-pairs */
  set css (val: string) {
    if (this.vueMeta) {
      if (this.isVueMeta23) {
        this.applyVueMeta23()
      }
      return
    }
    this.checkOrCreateStyleElement() && (this.styleEl!.innerHTML = val)
  }

  set dark (val: boolean) {
    const oldDark = this.isDark

    this.isDark = val
    // Only apply theme after dark
    // has already been set before
    oldDark != null && this.applyTheme()
  }

  get dark () {
    return Boolean(this.isDark)
  }

  // Apply current theme default
  // only called on client side
  public applyTheme (): void {
    if (this.disabled) return this.clearCss()

    this.css = this.generatedStyles
  }

  public clearCss (): void {
    this.css = ''
  }

  // Initialize theme for SSR and SPA
  // Attach to ssrContext head or
  // apply new theme to document
  public init (root: Vue, ssrContext?: any): void {
    if (this.disabled) return

    /* istanbul ignore else */
    if ((root as any).$meta) {
      this.initVueMeta(root)
    } else if (ssrContext) {
      this.initSSR(ssrContext)
    }

    this.initTheme(root)
  }

  // Allows for you to set target theme
  public setTheme (theme: 'light' | 'dark', value: object) {
    this.themes[theme] = Object.assign(this.themes[theme], value)
    this.applyTheme()
  }

  // Reset theme defaults
  public resetThemes () {
    this.themes.light = Object.assign({}, this.defaults.light)
    this.themes.dark = Object.assign({}, this.defaults.dark)
    this.applyTheme()
  }

  // Check for existence of style element
  private checkOrCreateStyleElement (): boolean {
    this.styleEl = document.getElementById('vuetify-theme-stylesheet') as HTMLStyleElement

    /* istanbul ignore next */
    if (this.styleEl) return true

    this.genStyleElement() // If doesn't have it, create it

    return Boolean(this.styleEl)
  }

  private fillVariant (
    theme: Partial<VuetifyThemeVariant> = {},
    dark: boolean
  ): VuetifyThemeVariant {
    const defaultTheme = this.themes[dark ? 'dark' : 'light']

    return Object.assign({},
      defaultTheme,
      theme
    )
  }

  // Generate the style element
  // if applicable
  private genStyleElement (): void {
    /* istanbul ignore if */
    if (typeof document === 'undefined') return

    /* istanbul ignore next */
    this.styleEl = document.createElement('style')
    this.styleEl.type = 'text/css'
    this.styleEl.id = 'vuetify-theme-stylesheet'

    if (this.options.cspNonce) {
      this.styleEl.setAttribute('nonce', this.options.cspNonce)
    }

    document.head.appendChild(this.styleEl)
  }

  private initVueMeta (root: any) {
    this.vueMeta = root.$meta()
    if (this.isVueMeta23) {
      // vue-meta needs to apply after mounted()
      root.$nextTick(() => {
        this.applyVueMeta23()
      })
      return
    }

    const metaKeyName = typeof this.vueMeta.getOptions === 'function' ? this.vueMeta.getOptions().keyName : 'metaInfo'
    const metaInfo = root.$options[metaKeyName] || {}

    root.$options[metaKeyName] = () => {
      metaInfo.style = metaInfo.style || []

      const vuetifyStylesheet = metaInfo.style.find((s: any) => s.id === 'vuetify-theme-stylesheet')

      if (!vuetifyStylesheet) {
        metaInfo.style.push({
          cssText: this.generatedStyles,
          type: 'text/css',
          id: 'vuetify-theme-stylesheet',
          nonce: (this.options || {}).cspNonce,
        })
      } else {
        vuetifyStylesheet.cssText = this.generatedStyles
      }

      return metaInfo
    }
  }

  private applyVueMeta23 () {
    const { set } = this.vueMeta.addApp('vuetify')

    set({
      style: [{
        cssText: this.generatedStyles,
        type: 'text/css',
        id: 'vuetify-theme-stylesheet',
        nonce: this.options.cspNonce,
      }],
    })
  }

  private initSSR (ssrContext?: any) {
    // SSR
    const nonce = this.options.cspNonce ? ` nonce="${this.options.cspNonce}"` : ''
    ssrContext.head = ssrContext.head || ''
    ssrContext.head += `<style type="text/css" id="vuetify-theme-stylesheet"${nonce}>${this.generatedStyles}</style>`
  }

  private initTheme (root: Vue) {
    // Only watch for reactivity on client side
    if (typeof document === 'undefined') return

    // If we get here somehow, ensure
    // existing instance is removed
    if (this.unwatch) {
      this.unwatch()
      this.unwatch = null
    }

    // TODO: Update to use RFC if merged
    // https://github.com/vuejs/rfcs/blob/advanced-reactivity-api/active-rfcs/0000-advanced-reactivity-api.md
    root.$once('hook:created', () => {
      const obs = Vue.observable({ themes: this.themes })
      this.unwatch = root.$watch(() => obs.themes, () => this.applyTheme(), { deep: true })
    })
    this.applyTheme()
  }

  get currentTheme () {
    const target = this.dark ? 'dark' : 'light'

    return this.themes[target]
  }

  get generatedStyles (): string {
    const theme = this.parsedTheme
    /* istanbul ignore next */
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
    return ThemeUtils.parse(
      this.currentTheme || {},
      undefined,
      getNestedValue(this.options, ['variations'], true)
    )
  }

  // Is using v2.3 of vue-meta
  // https://github.com/nuxt/vue-meta/releases/tag/v2.3.0
  private get isVueMeta23 (): boolean {
    return typeof this.vueMeta.addApp === 'function'
  }
}
