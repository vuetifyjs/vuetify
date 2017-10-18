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
        positiveSign: false, // Ex. +99.00
        blockSeparator: ',', // {String|Array}. Ex. 9 999 999.00 (space as block separator)
        blockSize: 3, // {Number|Array}. Ex. 9999,9999.00 (block size of 4)
        decimal: '.', // Ex. 9,999,00 (blockSeparator === decimal)
        prefix: '', // Ex. $9.00 ($ prefix)
        precision: 2, // Ex. 999.000 (precision 3)
        suffix: '', // Ex. 999.00# (suffix #)
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
    blockSeparator () {
      const separator = this.options.blockSeparator

      if (!Array.isArray(separator)) return this.oneChar(separator)

      // Return default separator (' ') if array is empty
      // Return left most element as char if there's only 1 element
      switch (separator.length) {
        case 0: return ' '
        case 1: return this.oneChar(separator[0], ' ')
        default: return separator
      }
    },
    blockSize () {
      const size = this.options.blockSize

      if (!Array.isArray(size)) return this.absVal(size)

      // Return default size 3 if array is empty
      switch (size.length) {
        case 0: return 3
        case 1: return this.absVal(size[0])
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

      text = String(text)
      this.sign = text
      text = this.internalChange ? this.removeNonNumeral(text) : this.attemptNumeralCorrection(text)
      if (!text) return text // attemptNumeralCorrection() may return null or falsy

      if (this.precision) {
        text = text.split('')
        text.splice(-this.precision, 0, '.')
        text = this.parseFloat(text)
      } else {
        text = this.parseInt(text)
      }

      return this.sign + text.toString()
    },
    maskNumeralText (text) {
      if (!text) {
        const zero = 0
        this.sign = '+'
        return this.addPrefixSuffix(zero.toFixed(this.precision).toString().replace('.', this.decimal))
      }

      const blockSeparator = this.blockSeparator
      const blockSize = Array.isArray(this.blockSize) ? this.blockSize : [this.blockSize]
      const masked = []

      let i = blockSeparator.length
      let j = blockSize.length - 1
      let length = 0
      let integer = !this.precision

      text = String(text)
      if (this.sign) text = text.substr(1)

      // Group the digits with specified separators.
      // The left most size and separator element
      // of the arrays become the default.
      text.split('').reverse().forEach(digit => {
        masked.push(digit)
        if (integer) {
          if (!(++length % blockSize[j])) {
            i > 0 && i--
            j > 0 && j--
            length = 0
            masked.push(this.oneChar(blockSeparator[i], ' '))
          }
        } else if (digit === '.') {
          masked.pop(digit)
          masked.push(this.decimal)
          integer = true
        }
      })

      masked.reverse()
      // Remove leading block separator
      this.blockSeparator.includes(masked[0]) && masked.shift()

      return this.addPrefixSuffix(masked.join(''))
    },
    oneChar (char, single = '.') {
      return char ? char[0] : single
    },
    absVal (value) {
      let parsed = parseInt(value, 10)

      if (isNaN(parsed)) return 0
      parsed = Math.abs(parsed)

      // Set the general limit to that of Number.prototype.toFixed()
      return parsed > 20 ? 20 : parsed
    },
    adjustNumeralCaret (selection, text) {
      const prefixLength = this.numeralPrefix.length
      const offset = this.selection - prefixLength

      // Caret is at prefix or suffix
      if (prefixLength && this.selection < prefixLength) return prefixLength
      if (this.numeralSuffix) {
        const end = text.lastIndexOf(this.numeralSuffix)
        if (this.selection >= end) return end
      }

      // Caret is around + or -
      if (prefixLength && this.sign && offset === 1) return this.selection
      if (this.sign && offset === 1) return ++selection
      if (prefixLength && offset === 0) return this.selection
      if (offset <= 0 || this.precision <= 0) return selection
      if (String(this.lazyValue).length > this.precision + (this.sign ? 3 : 2)) return selection

      // Handle abs(value) < 1
      // Make the caret stay where it were when the
      // length of input is the same before and after
      if (this.backspace) {
        if (text.substr(prefixLength + (this.sign ? 1 : 0), 1) === '0') {
          text.substr(this.selection, 1) !== this.decimal && selection++
          text.substr(this.selection - 1, 1) === this.decimal && selection++
        }
      } else if (this.delete) {
        if (text.substr(this.selection, 1) === this.decimal) {
          selection += 1
        } else {
          selection += text.substr(prefixLength + (this.sign ? 1 : 0), 1) === '0' ? 1 : 0
          selection += text.substr(selection - 1, 1) === this.decimal ? 1 : 0
        }
      } else {
        selection -= this.selection < selection ? 1 : 0
        selection -= this.selection === selection ? 1 : 0
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

        return integer + ''.padEnd(this.precision, '0')
      }

      // Complete number with fractional part
      let fraction = this.removeNonNumeral(text.substr(decimalPoint))
      fraction = fraction.substr(0, this.precision)
      fraction = fraction.padEnd(this.precision, '0')

      integer = this.removeNonNumeral(text.substring(0, decimalPoint))
      if (!integer) integer = '0'

      return integer + fraction
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
      let fraction = text.substr(decimal + 1)

      fraction = this.removeNonNumeral(fraction)
      fraction = fraction.padEnd(this.precision, '0')

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
