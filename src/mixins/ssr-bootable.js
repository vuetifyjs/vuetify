/**
 * SSRBootable
 * 
 * @mixin
 *
 * Used in layout components (drawer, toolbar, content)
 * to avoid an entry animation when using SSR
 */
export default {
  data: () => ({
    isBooted: false
  }),

  mounted () {
    setTimeout(() => (this.isBooted = true), 200)
  }
}
