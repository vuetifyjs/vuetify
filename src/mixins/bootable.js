export default {
  data () {
    return {
      isBooted: false
    }
  },

  watch: {
    isActive () {
      this.isBooted = true
    }
  },

  methods: {
    showLazyContent (content) {
      return this.lazy && this.isBooted || !this.lazy ? content : null
    }
  }
}
