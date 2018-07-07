/* eslint-disable import/no-duplicates */
import Vue from 'vue'
import { intToHex } from '../../../util/colorUtils'
import * as Theme from '../../../util/theme'

import { ParsedTheme } from '../../../util/theme'
import { VuetifyUseOptions, VuetifyTheme } from 'types'

/* eslint-disable no-multi-spaces */
const THEME_DEFAULTS = {
  primary: '#1976D2',   // blue.darken2
  secondary: '#424242', // grey.darken3
  accent: '#82B1FF',    // blue.accent1
  error: '#FF5252',     // red.accent2
  info: '#2196F3',      // blue.base
  success: '#4CAF50',   // green.base
  warning: '#FFC107'    // amber.base
}

export function initTheme (theme: VuetifyUseOptions['theme'] = {}): VuetifyTheme | false {
  if (theme === false) return false

  return {
    ...THEME_DEFAULTS,
    ...theme
  }
}

export default Vue.extend({
  data: () => ({
    style: null as HTMLStyleElement | null
  }),

  computed: {
    parsedTheme (): ParsedTheme {
      return this.$vuetify.theme ? Theme.parse(this.$vuetify.theme): {}
    },
    generatedStyles (): string {
      const theme = this.parsedTheme
      let css: string | null

      if (this.$vuetify.options.themeCache != null) {
        css = this.$vuetify.options.themeCache.get(theme)
        if (css != null) return css
      }

      const colors = Object.keys(theme)

      if (!colors.length) return ''

      css = `a { color: ${intToHex(theme.primary)}; }`

      for (let i = 0; i < colors.length; ++i) {
        const name = colors[i]
        const value = theme[name]
        if (this.$vuetify.options.themeVariations.includes(name)) {
          css += Theme.genVariations(name, value).join('')
        } else {
          css += Theme.genBaseColor(name, value)
        }
      }

      if (this.$vuetify.options.minifyTheme != null) {
        css = this.$vuetify.options.minifyTheme(css)
      }

      if (this.$vuetify.options.themeCache != null) {
        this.$vuetify.options.themeCache.set(theme, css)
      }

      return css
    },
    vueMeta (): object | undefined {
      if (this.$vuetify.theme as any === false) return

      const options: Record<string, any> = {
        cssText: this.generatedStyles,
        id: 'vuetify-theme-stylesheet',
        type: 'text/css'
      }

      if (this.$vuetify.options.cspNonce) {
        options.nonce = this.$vuetify.options.cspNonce
      }

      return {
        style: [options]
      }
    }
  },

  // Regular vue-meta
  metaInfo (): object | undefined {
    return this.vueMeta
  },

  // Nuxt
  head (): object | undefined {
    return this.vueMeta
  },

  watch: {
    generatedStyles () {
      this.$meta || this.applyTheme()
    }
  },

  created () {
    if (this.$vuetify.theme as any === false) return

    if (this.$meta) {
      // Vue-meta
      // Handled by metaInfo()/nuxt()
    } else if (typeof document === 'undefined' && this.$ssrContext) {
      // SSR
      const nonce = this.$vuetify.options.cspNonce
        ? ` nonce="${this.$vuetify.options.cspNonce}"`
        : ''
      this.$ssrContext.head = this.$ssrContext.head || ''
      this.$ssrContext.head += `<style type="text/css" id="vuetify-theme-stylesheet"${nonce}>${this.generatedStyles}</style>`
    } else if (typeof document !== 'undefined') {
      // Client-side
      this.genStyle()
      this.applyTheme()
    }
  },

  methods: {
    applyTheme () {
      if (this.style) this.style.innerHTML = this.generatedStyles
    },
    genStyle () {
      let style = document.getElementById('vuetify-theme-stylesheet') as HTMLStyleElement | null

      if (!style) {
        style = document.createElement('style')
        style.type = 'text/css'
        style.id = 'vuetify-theme-stylesheet'
        if (this.$vuetify.options.cspNonce) {
          style.setAttribute('nonce', this.$vuetify.options.cspNonce)
        }
        document.head.appendChild(style)
      }

      this.style = style
    }
  }
})
