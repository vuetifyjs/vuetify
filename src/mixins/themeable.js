export default {
  props: {
    dark: Boolean,
    light: Boolean
  },

  created () {
    this.dark = !this.light
  }
}
