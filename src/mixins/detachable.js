export default {
  props: {
    contentClass: {
      default: ''
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      const app = document.querySelector('[data-app]')
      app.insertBefore(
        this.$refs.content,
        app.firstChild
      )
    })
  },

  beforeDestroy () {
    this.$refs.content &&
      this.$refs.content.remove()
  }
}
