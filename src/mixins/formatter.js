'use strict'

import Util from '../util/formatter/Util'
import DefaultProperties from '../util/formatter/DefaultProperties'
import NumeralFormatter from '../util/formatter/NumeralFormatter'
import DateFormatter from '../util/formatter/DateFormatter'
import CreditCardDetector from '../util/formatter/CreditCardDetector'

export default {
  data () {
    return {
      initValue: '',
      maxLength: ''
    }
  },

  computed: {
    properties () {
      return DefaultProperties.assign({}, this.mask)
    }
  },

  // Example: http://nosir.github.io/cleave.js/
  props: {
    mask: {
      type: Object,
      required: false
    }
  },

  created () {
    this.properties.maxLength = Util.getMaxLength(this.properties.blocks)

    if (this.properties.numeral) {
      this.initNumeralFormatter()
    } else if (this.properties.date) {
      this.initDateFormatter()
    } else if (this.properties.blocksLength === 0 && !this.properties.prefix) {
      return
    }

    this.formatInput(this.initValue)
  },

  methods: {
    initNumeralFormatter () {
      const numeralProps = {
        numeralDecimalMark: this.properties.numeralDecimalMark,
        numeralIntegerScale: this.properties.numeralIntegerScale,
        numeralDecimalScale: this.properties.numeralDecimalScale,
        numeralThousandsGroupStyle: this.properties.numeralThousandsGroupStyle,
        numeralPositiveOnly: this.properties.numeralPositiveOnly,
        stripLeadingZeroes: this.properties.stripLeadingZeroes,
        delimiter: this.properties.delimiter
      }

      this.properties.numeralFormatter = new NumeralFormatter(numeralProps)
    },
    initDateFormatter () {
      this.properties.dateFormatter = new DateFormatter(this.properties.datePattern)
      this.properties.blocks = this.properties.dateFormatter.getBlocks()
      this.properties.blocksLength = this.properties.blocks.length
      this.properties.maxLength = Util.getMaxLength(this.properties.blocks)
    },
    formatInput (value) {
      if (!this.properties.numeral && this.properties.backspace &&
        !Util.isDelimiter(value.slice(-this.properties.delimiterLength),
          this.properties.delimiter, this.properties.delimiters)) {
        value = Util.headStr(value, value.length - this.properties.delimiterLength)
      }

      // numeral formatter
      if (this.properties.numeral) {
        return this.formatNumeral(value)
      }
      // date
      if (this.properties.date) {
        value = this.properties.dateFormatter.getValidatedDate(value)
      }

      value = this.formatCommon(value)
      // prefix
      if (this.properties.prefix) {
        value = this.properties.prefix + value
        // no blocks specified, no need to do formatting
        if (this.properties.blocksLength === 0) {
          this.properties.result = value
          return this.updateValue()
        }
      }

      return this.formatBlocks(value)
    },
    updateCreditCardPropsByValue (value) {
      // At least one of the first 4 characters has changed
      if (Util.headStr(this.properties.result, 4) === Util.headStr(value, 4)) {
        return
      }

      const creditCardInfo = CreditCardDetector.getInfo(value, this.properties.creditCardStrictMode)

      this.properties.blocks = creditCardInfo.blocks
      this.properties.blocksLength = this.properties.blocks.length
      this.properties.maxLength = Util.getMaxLength(this.properties.blocks)

      // credit card type changed
      if (this.properties.creditCardType !== creditCardInfo.type) {
        this.properties.creditCardType = creditCardInfo.type
        this.properties.onCreditCardTypeChanged.call(this, this.properties.creditCardType)
      }
    },
    updateValue () {
      return this.initValue = this.properties.result
    },
    formatNumeral (value) {
      this.properties.result = this.properties.prefix + this.properties.numeralFormatter.format(value)
      return this.updateValue()
    },
    formatCommon (value) {
      // strip delimiters
      value = Util.stripDelimiters(value, this.properties.delimiter, this.properties.delimiters)
      // strip prefix
      value = Util.getPrefixStrippedValue(value, this.properties.prefix, this.properties.prefixLength)
      // strip non-numeric characters
      value = this.properties.numericOnly ? Util.strip(value, /[^\d]/g) : value
      // convert case
      value = this.properties.uppercase ? value.toUpperCase() : value
      value = this.properties.lowercase ? value.toLowerCase() : value

      return value
    },
    formatBlocks (value) {
      // update credit card props
      if (this.properties.creditCard) {
        this.updateCreditCardPropsByValue(value)
      }
      // strip over length characters
      value = Util.headStr(value, this.properties.maxLength)
      // apply blocks
      this.properties.result = Util.getFormattedValue(value,
        { blocks: this.properties.blocks, blocksLength: this.properties.blocksLength },
        { delimiter: this.properties.delimiter, delimiters: this.properties.delimiters })

      return this.updateValue()
    }
  }
}
