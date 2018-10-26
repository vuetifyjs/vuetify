/**
 * Tabs touch
 *
 * @mixin
 */
/* @vue/component */
export default {
  methods: {
    newOffset (direction) {
      const clientWidth = this.$refs.wrapper.clientWidth

      if (direction === 'prev') {
        return Math.max(this.scrollOffset - clientWidth, 0)
      } else {
        return Math.min(this.scrollOffset + clientWidth, this.$refs.container.clientWidth - clientWidth)
      }
    },
    onTouchStart (e) {
      this.startX = this.scrollOffset + e.touchstartX
      this.$refs.container.style.transition = 'none'
      this.$refs.container.style.willChange = 'transform'
    },
    onTouchMove (e) {
      this.scrollOffset = this.startX - e.touchmoveX
    },
    onTouchEnd () {
      const container = this.$refs.container
      const wrapper = this.$refs.wrapper
      const maxScrollOffset = container.clientWidth - wrapper.clientWidth
      container.style.transition = null
      container.style.willChange = null

      /* istanbul ignore else */
      if (this.scrollOffset < 0 || !this.isOverflowing) {
        this.scrollOffset = 0
      } else if (this.scrollOffset >= maxScrollOffset) {
        this.scrollOffset = maxScrollOffset
      }
    }
  }
}
