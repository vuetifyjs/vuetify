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
  },

  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      this.dataLoading = true
      asyncData({
        store: this.$store,
        route: to
      }).then(() => {
        this.dataLoading = false
        next()
      }).catch(next)
    } else {
      next()
    }
  }
}
