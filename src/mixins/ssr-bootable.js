export default {
  data: () => ({
    isBooted: false
  }),

  mounted () {
    this.$nextTick(() => {
      requestAnimationFrame(() => (this.isBooted = true))
    })
  }
}
