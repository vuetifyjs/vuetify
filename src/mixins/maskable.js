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
  maskText,
  unmaskText
} from '../util/mask'

export default {
  data: () => ({
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
      return maskText(text, this.masked, this.returnMaskedValue, this.fillMaskBlanks)
    },
    unmaskText (text) {
      return unmaskText(text, this.masked, this.returnMaskedValue)
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

        if (this.oldValue.length === this.selection) return

        const newValue = this.$refs.input.value
        if (!this.deleting) {
          while (newValue.slice(this.selection - 1, this.selection).match(this.delimiters)) ++this.selection
        }

        if (this.$refs.input.setSelectionRange) {
          this.$refs.input.setSelectionRange(this.selection, this.selection)
        } else if (this.$refs.input.createTextRange) {
          var range = this.$refs.input.createTextRange()
          range.move('character', this.selection)
          range.select()
        }
      })
    }
  }
}
