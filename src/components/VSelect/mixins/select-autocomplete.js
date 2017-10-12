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
      if (this.isNotFiltering) return text

      return `<span class="list__tile__mask">${text}</span>`
    },
    getMaskedCharacters (text) {
      const searchValue = (this.searchValue || '').toString().toLowerCase()
      const index = text.toLowerCase().indexOf(searchValue)

      if (index < 0) return { start: '', middle: text, end: '' }

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
      // If enter, space, up, or down is pressed, open menu
      if (!this.menuIsActive && [13, 32, 38, 40].includes(e.keyCode)) {
        e.preventDefault()
        return this.showMenuItems()
      }

      // If escape or tab with no search, blur
      if (e.keyCode === 27 || e.keyCode === 9 && !this.searchValue) {
        return this.blur()
      }

      // Tab shouldn't switch inputs
      if (e.keyCode === 9) {
        this.tags ? e.preventDefault() : this.blur()
      }

      if (!this.isAutocomplete ||
        ![32].includes(e.keyCode) // space
      ) this.$refs.menu.changeListIndex(e)

      // Up or down
      if ([38, 40].includes(e.keyCode)) this.selectedIndex = -1

      if (this.isAutocomplete &&
        !this.hideSelections &&
        !this.searchValue
      ) this.changeSelectedIndex(e.keyCode)

      if (!this.tags || !this.searchValue) return

      // Tab, enter
      if ([9, 13].includes(e.keyCode)) {
        const newItem = this.filteredItems.length && this.$refs.menu.listIndex >= 0
          ? this.filteredItems[this.$refs.menu.listIndex]
          : this.searchValue
        this.addTag(newItem)
      }

      // Left arrow
      if (e.keyCode === 37 && this.$refs.input.selectionStart === 0 && this.selectedItems.length) {
        this.addTag(this.searchValue)
        this.$nextTick(() => {
          this.selectedIndex = Math.max(this.selectedItems.length - 2, 0)
        })
      }

      // Right arrow
      if (e.keyCode === 39 && this.$refs.input.selectionEnd === this.searchValue.length) {
        this.$refs.menu.listIndex = -1
      }
    },
    addTag (content) {
      if (this.selectedItems.includes(content)) {
        this.$delete(this.selectedItems, this.selectedItems.indexOf(content))
      } else {
        this.selectedItems.push(content)
      }
      this.$nextTick(() => {
        this.searchValue = null
        this.$emit('change', this.selectedItems)
      })
    }
  }
}
