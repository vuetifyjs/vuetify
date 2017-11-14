export default {
  props: {
    app: Boolean
  },

  watch: {
    app () {
      this.updateApplication()
    }
  },

  mounted () {
    this.updateApplication()
  }
}
