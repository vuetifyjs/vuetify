import { escapeHTML } from '../../../util/helpers'

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
    filterSearch () {
      if (!this.isAutocomplete) return this.computedItems

      return this.computedItems.filter(i => this.filter(
        i, this.searchValue, this.getText(i))
      )
    },
    genFiltered (text) {
      text = (text || '').toString()

      if (!this.isAutocomplete ||
        !this.searchValue ||
        this.filteredItems.length < 1
      ) return escapeHTML(text)

      const { start, middle, end } = this.getMaskedCharacters(text)

      return `${escapeHTML(start)}${this.genHighlight(middle)}${escapeHTML(end)}`
    },
    genHighlight (text) {
      if (this.isNotFiltering) return escapeHTML(text)

      return `<span class="list__tile__mask">${escapeHTML(text)}</span>`
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
    },
    onTabDown (e) {
      // If tabbing through inputs and
      // and there is no need for an
      // update, blur the v-select
      if (!this.isAutocomplete || !this.getCurrentTag() || this.combobox) return this.tabOut()

      const menuIndex = this.getMenuIndex()

      // When adding tags, if searching and
      // there is not a filtered options,
      // add the value to the tags list
      if (this.tags &&
        this.searchValue &&
        menuIndex === -1
      ) {
        e.preventDefault()

        return this.updateTags(this.searchValue)
      }

      // An item that is selected by
      // menu-index should toggled
      if (this.menuIsActive) {
        // Reset the list index if searching
        this.searchValue && this.$nextTick(() => setTimeout(this.resetMenuIndex, 0))

        e.preventDefault()
        this.selectListTile(menuIndex)
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
        return this.showMenu()
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

      if (!this.isAnyValueAllowed || !this.searchValue) return

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
    selectListTile (index) {
      if (!this.$refs.menu.tiles[index]) return

      this.$refs.menu.tiles[index].click()
    },
    updateTags (content) {
      // Avoid direct mutation
      // for vuex strict mode
      let selectedItems = this.selectedItems.slice()

      // If a duplicate item
      // exists, remove it
      if (selectedItems.includes(content)) {
        this.$delete(selectedItems, selectedItems.indexOf(content))
      }

      // When updating tags ensure
      // that that the search text
      // is populated if needed
      let searchValue = null
      if (this.combobox) {
        selectedItems = [content]
        searchValue = this.chips ? null : content
      } else {
        selectedItems.push(content)
      }

      this.selectedItems = selectedItems

      this.$nextTick(() => {
        this.searchValue = searchValue
        this.$emit('input', this.combobox ? content : this.selectedItems)
      })
    }
  }
}
