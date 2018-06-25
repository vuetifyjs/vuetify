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

/* @vue/component */
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
      if ([
        keyCodes.down,
        keyCodes.up,
        keyCodes.enter
      ].includes(e.keyCode)
      ) e.preventDefault()

      if ([keyCodes.esc, keyCodes.tab].includes(e.keyCode)) {
        return this.isActive = false
      }

      // For infinite scroll and autocomplete, re-evaluate children
      this.getTiles()

      if (e.keyCode === keyCodes.down && this.listIndex < this.tiles.length - 1) {
        this.listIndex++
        // Allow user to set listIndex to -1 so
        // that the list can be un-highlighted
      } else if (e.keyCode === keyCodes.up && this.listIndex > -1) {
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
