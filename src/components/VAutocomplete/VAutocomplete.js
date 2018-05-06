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
    lazySearch: vm.searchInput,
    lazyValue: vm.value != null
      ? vm.value
      : vm.multi || vm.tags ? [] : undefined
  }),

  props: {
    browserAutocomplete: {
      type: String,
      default: 'off'
    },
    combobox: Boolean,
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
    noFilter: Boolean,
    offsetY: {
      type: Boolean,
      default: true
    },
    searchInput: {
      default: null
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
      const items = this.filterDuplicates(this.cachedItems.concat(this.items))

      if (!this.isSearching || this.noFilter) return items

      return items.filter(i => this.filter(i, this.internalSearch, this.getText(i)))
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

      return this.internalSearch !== this.getText(this.internalValue)
    },
    menuCanShow () {
      if (!this.isAnyValueAllowed) return true

      return this.isFocused && this.filteredItems.length > 0
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
    }
  },

  watch: {
    filteredItems () {
      this.setMenuIndex(-1)
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
    genInput () {
      const input = VTextField.methods.genInput.call(this)

      input.data.attrs.role = 'combobox'
      input.data.domProps.value = this.internalSearch

      return input
    },
    genList () {
      const list = VSelect.methods.genList.call(this)

      list.componentOptions.propsData.items = this.filteredItems
      list.componentOptions.propsData.noFilter = (
        this.noFilter ||
        !this.isSearching ||
        !this.filteredItems.length
      )
      list.componentOptions.propsData.searchInput = this.internalSearch

      return list
    },
    genMenu (activator) {
      const menu = VSelect.methods.genMenu.call(this, activator)

      menu.componentOptions.propsData.contentClass = 'v-autocomplete__content'
      menu.componentOptions.propsData.value = this.menuCanShow && this.isMenuActive

      return menu
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
    onClick (e) {
      if (this.isDisabled) return

      if (e.target !== this.$refs.input) this.onFocus()
      this.activateMenu()
    },
    onEnterDown () {
      this.onBlur()
    },
    onEscDown (e) {
      e.preventDefault()
      this.isMenuActive = false
    },
    onInput (e) {
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

      // If enter, space, up, or down is pressed, open menu
      if (!this.isMenuActive &&
        [keyCodes.enter, keyCodes.space, keyCodes.up, keyCodes.down].includes(keyCode)
      ) this.activateMenu()

      // This should do something different
      if (e.keyCode === keyCodes.enter) return this.onEnterDown()

      // If escape deactivate the menu
      if (keyCode === keyCodes.esc) return this.onEscDown(e)

      // If tab - select item or close menu
      if (keyCode === keyCodes.tab) return this.onTabDown(e)

      if (this.$refs.input.selectionStart === 0) this.updateSelf()
      if (!this.hideSelections) this.changeSelectedIndex(keyCode)
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
      // An item that is selected by
      // menu-index should toggled
      } else if (this.isMenuActive && menuIndex > -1) {
        // Reset the list index if searching
        this.internalSearch &&
          this.$nextTick(() => setTimeout(() => this.setMenuIndex(-1), 0))

        e.preventDefault()
        this.selectListTile(menuIndex)
      } else {
        // If we make it here,
        // the user has no selected indexes
        // and is probably tabbing out
        this.isFocused = false
      }

      this.updateSelf()
    },
    selectItem (item) {
      VSelect.methods.selectItem.call(this, item)

      this.setSearch()
    },
    selectListTile (index) {
      if (!this.$refs.menu.tiles[index]) return

      this.$refs.menu.tiles[index].click()
    },
    setSelectedItems () {
      if (this.internalValue == null) {
        this.selectedItems = []
      } else if (this.tags) {
        this.selectedItems = this.internalValue
      } else if (this.combobox) {
        this.selectedItems = [this.internalValue]
      } else {
        VSelect.methods.setSelectedItems.call(this)
      }
    },
    setMenuIndex (index) {
      this.$refs.menu && (this.$refs.menu.listIndex = index)
    },
    setSearch () {
      if (this.hasSlot || this.isMulti) return

      this.lazySearch = this.getText(this.internalValue)
    },
    setValue () {
      this.internalValue = this.internalSearch
      this.$emit('change', this.internalSearch)
    },
    updateAutocomplete () {
      if (!this.searchIsDirty &&
        !this.internalValue
      ) return

      if (this.isMulti) return (this.internalSearch = null)

      if (!this.valueComparator(
        this.internalSearch,
        this.getValue(this.internalValue)
      )) {
        this.internalSearch = this.initialValue
      }
    },
    updateCombobox () {
      if (this.internalSearch !== this.internalValue) this.setValue()
      else this.updateAutocomplete()
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
