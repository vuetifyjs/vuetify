export default {
  data () {
    return {
      isBooted: false
    }
  },

  watch: {
    isActive () {
      this.isBooted = true
    }
  }
}
