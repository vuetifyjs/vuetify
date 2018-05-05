// Styles
import '../../stylus/components/_overflow-buttons.styl'

// Extensions
// import VSelect from '../VSelect/VSelect'
import VAutocomplete from '../VAutocomplete'
import VTextField from '../VTextField/VTextField'

/* eslint-disable */
import VBtn from '../VBtn'

import { consoleWarn } from '../../util/console'
import VSelect from '@/components/VSelect/VSelect'

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
      return this.editable || VAutocomplete.computed.isAnyValueAllowed.call(this)
    },
    isSingle () {
      return true
    },
    menuProps () {
      return Object.assign(VSelect.computed.menuProps.call(this), {
        nudgeBottom: 1
      })
    }
  },

  methods: {
    genSelections () {
      return this.segmented
        ? VSelect.methods.genSelections.call(this)       // Override v-autocomplete's override
        : VAutocomplete.methods.genSelections.call(this)
    },
    genCommaSelection (item) {
      if (this.segmented) {
        return this.genSegmentedBtn(item)
      } else {
        return VSelect.methods.genCommaSelection.call(this, item)
      }
    },
    genInput () {
      // if (this.segmented) return this.$createElement()

      const input = VTextField.methods.genInput.call(this)

      input.data.domProps.value = this.internalSearch
      input.data.attrs.disabled = !this.isAnyValueAllowed

      return input
    },
    genLabel () {
      const label = VTextField.methods.genLabel.call(this)
      if (!label) return label

      delete label.data.style.position

      return label
    },
    genSegmentedBtn (item) {
      if (!item.text || !item.callback) {
        consoleWarn('When using \'segmented\' prop without a selection slot, items must contain both a text and callback property', this)
        return null
      }

      return this.$createElement(VBtn, {
        props: { flat: true },
        on: {
          click (e) {
            e.stopPropagation()
            item.callback(e)
          }
        }
      }, [item.text])
    },
    setSelectedItems () {
      if (this.internalValue == null) {
        this.selectedItems = []
      } else {
        this.selectedItems = [this.internalValue]
      }
    },
    updateSelf () {
      if (this.editable) this.updateCombobox()
      else VAutocomplete.methods.updateSelf.call(this)
    }
  }
}
