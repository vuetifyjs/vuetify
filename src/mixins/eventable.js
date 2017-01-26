export default {
  data () {
    return {
      watchers: []
    }
  },

  created () {
    let component, id, cb, options
    this.events.forEach(event => {
      [component, id, cb, options] = event

      this.watchers.push(this.$store.watch(state => state.vuetify[component][id], cb, options))
    })
  },

  beforeDestroy () {
    let component, id

    this.watchers.forEach(w => w())
    
    this.events.forEach(event => {
      [component, id] = event

      this.$store.commit('vuetify/COMPONENT_DESTROY', { component, id })
    })
  }
}