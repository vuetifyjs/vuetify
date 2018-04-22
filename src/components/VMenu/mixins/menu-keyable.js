/**
 * Menu keyable
 *
 * @mixin
 *
 * Primarily used to support VSelect
 * Handles opening and closing of VMenu from keystrokes
 * Will conditionally highlight VListTiles for VSelect
 */

// Utils
import { keyCodes } from '../../../util/helpers'

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
        const tile = this.tiles[next]
        tile.classList.add('v-list__tile--highlighted')
        this.$refs.content.scrollTop = tile.offsetTop - tile.clientHeight
      }

      prev in this.tiles &&
        this.tiles[prev].classList.remove('v-list__tile--highlighted')
    }
  },

  methods: {
    changeListIndex (e) {
      if ([keyCodes.down, keyCodes.up, keyCodes.enter].includes(e.keyCode) ||
        (e.keyCode === keyCodes.space && !this.isActive)
      ) {
        e.preventDefault()
      }

      if ([keyCodes.esc, keyCodes.tab].includes(e.keyCode)) return this.isActive = false
      else if (!this.isActive &&
        [keyCodes.enter, keyCodes.space].includes(e.keyCode) &&
        this.openOnClick
      ) {
        return this.isActive = true
      }

      if (e.keyCode === keyCodes.down && this.listIndex < this.tiles.length - 1) {
        this.listIndex++
      } else if (e.keyCode === keyCodes.up && this.listIndex > 0) {
        this.listIndex--
      } else if (e.keyCode === keyCodes.enter && this.listIndex !== -1) {
        this.tiles[this.listIndex].click()
      }
    },
    getTiles () {
      this.tiles = this.$refs.content.querySelectorAll('.v-list__tile')
    }
  }
}
