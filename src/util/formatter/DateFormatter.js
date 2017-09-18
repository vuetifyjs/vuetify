'use strict'

const DateFormatter = function (datePattern) {
  const owner = this

  owner.blocks = []
  owner.datePattern = datePattern
  owner.initBlocks()
}

DateFormatter.prototype = {
  initBlocks: function () {
    const owner = this
    owner.datePattern.forEach(function (value) {
      if (value === 'Y') {
        owner.blocks.push(4)
      } else {
        owner.blocks.push(2)
      }
    })
  },

  getBlocks: function () {
    return this.blocks
  },

  getValidatedDate: function (value) {
    const owner = this
    var result = ''

    value = value.replace(/[^\d]/g, '')

    owner.blocks.forEach(function (length, index) {
      if (value.length > 0) {
        var sub = value.slice(0, length)
        const sub0 = sub.slice(0, 1)
        const rest = value.slice(length)

        switch (owner.datePattern[index]) {
          case 'd':
            if (sub === '00') {
              sub = '01'
            } else if (parseInt(sub0, 10) > 3) {
              sub = '0' + sub0
            } else if (parseInt(sub, 10) > 31) {
              sub = '31'
            }

            break

          case 'm':
            if (sub === '00') {
              sub = '01'
            } else if (parseInt(sub0, 10) > 1) {
              sub = '0' + sub0
            } else if (parseInt(sub, 10) > 12) {
              sub = '12'
            }

            break
        }

        result += sub

        // update remaining string
        value = rest
      }
    })

    return this.getFixedDateString(result)
  },

  getFixedDateString: function (value) {
    const owner = this
    const datePattern = owner.datePattern
    var date = []

    // mm-dd || dd-mm
    if (value.length === 4 && datePattern[0].toLowerCase() !== 'y' && datePattern[1].toLowerCase() !== 'y') {
      date = this.getDayMonth(datePattern, value)
    }

    // yyyy-mm-dd || yyyy-dd-mm || mm-dd-yyyy || dd-mm-yyyy || dd-yyyy-mm || mm-yyyy-dd
    if (value.length === 8) {
      date = this.getDayMonthYear(datePattern, value)
    }

    return date.length === 0 ? value : datePattern.reduce(function (previous, current) {
      switch (current) {
        case 'd':
          return previous + owner.addLeadingZero(date[0])
        case 'm':
          return previous + owner.addLeadingZero(date[1])
        default:
          return previous + '' + (date[2] || '')
      }
    }, '')
  },

  getFixedDate: function (day, month, year) {
    day = Math.min(day, 31)
    month = Math.min(month, 12)
    year = parseInt((year || 0), 10)

    if ((month < 7 && month % 2 === 0) || (month > 8 && month % 2 === 1)) {
      day = Math.min(day, month === 2 ? (this.isLeapYear(year) ? 29 : 28) : 30)
    }

    return [day, month, year]
  },

  isLeapYear: function (year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
  },

  addLeadingZero: function (number) {
    return (number < 10 ? '0' : '') + number
  },

  getDayMonth: function (datePattern, value) {
    const dayStartIndex = datePattern[0] === 'd' ? 0 : 2
    const monthStartIndex = 2 - dayStartIndex
    const day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10)
    const month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10)

    return this.getFixedDate(day, month, 0)
  },

  getDayMonthYear: function (datePattern, value) {
    let dayIndex = 0
    let monthIndex = 0
    let yearIndex = 0

    datePattern.forEach(function (type, index) {
      switch (type) {
        case 'd':
          dayIndex = index
          break
        case 'm':
          monthIndex = index
          break
        default:
          yearIndex = index
          break
      }
    })

    const yearStartIndex = yearIndex * 2
    const dayStartIndex = (dayIndex <= yearIndex) ? dayIndex * 2 : (dayIndex * 2 + 2)
    const monthStartIndex = (monthIndex <= yearIndex) ? monthIndex * 2 : (monthIndex * 2 + 2)

    const day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10)
    const month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10)
    const year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10)

    return this.getFixedDate(day, month, year)
  }
}

export default DateFormatter
