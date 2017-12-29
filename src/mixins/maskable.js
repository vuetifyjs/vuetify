/**
 * Maskable
 *
 * @mixin
 *
 * Creates an input mask
 *
 * Handled cases:
 *
 * 1. Predefined : String (existing)
 *      Ex: mask="credit-card"
 *
 * 2. Predefined with default options : String mapped to Object
 *      Ex: mask="numeral"
 *
 * 3. Predefined with overidden options : Object
 *      Ex: mask="{ formatter: 'numeral', prefix: '$', precision: 4 }"
 *
 * 4. Custom mask : String (existing)
 *      Ex: mask="(##) - (AA)"
 *
 * 5. Custom mask with formatter : Object
 *      Ex: mask="{ formatter: function () {}, myOption1: '23', myOption2: '?' }"
 */

import numeralFormatable from './numeral-formatable'
import {
  isMaskDelimiter,
  maskText,
  unmaskText
} from '../util/mask'

export default {
  data: () => ({
    selection: 0,
    lazySelection: 0,
    preDefined: {
      'credit-card': '#### - #### - #### - ####',
      'date': '##/##/####',
      'date-with-time': '##/##/#### ##:##',
      'phone': '(###) ### - ####',
      'social': '###-##-####',
      'time': '##:##',
      'time-with-seconds': '##:##:##'
    }
  }),

  mixins: [numeralFormatable],

  props: {
    dontFillMaskBlanks: Boolean,
    mask: {
      type: [Object, String],
      default: null
    },
    returnMaskedValue: Boolean
  },

  computed: {
    masked () {
      return this.mask ? this.preDefined[this.mask] || this.mask : false
    },
    isStringFormatter () {
      return typeof this.masked === 'string'
    },
    isNumeralFormatter () {
      return this.masked && typeof this.masked !== 'string' && this.masked.formatter === 'numeral'
    },
    isCustomFormatter () {
      return this.masked && typeof this.masked !== 'string' &&
        typeof this.masked.formatter === 'function'
    },
    // Compute which callback to use
    maskText () {
      if (this.isStringFormatter) { // Case 1 and 4
        return text => maskText(text, this.masked, this.dontFillMaskBlanks)
      } else if (this.isNumeralFormatter) { // Case 2 & 3
        this.options = Object.assign({}, this.preDefined['numeral'])
        Object.assign(this.options, this.mask)

        return this.maskNumeralText
      } else if (this.isCustomFormatter) { // Case 5
        const customOptions = Object.assign({}, this.mask)
        const formatter = this.masked.formatter
        delete customOptions.formatter

        return text => formatter(text, customOptions)
      } else { // No mask
        return text => text
      }
    },
    unmaskText () {
      if (!this.mask) return text => text
      return this.isNumeralFormatter ? this.unmaskNumeralText
        : this.isCustomFormatter ? text => text
          : this.isStringFormatter && !this.returnMaskedValue ? unmaskText : text => text
    }
  },

  watch: {
    /**
     * Make sure the cursor is in the correct
     * location when the mask changes
     */
    mask () {
      if (!this.$refs.input) return

      const oldValue = this.$refs.input.value
      const newValue = this.maskText(unmaskText(this.lazyValue))
      let position = 0
      let selection = this.selection

      for (const char of oldValue.substr(0, selection)) {
        this.isMaskDelimiter(char) || position++
      }

      selection = 0
      if (position && newValue) {
        for (const char of newValue) {
          this.isMaskDelimiter(char) || position--
          selection++
          if (position <= 0) break
        }
      }

      this.$nextTick(() => {
        this.$refs.input.value = newValue
        this.setCaretPosition(selection)
      })
    }
  },

  beforeMount () {
    if (!this.mask ||
      this.value == null ||
      !this.returnMaskedValue
    ) return

    const value = this.maskText(this.value)

    // See if masked value does not
    // match the user given value
    if (value === this.value) return

    this.$emit('input', value)
  },

  methods: {
    setCaretPosition (selection) {
      this.selection = selection
      window.setTimeout(() => {
        this.$refs.input && this.$refs.input.setSelectionRange(this.selection, this.selection)
      }, 0)
    },
    updateRange () {
      if (!this.$refs.input) return

      const newValue = this.maskText(this.lazyValue)
      let selection = 0

      this.$refs.input.value = newValue
      if (newValue) {
        for (const char of newValue) {
          if (this.lazySelection <= 0) break
          this.isMaskDelimiter(char) || this.lazySelection--
          selection++
        }

        selection = this.isNumeralFormatter
          ? this.adjustNumeralCaret(selection, newValue) : selection
      }

      this.setCaretPosition(selection)
      this.$emit('input', this.returnMaskedValue ? this.$refs.input.value : this.lazyValue)
    },
    // When the input changes and is
    // re-created, ensure that the
    // caret location is correct
    setSelectionRange () {
      this.$nextTick(this.updateRange)
    },
    isMaskDelimiter (char) {
      return this.isNumeralFormatter ? this.isNumeralDelimiter(char)
        : this.isCustomFormatter ? false : isMaskDelimiter(char)
    },
    resetSelections (input) {
      if (!input.selectionEnd) return
      this.selection = input.selectionEnd
      this.lazySelection = 0

      for (const char of input.value.substr(0, this.selection)) {
        this.isMaskDelimiter(char) || this.lazySelection++
      }
    }
  }
}
