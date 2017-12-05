import Bootable from './bootable'

export default {
  mixins: [Bootable],

  props: {
    absolute: Boolean,
    contentClass: {
      default: ''
    },
    target: {
      default: '[data-app]'
    }
  },

  mounted () {
    this.initDetach()
  },

  beforeDestroy () {
    if (!this.$refs.content) return

    // IE11 Fix
    try {
      this.$refs.content.parentNode.removeChild(this.$refs.content)
    } catch (e) {}
  },

  methods: {
    initDetach () {
      if (this._isDestroyed ||
        !this.$refs.content ||
        // Leave menu in place if absolute
        // and dev has not changed target
        (this.absolute && this.target === '[data-app]')
      ) return

      const app = typeof this.target === 'string'
        ? document.querySelector(this.target)
        : this.target

      if (!app) {
        return console.warn(`Unable to locate target ${this.target}`)
      }

      app.insertBefore(
        this.$refs.content,
        app.firstChild
      )
    }
  }
}
