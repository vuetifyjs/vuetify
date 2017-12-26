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
    if (typeof document === 'undefined') {
      this.$ssrContext && !this.$ssrContext._styles && (this.$ssrContext._styles = {})
      return this.$ssrContext && this.$ssrContext._styles &&
        (this.$ssrContext._styles['vuetify-theme-stylesheet'] = {
          ids: ['vuetify-theme-stylesheet'],
          css: this.genColors(this.parsedTheme),
          media: ''
        })
    }
    this.genStyle()
    this.applyTheme()
  },

  methods: {
    applyTheme () {
      this.style.innerHTML = this.genColors(this.parsedTheme)
    },
    genColors (theme) {
      const colors = Object.keys(theme)
      let css = `a { color: ${intToHex(theme.primary)}; }`

      for (let i = 0; i < colors.length; ++i) {
        const name = colors[i]
        const value = theme[name]
        css += Theme.genVariations(name, value).join('')
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
