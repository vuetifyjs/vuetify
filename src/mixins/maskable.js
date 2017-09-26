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
    mask: function () {
      if (!this.$refs.input) return

      const oldText = this.$refs.input.value || ''
      const newText = this.maskText(this.lazyValue) || ''
      let position = 0

      for (let i = 0; i < this.selection; i++) {
        isMaskDelimiter(oldText[i]) || position++
      }

      this.selection = 0
      for (const char of newText) {
        isMaskDelimiter(char) || position--
        this.selection++
        if (position <= 0) break
      }

      this.$refs.input.setSelectionRange(this.selection, this.selection)
    }
  },

  methods: {
    maskText (text) {
      return maskText(text, this.masked, this.fillMaskBlanks)
    },
    unmaskText (text) {
      if (this.returnMaskedValue) return text

      return unmaskText(text)
    },
    // When the input changes and is
    // re-created, ensure that the
    // caret location is correct
    setSelectionRange () {
      this.$nextTick(() => {
        if (!this.$refs.input) return

        this.$refs.input.value = this.maskText(this.lazyValue)

        const newValue = this.$refs.input.value
        if (!this.deleting) {
          while (isMaskDelimiter(newValue.substr(this.selection - 1, 1))) {
            this.selection++
          }
          // TODO: This only helps sometimes
          if (this.$refs.input.selectionStart - this.selection === 1) {
            this.selection = this.$refs.input.selectionStart
          }
        }

        this.$refs.input.setSelectionRange(this.selection, this.selection)
      })
    }
  }
}
