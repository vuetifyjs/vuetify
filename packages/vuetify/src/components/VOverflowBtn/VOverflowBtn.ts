// Styles
import './VOverflowBtn.sass'

// Extensions
import VSelect from '../VSelect/VSelect'
import VAutocomplete from '../VAutocomplete'
import VTextField from '../VTextField/VTextField'

// Components
import VBtn from '../VBtn'

// Utilities
import { consoleWarn } from '../../util/console'

/* @vue/component */
export default VAutocomplete.extend({
  name: 'v-overflow-btn',

  props: {
    editable: Boolean,
    segmented: Boolean,
  },

  computed: {
    classes (): object {
      return {
        ...VAutocomplete.options.computed.classes.call(this),
        'v-overflow-btn': true,
        'v-overflow-btn--segmented': this.segmented,
        'v-overflow-btn--editable': this.editable,
      }
    },
    isAnyValueAllowed (): boolean {
      return this.editable ||
        VAutocomplete.options.computed.isAnyValueAllowed.call(this)
    },
    isSingle (): true {
      return true
    },
    computedItems (): object[] {
      return this.segmented ? this.allItems : this.filteredItems
    },
    labelValue (): boolean {
      return (this.isFocused && !this.persistentPlaceholder) || this.isLabelActive
    },
  },

  methods: {
    genSelections () {
      return this.editable
        ? VAutocomplete.options.methods.genSelections.call(this)
        : VSelect.options.methods.genSelections.call(this) // Override v-autocomplete's override
    },
    genCommaSelection (item: any, index: number, last: boolean) {
      return this.segmented
        ? this.genSegmentedBtn(item)
        : VSelect.options.methods.genCommaSelection.call(this, item, index, last)
    },
    genInput () {
      const input = VTextField.options.methods.genInput.call(this)

      input.data = input.data || {}
      input.data.domProps!.value = this.editable ? this.internalSearch : ''
      input.data.attrs!.readonly = !this.isAnyValueAllowed

      return input
    },
    genLabel () {
      if (this.editable && this.isFocused) return null

      const label = VTextField.options.methods.genLabel.call(this)

      if (!label) return label

      label.data = label.data || {}

      // Reset previously set styles from parent
      label.data.style = {}

      return label
    },
    genSegmentedBtn (item: any) {
      const itemValue = this.getValue(item)
      const itemObj = this.computedItems.find(i => this.getValue(i) === itemValue) || item

      if (!itemObj.text || !itemObj.callback) {
        consoleWarn('When using "segmented" prop without a selection slot, items must contain both a text and callback property', this)
        return null
      }

      return this.$createElement(VBtn, {
        props: { text: true },
        on: {
          click (e: Event) {
            e.stopPropagation()
            itemObj.callback(e)
          },
        },
      }, [itemObj.text])
    },
    updateValue (val: boolean) {
      if (val) {
        this.initialValue = this.lazyValue
      } else if (this.initialValue !== this.lazyValue) {
        this.$emit('change', this.lazyValue)
      }
    },
  },
})
