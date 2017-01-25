export default {
  created () {
    this.events.forEach(event => {
      let component, id, cb, options
      [component, id, cb, options] = event

      this.$store.watch(state => state.vuetify[component][id], cb, options)
    })
  },

  beforeDestroy () {
    console.log('here')
    // this.$vuetify.bus.unsub(this.events)
  }
}