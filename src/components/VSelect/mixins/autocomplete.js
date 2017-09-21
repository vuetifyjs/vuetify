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
