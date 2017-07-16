export default {
  methods: {
    // Revisit this
    calculateScroll () {
      if (this.selectedIndex === null) return

      let scrollTop = 0

      if (this.selectedIndex >= this.stopIndex) {
        scrollTop = this.$refs.content.scrollHeight
      } else if (this.selectedIndex > this.startIndex) {
        scrollTop = (this.selectedIndex * 48) - 56
      }

      this.$refs.content.scrollTop = scrollTop
    },
    calcLeftAuto () {
      const a = this.dimensions.activator

      return parseInt(a.left - 16)
    },
    calcTopAuto () {
      if (!this.hasActivator) return this.calcTop(true)

      const selectedIndex = Array.from(this.tiles).findIndex(n => n.classList.contains('list__tile--active'))

      if (selectedIndex === -1) {
        this.selectedIndex = null

        return this.calcTop(true)
      }

      this.selectedIndex = selectedIndex
      let actingIndex = selectedIndex

      let offsetPadding = -16
      // #708 Stop index should vary by tile length
      this.stopIndex = this.tiles.length > 4
        ? this.tiles.length - 4
        : this.tiles.length

      if (selectedIndex > this.startIndex && selectedIndex < this.stopIndex) {
        actingIndex = 2
        offsetPadding = 24
      } else if (selectedIndex >= this.stopIndex) {
        offsetPadding = -8
        actingIndex = selectedIndex - this.stopIndex
      }

      return this.calcTop(true) + offsetPadding - (actingIndex * 48)
    },
    calcLeft () {
      if (this.auto) return this.calcLeftAuto()

      const a = this.dimensions.activator
      const c = this.dimensions.content
      let left = this.left ? a.right - c.width : a.left

      if (this.offsetX) left += this.left ? -a.width : a.width
      if (this.nudgeLeft) left += this.nudgeLeft
      if (this.nudgeRight) left -= this.nudgeRight

      return this.calcXOverflow(left)
    },
    calcTop (force) {
      if (this.auto && !force) return this.calcTopAuto()

      const a = this.dimensions.activator
      const c = this.dimensions.content
      let top = this.top ? a.bottom - c.height : a.top

      if (this.offsetY) top += this.top ? -a.height : a.height
      if (this.nudgeTop) top -= this.nudgeTop
      if (this.nudgeBottom) top += this.nudgeBottom

      const pageYOffset = typeof window !== 'undefined' ? window.pageYOffset : 0

      return this.calcYOverflow(top) + pageYOffset
    },
    calcXOverflow (left) {
      const maxWidth = Math.max(
        this.dimensions.content.width,
        this.calculatedMinWidth,
        parseInt(this.maxWidth) || 0
      )
      const totalWidth = left + maxWidth
      const availableWidth = totalWidth - this.window.innerWidth
      const innerWidth = typeof window !== 'undefined' ? window.innerWidth : 0

      if ((!this.left || this.right) && availableWidth > 0) {
        left = (
          innerWidth -
          maxWidth -
          (innerWidth > 1024 ? 30 : 12) // Account for scrollbar
        )
      } else if (this.left && left < 0) left = 12

      return left
    },
    calcYOverflow (top) {
      const totalHeight = top + this.dimensions.content.height
      const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 0

      if (this.top && top < 0) top = 12
      else if ((!this.top || this.bottom) && innerHeight < totalHeight) {
        top = (
          innerHeight -
          this.dimensions.content.height -
          12
        )
      }

      return top
    },
    sneakPeek (cb) {
      requestAnimationFrame(() => {
        const el = this.$refs.content
        const currentDisplay = el.style.display

        el.style.display = 'inline-block'
        cb()
        el.style.display = currentDisplay
      })
    },
    absolutePosition () {
      return {
        offsetTop: 0,
        scrollHeight: 0,
        top: this.positionY || this.absoluteY,
        bottom: this.positionY || this.absoluteY,
        left: this.positionX || this.absoluteX,
        right: this.positionX || this.absoluteX,
        height: 0,
        width: 0
      }
    },
    updateDimensions () {
      this.sneakPeek(() => {
        this.dimensions = {
          activator: !this.hasActivator || this.positionAbsolutely
            ? this.absolutePosition() : this.measure(this.getActivator()),
          content: this.measure(this.$refs.content)
        }
      })
    }
  }
}
