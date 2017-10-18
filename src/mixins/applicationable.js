export default {
  props: {
    app: Boolean
  },

  watch: {
    app () {
      this.updateApplication()
    }
  },

  created () {
    this.updateApplication()
  }
}
