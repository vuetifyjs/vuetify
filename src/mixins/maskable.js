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
    dontFillMaskBlanks: Boolean,
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

  watch: {
    /**
     * Make sure the cursor is in the correct
     * location when the mask changes
     */
    mask () {
      if (!this.$refs.input) return

      const oldText = this.$refs.input.value
      const newText = this.maskText(this.lazyValue)
      let position = 0
      let selection = this.selection

      for (const char of oldText.substr(0, selection)) {
        isMaskDelimiter(char) || position++
      }

      selection = 0
      for (const char of newText) {
        isMaskDelimiter(char) || position--
        selection++
        if (position <= 0) break
      }

      this.setCaretPosition(selection)
    }
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
      for (const char of newValue) {
        if (this.lazySelection <= 0) break
        isMaskDelimiter(char) || this.lazySelection--
        selection++
      }

      this.setCaretPosition(selection)
    },
    maskText (text) {
      if (!this.mask) return text

      return maskText(text, this.masked, this.dontFillMaskBlanks)
    },
    unmaskText (text) {
      if (this.returnMaskedValue || !this.mask) return text

      return unmaskText(text)
    },
    // When the input changes and is
    // re-created, ensure that the
    // caret location is correct
    setSelectionRange () {
      this.$nextTick(this.updateRange)
    }
  }
}
