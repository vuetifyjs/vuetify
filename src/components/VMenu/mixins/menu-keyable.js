/**
 * Menu keyable
 *
 * @mixin
 *
 * Primarily used to support VSelect
 * Handles opening and closing of VMenu from keystrokes
 * Will conditionally highlight VListTiles for VSelect
 */
export default {
  data: () => ({
    listIndex: -1,
    tiles: []
  }),

  watch: {
    isActive (val) {
      if (!val) this.listIndex = -1
    },
    listIndex (next, prev) {
      // For infinite scroll and autocomplete, re-evaluate children
      this.getTiles()

      if (next in this.tiles) {
        this.tiles[next].classList.add('list__tile--highlighted')
        this.$refs.content.scrollTop = next * 48
      }

      prev in this.tiles &&
        this.tiles[prev].classList.remove('list__tile--highlighted')
    }
  },

  methods: {
    changeListIndex (e) {
      // Up, Down, Enter, Space
      if ([40, 38, 13].includes(e.keyCode) ||
        e.keyCode === 32 && !this.isActive
      ) {
        e.preventDefault()
      }

      // Esc, Tab
      if ([27, 9].includes(e.keyCode)) return this.isActive = false
      else if (!this.isActive &&
        // Enter, Space
        [13, 32].includes(e.keyCode) &&
        this.openOnClick
      ) {
        return this.isActive = true
      }

      // Down
      if (e.keyCode === 40 && this.listIndex < this.tiles.length - 1) {
        this.listIndex++
      // Up
      } else if (e.keyCode === 38 && this.listIndex > 0) {
        this.listIndex--
      // Enter
      } else if (e.keyCode === 13 && this.listIndex !== -1) {
        this.tiles[this.listIndex].click()
      }
    },
    getTiles () {
      this.tiles = this.$refs.content.querySelectorAll('.list__tile')
    }
  }
}
