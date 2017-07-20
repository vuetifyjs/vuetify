export default {
  props: {
    contentClass: {
      default: ''
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      const app = document.querySelector('[data-app]')

      if (!app) {
        return console.warn('Application is missing <v-app> component.')
      }

      app.insertBefore(
        this.$refs.content,
        app.firstChild
      )
    })
  },

  beforeDestroy () {
    if (!this.$refs.content) return

    // IE11 Fix
    try {
      this.$refs.content.parentNode.removeChild(this.$refs.content)
    } catch (e) {}
  }
}
