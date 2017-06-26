export default {
  data: () => ({
    app: null
  }),

  props: {
    contentClass: {
      default: ''
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.app = document.querySelector('[data-app]')

      if (!this.app) return console.warn('Application is missing <v-app> component')

      this.app.prepend(this.$refs.content)
    })
  },

  beforeDestroy () {
    this.app &&
      this.app.contains(this.$refs.content) &&
      this.app.removeChild(this.$refs.content)
  }
}
