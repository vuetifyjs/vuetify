/**
 * Menu position
 * 
 * @mixin
 *
 * Used for calculating an automatic position (used for VSelect)
 * Will position the VMenu content properly over the VSelect
 */
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
      if (!this.hasActivator) return this.calcTop()

      const selectedIndex = Array.from(this.tiles)
        .findIndex(n => n.classList.contains('list__tile--active'))

      if (selectedIndex === -1) {
        this.selectedIndex = null

        return this.calcTop()
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
        this.calcTop() +
        offsetPadding -
        (actingIndex * (this.defaultOffset * 6))
      )
    }
  }
}
