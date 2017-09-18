'use strict'

const NumeralFormatter = function (numeralDecimalMark,
  numeralIntegerScale,
  numeralDecimalScale,
  numeralThousandsGroupStyle,
  numeralPositiveOnly,
  stripLeadingZeroes,
  delimiter) {
  const owner = this

  owner.numeralDecimalMark = numeralDecimalMark || '.'
  owner.numeralIntegerScale = numeralIntegerScale > 0 ? numeralIntegerScale : 0
  owner.numeralDecimalScale = numeralDecimalScale >= 0 ? numeralDecimalScale : 2
  owner.numeralThousandsGroupStyle = numeralThousandsGroupStyle || NumeralFormatter.groupStyle.thousand
  owner.numeralPositiveOnly = !!numeralPositiveOnly
  owner.stripLeadingZeroes = stripLeadingZeroes == null ? true : stripLeadingZeroes
  owner.delimiter = (delimiter || delimiter === '') ? delimiter : ','
  owner.delimiterRE = delimiter ? new RegExp('\\' + delimiter, 'g') : ''
}

NumeralFormatter.groupStyle = {
  thousand: 'thousand',
  lakh: 'lakh',
  wan: 'wan'
}

NumeralFormatter.prototype = {
  getRawValue: function (value) {
    return value.replace(this.delimiterRE, '').replace(this.numeralDecimalMark, '.')
  },

  format: function (value) {
    const owner = this
    let partDecimal = ''
    let parts
    let partInteger

    // strip alphabet letters
    value = value.replace(/[A-Za-z]/g, '')
      // replace the first decimal mark with reserved placeholder
      .replace(owner.numeralDecimalMark, 'M')

      // strip non numeric letters except minus and "M"
      // this is to ensure prefix has been stripped
      .replace(/[^\dM-]/g, '')

      // replace the leading minus with reserved placeholder
      .replace(/^\-/, 'N')

      // strip the other minus sign (if present)
      .replace(/\-/g, '')

      // replace the minus sign (if present)
      .replace('N', owner.numeralPositiveOnly ? '' : '-')

      // replace decimal mark
      .replace('M', owner.numeralDecimalMark)

    // strip any leading zeros
    if (owner.stripLeadingZeroes) {
      value = value.replace(/^(-)?0+(?=\d)/, '$1')
    }

    partInteger = value

    if (value.indexOf(owner.numeralDecimalMark) >= 0) {
      parts = value.split(owner.numeralDecimalMark)
      partInteger = parts[0]
      partDecimal = owner.numeralDecimalMark + parts[1].slice(0, owner.numeralDecimalScale)
    }

    if (owner.numeralIntegerScale > 0) {
      partInteger = partInteger.slice(0, owner.numeralIntegerScale + (value.slice(0, 1) === '-' ? 1 : 0))
    }

    switch (owner.numeralThousandsGroupStyle) {
      case NumeralFormatter.groupStyle.lakh:
        partInteger = partInteger.replace(/(\d)(?=(\d\d)+\d$)/g, '$1' + owner.delimiter)

        break

      case NumeralFormatter.groupStyle.wan:
        partInteger = partInteger.replace(/(\d)(?=(\d{4})+$)/g, '$1' + owner.delimiter)

        break

      default:
        partInteger = partInteger.replace(/(\d)(?=(\d{3})+$)/g, '$1' + owner.delimiter)
    }

    return partInteger.toString() + (owner.numeralDecimalScale > 0 ? partDecimal.toString() : '')
  }
}

export default NumeralFormatter
