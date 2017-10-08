export default {
  props: {
    app: Boolean
  },

  destroyed () {
    this.updateApplication()
  }
}
