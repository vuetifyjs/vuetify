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

  mounted () {
    this.genStyle()
    this.applyTheme()
  },

  methods: {
    applyTheme () {
      this.style.innerHTML = this.genColors(this.$vuetify.theme)
    },
    genColors (theme) {
      return Object.keys(theme).map(key => {
        const value = theme[key]

        return (
          this.genBackgroundColor(key, value) +
          this.genTextColor(key, value)
        )
      }).join('')
    },
    genBackgroundColor (key, value) {
      return `.${key}{background-color:${value} !important;border-color:${value} !important;}`
    },
    genTextColor (key, value) {
      return `.${key}--text{color:${value} !important;}`
    },
    genStyle () {
      const style = document.createElement('style')
      style.type = 'text/css'
      document.head.appendChild(style)
      this.style = style
    }
  }
}
