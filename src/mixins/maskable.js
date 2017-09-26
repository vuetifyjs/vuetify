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
  defaultDelimiters,
  maskText,
  unmaskText
} from '../util/mask'

export default {
  data: () => ({
    delimiters: defaultDelimiters,
    selection: 0,
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

  props: {
    fillMaskBlanks: Boolean,
    mask: {
      type: [Object, String],
      default: null
    },
    returnMaskedValue: Boolean
  },

  computed: {
    masked () {
      const preDefined = this.preDefined[this.mask]
      const mask = preDefined || this.mask || ''

      return mask.split('')
    }
  },

  methods: {
    maskText (text) {
      return maskText(text, this.masked, this.fillMaskBlanks)
    },
    unmaskText (text) {
      if (this.returnMaskedValue) return text

      return unmaskText(text, this.delimiters)
    },
    // When the input changes and is
    // re-created, ensure that the
    // caret location is correct
    setSelectionRange () {
      this.$nextTick(() => {
        if (this.$refs.input == null) return

        const maskedText = this.maskText(this.lazyValue)
        if (maskedText !== this.$refs.input.value) {
          this.$refs.input.value = maskedText
        }

        // May not be needed
        // if (this.oldValue.length === this.selection) return

        const newValue = this.$refs.input.value
        if (!this.deleting) {
          while (newValue.slice(this.selection - 1, this.selection).match(this.delimiters)) {
            this.selection++
          }
        }

        if (this.$refs.input.setSelectionRange) {
          this.$refs.input.setSelectionRange(this.selection, this.selection)
        } else if (this.$refs.input.createTextRange) {
          const range = this.$refs.input.createTextRange()
          range.move('character', this.selection)
          range.select()
        }
      })
    }
  }
}
