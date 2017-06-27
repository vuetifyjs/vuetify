export default {
  props: {
    contentClass: {
      default: ''
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      document.body.prepend(this.$refs.content)
    })
  },

  beforeDestroy () {
    document.body.removeChild(this.$refs.content)
  }
}
