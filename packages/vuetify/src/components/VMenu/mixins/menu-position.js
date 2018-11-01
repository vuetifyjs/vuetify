/**
 * Menu position
 *
 * @mixin
 *
 * Used for calculating an automatic position (used for VSelect)
 * Will position the VMenu content properly over the VSelect
 */
/* @vue/component */
export default {
  data: () => ({
    calculatedTopAuto: 0
  }),
  methods: {
    setScrollPosition () {
      const $el = this.$refs.content
      if (!$el || this.selectedIndex === null) return

      const activeItem = this.tiles[this.selectedIndex]
      if (activeItem) {
        $el.scrollTop = activeItem.offsetTop - $el.offsetHeight / 2 + activeItem.offsetHeight / 2
      } else {
        $el.scrollTop = 0
      }
    },
    calcLeftAuto () {
      if (this.isAttached) return 0

      return parseInt(this.dimensions.activator.left - this.defaultOffset * 2)
    },
    calcTopAuto () {
      const selectedIndex = Array.from(this.tiles)
        .findIndex(n => n.classList.contains('v-list__tile--active'))

      if (selectedIndex === -1) {
        this.selectedIndex = null

        return this.computedTop
      }

      const tileHeight = this.tiles[selectedIndex].offsetHeight

      this.selectedIndex = selectedIndex
      this.stopIndex = this.tiles.length > 4
        ? this.tiles.length - 4
        : this.tiles.length
      let additionalOffset = this.defaultOffset
      let offsetPadding

      // Menu should be centered
      if (selectedIndex > this.startIndex &&
        selectedIndex < this.stopIndex
      ) {
        offsetPadding = 1.5 * tileHeight
      // Menu should be offset top
      } else if (selectedIndex >= this.stopIndex) {
        // Being offset top means
        // we have to account for top
        // and bottom list padding
        additionalOffset *= 2
        offsetPadding = (selectedIndex - this.stopIndex) * tileHeight
      // Menu should be offset bottom
      } else {
        offsetPadding = selectedIndex * tileHeight
      }

      return (
        this.computedTop +
        additionalOffset -
        offsetPadding -
        (tileHeight / 2)
      )
    }
  }
}
