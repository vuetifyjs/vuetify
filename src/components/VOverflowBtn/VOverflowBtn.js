// Styles
import '../../stylus/components/_overflow-buttons.styl'

// Extensions
import VSelect from '../VSelect/VSelect'
import VAutocomplete from '../VAutocomplete'
import VTextField from '../VTextField/VTextField'

import VBtn from '../VBtn'

import { consoleWarn } from '../../util/console'

/* @vue/component */
export default {
  name: 'v-overflow-btn',

  extends: VAutocomplete,

  props: {
    segmented: Boolean,
    editable: Boolean,
    transition: VSelect.props.transition
  },

  computed: {
    classes () {
      return Object.assign(VAutocomplete.computed.classes.call(this), {
        'v-overflow-btn': true,
        'v-overflow-btn--segmented': this.segmented,
        'v-overflow-btn--editable': this.editable
      })
    },
    isAnyValueAllowed () {
      return this.editable ||
        VAutocomplete.computed.isAnyValueAllowed.call(this)
    },
    isSingle () {
      return true
    },
    computedItems () {
      return this.segmented ? this.allItems : this.filteredItems
    }
  },

  methods: {
    genSelections () {
      return this.editable
        ? VAutocomplete.methods.genSelections.call(this)
        : VSelect.methods.genSelections.call(this) // Override v-autocomplete's override
    },
    genCommaSelection (item, index, last) {
      return this.segmented
        ? this.genSegmentedBtn(item)
        : VSelect.methods.genCommaSelection.call(this, item, index, last)
    },
    genInput () {
      const input = VTextField.methods.genInput.call(this)

      input.data.domProps.value = this.editable ? this.internalSearch : ''
      input.data.attrs.readonly = !this.isAnyValueAllowed

      return input
    },
    genLabel () {
      if (this.editable && this.isFocused) return null

      const label = VTextField.methods.genLabel.call(this)

      if (!label) return label

      // Reset previously set styles from parent
      label.data.style = {}

      return label
    },
    genSegmentedBtn (item) {
      const itemValue = this.getValue(item)
      const itemObj = this.computedItems.find(i => this.getValue(i) === itemValue) || item

      if (!itemObj.text || !itemObj.callback) {
        consoleWarn('When using \'segmented\' prop without a selection slot, items must contain both a text and callback property', this)
        return null
      }

      return this.$createElement(VBtn, {
        props: { flat: true },
        on: {
          click (e) {
            e.stopPropagation()
            itemObj.callback(e)
          }
        }
      }, [itemObj.text])
    },
    setSelectedItems () {
      if (this.internalValue == null) {
        this.selectedItems = []
      } else {
        this.selectedItems = [this.internalValue]
      }
    }
  }
}
