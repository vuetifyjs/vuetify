/**
 * Select watchers
 *
 * @mixin
 *
 * Watchers for the
 * v-select component
 */
export default {
  watch: {
    inputValue (val) {
      // Populate selected items
      this.genSelectedItems(val)

      // Only fire an update
      // if values do not
      // match
      val !== this.value && this.$emit('input', val)

      // When inputValue is changed
      // and combobox is true set
      // menu property to false
      if (this.combobox) this.menuIsActive = false
    },
    isActive (val) {
      if (val) {
        if (!this.chips && !this.$scopedSlots.selection) {
          this.searchValue = this.getText(this.selectedItem)
        }
        return
      }

      this.blur()

      if (this.tags && this.searchValue) {
        this.updateTags(this.searchValue)
      }

      if (this.combobox) {
        this.inputValue = this.lazySearch
      }

      // Only set search value if
      // there is a value to set
      this.searchValue && (this.searchValue = null)
    },
    isBooted () {
      this.$nextTick(() => {
        if (this.content && this.content.addEventListener) {
          this.content.addEventListener('scroll', this.onScroll, false)
        }
      })
    },
    items (val) {
      if (this.cacheItems) {
        this.cachedItems = this.filterDuplicates(this.cachedItems.concat(val))
      }

      this.resetMenuIndex()

      // Tags and combobox should not
      // pre-select the first entry
      if (this.searchValue && !this.isAnyValueAllowed) {
        this.$nextTick(() => this.setMenuIndex(0))
      }

      this.genSelectedItems()
    },
    menuIsActive (val) {
      if (!val) return

      this.isBooted = true
    },
    isMultiple (val) {
      this.inputValue = val ? [] : null
    },
    searchInput (val) {
      this.searchValue = val
    },
    searchValue (val, prev) {
      // Wrap input to next line if overflowing
      if (this.$refs.input.scrollWidth > this.$refs.input.clientWidth) {
        this.shouldBreak = true
        this.$nextTick(this.$refs.menu.updateDimensions)
      } else if (val === null) {
        this.shouldBreak = false
      }

      // Activate menu if inactive and searching
      if (this.isActive &&
        !this.menuIsActive &&
        val !== this.getValue(this.selectedItem)
      ) {
        this.menuIsActive = true
      }

      // Only reset list index
      // if typing in search
      val || prev && this.resetMenuIndex()

      this.$nextTick(() => {
        if (val && !this.isAnyValueAllowed) {
          this.setMenuIndex(0)
        }
      })
    },
    selectedItems () {
      clearTimeout(this.searchTimeout)

      if (this.isAutocomplete) {
        this.$nextTick(this.$refs.menu.updateDimensions)
      }
    },
    value (val) {
      this.inputValue = val
      this.validate()
    }
  }
}
