import Eventable from './eventable'

export default {
  data () {
    return {
      active: false,
      activators: []
    }
  },

  mixins: [Eventable],

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
      let activators = document.querySelectorAll(`[data-${this.$options.name}="${this.id}"]`)
      this.activators = Array.apply(null, activators)
    },

    open () {
      this.active = true
      this.$vuetify.bus.pub(`${this.$options.name}:opened`, this.id)
    },

    close (e) {
      if (arguments.length === 0 && this.activators.length === 0) {
        return this.active = false
      }

      let closeConditional = false

      if (this.closeConditional) {
        closeConditional = this.closeConditional(e)
      }

      if ((!e || !e.target)
        || this.activators.some(i => i.contains(e.target))
        || closeConditional
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