export default {
  props: {
    app: Boolean
  },

  watch: {
    app () {
      this.updateApplication()
    }
  },

  destroyed () {
    this.updateApplication()
  }
}
