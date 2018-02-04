import { intToHex } from '../../../util/colorUtils'
import * as Theme from '../../../util/theme'

export default {
  data: () => ({
    style: null
  }),

  computed: {
    parsedTheme () {
      return Theme.parse(this.$vuetify.theme)
    }
  },

  watch: {
    parsedTheme () {
      this.applyTheme()
    }
  },

  created () {
    if (typeof document === 'undefined' && this.$ssrContext) {
      this.$ssrContext.head = this.$ssrContext.head || ''
      this.$ssrContext.head += `<style id="vuetify-theme-stylesheet">${this.genColors(this.parsedTheme)}</style>`
    } else if (typeof document !== 'undefined') {
      this.genStyle()
      this.applyTheme()
    }
  },

  methods: {
    applyTheme () {
      this.style.innerHTML = this.genColors(this.parsedTheme)
    },
    genColors (theme) {
      let css

      if (this.$vuetify.options.themeCache != null) {
        css = this.$vuetify.options.themeCache.get(theme)
        if (css != null) return css
      }

      const colors = Object.keys(theme)
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
    genStyle () {
      let style = document.querySelector('[data-vue-ssr-id=vuetify-theme-stylesheet]') ||
        document.getElementById('vuetify-theme-stylesheet')

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
