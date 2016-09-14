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
    this.$vuetify.load.call(this, this.init)
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

    close (e) {
      if (this.activator === null) {
        return
      }
      
      if (e.target === this.activator
          || this.activator.contains(e.target)
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