// Styles
import '../VAutocomplete/VAutocomplete.sass'

// Extensions
import VSelect from '../VSelect/VSelect'
import VAutocomplete from '../VAutocomplete/VAutocomplete'

// Utils
import { keyCodes } from '../../util/helpers'

// Types
import { PropValidator } from 'vue/types/options'

/* @vue/component */
export default VAutocomplete.extend({
  name: 'v-combobox',

  props: {
    delimiters: {
      type: Array,
      default: () => ([]),
    } as PropValidator<string[]>,
    returnObject: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    editingIndex: -1,
  }),

  computed: {
    computedCounterValue (): number {
      return this.multiple
        ? this.selectedItems.length
        : (this.internalSearch || '').toString().length
    },
    hasSlot (): boolean {
      return VSelect.options.computed.hasSlot.call(this) || this.multiple
    },
    isAnyValueAllowed (): boolean {
      return true
    },
    menuCanShow (): boolean {
      if (!this.isFocused) return false

      return this.hasDisplayedItems ||
        (!!this.$slots['no-data'] && !this.hideNoData)
    },
  },

  methods: {
    onInternalSearchChanged (val: any) {
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
    genInput () {
      const input = VAutocomplete.options.methods.genInput.call(this)

      delete input.data!.attrs!.name
      input.data!.on!.paste = this.onPaste

      return input
    },
    genChipSelection (item: object, index: number) {
      const chip = VSelect.options.methods.genChipSelection.call(this, item, index)

      // Allow user to update an existing value
      if (this.multiple) {
        chip.componentOptions!.listeners! = {
          ...chip.componentOptions!.listeners!,
          dblclick: () => {
            this.editingIndex = index
            this.internalSearch = this.getText(item)
            this.selectedIndex = -1
          },
        }
      }

      return chip
    },
    onChipInput (item: object) {
      VSelect.options.methods.onChipInput.call(this, item)

      this.editingIndex = -1
    },
    // Requires a manual definition
    // to overwrite removal in v-autocomplete
    onEnterDown (e: Event) {
      e.preventDefault()
      // If has menu index, let v-select-list handle
      if (this.getMenuIndex() > -1) return

      this.$nextTick(this.updateSelf)
    },
    onFilteredItemsChanged (val: never[], oldVal: never[]) {
      if (!this.autoSelectFirst) return

      VAutocomplete.options.methods.onFilteredItemsChanged.call(this, val, oldVal)
    },
    onKeyDown (e: KeyboardEvent) {
      const keyCode = e.keyCode

      VSelect.options.methods.onKeyDown.call(this, e)

      // If user is at selection index of 0
      // create a new tag
      if (this.multiple &&
        keyCode === keyCodes.left &&
        this.$refs.input.selectionStart === 0
      ) {
        this.updateSelf()
      } else if (keyCode === keyCodes.enter) {
        this.onEnterDown(e)
      }

      // The ordering is important here
      // allows new value to be updated
      // and then moves the index to the
      // proper location
      this.changeSelectedIndex(keyCode)
    },
    onTabDown (e: KeyboardEvent) {
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
    selectItem (item: object) {
      // Currently only supports items:<string[]>
      if (this.editingIndex > -1) {
        this.updateEditing()
      } else {
        VAutocomplete.options.methods.selectItem.call(this, item)
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
    setValue (value?: any) {
      VSelect.options.methods.setValue.call(this, value ?? this.internalSearch)
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
    },
    onPaste (event: ClipboardEvent) {
      if (!this.multiple || this.searchIsDirty) return

      const pastedItemText = event.clipboardData?.getData('text/vnd.vuetify.autocomplete.item+plain')
      if (pastedItemText && this.findExistingIndex(pastedItemText as any) === -1) {
        event.preventDefault()
        VSelect.options.methods.selectItem.call(this, pastedItemText as any)
      }
    },
  },
})
