import Eventable from './eventable'

export default {
  data () {
    return {
      active: false
    }
  },

  mixins: [Eventable],

  computed: {
    events () {
      return [
        [`${this.$options.name}`, this.id, this.toggle, { deep: true }],
        // ['common', 'bodyClick', this.close]
      ]
    }
  },

  methods: {
    commit (active) {
      return this.$store.commit(`vuetify/${this.$options.name.toUpperCase()}_TOGGLE`, {
        id: this.id,
        active: active
      })
    },

    close (e) {
      if (arguments.length === 0) {
        return this.commit(false)
      }

      if ((!e || !e.target)
        || this.closeConditional(e)
      ) {
        return
      }

      return this.commit(false)
    },

    closeConditional () {
      return false
    },

    toggle (state) {
      console.log(state, this.id)
      this.active = state.active
    }
  }
}