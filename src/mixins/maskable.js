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
export default {
  data: () => ({
    allowedMasks: ['#', 'A'],
    selection: 0
    // TODO: Add some built in masks
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
      return this.mask ? this.mask.split('') : []
    }
  },

  methods: {
    maskText (text, newText = []) {
      text = text || ''

      if (!this.mask || !text.length) return text

      let textIndex = 0
      this.masked.forEach((mask, i) => {
        if (textIndex >= text.length &&
          !this.fillMaskBlanks
        ) return

        // Assign the next character
        const char = text[textIndex]

        if (!this.isMask(mask)) {
          newText.push(mask)
        } else if (this.maskValidates(mask, char)) {
          // If the mask is validatable, push
          // next char into the new array
          newText.push(char)
          textIndex++
          this.selection = i + 1
        }
      })

      this.setSelectionRange()

      return newText.join('')
    },
    unmaskText (text, newText = []) {
      if (!this.mask) return text

      text = text || ''

      let char
      this.masked.forEach((mask, i) => {
        // The goal is to ensure that
        // every character makes it 
        // into the newText array     
        char = char || text[i]

        if (!char) return

        if (!this.isMask(char) && char === mask) {
          char = null
        } else if (this.maskValidates(mask, char)) {
          newText.push(char)
          char = null
        }
      })

      return newText.join('')
    },
    isMask (char) {
      return this.allowedMasks.includes(char)
    },
    maskValidates (mask, char) {
      if (!this.isMask(mask)) return false

      switch (mask) {
        case 'A': return char.match(/[a-z]/i)
        case '#': return !isNaN(parseInt(char))
      }
    },
    // When the input changes and is
    // re-created, ensure that the
    // caret location is correct
    setSelectionRange () {
      this.$nextTick(() => {
        this.$refs.input &&
          this.$refs.input.setSelectionRange(this.selection, this.selection)
      })
    }
  }
}
