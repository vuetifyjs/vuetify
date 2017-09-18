export default {
  data: () => ({
    creditCardMask: [
      [4, 4, 4, 4],
      [' - ', ' - ', ' - ']
    ],
    phoneMask: [
      [0, 3, 3, 4],
      ['(', ') ', ' - ']
    ],
    socialMask: [
      [3, 2, 4],
      ['-', '-', '-']
    ],
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
    blockLength () {
      return this.maskBlocks.reduce((acc = 0, cur) => (acc + cur))
    },
    delimiterLength () {
      let length = 0

      this.maskDelimiters.forEach(str => {
        length += str.length
      })

      return length + this.blockLength
    },
    maskBlocks () {
      if (typeof this.mask === 'string') {
        return this.premadeMask(this.mask)[0]
      }

      return this.mask.blocks
    },
    maskDelimiters () {
      if (typeof this.mask === 'string') {
        return this.premadeMask(this.mask)[1]
      }

      return this.mask.blocks
    }
  },

  methods: {
    premadeMask (name) {
      switch (name) {
        case 'phone':
          return this.phoneMask
        case 'social':
          return this.socialMask
        case 'credit-card':
          return this.creditCardMask
      }
    },
    maskText (text) {
      if (!this.mask) return text
      if (this.returnMaskedValue) {
        text = this.unmaskText(text, true)
      }

      const split = text.split('')
      const newText = []

      split.forEach((c, i, arr) => {
        const delimiter = this.getDelimiter(i)

        if (delimiter &&
          c !== delimiter
        ) newText.push(delimiter)

        newText.push(c)
      })

      if (!this.isDirty) return newText.join('')

      const textLength = newText.length
      if (textLength < this.delimiterLength) {
        const length = this.delimiterLength - textLength

        for (let i = 0; i < length; i++) {
          const delimiter = this.getDelimiter(i) || ' '

          newText.push(delimiter)
        }
      }

      text = newText.join('')

      return text
    },
    unmaskText (text, force) {
      if (!force &&
        (!this.mask ||
        this.returnMaskedValue)
      ) return text

      this.maskDelimiters.forEach(val => {
        text = text.replace(val, '')
      })

      text = text.slice(0, this.blockLength)

      this.selection = this.$refs.input
        ? this.$refs.input.selectionEnd
        : 0

      return text
    },
    getDelimiter (i) {
      let delimiter = false

      if (i === 0 &&
        this.maskBlocks.includes(0)
      ) return this.findDelimiter(i)

      let index = 0
      this.maskBlocks.reduce((acc = 0, val) => {
        if (acc === i) {
          delimiter = this.findDelimiter(index)
          return
        }

        index++

        return acc + val
      })

      return delimiter
    },
    findDelimiter (i) {
      return this.maskDelimiters &&
        this.maskDelimiters[i]
        ? this.maskDelimiters[i]
        : ' '
    }
  }
}
