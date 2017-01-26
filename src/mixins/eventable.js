export default {
  data () {
    return {
      watchers: []
    }
  },

  created () {
    this.events.forEach(event => {
      let component, id, cb, options

      [component, id, cb, options] = event

      this.watchers.push(this.$store.watch(state => state.vuetify[component][id], cb, options || {}))
    })
  },

  beforeDestroy () {
    this.watchers.forEach(w => w())

    this.events.forEach(event => {
      let component, id
      [component, id] = event

      if (component === 'common') return

      this.$store.commit('vuetify/COMPONENT_DESTROY', { component, id })
    })
  }
}