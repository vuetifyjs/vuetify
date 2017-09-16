/**
 * Bootable
 * @mixin
 *
 * Used to add lazy content functionality to components
 * Looks for change in "isActive" to automatically boot
 * Otherwise can be set manually
 */
export default {
  data: () => ({
    isBooted: false
  }),

  watch: {
    isActive () {
      this.isBooted = true
    }
  },

  methods: {
    showLazyContent (content) {
      return this.lazy &&
        this.isBooted ||
        !this.lazy
        ? content
        : null
    }
  }
}
