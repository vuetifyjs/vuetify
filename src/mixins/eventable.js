export default {
  data () {
    return {
      watchers: []
    }
  },

  created () {
    if (!this.events) {
      console.warn('Eventable mixin requires the "events" property on the instance')
    }

    this.events.concat(this.customEvents || []).forEach(event => {
      const [component, id, cb, options] = event

      this.watchers.push(this.$store.watch(state => {
        let target

        if (id.toString().indexOf('.') !== -1) {
          target = id.split('.').reduce((nestedObj, key) => {
            if (!(key in nestedObj)) {
              console.warn(`Key "${key}" does not exist in store. Initialized from component "${this.$options.name}"`)
            }

            return nestedObj[key]
          }, state.vuetify[component])
        } else {
          target = state.vuetify[component][id]
        }

        return target
      }, cb, (options || {})))
    })
  },

  beforeDestroy () {
    this.watchers.forEach(w => w())

    this.events.concat(this.customEvents || []).forEach(event => {
      const [component, id] = event

      if (component === 'common') return

      this.$vuetify().event('component destroy', { component, id })
    })
  }
}
