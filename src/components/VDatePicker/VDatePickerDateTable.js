// Mixins
import Colorable from '../../mixins/colorable'
import DatePickerTable from './mixins/date-picker-table'

// Utils
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
    events: {
      type: [Array, Object, Function],
      default: () => null
    },
    eventColor: {
      type: String,
      default: 'warning'
    },
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
    genButtonClasses (day, disabled) {
      const isActive = this.isActive(day)
      const isCurrent = this.isCurrent(day)
      const classes = Object.assign({
        'btn--active': isActive,
        'btn--outline': isCurrent && !isActive,
        'btn--disabled': disabled
      }, this.themeClasses)

      return (isActive || isCurrent)
        ? this.addBackgroundColorClassChecks(classes)
        : classes
    },
    genButton (day) {
      const date = `${this.displayedYear}-${pad(this.displayedMonth + 1)}-${pad(day)}`
      const disabled = !isValueAllowed(date, this.allowedDates)

      return this.$createElement('button', {
        staticClass: 'btn btn--raised btn--icon',
        'class': this.genButtonClasses(day, disabled),
        attrs: {
          type: 'button'
        },
        domProps: {
          disabled,
          innerHTML: `<span class="btn__content">${this.formatter(date)}</span>`
        },
        on: disabled ? {} : {
          click: () => this.$emit('input', date)
        }
      })
    },
    genEvent () {
      return this.$createElement('div', {
        staticClass: 'date-picker-table__event',
        class: this.addBackgroundColorClassChecks({}, 'eventColor')
      })
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
      let day = this.weekDaysBeforeFirstDayOfTheMonth()

      while (day--) rows.push(this.$createElement('td'))
      for (day = 1; day <= daysInMonth; day++) {
        const date = `${this.displayedYear}-${pad(this.displayedMonth + 1)}-${pad(day)}`
        const isEvent = isValueAllowed(date, this.events, false)
        rows.push(this.$createElement('td', [
          this.genButton(day),
          isEvent ? this.genEvent() : null
        ]))

        if (rows.length % 7 === 0) {
          children.push(this.genTR(rows))
          rows = []
        }
      }

      if (rows.length) {
        children.push(this.genTR(rows))
      }

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
