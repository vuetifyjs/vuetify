// Styles
import '../../stylus/components/_autocompletes.styl'

// Extensions
import VSelect from '../VSelect/VSelect'
import VAutocomplete from '../VAutocomplete/VAutocomplete'

// Utils
import { keyCodes } from '../../util/helpers'

/* @vue/component */
export default {
  name: 'v-combobox',

  extends: VAutocomplete,

  props: {
    delimiters: {
      type: Array,
      default: () => ([])
    },
    returnObject: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    editingIndex: -1
  }),

  computed: {
    counterValue () {
      return this.multiple
        ? this.selectedItems.length
        : (this.internalSearch || '').toString().length
    },
    hasSlot () {
      return VSelect.options.computed.hasSlot.call(this) || this.multiple
    },
    isAnyValueAllowed () {
      return true
    },
    menuCanShow () {
      if (!this.isFocused) return false

      return (this.displayedItemsCount > 0) ||
        (!!this.$slots['no-data'] && !this.hideNoData)
    }
  },

  methods: {
    onFilteredItemsChanged () {
      // nop
    },
    onInternalSearchChanged (val) {
      if (
        val &&
        this.multiple &&
        this.delimiters.length
      ) {
        const delimiter = this.delimiters.find(d => val.endsWith(d))
        if (delimiter != null) {
          this.internalSearch = val.slice(0, val.length - delimiter.length)
          this.updateTags()
        }
      }

      this.updateMenuDimensions()
    },
    genChipSelection (item, index) {
      const chip = VSelect.options.methods.genChipSelection.call(this, item, index)

      // Allow user to update an existing value
      if (this.multiple) {
        chip.componentOptions.listeners.dblclick = () => {
          this.editingIndex = index
          this.internalSearch = this.getText(item)
          this.selectedIndex = -1
        }
      }

      return chip
    },
    onChipInput (item) {
      VSelect.options.methods.onChipInput.call(this, item)

      this.editingIndex = -1
    },
    // Requires a manual definition
    // to overwrite removal in v-autocomplete
    onEnterDown (e) {
      e.preventDefault()

      VSelect.options.methods.onEnterDown.call(this)

      // If has menu index, let v-select-list handle
      if (this.getMenuIndex() > -1) return

      this.updateSelf()
    },
    onKeyDown (e) {
      const keyCode = e.keyCode

      VSelect.options.methods.onKeyDown.call(this, e)

      // If user is at selection index of 0
      // create a new tag
      if (this.multiple &&
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
      // When adding tags, if searching and
      // there is not a filtered options,
      // add the value to the tags list
      if (this.multiple &&
        this.internalSearch &&
        this.getMenuIndex() === -1
      ) {
        e.preventDefault()
        e.stopPropagation()

        return this.updateTags()
      }

      VAutocomplete.options.methods.onTabDown.call(this, e)
    },
    selectItem (item) {
      // Currently only supports items:<string[]>
      if (this.editingIndex > -1) {
        this.updateEditing()
      } else {
        VSelect.options.methods.selectItem.call(this, item)
      }
    },
    setSelectedItems () {
      if (this.internalValue == null ||
        this.internalValue === ''
      ) {
        this.selectedItems = []
      } else {
        this.selectedItems = this.multiple ? this.internalValue : [this.internalValue]
      }
    },
    setValue (value = this.internalSearch) {
      VSelect.options.methods.setValue.call(this, value)
    },
    updateEditing () {
      const value = this.internalValue.slice()
      value[this.editingIndex] = this.internalSearch

      this.setValue(value)

      this.editingIndex = -1
    },
    updateCombobox () {
      const isUsingSlot = Boolean(this.$scopedSlots.selection) || this.hasChips

      // If search is not dirty and is
      // using slot, do nothing
      if (isUsingSlot && !this.searchIsDirty) return

      // The internal search is not matching
      // the internal value, update the input
      if (this.internalSearch !== this.getText(this.internalValue)) this.setValue()

      // Reset search if using slot
      // to avoid a double input
      if (isUsingSlot) this.internalSearch = undefined
    },
    updateSelf () {
      this.multiple ? this.updateTags() : this.updateCombobox()
    },
    updateTags () {
      const menuIndex = this.getMenuIndex()

      // If the user is not searching
      // and no menu item is selected
      // do nothing
      if (menuIndex < 0 &&
        !this.searchIsDirty
      ) return

      if (this.editingIndex > -1) {
        return this.updateEditing()
      }

      const index = this.selectedItems.indexOf(this.internalSearch)
      // If it already exists, do nothing
      // this might need to change to bring
      // the duplicated item to the last entered
      if (index > -1) {
        const internalValue = this.internalValue.slice()
        internalValue.splice(index, 1)

        this.setValue(internalValue)
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
