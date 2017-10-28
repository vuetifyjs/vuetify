/**
 * Bootable
 * @mixin
 *
 * Used to add lazy content functionality to components
 * Looks for change in "isActive" to automatically boot
 * Otherwise can be set manually
 */
export default {
  props: {
    eager: Boolean
  },

  methods: {
    showLazyContent (content) {
      return (this.isActive || this.eager)
        ? content
        : null
    }
  }
}
