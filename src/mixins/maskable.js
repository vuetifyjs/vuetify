export default {
  data: () => ({
    allowedMasks: ['#', 'A'],
    selection: 0
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
      this.masked.forEach((mask, i, arr) => {
        if (textIndex >= text.length &&
          !this.fillMaskBlanks
        ) return

        const letter = text[textIndex]

        if (!this.isMask(mask)) {
          newText.push(mask)
        } else if (this.isMask(mask) &&
          this.maskValidates(mask, letter)
        ) {
          newText.push(letter)
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

      let letter
      this.masked.forEach((mask, i) => {
        letter = letter || text[i]

        if (!letter) return

        if (!this.isMask(letter) &&
          letter === mask
        ) {
          letter = null
        } else if (this.isMask(mask) &&
          this.maskValidates(mask, letter)
        ) {
          newText.push(letter)
          letter = null
        }
      })

      return newText.join('')
    },
    // Helper functions
    findFirstMask () {
      this.selection = this.masked.findIndex(m => this.isMask(m))
    },
    isMask (char) {
      return this.allowedMasks.includes(char)
    },
    maskValidates (mask, letter) {
      switch (mask) {
        case 'A': return letter.match(/[a-z]/i)
        case '#': return !isNaN(parseInt(letter))
      }
    },
    setSelectionRange () {
      this.$nextTick(() => {
        this.$refs.input &&
          this.$refs.input.setSelectionRange(this.selection, this.selection)
      })
    }
  }
}
