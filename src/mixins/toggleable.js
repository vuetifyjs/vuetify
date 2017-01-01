import Eventable from './eventable'

export default {
  data () {
    return {
      active: false,
      activator: {}
    }
  },

  mixins: [
    Eventable
  ],

  mounted () {
    this.$vuetify.load(this.init)
  },

  computed: {
    events () {
      return [
        [`${this.$options.name}:open:${this.id}`, this.open],
        [`${this.$options.name}:close:${this.id}`, this.close],
        [`${this.$options.name}:toggle:${this.id}`, this.toggle],
        [`body:click`, this.close],
      ]
    }
  },

  methods: {
    init () {
      this.activator = document.querySelector(`[data-${this.$options.name}="${this.id}"]`)
    },

    open () {
      this.active = true
      this.$vuetify.bus.pub(`${this.$options.name}:opened`, this.id)
    },

    close (e, force) {
      if (force) return this.active = false

      if ((!e || !e.target)
          || this.activator === null
          || this.activator.contains(e.target)
          || e.target === this.activator 
      ) {
        return
      }

      this.active = false
    },

    toggle () {
      this.active = !this.active
    }
  }
}