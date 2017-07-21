export default {
  data () {
    return {
      debounceTimeout: null
    }
  },

  methods: {
    debounced () {
      clearTimeout(this.debounceTimeout)
      this.debounceTimeout = setTimeout(this.onResize, 50)
    }
  },

  mounted () {
    window.addEventListener('resize', this.debounced, { passive: true })

    this.$vuetify.load(this.onResize)
  },

  beforeDestroy () {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.debounced, { passive: true })
  }
}
