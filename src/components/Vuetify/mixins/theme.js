import { intToHex } from '../../../util/colorUtils'
import * as Theme from '../../../util/theme'

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

export default function theme (theme = {}) {
  return {
    data: () => ({
      style: null,
      theme: !theme
        ? false
        : Object.assign({}, THEME_DEFAULTS, theme)
    }),

    computed: {
      parsedTheme () {
        return Theme.parse(this.theme)
      },
      /** @return string */
      generatedStyles () {
        const theme = this.parsedTheme
        let css

        if (this.options.themeCache != null) {
          css = this.options.themeCache.get(theme)
          if (css != null) return css
        }

        const colors = Object.keys(theme)

        if (!colors.length) return ''

        css = `a { color: ${intToHex(theme.primary)}; }`

        for (let i = 0; i < colors.length; ++i) {
          const name = colors[i]
          const value = theme[name]
          if (this.options.themeVariations.includes(name)) {
            css += Theme.genVariations(name, value).join('')
          } else {
            css += Theme.genBaseColor(name, value)
          }
        }

        if (this.options.minifyTheme != null) {
          css = this.options.minifyTheme(css)
        }

        if (this.options.themeCache != null) {
          this.options.themeCache.set(theme, css)
        }

        return css
      },
      vueMeta () {
        if (this.theme === false) return
        return {
          style: [{
            cssText: this.generatedStyles,
            type: 'text/css',
            id: 'vuetify-theme-stylesheet'
          }]
        }
      }
    },

    // Regular vue-meta
    metaInfo () {
      return this.vueMeta
    },

    // Nuxt
    head () {
      return this.vueMeta
    },

    watch: {
      generatedStyles () {
        !this.meta && this.applyTheme()
      }
    },

    created () {
      if (this.theme === false) return

      if (this.$meta) {
        // Vue-meta
        // Handled by metaInfo()/nuxt()
      } else if (typeof document === 'undefined' && this.$ssrContext) {
        // SSR
        this.$ssrContext.head = this.$ssrContext.head || ''
        this.$ssrContext.head += `<style type="text/css" id="vuetify-theme-stylesheet">${this.generatedStyles}</style>`
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
        let style = document.getElementById('vuetify-theme-stylesheet')

        if (!style) {
          style = document.createElement('style')
          style.type = 'text/css'
          style.id = 'vuetify-theme-stylesheet'
          document.head.appendChild(style)
        }

        this.style = style
      }
    }
  }
}
