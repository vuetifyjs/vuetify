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

      const tiles = this.$refs.content.querySelectorAll('.list__tile')
      const selectedIndex = Array.from(tiles).findIndex(n => n.classList.contains('list__tile--active'))

      this.tileLength = tiles.length

      if (selectedIndex === -1) {
        this.selectedIndex = null

        return this.calcTop(true)
      }

      this.selectedIndex = selectedIndex
      let actingIndex = selectedIndex

      let offsetPadding = -16
      this.stopIndex = tiles.length - 4
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
      let left = a.left

      if (this.offsetX) left = this.left ? left - a.width : left + a.width
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

      let top = this.top ? a.top - c.height : a.top
      if (this.offsetY) top = this.top ? top - a.height : top + a.height
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
    updateDimensions () {
      this.sneakPeek(() => {
        this.dimensions = {
          activator: this.measure(this.getActivator()),
          content: this.measure(this.$refs.content)
        }
      })
    }
  }
}
