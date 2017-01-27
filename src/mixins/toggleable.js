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
    commit (active) {
      if (this.active === active) {
        return
      }

      this.$vuetify().event('component toggle', {
        active: active,
        component: this.$options.name,
        id: this.id
      })
    },

    close (e) {
      if (this.closeConditional(e)) {
        return
      }

      return this.commit(false)
    },

    closeConditional () {
      return false
    },

    toggle (state) {
      this.active = state.active
    }
  }
}