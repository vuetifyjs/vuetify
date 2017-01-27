export default {
  data () {
    return {
      watchers: []
    }
  },

  created () {
    this.events.concat(this.customEvents || []).forEach(event => {
      let component, id, cb, options

      [component, id, cb, options] = event

      this.watchers.push(this.$store.watch(state => state.vuetify[component][id], cb, (options || {})))
    })
  },

  beforeDestroy () {
    this.watchers.forEach(w => w())

    this.events.concat(this.customEvents || []).forEach(event => {
      let component, id
      [component, id] = event

      if (component === 'common') return

      this.$vuetify().event('component destroy', { component, id })
    })
  }
}