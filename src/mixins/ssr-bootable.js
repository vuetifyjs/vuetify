/**
 * SSRBootable
 *
 * @mixin
 *
 * Used in layout components (drawer, toolbar, content)
 * to avoid an entry animation when using SSR
 */
export default {
  name: 'ssr-bootable',

  data: () => ({
    isBooted: false
  }),

  mounted () {
    // Use setAttribute instead of dataset
    // because dataset does not work well
    // with unit tests
    window.requestAnimationFrame(() => {
      this.$el.setAttribute('data-booted', true)
      this.isBooted = true
    })
  }
}
