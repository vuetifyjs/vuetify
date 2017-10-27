export default {
  props: {
    dark: Boolean,
    light: Boolean
  },

  computed: {
    _themeColor () {
      return {
        'theme--light': this.light,
        'theme--dark': this.dark
      }
    }
  }
}
