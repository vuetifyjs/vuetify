export default {
  props: {
    dark: {
      type: Boolean,
      default: true
    },
    light: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    // hack: setting the `dark` prop default to `this.light ? false : true` didnt work
    _dark () {
      return this.dark = this.light ? false : true
    }
  }
}
