export default {
  data: () => ({
    allowedMaskChars: ['#'],
    creditCardMask: '####-####-####-####',
    phoneMask: '(###) ###-####',
    socialMask: '###-##-####',
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
    stringMask () {
      let val = this.mask

      if (val === Object(val)) return val

      switch (val) {
        case 'phone':
          val = this.phoneMask
          break
        case 'social':
          val = this.socialMask
          break
        case 'credit-card':
          val = this.creditCardMask
          break
      }

      return val
    },
    currentMask () {
      return this.genMask(this.stringMask)
    },
    delimiterLength () {
      let length = 0

      this.maskDelimiters.forEach(str => {
        length += str.length
      })

      return length + this.blockLength
    },
    maskBlocks () {
      return this.currentMask.blocks
    },
    maskDelimiters () {
      return this.currentMask.delimiters
    }
  },

  methods: {
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

      console.log(newText)

      const index = this.getLastIndex(newText)

      this.clearBack(newText)

      text = newText.join('')

      this.selectText(index)

      return text
    },
    clearBack (newText) {
      const newTextIndex = newText.length - 1
      const lastChar = newText[newTextIndex]
      if (newTextIndex === this.delimiterLength - 1 &&
        !this.validateMask(lastChar, newTextIndex)
      ) {
        newText.pop()
      }
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
    getLastIndex (newText) {
      let index = -1

      newText.some((char, i) => {
        if (!this.validateMask(char, i) &&
          !this.currentMask.delimiters.includes(char)
        ) {
          index = i

          return true
        }
      })

      return index
    },
    genMask (val) {
      const split = val.split('')
      const mask = {
        blocks: [],
        delimiters: []
      }

      let index = 0
      split.forEach((char, i) => {
        if (this.allowedMaskChars.includes(char)) {
          index++
        } else {
          mask.blocks.push(index)
          mask.delimiters.push(char)
          index = 0
        }
      })

      if (index) mask.blocks.push(index)

      return mask
    },
    findDelimiter (i) {
      return this.maskDelimiters &&
        this.maskDelimiters[i]
        ? this.maskDelimiters[i]
        : ' '
    },
    selectText (index) {
      if (index > -1) {
        this.$nextTick(() => {
          this.$refs.input.setSelectionRange(index, index)
        })
      }
    },
    validateMask (val, i) {
      const mask = this.stringMask[i]

      switch (mask) {
        case '#': return !isNaN(parseInt(val))
      }
    }
  }
}
