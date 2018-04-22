// Styles
import '../../stylus/components/_autocompletes.styl'

// Extensions
import VSelect from '../VSelect'
import VTextField from '../VTextField/VTextField'

// Utils
import {keyCodes} from '../../util/helpers'

export default {
  name: 'v-autocomplete',

  extends: VSelect,

  data: vm => ({
    attrsInput: null,
    lazySearch: vm.searchInput
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
    nudgeBottom: {
      type: [String, Number],
      default: 2
    },
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
    filteredItems () {
      const items = this.filterDuplicates(this.cachedItems.concat(this.items))

      if (!this.isSearching) return items

      return items.filter(i => this.filter(i, this.internalSearch, this.getText(i)))
    },
    hasSlot () {
      return VSelect.computed.hasSlot.call(this) || this.tags
    },
    hasTags () {
      return this.combobox || this.tags
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
      if (!this.hasTags) return true

      return this.isFocused &&
        (this.filteredItems.length > 0 ||
          !this.isSearching)
    },
    searchIsDirty () {
      return this.internalSearch != null &&
        this.internalSearch != ''
    },
    selectedItem () {
      if (this.isMulti) return null

      return this.selectedItems.find(i => {
        return this.valueComparator(this.getValue(i), this.getValue(this.internalValue))
      })
    }
  },

  watch: {
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

      if (![keyCodes.backspace, keyCodes.left, keyCodes.right, keyCodes.del].includes(keyCode)) return

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

      if ([keyCodes.backspace, keyCodes.delete].includes(keyCode)) {
        const newIndex = this.selectedIndex === indexes
          ? this.selectedIndex - 1
          : this.selectedItems[this.selectedIndex + 1]
            ? this.selectedIndex
            : -1

        if (newIndex === -1) {
          this.internalValue = null
        } else {
          this.selectItem(this.selectedItems[this.selectedIndex])
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
      list.componentOptions.propsData.noFilter = !this.isSearching || !this.filteredItems.length
      list.componentOptions.propsData.searchInput = this.internalSearch

      return list
    },
    genMenu (activator) {
      const menu = VSelect.methods.genMenu.call(this, activator)

      menu.componentOptions.propsData.value = this.menuCanShow && this.isMenuActive

      return menu
    },
    genSelections () {
      return this.hasSlot || this.isMulti
        ? VSelect.methods.genSelections.call(this)
        : null
    },
    onBlur (e) {
      if (this.tags) this.updateTags()
      else if (this.combobox) this.updateCombobox()
      else this.updateAutocomplete()

      VSelect.methods.onBlur.call(this, e)
    },
    onClick () {
      if (this.isDisabled) return

      this.onFocus()
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
      ) return this.activateMenu()

      // If escape deactivate the menu
      if (keyCode === keyCodes.esc) return this.onEscDown(e)

      // If tab - select item or close menu
      if (keyCode === keyCodes.tab) return this.onTabDown(e)

      if (!this.hideSelections &&
        !this.internalSearch
      ) this.changeSelectedIndex(keyCode)

      if (!this.isAnyValueAllowed ||
        !this.internalSearch
      ) return

      if (e.keyCode === keyCodes.enter) return this.onEnterDown()

      if ((keyCode === keyCodes.backspace && !this.searchIsDirty) ||
        (!this.$refs.menu || e.keyCode !== keyCodes.up)
      ) return VSelect.methods.onKeyDown.call(this, e)
    },
    onTabDown (e) {
      this.isFocused = false
      // If tabbing through inputs and
      // and there is no need for an
      // update, blur the v-select
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
      }

      // An item that is selected by
      // menu-index should toggled
      if (this.isMenuActive && menuIndex > -1) {
        // Reset the list index if searching
        this.internalSearch &&
          this.$nextTick(() => setTimeout(this.resetMenuIndex, 0))

        e.preventDefault()
        this.selectListTile(menuIndex)
      }
    },
    selectItem (item) {
      VSelect.methods.selectItem.call(this, item)

      this.setSearch()
    },
    selectListTile (index) {
      if (!this.$refs.menu.tiles[index]) return

      this.$refs.menu.tiles[index].click()
    },
    setValue () {
      this.internalValue = this.internalSearch
      this.$emit('change', this.internalValue)
    },
    setSearch () {
      if (this.hasSlot || this.isMulti) return

      this.lazySearch = this.getText(this.internalValue)
    },
    updateAutocomplete () {
      if (!this.isMulti) {
        this.internalSearch = this.initialValue
      }
    },
    updateCombobox () {
      // no internal value
      // set lazySearch

      if (this.internalSearch &&
        this.internalSearch !== this.internalValue
      ) this.setValue()
      else this.updateAutocomplete()

      // if (this.searchIsDirty) this.setSearch()
      // else if (this.internalSearch &&
      //   this.internalSearch !== this.internalValue
      // ) this.setInternalValue()
    },
    // Maybe change to onBlur?
    updateTags () {
      console.log('update tags')
      // if (!this.hasSlot && this.searchIsDirty) {
      //   this.internalValue = this.internalSearch
      //   this.$emit('change', this.internalValue)
      // }
      // console.log('tags')
      // // Avoid direct mutation
      // // for vuex strict mode
      // let selectedItems = this.selectedItems.slice()

      // // If a duplicate item
      // // exists, remove it
      // if (selectedItems.includes(content)) {
      //   this.$delete(selectedItems, selectedItems.indexOf(content))
      // }

      // // When updating tags ensure
      // // that that the search text
      // // is populated if needed
      // let internalSearch = null
      // if (this.combobox) {
      //   selectedItems = [content]
      //   internalSearch = this.chips ? null : content
      // } else {
      //   selectedItems.push(content)
      // }

      // this.selectedItems = selectedItems

      // this.$nextTick(() => {
      //   this.internalSearch = internalSearch
      //   this.$emit('input', this.combobox ? content : this.selectedItems)
      // })
    }
  }
}
