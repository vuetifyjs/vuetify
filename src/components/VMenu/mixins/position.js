export default {
  methods: {
    // Revisit this
    calculateScroll () {
      if (this.selectedIndex === null) return

      let scrollTop = 0

      if (this.selectedIndex >= this.stopIndex) {
        scrollTop = this.$refs.content.scrollHeight
      } else if (this.selectedIndex > this.startIndex) {
        scrollTop = (
          (this.selectedIndex * (this.defaultOffset * 6)) -
          (this.defaultOffset * 7)
        )
      }

      this.$refs.content.scrollTop = scrollTop
    },
    calcLeftAuto () {
      const a = this.dimensions.activator

      return parseInt(a.left - this.defaultOffset * 2)
    },
    calcTopAuto () {
      if (!this.hasActivator) return this.calcTop(true)

      const selectedIndex = Array.from(this.tiles)
        .findIndex(n => n.classList.contains('list__tile--active'))

      if (selectedIndex === -1) {
        this.selectedIndex = null

        return this.calcTop(true)
      }

      this.selectedIndex = selectedIndex
      let actingIndex = selectedIndex

      let offsetPadding = -(this.defaultOffset * 2)
      // #708 Stop index should vary by tile length
      this.stopIndex = this.tiles.length > 4
        ? this.tiles.length - 4
        : this.tiles.length

      if (selectedIndex > this.startIndex && selectedIndex < this.stopIndex) {
        actingIndex = 2
        offsetPadding = (this.defaultOffset * 3)
      } else if (selectedIndex >= this.stopIndex) {
        offsetPadding = -(this.defaultOffset)
        actingIndex = selectedIndex - this.stopIndex
      }

      // Is always off by 1 pixel, send help (┛ಠ_ಠ)┛彡┻━┻
      offsetPadding--

      return (
        this.calcTop(true) +
        offsetPadding -
        (actingIndex * (this.defaultOffset * 6))
      )
    },
    calcLeft () {
      if (this.auto) return this.calcLeftAuto()

      const a = this.dimensions.activator
      const c = this.dimensions.content
      let left = this.left ? a.right - c.width : a.left

      if (this.offsetX) left += this.left ? -a.width : a.width
      if (this.nudgeLeft) left += this.nudgeLeft
      if (this.nudgeRight) left -= this.nudgeRight

      return left
    },
    calcTop (force) {
      if (this.auto && !force) return this.calcTopAuto()

      const a = this.dimensions.activator
      const c = this.dimensions.content
      let top = this.top ? a.bottom - c.height : a.top

      if (this.offsetY) top += this.top ? -a.height : a.height
      if (this.nudgeTop) top -= this.nudgeTop
      if (this.nudgeBottom) top += this.nudgeBottom

      return top + this.pageYOffset
    },
    calcXOverflow (left) {
      const hasWindow = typeof window !== 'undefined'
      const innerWidth = hasWindow ? window.innerWidth : 0
      const maxWidth = Math.max(
        this.dimensions.content.width,
        this.calculatedMinWidth,
        parseInt(this.maxWidth) || 0
      )
      const totalWidth = left + maxWidth
      const availableWidth = totalWidth - innerWidth

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
      const documentHeight = typeof window !== 'undefined'
        ? window.innerHeight || document.documentElement.clientHeight
        : 0
      const toTop = this.pageYOffset + documentHeight
      const contentHeight = this.dimensions.content.height
      const totalHeight = top + contentHeight

      // If overflowing bottom
      if (toTop < totalHeight && !this.allowOverflow) top = toTop - contentHeight - 12
      // If overflowing top
      else if (top < this.pageYOffset && !this.allowOverflow) top = this.pageYOffset + 12

      return top < 12 ? 12 : top
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
