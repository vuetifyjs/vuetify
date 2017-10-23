export default {
  data: () => ({
    options: {},
    signSymbol: '',
    preDefined: {
      'numeral': {
        positiveOnly: false, // Positive value only
        positiveSign: false, // Show positive sign '+'
        blockSeparator: ' ', // {String|Array} - Separate between groups of digits
        blockSize: 3, // {Number|Array} - Number of digits per group
        decimal: '.', // Decimal mark
        prefix: '', // Prefix shown in input field
        precision: 2, // Floating point precision
        suffix: '', // Suffix shown in input field
        formatter: 'numeral'
      }
    }
  }),

  computed: {
    precision () {
      return this.absVal(this.options.precision)
    },
    positiveSign () {
      return this.options.positiveSign ? '+' : ''
    },
    decimal () {
      return this.options.decimal || '.'
    },
    blockSeparator () {
      return Array.isArray(this.options.blockSeparator) ? this.options.blockSeparator
        : [this.options.blockSeparator]
    },
    blockSize () {
      return Array.isArray(this.options.blockSize) ? this.options.blockSize
        : [this.absVal(this.options.blockSize)]
    },
    sign: {
      get () {
        return this.signSymbol
      },
      set (val) {
        const negative = val.replace(/[^\d+-]/g, '')[0] === '-'
        const positiveSymbol = this.positiveSign ? '+' : ''

        this.signSymbol = this.options.positiveOnly ? positiveSymbol
          : negative ? '-' : positiveSymbol
      }
    },
    numeralPrefix () {
      return this.options.prefix || ''
    },
    numeralSuffix () {
      return this.options.suffix || ''
    }
  },

  methods: {
    unmaskNumeralText (text) {
      if (!text) return text
      this.sign = text = String(text)
      text = this.internalChange ? this.removeNonNumeral(text) : this.attemptNumeralCorrection(text)

      return this.parseNumber(text)
    },
    maskNumeralText (text) {
      if (!text) return this.addPrefixSuffix(this.precision ? '0.' + this.getFraction('') : '0')
      text = this.sign ? String(text).substr(1) : String(text)

      const param = {
        masked: [],
        separatorIndex: this.blockSeparator.length - 1,
        sizeIndex: this.blockSize.length - 1,
        length: 0,
        integer: !this.precision
      }

      // Group the digits with specified separators and digit counts.
      for (const digit of text.split('').reverse()) {
        if (!this.maskNumeral(digit, param)) break
      }

      return this.maskedNumeral(param.masked.reverse())
    },
    maskNumeral (digit, param) {
      if (digit !== '.') {
        if (param.integer) {
          this.blockSize[param.sizeIndex] && this.blockSeparator[param.separatorIndex] &&
            param.masked.push(digit)
        } else param.masked.push(digit)
      }

      if (param.integer) {
        if (!this.blockSize[param.sizeIndex]) return false
        else if (!this.blockSeparator[param.separatorIndex]) param.masked.push(digit)
        else if (!(++param.length % this.blockSize[param.sizeIndex])) {
          param.masked.push(this.blockSeparator[param.separatorIndex][0])
          param.separatorIndex > 0 && param.separatorIndex--
          param.sizeIndex > 0 && param.sizeIndex--
          param.length = 0
        }
      } else if (digit === '.') {
        param.masked.push(this.decimal)
        param.integer = true
      }

      return true
    },
    maskedNumeral (masked) {
      if (!masked.length) masked = ['0']
      else if (this.blockSeparator.includes(masked[0])) masked.shift()

      const result = this.addPrefixSuffix(masked.join(''))
      return masked[0] === '.' ? '0' + result : result
    },
    // TODO: Rework this restrictive function to
    // make -ve as a valid value in order
    // to support special meaning/feature
    absVal (value) {
      const parsed = parseInt(value, 10)

      if (isNaN(parsed)) return 0
      return Math.abs(parsed)
    },
    adjustNumeralCaret (selection, text) {
      // Caret is at prefix
      if (selection === 0) return this.numeralPrefix.length + this.sign.length

      // Whether selection !== 0 (may happen when block size === 0) or it's an
      // integer or a fractional where abs(value) >= 10
      if (selection !== text.length && (!this.precision ||
        (String(this.lazyValue).length > this.precision + (this.sign ? 3 : 2)))) {
        return selection
      }

      // Caret is at suffix or end of line
      const suffixPosition = this.numeralSuffix ? text.lastIndexOf(this.numeralSuffix) : 0
      if (suffixPosition > 0 && selection >= suffixPosition) {
        return selection > suffixPosition ? suffixPosition
          : this.delete || this.backspace ? suffixPosition : suffixPosition - 1
      } else if (!suffixPosition && selection === text.length) return selection

      // Handle abs(value) < 10
      // Make the caret stay where it were when the
      // length of input is the same before and after
      return this.backspace ? this.numeralCaretOnBackspace(selection, text)
        : this.delete ? this.numeralCaretOnDelete(selection, text)
          : this.numeralCaretOnInsert(selection)
    },
    numeralCaretOnInsert (selection) {
      selection -= this.selection < selection ? 1 : 0
      selection -= this.selection === selection ? 1 : 0

      return selection
    },
    numeralCaretOnDelete (selection, text) {
      if (text[this.selection] === this.decimal) {
        selection += 1
      } else {
        selection += text[this.numeralPrefix.length + this.sign.length] === '0' ? 1 : 0
        selection += text[selection - 1] === this.decimal ? 1 : 0
      }

      return selection
    },
    numeralCaretOnBackspace (selection, text) {
      if (text[this.numeralPrefix.length + this.sign.length] === '0') {
        text[this.selection] !== this.decimal && selection++
        text[this.selection - 1] === this.decimal && selection++
      }

      return selection
    },
    // Correction on arbitrary value entered externally
    attemptNumeralCorrection (text) {
      const decimalPoint = text.lastIndexOf('.')
      let integer = decimalPoint < 0 ? this.removeNonNumeral(text)
        : this.removeNonNumeral(text.substring(0, decimalPoint))

      integer = integer.length ? integer : '0'
      if (!this.precision) return integer

      return decimalPoint < 0 ? integer + this.getFraction('')
        : integer + this.getFraction(text.substr(decimalPoint))
    },
    getFraction (text) {
      let fraction = this.removeNonNumeral(text)
      fraction = fraction.substr(0, this.precision)
      fraction = fraction.padEnd(this.precision, '0')

      return fraction
    },
    addPrefixSuffix (text) {
      return this.numeralPrefix + this.sign + text + this.numeralSuffix
    },
    parseNumber (text) {
      if (!this.precision) return this.parseInt(text)

      text = text.split('')
      text.splice(-this.precision, 0, '.')

      return this.sign + this.parseFloat(text.join(''))
    },
    parseInt (text) {
      return this.removeNonNumeral(this.removeLeadingZeros(text))
    },
    parseFloat (text) {
      text = this.removeLeadingZeros(text)
      const decimal = text.lastIndexOf('.')

      return text.substr(0, decimal) + '.' + this.getFraction(text.substr(decimal + 1))
    },
    removeLeadingZeros (text) {
      text = text.replace(/^0+/, '')
      return text[0] === '.' ? '0' + text : text
    },
    removeNonNumeral (text, preserveDecimal = false) {
      if (text == null) return ''
      return preserveDecimal ? text.replace(/[^\d.]/g, '') : text.replace(/[^\d]/g, '')
    },
    isNumeralDelimiter (char) {
      return char && char.match(/[^\d]/)
    }
  }
}
