'use strict'

const NumeralFormatter = function (props) {
  this.numeralDecimalMark = props.numeralDecimalMark || '.'
  this.numeralIntegerScale = props.numeralIntegerScale > 0 ? props.numeralIntegerScale : 0
  this.numeralDecimalScale = props.numeralDecimalScale >= 0 ? props.numeralDecimalScale : 2
  this.numeralThousandsGroupStyle = props.numeralThousandsGroupStyle || NumeralFormatter.groupStyle.thousand
  this.numeralPositiveOnly = !!props.numeralPositiveOnly
  this.stripLeadingZeroes = props.stripLeadingZeroes == null ? true : props.stripLeadingZeroes
  this.delimiter = (props.delimiter || props.delimiter === '') ? props.delimiter : ','
  this.delimiterRE = props.delimiter ? new RegExp('\\' + props.delimiter, 'g') : ''
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
    let partDecimal = ''
    let parts
    let partInteger

    // strip alphabet letters
    value = value.replace(/[A-Za-z]/g, '')
    // replace the first decimal mark with reserved placeholder
    value = value.replace(this.numeralDecimalMark, 'M')

    // strip non numeric letters except minus and "M"
    // this is to ensure prefix has been stripped
    value = value.replace(/[^\dM-]/g, '')

    // replace the leading minus with reserved placeholder
    value = value.replace(/^\-/, 'N')

    // strip the other minus sign (if present)
    value = value.replace(/\-/g, '')

    // replace the minus sign (if present)
    value = value.replace('N', this.numeralPositiveOnly ? '' : '-')

    // replace decimal mark
    value = value.replace('M', this.numeralDecimalMark)

    // strip any leading zeros
    if (this.stripLeadingZeroes) {
      value = value.replace(/^(-)?0+(?=\d)/, '$1')
    }

    partInteger = value

    if (value.indexOf(this.numeralDecimalMark) >= 0) {
      parts = value.split(this.numeralDecimalMark)
      partInteger = parts[0]
      partDecimal = this.numeralDecimalMark + parts[1].slice(0, this.numeralDecimalScale)
    }

    if (this.numeralIntegerScale > 0) {
      partInteger = partInteger.slice(0, this.numeralIntegerScale + (value.slice(0, 1) === '-' ? 1 : 0))
    }

    switch (this.numeralThousandsGroupStyle) {
      case NumeralFormatter.groupStyle.lakh:
        partInteger = partInteger.replace(/(\d)(?=(\d\d)+\d$)/g, '$1' + this.delimiter)

        break

      case NumeralFormatter.groupStyle.wan:
        partInteger = partInteger.replace(/(\d)(?=(\d{4})+$)/g, '$1' + this.delimiter)

        break

      default:
        partInteger = partInteger.replace(/(\d)(?=(\d{3})+$)/g, '$1' + this.delimiter)
    }

    return partInteger.toString() + (this.numeralDecimalScale > 0 ? partDecimal.toString() : '')
  }
}

export default NumeralFormatter
