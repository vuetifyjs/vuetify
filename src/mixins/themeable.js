export default {
  props: {
    dark: Boolean,
    light: Boolean
  },

  computed: {
    themeClasses () {
      return {
        'theme--light': this.light,
        'theme--dark': this.dark
      }
    }
  }
}
