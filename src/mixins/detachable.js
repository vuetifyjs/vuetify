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
      this.app &&
        this.app.appendChild(this.$refs.content) ||
        console.warn('Application is missing <v-app> component')
    })
  },

  beforeDestroy () {
    this.app
      this.app.contains(this.$refs.content) &&
      this.app.removeChild(this.$refs.content)
  }
}
