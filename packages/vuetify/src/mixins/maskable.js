/**
 * Maskable
 *
 * @mixin
 *
 * Creates an input mask that is
 * generated from a masked str
 *
 * Example: mask="#### #### #### ####"
 */

import {
  isMaskDelimiter,
  maskText,
  unmaskText
} from '../util/mask'

/* @vue/component */
export default {
  name: 'maskable',

  props: {
    dontFillMaskBlanks: Boolean,
    mask: {
      type: [Object, String],
      default: null
    },
    returnMaskedValue: Boolean,
    value: { required: false }
  },

  data: vm => ({
    selection: 0,
    lazySelection: 0,
    lazyValue: vm.value,
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

  computed: {
    masked () {
      const preDefined = this.preDefined[this.mask]
      const mask = preDefined || this.mask || ''

      return mask.split('')
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

      for (let index = 0; index < selection; index++) {
        isMaskDelimiter(oldValue[index]) || position++
      }

      selection = 0
      if (newValue) {
        for (let index = 0; index < newValue.length; index++) {
          isMaskDelimiter(newValue[index]) || position--
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
      /* istanbul ignore next */
      if (!this.$refs.input) return

      const newValue = this.maskText(this.lazyValue)
      let selection = 0

      this.$refs.input.value = newValue
      if (newValue) {
        for (let index = 0; index < newValue.length; index++) {
          if (this.lazySelection <= 0) break
          isMaskDelimiter(newValue[index]) || this.lazySelection--
          selection++
        }
      }

      this.setCaretPosition(selection)
      // this.$emit() must occur only when all internal values are correct
      this.$emit('input', this.returnMaskedValue ? this.$refs.input.value : this.lazyValue)
    },
    maskText (text) {
      return this.mask ? maskText(text, this.masked, this.dontFillMaskBlanks) : text
    },
    unmaskText (text) {
      return this.mask && !this.returnMaskedValue ? unmaskText(text) : text
    },
    // When the input changes and is
    // re-created, ensure that the
    // caret location is correct
    setSelectionRange () {
      this.$nextTick(this.updateRange)
    },
    resetSelections (input) {
      if (!input.selectionEnd) return
      this.selection = input.selectionEnd
      this.lazySelection = 0

      for (let index = 0; index < this.selection; index++) {
        isMaskDelimiter(input.value[index]) || this.lazySelection++
      }
    }
  }
}
