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
      return DefaultProperties.assign({}, this.options)
    }
  },

  // Example: http://nosir.github.io/cleave.js/
  props: {
    options: {
      type: Object,
      required: false
    }
  },

  created () {
    const pps = this.properties

    pps.maxLength = Util.getMaxLength(pps.blocks)
    if (pps.numeral) {
      this.initNumeralFormatter()
    } else if (pps.date) {
      this.initDateFormatter()
    } else if (pps.blocksLength === 0 && !pps.prefix) {
      return
    }

    this.formatInput(this.initValue)
  },

  methods: {
    initNumeralFormatter () {
      const pps = this.properties

      pps.numeralFormatter = new NumeralFormatter(
        pps.numeralDecimalMark,
        pps.numeralIntegerScale,
        pps.numeralDecimalScale,
        pps.numeralThousandsGroupStyle,
        pps.numeralPositiveOnly,
        pps.stripLeadingZeroes,
        pps.delimiter
      )
    },
    initDateFormatter () {
      const pps = this.properties

      pps.dateFormatter = new DateFormatter(pps.datePattern)
      pps.blocks = pps.dateFormatter.getBlocks()
      pps.blocksLength = pps.blocks.length
      pps.maxLength = Util.getMaxLength(pps.blocks)
    },
    formatInput (value) {
      const pps = this.properties
      const prev = pps.result

      if (pps.backspace && value.slice(-1) !== pps.delimiter) {
        value = Util.headStr(value, value.length - 1)
      }

      // numeral formatter
      if (pps.numeral) {
        return this.formatNumeral(value)
      }
      // date
      if (pps.date) {
        value = pps.dateFormatter.getValidatedDate(value)
      }

      value = this.formatCommon(value)
      // prefix
      if (pps.prefix) {
        value = pps.prefix + value
        // no blocks specified, no need to do formatting
        if (pps.blocksLength === 0) {
          pps.result = value
          return this.updateValueState()
        }
      }
      // update credit card props
      if (pps.creditCard) {
        this.updateCreditCardPropsByValue(value)
      }
      // strip over length characters
      value = Util.headStr(value, pps.maxLength)
      // apply blocks
      pps.result = Util.getFormattedValue(value, pps.blocks, pps.blocksLength, pps.delimiter, pps.delimiters)
      // nothing changed
      // prevent update value to avoid caret position change
      if (prev === pps.result && prev !== pps.prefix) {
        return this.initValue
      }
      return this.updateValueState()
    },
    updateCreditCardPropsByValue (value) {
      const pps = this.properties

      // At least one of the first 4 characters has changed
      if (Util.headStr(pps.result, 4) === Util.headStr(value, 4)) {
        return
      }

      const creditCardInfo = CreditCardDetector.getInfo(value, pps.creditCardStrictMode)

      pps.blocks = creditCardInfo.blocks
      pps.blocksLength = pps.blocks.length
      pps.maxLength = Util.getMaxLength(pps.blocks)

      // credit card type changed
      if (pps.creditCardType !== creditCardInfo.type) {
        pps.creditCardType = creditCardInfo.type
        pps.onCreditCardTypeChanged.call(this, pps.creditCardType)
      }
    },
    updateValueState () {
      return this.initValue = this.properties.result
    },
    formatNumeral (value) {
      const pps = this.properties

      pps.result = pps.prefix + pps.numeralFormatter.format(value)
      return this.updateValueState()
    },
    formatCommon (value) {
      const pps = this.properties

      // strip delimiters
      value = Util.stripDelimiters(value, pps.delimiter, pps.delimiters)
      // strip prefix
      value = Util.getPrefixStrippedValue(value, pps.prefix, pps.prefixLength)
      // strip non-numeric characters
      value = pps.numericOnly ? Util.strip(value, /[^\d]/g) : value
      // convert case
      value = pps.uppercase ? value.toUpperCase() : value
      value = pps.lowercase ? value.toLowerCase() : value

      return value
    }
  }
}
