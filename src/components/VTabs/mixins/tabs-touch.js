/**
 * Tabs touch
 *
 * @mixin
 */
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
      this.$refs.container.style.transition = null
      this.$refs.container.style.willChange = null

      /* istanbul ignore else */
      if (this.scrollOffset < 0 || !this.isOverflowing) {
        this.scrollOffset = 0
      } else if (this.scrollOffset >= this.maxScrollOffset) {
        this.scrollOffset = this.maxScrollOffset
      }
    }
  }
}
