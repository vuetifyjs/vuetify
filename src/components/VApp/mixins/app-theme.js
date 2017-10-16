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
      this.updateTheme(this.genTheme())
    },
    genTheme () {
      return Object.keys(this.$vuetify.theme).map(key => {
        const value = this.$vuetify.theme[key]

        return (
          this.genBackgroundColor(key, value) +
          this.genTextColor(key, value)
        )
      }).join('')
    },
    genBackgroundColor (key, value) {
      return `.${key}{background-color:${value}!important;border-color:${value}!important}`
    },
    genStyle () {
      const style = document.createElement('style')
      style.type = 'text/css'
      document.head.insertBefore(style, document.head.firstChild)
      this.style = style
    },
    genTextColor (key, value) {
      return `.${key}--text{color:${value}!important}`
    },
    updateTheme (classes) {
      this.style.innerHTML = classes
    }
  }
}
