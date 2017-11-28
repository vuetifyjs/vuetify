import Colorable from '../../mixins/colorable'
import DatePickerTable from './mixins/date-picker-table'

import { pad, createNativeLocaleFormatter, monthChange } from './util'
import { createRange } from '../../util/helpers'
import isValueAllowed from '../../util/isValueAllowed'

export default {
  name: 'v-date-picker-date-table',

  mixins: [
    Colorable,
    DatePickerTable
  ],

  props: {
    firstDayOfWeek: {
      type: [String, Number],
      default: 0
    },
    weekdayFormat: {
      type: Function,
      default: null
    }
  },

  computed: {
    formatter () {
      return this.format || createNativeLocaleFormatter(this.locale, { day: 'numeric', timeZone: 'UTC' }, { start: 8, length: 2 })
    },
    weekdayFormatter () {
      return this.weekdayFormat || createNativeLocaleFormatter(this.locale, { weekday: 'narrow', timeZone: 'UTC' })
    },
    weekDays () {
      const first = parseInt(this.firstDayOfWeek, 10)

      return this.weekdayFormatter
        ? createRange(7).map(i => this.weekdayFormatter(`2017-01-${first + i + 15}`)) // 2017-01-15 is Sunday
        : createRange(7).map(i => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(i + first) % 7])
    }
  },

  methods: {
    calculateTableDate (delta) {
      return monthChange(this.tableDate, Math.sign(delta || 1))
    },

    genTHead () {
      const days = this.weekDays.map(day => this.$createElement('th', day))
      return this.$createElement('thead', this.genTR(days))
    },

    genTD (day) {
      const date = `${this.displayedYear}-${pad(this.displayedMonth + 1)}-${pad(day)}`
      const buttonText = this.formatter(date)
      const isActive = this.isActive(day)
      const isCurrent = this.isCurrent(day)
      const isDisabled = !isValueAllowed(date, this.allowedDates)
      const classes = Object.assign({
        'btn--active': isActive,
        'btn--outline': isCurrent && !isActive,
        'btn--disabled': isDisabled
      }, this.themeClasses)

      const button = this.$createElement('button', {
        staticClass: 'btn btn--raised btn--icon',
        'class': (isActive || isCurrent)
          ? this.addBackgroundColorClassChecks(classes)
          : classes,
        attrs: {
          type: 'button'
        },
        domProps: {
          innerHTML: `<span class="btn__content">${buttonText}</span>`
        },
        on: isDisabled ? undefined : {
          click: () => this.$emit('input', date)
        }
      })

      return this.$createElement('td', [button])
    },

    // Returns number of the days from the firstDayOfWeek to the first day of the current month
    weekDaysBeforeFirstDayOfTheMonth () {
      const firstDayOfTheMonth = new Date(`${this.displayedYear}-${pad(this.displayedMonth + 1)}-01T00:00:00+00:00`)
      const weekDay = firstDayOfTheMonth.getUTCDay()
      return (weekDay - parseInt(this.firstDayOfWeek) + 7) % 7
    },

    genTBody () {
      const children = []
      const daysInMonth = new Date(this.displayedYear, this.displayedMonth + 1, 0).getDate()
      let rows = []
      const day = this.weekDaysBeforeFirstDayOfTheMonth()

      for (let i = 0; i < day; i++) {
        rows.push(this.$createElement('td'))
      }

      for (let i = 1; i <= daysInMonth; i++) {
        rows.push(this.genTD(i))

        if (rows.length % 7 === 0) {
          children.push(this.genTR(rows))
          rows = []
        }
      }

      if (rows.length) {
        children.push(this.genTR(rows))
      }

      children.length < 6 && children.push(this.genTR([
        this.$createElement('td', { domProps: { innerHTML: '&nbsp;' } })
      ]))

      return this.$createElement('tbody', children)
    },

    genTR (children) {
      return [this.$createElement('tr', children)]
    },

    isActive (date) {
      return this.selectedYear === this.displayedYear &&
        this.selectedMonth === this.displayedMonth &&
        this.selectedDate === date
    },

    isCurrent (date) {
      return this.currentYear === this.displayedYear &&
        this.currentMonth === this.displayedMonth &&
        this.currentDate === date
    }
  },

  render (h) {
    return this.genTable('date-picker-table date-picker-table--date', [
      this.genTHead(),
      this.genTBody()
    ])
  }
}
