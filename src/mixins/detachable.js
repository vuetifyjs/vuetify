import Bootable from './bootable'

export default {
  mixins: [Bootable],

  props: {
    absolute: Boolean,
    contentClass: {
      default: ''
    },
    target: {
      type: String,
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
      if (this._isDestroyed || this.absolute) return

      const app = document.querySelector(this.target)

      if (!app) {
        return console.warn('Application is missing <v-app> component.')
      }

      // If child has already been removed, bail
      if (!this.$refs.content) return

      app.insertBefore(
        this.$refs.content,
        app.firstChild
      )
    }
  }
}
