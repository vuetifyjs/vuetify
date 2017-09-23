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
    allowedMasks: ['#', 'A', 'a', 'X'],
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
    maskText (text, newText = []) {
      text = text || ''

      if (!this.mask ||
        !text.length ||
        this.returnMaskedValue
      ) return text

      let textIndex = 0
      // let selection = 0
      this.masked.forEach((mask, i) => {
        if (textIndex >= text.length &&
          !this.fillMaskBlanks
        ) return

        // Assign the next character
        const char = text[textIndex]

        if (!this.isMask(mask)) {
          newText.push(mask)
        } else if (this.maskValidates(mask, char)) {
          // If the mask is validated, push
          // next char into the new array
          newText.push(char)
          textIndex++
        }
      })

      return newText.join('')
    },
    unmaskText (text, newText = []) {
      if (!this.mask ||
        this.returnMaskedValue
      ) return text

      text = text || ''

      let char
      let textIndex = 0
      this.masked.forEach((mask, i) => {
        // The goal is to ensure that
        // every character makes it 
        // into the newText array     
        char = char || text[textIndex]

        // Could cause potential issues
        if (char === mask && !['A', 'a'].includes(mask)) {
          char = null
          textIndex++
        }

        if (char == null) return

        if (this.maskValidates(mask, char)) {
          newText.push(char)
          char = null
          textIndex++
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
        case 'a': return char.match(/[a-z]/)
        case 'A': return char.match(/[A-Z]/)
        case '#': return !isNaN(parseInt(char))
        case 'X': return char.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)
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
