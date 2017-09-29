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

  watch: {
    /**
     * Make sure the cursor is in the correct
     * location when the mask changes
     */
    mask () {
      if (!this.$refs.input) return

      const oldText = this.$refs.input.value || ''
      const newText = this.maskText(this.lazyValue || '')
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
      this.$refs.input.setSelectionRange(selection, selection)
    },
    updateRange () {
      const newValue = this.$refs.input.value
      let selection = this.selection

      while (isMaskDelimiter(newValue.substr(selection - 1, 1))) {
        selection++
      }
      this.setCaretPosition(selection)
    },
    maskText (text) {
      if (!this.mask) return text

      return maskText(text, this.masked, this.fillMaskBlanks)
    },
    unmaskText (text) {
      if (this.returnMaskedValue || !this.mask) return text

      return unmaskText(text)
    },
    // When the input changes and is
    // re-created, ensure that the
    // caret location is correct
    setSelectionRange () {
      this.$nextTick(() => {
        if (!this.$refs.input) return

        this.$refs.input.value = this.maskText(this.lazyValue)

        this.deleting ? this.setCaretPosition(this.selection) : this.updateRange()
      })
    }
  }
}
