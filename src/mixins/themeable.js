export default {
  props: {
    dark: {
      type: Boolean,
      default: true
    },
    light: Boolean
  },

  computed: {
    _dark () {
      return this.dark && !this.light
    },
    _light () {
      return this.light
    }
  }
}
