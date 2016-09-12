export default {
  mounted () {
    this.$vuetify.bus.sub(this.events)
  },

  beforeDestroy () {
    this.$vuetify.bus.unsub(this.events)
  }
}