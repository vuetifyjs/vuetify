/**
 * Select computed properties
 *
 * @mixin
 *
 * Computed properties for
 * the v-select component
 */
export default {
  computed: {
    classes () {
      const classes = {
        ...this.genSoloClasses(),
        'input-group--text-field input-group--select': true,
        'input-group--auto': this.auto,
        'input-group--overflow': this.overflow,
        'input-group--segmented': this.segmented,
        'input-group--editable': this.editable,
        'input-group--autocomplete': this.isAutocomplete,
        'input-group--single-line': this.singleLine || this.isDropdown,
        'input-group--multi-line': this.multiLine,
        'input-group--chips': this.chips,
        'input-group--multiple': this.multiple,
        'input-group--open': this.menuIsVisible,
        'input-group--select--selecting-index': this.selectedIndex > -1
      }

      if (this.hasError) {
        classes['error--text'] = true
      } else {
        return this.addTextColorClassChecks(classes)
      }

      return classes
    },
    computedContentClass () {
      const children = [
        'menu__content--select',
        this.auto ? 'menu__content--auto' : '',
        this.isDropdown ? 'menu__content--dropdown' : '',
        this.isAutocomplete ? 'menu__content--autocomplete' : '',
        this.contentClass || ''
      ]

      return children.join(' ')
    },
    computedItems () {
      return this.filterDuplicates(this.cachedItems.concat(this.items))
    },
    /**
     * The range of the current input text
     *
     * @return {Number}
     */
    currentRange () {
      if (this.selectedItem == null) return 0

      return this.getText(this.selectedItem).toString().length
    },
    filteredItems () {
      // If we are not actively filtering
      // Show all available items
      const items = this.isNotFiltering
        ? this.computedItems
        : this.filterSearch()

      return !this.auto ? items.slice(0, this.lastItem) : items
    },
    hideSelections () {
      return this.isAutocomplete &&
        !this.isMultiple &&
        this.isFocused &&
        !this.chips &&
        !this.$scopedSlots.selection
    },
    isNotFiltering () {
      return this.isAutocomplete &&
        this.isDirty &&
        this.searchValue === this.getText(this.selectedItem)
    },
    isHidingSelected () {
      return this.hideSelected && this.isAutocomplete && this.isMultiple
    },
    isAutocomplete () {
      return this.autocomplete || this.editable || this.tags || this.combobox
    },
    isDirty () {
      return this.selectedItems.length > 0 ||
        (this.isAutocomplete && this.searchValue)
    },
    isDropdown () {
      return this.segmented || this.overflow || this.editable || this.isSolo
    },
    isMultiple () {
      return this.multiple || this.tags
    },
    isAnyValueAllowed () {
      return this.tags || this.combobox
    },
    menuIsVisible () {
      return this.menuIsActive &&
        this.computedItems.length > 0 &&
        (!this.isAnyValueAllowed || this.filteredItems.length > 0)
    },
    menuItems () {
      return this.isHidingSelected ? this.filteredItems.filter(o => {
        return (this.selectedItems || []).indexOf(o) === -1
      }) : this.filteredItems
    },
    nudgeTop () {
      let nudgeTop = -18

      if (this.isSolo) nudgeTop = 0
      else if (this.shouldOffset) {
        nudgeTop += 44

        nudgeTop += this.hideDetails ? -24 : 0
        nudgeTop += this.isAutocomplete && !this.isDropdown ? -2 : 0
      }

      return nudgeTop
    },
    searchValue: {
      get () { return this.lazySearch },
      set (val) {
        if (!this.isAutocomplete ||
          (!this.multiple && this.selectedIndex > -1)
        ) return

        this.lazySearch = val

        this.$emit('update:searchInput', val)
      }
    },
    selectedItem () {
      if (this.isMultiple) return null

      return this.selectedItems.find(i => (
        this.getValue(i) === this.getValue(this.inputValue)
      ))
    },
    shouldOffset () {
      return this.isAutocomplete || this.isDropdown
    }
  }
}
