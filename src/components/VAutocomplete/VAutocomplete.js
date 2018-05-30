// Styles
import '../../stylus/components/_autocompletes.styl'

// Extensions
import VSelect from '../VSelect/VSelect'
import VTextField from '../VTextField/VTextField'

// Utils
import { keyCodes } from '../../util/helpers'

export default {
  name: 'v-autocomplete',

  extends: VSelect,

  data: vm => ({
    attrsInput: null,
    editingIndex: -1,
    lazySearch: vm.searchInput,
    lazyValue: vm.value != null
      ? vm.value
      : vm.multi || vm.tags ? [] : undefined
  }),

  props: {
    allowOverflow: {
      type: Boolean,
      default: true
    },
    browserAutocomplete: {
      type: String,
      default: 'off'
    },
    combobox: Boolean,
    delimiters: Array,
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
    offsetY: {
      type: Boolean,
      default: true
    },
    offsetOverflow: {
      type: Boolean,
      default: true
    },
    searchInput: {
      default: undefined
    },
    tags: Boolean,
    transition: {
      type: [Boolean, String],
      default: false
    }
  },

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
    hasSlot () {
      return VSelect.computed.hasSlot.call(this) || this.tags
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
      return this.combobox || this.tags
    },
    isDirty () {
      return this.searchIsDirty || this.selectedItems.length > 0
    },
    isMulti () {
      return this.tags || VSelect.computed.isMulti.call(this)
    },
    isSearching () {
      if (this.isMulti) return this.searchIsDirty

      return this.internalSearch !== this.getText(this.selectedItem)
    },
    menuCanShow () {
      if (!this.isFocused) return false

      const filtered = this.hideSelected
        ? this.filteredItems.length - this.selectedItems.length > 0
        : this.filteredItems.length > 0

      if (this.isAnyValueAllowed) {
        return filtered
      }

      return filtered || !this.hideNoData
    },
    menuProps () {
      return Object.assign(VSelect.computed.menuProps.call(this), {
        contentClass: (`v-autocomplete__content ${this.contentClass || ''}`).trim(),
        value: this.menuCanShow && this.isMenuActive
      })
    },
    searchIsDirty () {
      return this.internalSearch != null &&
        this.internalSearch !== ''
    },
    selectedItem () {
      if (this.isMulti) return null

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
      if (this.isAnyValueAllowed) return

      this.setMenuIndex(-1)

      this.$nextTick(() => {
        this.setMenuIndex(val.length === 1 ? 0 : -1)
      })
    },
    internalValue () {
      this.setSearch()
    },
    isFocused (val) {
      if (val) {
        this.$refs.input &&
          this.$refs.input.select()
      }
    },
    isMenuActive (val) {
      if (val || !this.hasSlot) return

      this.lazySearch = null
    },
    searchInput (val) {
      this.lazySearch = val
    },
    internalSearch (val) {
      if (
        val &&
        this.tags &&
        this.delimiters
      ) {
        const delimiter = this.delimiters.find(d => val.endsWith(d))
        if (delimiter == null) return

        this.internalSearch = val.slice(0, val.length - delimiter.length)
        this.updateTags()
      }

      if (this.isMenuActive &&
        this.$refs.menu
      ) {
        this.$refs.menu.updateDimensions()
      }
    }
  },

  created () {
    this.setSearch()
  },

  methods: {
    activateMenu () {
      if (this.menuCanShow) {
        this.isMenuActive = true
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
          this.internalValue = this.isMulti ? [] : undefined
        } else {
          this.selectItem(currentItem)
        }

        this.selectedIndex = newIndex
      }
    },
    clearableCallback () {
      this.internalSearch = null

      VSelect.methods.clearableCallback.call(this)
    },
    genChipSelection (item, index) {
      const chip = VSelect.methods.genChipSelection.call(this, item, index)

      // Allow user to update an existing value
      if (this.tags) {
        chip.componentOptions.listeners.dblclick = () => {
          this.editingIndex = index
          this.internalSearch = this.getText(item)
          this.selectedIndex = -1
        }
      }

      return chip
    },
    genInput () {
      const input = VTextField.methods.genInput.call(this)

      input.data.attrs.role = 'combobox'
      input.data.domProps.value = this.internalSearch

      return input
    },
    genSelections () {
      return this.hasSlot || this.isMulti
        ? VSelect.methods.genSelections.call(this)
        : []
    },
    onBlur (e) {
      this.updateSelf()
      VSelect.methods.onBlur.call(this, e)
    },
    onClick () {
      if (this.isDisabled) return

      this.selectedIndex > -1
        ? (this.selectedIndex = -1)
        : this.onFocus()

      this.activateMenu()
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

      // If user is at selection index of 0
      // create a new tag
      if (this.tags &&
        keyCode === keyCodes.left &&
        this.$refs.input.selectionStart === 0
      ) {
        this.updateSelf()
      }

      // The ordering is important here
      // allows new value to be updated
      // and then moves the index to the
      // proper location
      this.changeSelectedIndex(keyCode)
    },
    onTabDown (e) {
      const menuIndex = this.getMenuIndex()

      // When adding tags, if searching and
      // there is not a filtered options,
      // add the value to the tags list
      if (this.tags &&
        this.internalSearch &&
        menuIndex === -1
      ) {
        e.preventDefault()
        e.stopPropagation()

        return this.updateTags()
      } else {
        VSelect.methods.onTabDown.call(this, e)
      }

      this.updateSelf()
    },
    selectItem (item) {
      // Currently only supports items:<string[]>
      if (this.editingIndex > -1) {
        this.internalValue.splice(this.editingIndex, 1, this.internalSearch)
        this.editingIndex = -1
      } else {
        VSelect.methods.selectItem.call(this, item)
      }

      this.setSearch()
    },
    setSelectedItems () {
      if (this.internalValue == null ||
        this.internalValue === ''
      ) {
        this.selectedItems = []
      } else if (this.tags) {
        this.selectedItems = this.internalValue
      } else if (this.combobox) {
        this.selectedItems = [this.internalValue]
      } else {
        VSelect.methods.setSelectedItems.call(this)
      }
    },
    setSearch () {
      // Wait for nextTick so selectedItem
      // has had time to update
      this.$nextTick(() => {
        this.internalSearch = (
          !this.selectedItem ||
          this.isMulti ||
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
    },
    updateCombobox () {
      // When using chips and search is dirty
      // avoid updating input
      if (this.hasChips && !this.searchIsDirty) return

      // The internal search is not matching
      // the initial value, update the input
      if (this.internalSearch !== this.internalValue) this.setValue()

      // Reset search if using chips
      // to avoid a double input
      if (this.hasChips) this.internalSearch = undefined
    },
    updateSelf () {
      if (this.tags) this.updateTags()
      else if (this.combobox) this.updateCombobox()
      else this.updateAutocomplete()
    },
    // Maybe change to onBlur?
    updateTags () {
      const menuIndex = this.getMenuIndex()

      // If the user is not searching
      // and no menu item is selected
      // do nothing
      if (menuIndex < 0 &&
        !this.searchIsDirty
      ) return

      const index = this.selectedItems.indexOf(this.internalSearch)
      // If it already exists, do nothing
      // this might need to change to bring
      // the duplicated item to the last entered
      if (index > -1) {
        this.internalValue.splice(index, 1)
      }

      // If menu index is greater than 1
      // the selection is handled elsewhere
      // TODO: find out where
      if (menuIndex > -1) return (this.internalSearch = null)

      this.selectItem(this.internalSearch)
      this.internalSearch = null
    }
  }
}
