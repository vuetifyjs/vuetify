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
    genFiltered (text) {
      if (!this.isAutocomplete ||
        !this.searchValue ||
        this.filteredItems.length < 1
      ) return text

      text = (text || '').toString()

      const { start, middle, end } = this.getMaskedCharacters(text)

      return `${start}${this.genHighlight(middle)}${end}`
    },
    genHighlight (text) {
      return `<span class="list__tile__mask">${text}</span>`
    },
    getMaskedCharacters (text) {
      const searchValue = (this.searchValue || '').toString().toLowerCase()
      const index = text.toLowerCase().indexOf(searchValue)

      const start = text.slice(0, index)
      const middle = text.slice(index, index + searchValue.length)
      const end = text.slice(index + searchValue.length)
      return { start, middle, end }
    },
    filterSearch () {
      if (!this.isAutocomplete) return this.computedItems

      return this.computedItems.filter(i => this.filter(
        i, this.searchValue, this.getText(i))
      )
    },
    onKeyDown (e) {
      // If enter or space is pressed, open menu
      if (!this.menuIsActive &&
        [13, 32, 38, 40].includes(e.keyCode)
      ) {
        return this.showMenuItems()
      } else if ([9, 27].includes(e.keyCode)) {
        // If select is being tabbed, blur
        return this.blur()
      } else if (e.keyCode === 13 &&
        this.searchValue &&
        this.tags &&
        !this.filteredItems.length
      ) {
        this.selectedItems.push(this.searchValue)

        this.$nextTick(() => {
          this.searchValue = null
          this.$emit('change', this.selectedItems)
        })
      }

      if (!this.tags ||
        ![32].includes(e.keyCode)
      ) this.$refs.menu.changeListIndex(e)

      if ([38, 40].includes(e.keyCode)) this.selectedIndex = -1

      if (this.isAutocomplete &&
        !this.hideSelections &&
        !this.searchValue
      ) this.changeSelectedIndex(e.keyCode)
    }
  }
}
