/**
 * Select autocomplete
 *
 * @mixin
 *
 * Handles logic when using the "autocomplete" prop
 */
export default {
  props: {
    filter: {
      type: Function,
      default: (item, queryText, itemText) => {
        const hasValue = val => [undefined, null].includes(val)

        const text = hasValue(itemText) ? '' : itemText
        const query = hasValue(queryText) ? '' : queryText

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      }
    },
    selectionKeys: {
      type: Array,
      default: () => [9, 13] // Tab and enter
    }
  },

  methods: {
    filterSearch () {
      if (!this.isAutocomplete) return this.computedItems

      return this.computedItems.filter(i => this.filter(
        i, this.searchValue, this.getText(i))
      )
    },
    async onKeyDown (e) {
      // If enter, space, up, or down is pressed, open menu
      if (!this.menuIsActive && [13, 32, 38, 40].includes(e.keyCode)) {
        return this.showMenuItems()
      }

      // If escape or tab with no search, blur
      if (e.keyCode === 27 || e.keyCode === 9 && !this.searchValue) {
        return this.blur()
      }

      // Tab shouldn't switch inputs
      if (e.keyCode === 9 && this.selectionKeys.includes(9)) {
        e.preventDefault()
      }

      if (
        this.tags &&
        this.selectionKeys.includes(e.keyCode) &&
        this.searchValue &&
        !this.filteredItems.length
      ) {
        this.selectedItems.push(this.searchValue)

        await this.$nextTick()

        this.searchValue = null
        this.$emit('change', this.selectedItems)
      }

      if (!this.tags ||
        ![32].includes(e.keyCode) // space
      ) this.$refs.menu.changeListIndex(e)

      // Up or down
      if ([38, 40].includes(e.keyCode)) this.selectedIndex = -1

      if (this.isAutocomplete &&
        !this.hideSelections &&
        !this.searchValue
      ) this.changeSelectedIndex(e.keyCode)
    }
  }
}
