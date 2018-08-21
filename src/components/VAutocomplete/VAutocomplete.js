// Styles
import '../../stylus/components/_autocompletes.styl'

// Extensions
import VSelect, { defaultMenuProps as VSelectMenuProps } from '../VSelect/VSelect'
import VTextField from '../VTextField/VTextField'

// Utils
import { keyCodes } from '../../util/helpers'

const defaultMenuProps = {
  ...VSelectMenuProps,
  offsetY: true,
  offsetOverflow: true,
  transition: false
}

/* @vue/component */
export default {
  name: 'v-autocomplete',

  extends: VSelect,

  props: {
    allowOverflow: {
      type: Boolean,
      default: true
    },
    browserAutocomplete: {
      type: String,
      default: 'off'
    },
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
    },
    hideNoData: Boolean,
    noFilter: Boolean,
    searchInput: {
      default: undefined
    },
    menuProps: {
      type: VSelect.props.menuProps.type,
      default: () => defaultMenuProps
    }
  },

  data: vm => ({
    attrsInput: null,
    lazySearch: vm.searchInput
  }),

  computed: {
    classes () {
      return Object.assign({}, VSelect.computed.classes.call(this), {
        'v-autocomplete': true,
        'v-autocomplete--is-selecting-index': this.selectedIndex > -1
      })
    },
    computedItems () {
      return this.filteredItems
    },
    displayedItemsCount () {
      return this.hideSelected
        ? this.filteredItems.length - this.selectedItems.length
        : this.filteredItems.length
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
      if (!this.isSearching || this.noFilter) return this.allItems

      return this.allItems.filter(i => this.filter(i, this.internalSearch, this.getText(i)))
    },
    internalSearch: {
      get () {
        return this.lazySearch
      },
      set (val) {
        this.lazySearch = val

        this.$emit('update:searchInput', val)
      }
    },
    isAnyValueAllowed () {
      return false
    },
    isDirty () {
      return this.searchIsDirty || this.selectedItems.length > 0
    },
    isSearching () {
      if (this.multiple) return this.searchIsDirty

      return (
        this.searchIsDirty &&
        this.internalSearch !== this.getText(this.selectedItem)
      )
    },
    menuCanShow () {
      if (!this.isFocused) return false

      return (this.displayedItemsCount > 0) || !this.hideNoData
    },
    $_menuProps () {
      const props = VSelect.computed.$_menuProps.call(this)
      props.contentClass = `v-autocomplete__content ${props.contentClass || ''}`.trim()
      return {
        ...defaultMenuProps,
        ...props
      }
    },
    searchIsDirty () {
      return this.internalSearch != null &&
        this.internalSearch !== ''
    },
    selectedItem () {
      if (this.multiple) return null

      return this.selectedItems.find(i => {
        return this.valueComparator(this.getValue(i), this.getValue(this.internalValue))
      })
    },
    listData () {
      const data = VSelect.computed.listData.call(this)

      Object.assign(data.props, {
        items: this.virtualizedItems,
        noFilter: (
          this.noFilter ||
          !this.isSearching ||
          !this.filteredItems.length
        ),
        searchInput: this.internalSearch
      })

      return data
    }
  },

  watch: {
    filteredItems (val) {
      this.onFilteredItemsChanged(val)
    },
    internalValue () {
      this.setSearch()
    },
    isFocused (val) {
      if (val) {
        this.$refs.input &&
          this.$refs.input.select()
      } else {
        this.updateSelf()
      }
    },
    isMenuActive (val) {
      if (val || !this.hasSlot) return

      this.lazySearch = null
    },
    items (val) {
      // If we are focused, the menu
      // is not active and items change
      // User is probably async loading
      // items, try to activate the menu
      if (
        this.isFocused &&
        !this.isMenuActive &&
        val.length
      ) this.activateMenu()
    },
    searchInput (val) {
      this.lazySearch = val
    },
    internalSearch (val) {
      this.onInternalSearchChanged(val)
    }
  },

  created () {
    this.setSearch()
  },

  methods: {
    onFilteredItemsChanged (val) {
      this.setMenuIndex(-1)

      this.$nextTick(() => {
        this.setMenuIndex(val.length === 1 ? 0 : -1)
      })
    },
    onInternalSearchChanged (val) {
      this.updateMenuDimensions()
    },
    updateMenuDimensions () {
      if (this.isMenuActive &&
        this.$refs.menu
      ) {
        this.$refs.menu.updateDimensions()
      }
    },
    changeSelectedIndex (keyCode) {
      // Do not allow changing of selectedIndex
      // when search is dirty
      if (this.searchIsDirty) return

      if (![
        keyCodes.backspace,
        keyCodes.left,
        keyCodes.right,
        keyCodes.delete
      ].includes(keyCode)) return

      const indexes = this.selectedItems.length - 1

      if (keyCode === keyCodes.left) {
        this.selectedIndex = this.selectedIndex === -1
          ? indexes
          : this.selectedIndex - 1
      } else if (keyCode === keyCodes.right) {
        this.selectedIndex = this.selectedIndex >= indexes
          ? -1
          : this.selectedIndex + 1
      } else if (this.selectedIndex === -1) {
        this.selectedIndex = indexes
        return
      }

      const currentItem = this.selectedItems[this.selectedIndex]

      if ([
        keyCodes.backspace,
        keyCodes.delete
      ].includes(keyCode) &&
        !this.getDisabled(currentItem)
      ) {
        const newIndex = this.selectedIndex === indexes
          ? this.selectedIndex - 1
          : this.selectedItems[this.selectedIndex + 1]
            ? this.selectedIndex
            : -1

        if (newIndex === -1) {
          this.internalValue = this.multiple ? [] : undefined
        } else {
          this.selectItem(currentItem)
        }

        this.selectedIndex = newIndex
      }
    },
    clearableCallback () {
      this.internalSearch = undefined

      VSelect.methods.clearableCallback.call(this)
    },
    genInput () {
      const input = VTextField.methods.genInput.call(this)

      input.data.attrs.role = 'combobox'
      input.data.domProps.value = this.internalSearch

      return input
    },
    genSelections () {
      return this.hasSlot || this.multiple
        ? VSelect.methods.genSelections.call(this)
        : []
    },
    onClick () {
      if (this.isDisabled) return

      this.selectedIndex > -1
        ? (this.selectedIndex = -1)
        : this.onFocus()

      this.activateMenu()
    },
    onEnterDown () {
      // Avoid invoking this method
      // will cause updateSelf to
      // be called emptying search
    },
    onInput (e) {
      if (this.selectedIndex > -1) return

      // If typing and menu is not currently active
      if (e.target.value) {
        this.activateMenu()
        if (!this.isAnyValueAllowed) this.setMenuIndex(0)
      }

      this.mask && this.resetSelections(e.target)
      this.internalSearch = e.target.value
      this.badInput = e.target.validity && e.target.validity.badInput
    },
    onKeyDown (e) {
      const keyCode = e.keyCode

      VSelect.methods.onKeyDown.call(this, e)

      // The ordering is important here
      // allows new value to be updated
      // and then moves the index to the
      // proper location
      this.changeSelectedIndex(keyCode)
    },
    onTabDown (e) {
      VSelect.methods.onTabDown.call(this, e)
      this.updateSelf()
    },
    selectItem (item) {
      VSelect.methods.selectItem.call(this, item)

      this.setSearch()
    },
    setSelectedItems () {
      VSelect.methods.setSelectedItems.call(this)

      // #4273 Don't replace if searching
      // #4403 Don't replace if focused
      if (!this.isFocused) this.setSearch()
    },
    setSearch () {
      // Wait for nextTick so selectedItem
      // has had time to update
      this.$nextTick(() => {
        this.internalSearch = (
          !this.selectedItem ||
          this.multiple ||
          this.hasSlot
        )
          ? null
          : this.getText(this.selectedItem)
      })
    },
    setValue () {
      this.internalValue = this.internalSearch
      this.$emit('change', this.internalSearch)
    },
    updateSelf () {
      this.updateAutocomplete()
    },
    updateAutocomplete () {
      if (!this.searchIsDirty &&
        !this.internalValue
      ) return

      if (!this.valueComparator(
        this.internalSearch,
        this.getValue(this.internalValue)
      )) {
        this.setSearch()
      }
    }
  }
}
