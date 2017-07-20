export default {
  data () {
    return {
      debounceTimeout: null
    }
  },

  methods: {
    debouncedOnResize () {
      clearTimeout(this.debounceTimeout)
      this.debounceTimeout = setTimeout(this.onResize, 50)
    }
  },

  mounted () {
    window.addEventListener('resize', this.debouncedOnResize, { passive: true })
  },

  beforeDestroy () {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.debouncedOnResize, { passive: true })
  }
}
