'use strict'

const DefaultProperties = {
  assign: function (target, opts) {
    target = target || {}
    opts = opts || {}

    target = this.assignCreditCard(target, opts)
    target = this.assignDate(target, opts)
    target = this.assignNumeral(target, opts)
    target = this.assignOthers(target, opts)

    return target
  },

  assignCreditCard: function (target, opts) {
    target.creditCard = !!opts.creditCard
    target.creditCardStrictMode = !!opts.creditCardStrictMode
    target.creditCardType = ''
    target.onCreditCardTypeChanged = opts.onCreditCardTypeChanged || function () {}
    return target
  },

  assignDate: function (target, opts) {
    target.date = !!opts.date
    target.datePattern = opts.datePattern || ['d', 'm', 'Y']
    target.dateFormatter = {}
    return target
  },

  assignNumeral: function (target, opts) {
    target.numeral = !!opts.numeral
    target.numeralIntegerScale = opts.numeralIntegerScale > 0 ? opts.numeralIntegerScale : 0
    target.numeralDecimalScale = opts.numeralDecimalScale >= 0 ? opts.numeralDecimalScale : 2
    target.numeralDecimalMark = opts.numeralDecimalMark || '.'
    target.numeralThousandsGroupStyle = opts.numeralThousandsGroupStyle || 'thousand'
    target.numeralPositiveOnly = !!opts.numeralPositiveOnly
    target.stripLeadingZeroes = opts.stripLeadingZeroes == null ? true : opts.stripLeadingZeroes
    return target
  },

  assignOthers: function (target, opts) {
    target.numericOnly = target.creditCard || target.date || !!opts.numericOnly

    target.uppercase = !!opts.uppercase
    target.lowercase = !!opts.lowercase

    target.prefix = (target.creditCard || target.date) ? '' : (opts.prefix || '')
    target.prefixLength = target.prefix.length
    target.rawValueTrimPrefix = !!opts.rawValueTrimPrefix
    target.copyDelimiter = !!opts.copyDelimiter

    target.initValue = (opts.initValue !== undefined && opts.initValue !== null)
      ? opts.initValue.toString() : ''

    target.delimiter = (opts.delimiter || opts.delimiter === '')
      ? opts.delimiter : (opts.date ? '/' : (opts.numeral ? ',' : ' '))
    target.delimiterLength = target.delimiter.length
    target.delimiters = opts.delimiters || []

    target.blocks = opts.blocks || []
    target.blocksLength = target.blocks.length

    target.root = (typeof global === 'object' && global) ? global : window

    target.maxLength = 0

    target.backspace = false
    target.result = ''

    return target
  }
}

export default DefaultProperties
