export default {
  props: {
    contentClass: {
      default: ''
    },
    relative: Boolean
  },

  mounted () {
    this.$vuetify.load(() => {
      const app = this.relative ? this.$el.parentNode : document.querySelector('[data-app]')

      if (!app && !this.relative) {
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
