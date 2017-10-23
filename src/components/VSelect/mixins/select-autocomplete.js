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
        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      }
    }
  },

  methods: {
    updateTags (content) {
      if (this.selectedItems.includes(content)) {
        this.$delete(this.selectedItems, this.selectedItems.indexOf(content))
      } else {
        this.selectedItems.push(content)
      }

      this.$nextTick(() => {
        this.searchValue = null
        this.$emit('change', this.selectedItems)
      })
    },
    filterSearch () {
      if (!this.isAutocomplete) return this.computedItems

      return this.computedItems.filter(i => this.filter(
        i, this.searchValue, this.getText(i))
      )
    },
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
    getCurrentTag () {
      return this.isMenuItemSelected()
        ? this.filteredItems[this.getMenuIndex()]
        : (this.isAnyValueAllowed ? this.searchValue : null)
    },
    tabOut () {
      this.blur()

      if (this.isAutocomplete && !this.isMultiple && !this.searchValue) {
        // Single (not multiple) autocomplete select with an
        // empty search value should clear the input value
        this.inputValue = null
      } else if (this.combobox) {
        // For combo box use selected
        // menu item or searchValue
        this.inputValue = this.getCurrentTag()
      }
    },
    onTabDown (e) {
      // If tabbing through inputs and
      // and there is no need for an
      // update, blur the v-select
      if (!this.isAutocomplete || !this.getCurrentTag() || this.combobox) return this.tabOut()

      // When adding tags, if searching and
      // there is not a filtered options,
      // add the value to the tags list
      if (this.tags &&
        this.searchValue &&
        !this.filteredItems.length
      ) {
        e.preventDefault()

        return this.updateTags(this.searchValue)
      }

      // An item that is selected by
      // menu-index should toggled
      if (this.menuIsActive) {
        e.preventDefault()
        this.selectListTile(this.getMenuIndex())
      }
    },
    onEnterDown () {
      this.updateTags(this.getCurrentTag())
    },
    onEscDown (e) {
      e.preventDefault()
      this.menuIsActive = false
    },
    onKeyDown (e) {
      // If enter, space, up, or down is pressed, open menu
      if (!this.menuIsActive && [13, 32, 38, 40].includes(e.keyCode)) {
        e.preventDefault()
        return this.showMenuItems()
      }

      // If escape deactivate the menu
      if (e.keyCode === 27) return this.onEscDown(e)

      // If tab - select item or close menu
      if (e.keyCode === 9) return this.onTabDown(e)

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

      // Enter
      if (e.keyCode === 13) return this.onEnterDown()

      // Left arrow
      if (e.keyCode === 37 && this.$refs.input.selectionStart === 0 && this.selectedItems.length) {
        this.updateTags(this.searchValue)
        this.$nextTick(() => {
          this.selectedIndex = Math.max(this.selectedItems.length - 2, 0)
        })
      }

      // Right arrow
      if (e.keyCode === 39 && this.$refs.input.selectionEnd === this.searchValue.length) {
        this.resetMenuIndex()
      }
    },
    addTag (content) {
      if (this.selectedItems.includes(content)) {
        this.$delete(this.selectedItems, this.selectedItems.indexOf(content))
      }
      this.selectedItems.push(content)

      this.$nextTick(() => {
        this.searchValue = null
        this.$emit('change', this.selectedItems)
      })
    },
    selectListTile (index) {
      if (!this.$refs.menu.tiles[index]) return

      this.$refs.menu.tiles[index].click()
    }
  }
}
