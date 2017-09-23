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
    }
  },

  methods: {
    filterSearch () {
      if (!this.isAutocomplete) return this.computedItems

      return this.computedItems.filter(i => this.filter(
        i, this.searchValue, this.getText(i))
      )
    },
    onKeyDown (e) {
      // If enter, space, up, or down is pressed, open menu
      if (!this.menuIsActive && [13, 32, 38, 40].includes(e.keyCode)) {
        return this.showMenuItems()
      }

      // If escape or tab with no search, blur
      if (e.keyCode === 27 || e.keyCode === 9 && !this.searchValue) {
        return this.blur()
      }

      // Tab shouldn't switch inputs
      if (e.keyCode === 9) {
        e.preventDefault()
      }

      if (this.tags && this.searchValue) {
        let newItem
        // Tab, enter
        if ([9, 13].includes(e.keyCode)) {
          newItem = this.filteredItems.length && this.$refs.menu.listIndex >= 0
            ? this.filteredItems[this.$refs.menu.listIndex]
            : this.searchValue
        }

        // Left arrow
        if (e.keyCode === 37 && this.$refs.input.selectionStart === 0) {
          newItem = this.searchValue
          this.$nextTick(() => {
            this.searchValue = null
            this.selectedIndex = this.selectedItems.length > 1
              ? this.selectedItems.length - 2
              : 0
          })
        }

        if (newItem != null) {
          this.selectedItems.push(newItem)
          this.$nextTick(() => {
            this.searchValue = null
            this.$emit('change', this.selectedItems)
          })
        }

        // Right arrow
        if (e.keyCode === 39 && this.$refs.input.selectionEnd === this.searchValue.length) {
          this.$nextTick(() => {
            this.$refs.menu.listIndex = -1
          })
        }
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
