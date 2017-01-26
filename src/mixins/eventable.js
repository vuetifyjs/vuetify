export default {
  created () {
    let component, id, cb, options
    this.events.forEach(event => {
      [component, id, cb, options] = event

      this.$store.watch(state => state.vuetify[component][id], cb, options)
    })
  },

  beforeDestroy () {
    let component, id
    this.events.forEach(event => {
      [component, id] = event

      this.$store.commit('vuetify/COMPONENT_DESTROY', { component, id })
    })
  }
}