export default {
  data: () => ({
    style: null
  }),

  watch: {
    '$vuetify.theme': {
      deep: true,
      handler () {
        this.applyTheme()
      }
    }
  },

  created () {
    if (typeof document === 'undefined') {
      this.$ssrContext && !this.$ssrContext._styles && (this.$ssrContext._styles = {})
      return this.$ssrContext && this.$ssrContext._styles &&
        (this.$ssrContext._styles['vuetify-theme-stylesheet'] = {
          ids: ['vuetify-theme-stylesheet'],
          css: this.genColors(this.$vuetify.theme),
          media: ''
        })
    }
    this.genStyle()
    this.applyTheme()
  },

  methods: {
    applyTheme () {
      this.style.innerHTML = this.genColors(this.$vuetify.theme)
    },
    genColors (theme) {
      const colors = Object.keys(theme).map(key => {
        const value = theme[key]

        return (
          this.genBackgroundColor(key, value) +
          this.genTextColor(key, value)
        )
      })

      colors.push(this.genAnchorColor(this.$vuetify.theme.primary))

      return colors.join('')
    },
    genAnchorColor (color) {
      return `a{color: ${color};}`
    },
    genBackgroundColor (key, value) {
      return `.${key}{background-color:${value} !important;border-color:${value} !important;}`
    },
    genTextColor (key, value) {
      return `.${key}--text{color:${value} !important;}`
    },
    genStyle () {
      let style = document.querySelector('[data-vue-ssr-id=vuetify-theme-stylesheet]')

      if (!style) {
        style = document.createElement('style')
        style.type = 'text/css'
        document.head.appendChild(style)
      }

      this.style = style
    }
  }
}
