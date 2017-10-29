export default {
  props: {
    dark: Boolean,
    light: Boolean
  },

  computed: {
    _themeColor () {
      const { type } = this.$vuetify.theme

      if (!this.light && !this.dark) {
        return { [`theme--${type}`]: true }
      }

      return {
        'theme--light': this.light,
        'theme--dark': this.dark
      }
    }
  }
}
