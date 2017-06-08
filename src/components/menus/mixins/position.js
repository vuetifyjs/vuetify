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
      if (!this.$refs.content) return this.calcTop(true)

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

      const totalWidth = left + this.minWidth - this.window.innerWidth

      if (totalWidth > 0) left -= (totalWidth + 24) // give a little extra space

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

      return top + this.window.pageYOffset
    },
    sneakPeek (cb) {
      const el = this.$refs.content
      const currentDisplay = el.style.display

      el.style.display = 'inline-block'
      cb()
      el.style.display = currentDisplay
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
