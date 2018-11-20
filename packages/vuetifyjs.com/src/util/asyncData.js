export default {
  mixin: true,

  data: () => ({
    asyncData: null,
    dataLoading: null
  }),

  beforeMount () {
    const { asyncData } = this.$options
    if (asyncData) {
      this.$nextTick(() => { this.dataLoading = true })
      // assign the fetch operation to a promise
      // so that in components we can do `this.dataPromise.then(...)` to
      // perform other tasks after data is ready
      this.asyncData = asyncData({
        store: this.$store,
        route: this.$route
      }).then(() => { this.dataLoading = false })
    }
  }
}
