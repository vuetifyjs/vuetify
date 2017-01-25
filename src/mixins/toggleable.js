import Eventable from './eventable'

export default {
  data () {
    return {
      active: false,
      activators: []
    }
  },

  mixins: [Eventable],

  watch: {
    active (active) {
      // if (active) {
      //   this.$vuetify.bus.pub(`${this.$options.name}:opened:${this.id}`)
      // } else {
      //   this.$vuetify.bus.pub(`${this.$options.name}:closed:${this.id}`)
      // }
    }
  },

  mounted () {
    // this.$vuetify.load(this.init)
  },

  computed: {
    events () {
      return [
        [`${this.$options.name}`, this.id, this.toggle, { deep: true }]
      ]
    }
  },

  methods: {
    init () {
      // let activators = document.querySelectorAll(`[data-${this.$options.name}="${this.id}"]`)
      // this.activators = Array.apply(null, activators)
    },

    open () {
      // this.active = true
      // this.$vuetify.bus.pub(`${this.$options.name}:opened`, this.id)
    },

    close (e) {
      if (arguments.length === 0 && this.activators.length === 0) {
        return this.active = false
      }

      if ((!e || !e.target)
        || this.activators.some(i => i.contains(e.target) || i === e.target)
        || this.closeConditional(e)
      ) {
        return
      }
      this.active = false
    },

    closeConditional () {
      return false
    },

    toggle (state) {
      this.active = state.active
    }
  }
}