export default {
  props: {
    contentClass: {
      default: ''
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      document.body.insertBefore(this.$refs.content, document.body.firstChild)
    })
  },

  beforeDestroy () {
    this.$refs.content &&
      this.$refs.content.remove()
  }
}
