export default {
  methods: {
    calculateScroll () {
      let scrollTop = this.selectedIndex * 48 - 66
      if (this.selectedIndex === null) return
      if (this.selectedIndex < 4) scrollTop = 0
      else if (this.selectedIndex > this.tileLength - 2) {
        scrollTop = this.$refs.content.scrollHeight
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
      let actingIndex = this.selectedIndex
      if (actingIndex > 3) actingIndex = 2
      if (this.selectedIndex === tiles.length - 2) actingIndex = 2
      if (this.selectedIndex === tiles.length - 1) actingIndex = 3
      const auto = actingIndex * 48

      return this.calcTop(true) - auto - (this.selectedIndex > 2 && this.selectedIndex < tiles.length - 2 ? -16 : 16) // 16 for padding
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
