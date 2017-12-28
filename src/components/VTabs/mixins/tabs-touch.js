/**
 * Tabs touch
 *
 * @mixin
 */
export default {
  methods: {
    newOffset (direction) {
      const capitalize = `${direction.charAt(0).toUpperCase()}${direction.slice(1)}`
      const container = this.$refs.container
      const items = container.children

      return this[`newOffset${capitalize}`](container, items)
    },
    newOffsetPrepend (container, items, offset = 0) {
      for (let index = this.itemOffset - 1; index >= 0; index--) {
        const newOffset = offset + items[index].clientWidth
        if (newOffset >= container.clientWidth) {
          return { offset: this.scrollOffset - offset, index: index + 1 }
        }
        offset = newOffset
      }

      return { offset: 0, index: 0 }
    },
    newOffsetAppend (container, items, offset = this.scrollOffset) {
      for (let index = this.itemOffset; index < items.length; index++) {
        const newOffset = offset + items[index].clientWidth
        if (newOffset > this.scrollOffset + container.clientWidth) {
          return { offset, index }
        }
        offset = newOffset
      }

      return null
    },
    onTouchStart (e) {
      this.startX = this.scrollOffset + e.touchstartX
      this.$refs.container.style.transition = 'none'
    },
    onTouchMove (e) {
      this.scrollOffset = this.startX - e.touchmoveX
    },
    onTouchEnd (e) {
      const container = this.$refs.container
      const scrollWidth = container.scrollWidth - this.$el.clientWidth / 2
      container.style.transition = null

      if (this.scrollOffset < 0 || !this.isOverflowing) {
        this.scrollOffset = 0
      } else if (this.scrollOffset >= scrollWidth) {
        const lastItem = container.children[container.children.length - 1]
        this.scrollOffset = scrollWidth - lastItem.clientWidth
      }
    }
  }
}
