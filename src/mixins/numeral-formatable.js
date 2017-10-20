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

      if (!Array.isArray(separator)) return [this.oneChar(separator, ' ')]

      switch (separator.length) {
        case 0: return [' ']
        case 1: return this.oneChar(separator, ' ')
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
      if (!text) return text // attemptNumeralCorrection() may return null or falsy

      let number
      if (this.precision) {
        number = text.split('')
        number.splice(-this.precision, 0, '.')
        number = this.parseFloat(number)
      } else {
        number = this.parseInt(text)
      }

      return this.sign + number.toString()
    },
    maskNumeralText (text) {
      if (!text) return this.numeralZero()

      const blockSize = Array.isArray(this.blockSize) ? this.blockSize : [this.blockSize]
      const masked = []

      let i = this.blockSeparator.length - 1
      let j = blockSize.length - 1
      let length = 0
      let integer = !this.precision

      text = this.sign ? String(text).substr(1) : String(text)

      // Group the digits with specified separators.
      // The first size and separator element
      // of the arrays becomes the default value.
      for (const digit of text.split('').reverse()) {
        digit !== '.' && masked.push(digit)
        if (integer && !(++length % blockSize[j])) {
          masked.push(this.oneChar(this.blockSeparator[i], ' '))
          i > 0 && i--
          j > 0 && j--
          length = 0
        } else if (digit === '.') {
          masked.push(this.decimal)
          integer = true
        }
      }

      masked.reverse()
      // Remove leading block separator
      this.blockSeparator.includes(masked[0]) && masked.shift()

      return this.addPrefixSuffix(masked.join(''))
    },
    numeralZero () {
      const zero = 0
      this.sign = '+'
      return this.addPrefixSuffix(zero.toFixed(this.precision).toString().replace('.', this.decimal))
    },
    oneChar (char, singleChar = '.') {
      return char ? char[0] : singleChar
    },
    absVal (value) {
      let parsed = parseInt(value, 10)

      if (isNaN(parsed)) return 0
      parsed = Math.abs(parsed)

      // Set the general limit to that of Number.prototype.toFixed()
      return parsed > 20 ? 20 : parsed
    },
    adjustNumeralCaret (selection, text) {
      // Caret is at prefix
      if (selection === 0) return this.numeralPrefix.length + this.sign.length

      // Whether it's an integer or a fractional where abs(value) >= 10
      if (!this.precision ||
        (String(this.lazyValue).length > this.precision + (this.sign ? 3 : 2))) {
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
      let integer

      // Integer only
      if (!this.precision) {
        // Assume floor conversion (truncate)
        return decimalPoint < 0
          ? this.removeNonNumeral(text) : this.removeNonNumeral(text.substring(0, decimalPoint))
      }

      // Missing fractional part
      if (decimalPoint < 0) {
        integer = this.removeNonNumeral(text)
        if (!integer) return null // garbage

        return integer + this.getFraction('')
      }

      integer = this.removeNonNumeral(text.substring(0, decimalPoint))
      if (!integer) integer = '0'

      return integer + this.getFraction(text.substr(decimalPoint))
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
      let parsed = []
      let leadingZeros = true

      for (const digit of text) {
        if (leadingZeros) {
          if (digit === '0') continue
          leadingZeros = false
        }

        parsed.push(digit)
      }

      parsed = parsed.join('')
      return parsed[0] === '.' ? '0' + parsed : parsed
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
