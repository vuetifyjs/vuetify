import Eventable from './eventable'
import Storable from './storable'

export default {
  data () {
    return {
      active: false
    }
  },

  mixins: [Storable, Eventable],

  computed: {
    events () {
      return [
        [`${this.$options.name}`, this.id, this.toggle, { deep: true }],
        ['common', 'bodyClick', this.close]
      ]
    }
  },

  methods: {
    close (e) {
      if ((!e || !e.target || !(e.target instanceof Node)) || this.closeConditional(e)) {
        return
      }

      this.$vuetify().event('component toggle', {
        active: false,
        component: this.$options.name,
        id: this.id
      })
    },

    closeConditional () {
      return false
    },

    toggle (state) {
      this.active = state.active
    }
  }
}
