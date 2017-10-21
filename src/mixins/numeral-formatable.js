import {
  allowedMasks
} from '../util/mask'

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
      return this.oneChar(this.options.decimal)
    },
    blockSeparator () { // Default separator = ' '
      const separator = this.options.blockSeparator

      if (!Array.isArray(separator)) return [this.oneChar(separator, '')]

      switch (separator.length) {
        case 0: return [' ']
        case 1: return this.oneChar(separator, '')
        default: return separator
      }
    },
    blockSize () { // Default size = 3
      const size = this.options.blockSize

      if (!Array.isArray(size)) return [this.absVal(size)]

      switch (size.length) {
        case 0: return [3]
        case 1: return [this.absVal(size[0])]
        default: return size
      }
    },
    sign: {
      get () {
        return this.signSymbol
      },
      set (val) {
        let i = 0

        if (this.numeralPrefix) {
          for (const char of val) {
            if (allowedMasks['#'].test(char)) break
            if (char === '+' || char === '-') break
            i++
          }
          val = val.substr(i)
        }

        const negative = val && val.length > 0 && val[0] === '-'
        const positiveSymbol = this.positiveSign ? '+' : ''

        this.signSymbol = this.options.positiveOnly ? positiveSymbol
          : negative ? '-' : positiveSymbol
      }
    },
    numeralPrefix () {
      return this.options.prefix ? this.options.prefix : ''
    },
    numeralSuffix () {
      return this.options.suffix ? this.options.suffix : ''
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
      if (!text) return this.numeralZero()
      text = this.sign ? String(text).substr(1) : String(text)

      const param = {
        masked: [],
        i: this.blockSeparator.length - 1,
        j: this.blockSize.length - 1,
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
          this.blockSize[param.j] && this.blockSeparator[param.i] && param.masked.push(digit)
        } else param.masked.push(digit)
      }

      if (param.integer) {
        if (!this.blockSize[param.j]) return false
        else if (!this.blockSeparator[param.i]) param.masked.push(digit)
        else if (!(++param.length % this.blockSize[param.j])) {
          param.masked.push(this.oneChar(this.blockSeparator[param.i], ' '))
          param.i > 0 && param.i--
          param.j > 0 && param.j--
          param.length = 0
        }
      } else if (digit === '.') {
        param.masked.push(this.decimal)
        param.integer = true
      }

      return true
    },
    maskedNumeral (masked) {
      if (!masked.length) masked.splice(0, 0, '0')
      else if (this.blockSeparator.includes(masked[0])) masked.shift()

      const result = this.addPrefixSuffix(masked.join(''))

      return masked[0] === '.' ? '0' + result : result
    },
    numeralZero () {
      const zero = 0
      this.sign = '+'
      return this.addPrefixSuffix(zero.toFixed(this.precision).toString().replace('.', this.decimal))
    },
    oneChar (char, defaultChar = '.') {
      return char ? char[0] : defaultChar
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

      // Caret is at suffix
      const suffixPosition = this.numeralSuffix ? text.lastIndexOf(this.numeralSuffix) : 0
      if (suffixPosition > 0 && selection >= suffixPosition) {
        return selection > suffixPosition ? suffixPosition
          : this.delete || this.backspace ? suffixPosition : suffixPosition - 1
      }

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
      if (text.substr(this.selection, 1) === this.decimal) {
        selection += 1
      } else {
        selection += text.substr(this.numeralPrefix.length + this.sign.length, 1) === '0' ? 1 : 0
        selection += text.substr(selection - 1, 1) === this.decimal ? 1 : 0
      }

      return selection
    },
    numeralCaretOnBackspace (selection, text) {
      if (text.substr(this.numeralPrefix.length + this.sign.length, 1) === '0') {
        // abs(value) < 1
        text.substr(this.selection, 1) !== this.decimal && selection++
        text.substr(this.selection - 1, 1) === this.decimal && selection++
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
      const fraction = this.getFraction(text.substr(decimal + 1))

      return text.substr(0, decimal) + '.' + fraction
    },
    removeLeadingZeros (text) {
      text = text.replace(/^0+/, '')
      return text[0] === '.' ? '0' + text : text
    },
    removeNonNumeral (text, preserveDecimal = false) {
      if (text == null) return ''
      return preserveDecimal ? text.replace(new RegExp(/[^\d.]/, 'g'), '')
        : text.replace(new RegExp(/[^\d]/, 'g'), '')
    },
    isNumeralDelimiter (char) {
      return char && char.match(/[^\d]/)
    }
  }
}
