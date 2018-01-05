export default {
  data: () => ({
    options: {},
    signSymbol: '',
    growLength: true,
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
    },
    numeralZero () {
      return this.addPrefixSuffix(this.precision ? '0.' + this.getFraction('') : '0')
    }
  },

  methods: {
    unmaskNumeralText (text) {
      if (!text) return text
      this.sign = text = String(text)

      if (this.internalChange) text = text.replace(/[^\d]/g, '')
      else {
        this.internalChange = true
        text = this.attemptNumeralCorrection(text)
      }

      return this.sign === '-' ? '-' + this.parseNumber(text) : this.parseNumber(text)
    },
    maskNumeralText (digits) {
      if (!digits) return this.numeralZero
      digits = this.sign ? String(digits).substr(1) : String(digits)

      const param = {
        masked: [],
        separatorIndex: this.blockSeparator.length - 1,
        sizeIndex: this.blockSize.length - 1,
        length: 0,
        integer: !this.precision
      }

      // Group the digits with specified separators and digit counts.
      for (const digit of digits.split('').reverse()) {
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
        if (!this.blockSize[param.sizeIndex]) return this.growLength = false
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
      else if (this.blockSeparator.includes(masked[0])) {
        if (this.precision && masked.lastIndexOf(this.decimal) === 0) {
          masked.splice(0, 0, '0')
        } else masked.shift()
      }

      return this.addPrefixSuffix(masked.join(''))
    },
    // TODO: Rework this restrictive function to
    // make -ve as a valid value in order
    // to support special meaning/feature
    absVal (value) {
      const parsed = parseInt(value, 10)

      if (isNaN(parsed)) return 0
      return Math.abs(parsed)
    },
    adjustNumeralCaret (selection, maskedText) {
      // Caret is at prefix
      if (selection === 0) return this.numeralPrefix.length + this.sign.length

      // Length of input grows and larger than minimum digit count.
      if (this.growLength && (!this.precision ||
        (String(this.lazyValue).length > this.precision + (this.sign ? 3 : 2)))) {
        return selection
      } else this.growLength = true

      // Caret is at suffix or end of line
      const suffixPosition = this.numeralSuffix ? maskedText.lastIndexOf(this.numeralSuffix) : 0
      if (suffixPosition > 0 && selection >= suffixPosition) {
        return selection > suffixPosition ? suffixPosition
          : this.delete || this.backspace ? suffixPosition : suffixPosition - 1
      }

      // Length of input field is unchanged. Make the caret stay where it were.
      return this.backspace ? this.numeralCaretOnBackspace(selection, maskedText)
        : this.delete ? this.numeralCaretOnDelete(selection, maskedText)
          : this.numeralCaretOnInsert(selection)
    },
    numeralCaretOnInsert (selection) {
      return selection -= this.selection <= selection ? 1 : 0
    },
    numeralCaretOnDelete (selection, maskedText) {
      if (maskedText[this.selection] === this.decimal) {
        selection += 1
      } else {
        selection += maskedText[this.numeralPrefix.length + this.sign.length] === '0' ? 1 : 0
        selection += maskedText[selection - 1] === this.decimal ? 1 : 0
      }

      return selection
    },
    numeralCaretOnBackspace (selection, maskedText) {
      if (maskedText[this.numeralPrefix.length + this.sign.length] === '0') {
        maskedText[this.selection] !== this.decimal && selection++
        maskedText[this.selection - 1] === this.decimal && selection++
      }

      return selection
    },
    // Correction on arbitrary number entered externally
    attemptNumeralCorrection (text) {
      const [decimalDigits = '0', fractionDigits = ''] = text.replace(/[^\d.]/g, '').split('.')
      return `${decimalDigits}.${this.getFraction(fractionDigits)}`.replace('.', '')
    },
    getFraction (fractionDigits) {
      return fractionDigits.substr(0, this.precision).padEnd(this.precision, '0')
    },
    addPrefixSuffix (number) {
      return this.numeralPrefix + this.sign + number + this.numeralSuffix
    },
    parseNumber (digits) {
      if (!this.precision) return this.removeLeadingZeros(digits)

      digits = digits.split('')
      digits.splice(-this.precision, 0, '.')

      return this.removeLeadingZeros(digits.join(''))
    },
    removeLeadingZeros (digits) {
      digits = digits.replace(/^0+/, '')
      return digits[0] === '.' ? '0' + digits : digits
    },
    isNumeralDelimiter (char) {
      return char && char.match(/[^\d]/)
    }
  }
}
