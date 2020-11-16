// Mixins
import DatePickerTable from './mixins/date-picker-table'

// Utils
import { weekNumber } from '../../util/dateTimeUtils'
import { pad, createNativeLocaleFormatter, monthChange } from './util'
import { createRange } from '../../util/helpers'
import mixins from '../../util/mixins'

// Types
import { VNode, VNodeChildren, PropType } from 'vue'
import { DatePickerFormatter } from 'vuetify/types'

export default mixins(
  DatePickerTable
/* @vue/component */
).extend({
  name: 'v-date-picker-date-table',

  props: {
    firstDayOfWeek: {
      type: [String, Number],
      default: 0,
    },
    localeFirstDayOfYear: {
      type: [String, Number],
      default: 0,
    },
    showAdjacentMonths: Boolean,
    showWeek: Boolean,
    weekdayFormat: Function as PropType<DatePickerFormatter | undefined>,
  },

  computed: {
    formatter (): DatePickerFormatter {
      return this.format || createNativeLocaleFormatter(this.currentLocale, { day: 'numeric', timeZone: 'UTC' }, { start: 8, length: 2 })
    },
    weekdayFormatter (): DatePickerFormatter | undefined {
      return this.weekdayFormat || createNativeLocaleFormatter(this.currentLocale, { weekday: 'narrow', timeZone: 'UTC' })
    },
    weekDays (): string[] {
      const first = parseInt(this.firstDayOfWeek, 10)

      return this.weekdayFormatter
        ? createRange(7).map(i => this.weekdayFormatter!(`2017-01-${first + i + 15}`)) // 2017-01-15 is Sunday
        : createRange(7).map(i => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(i + first) % 7])
    },
  },

  methods: {
    calculateTableDate (delta: number) {
      return monthChange(this.tableDate, Math.sign(delta || 1))
    },
    genTHead () {
      const days = this.weekDays.map(day => this.$createElement('th', day))
      if (this.showWeek) {
        days.unshift(this.$createElement('th'))
      }

      return this.$createElement('thead', this.genTR(days))
    },
    // Returns number of the days from the firstDayOfWeek to the first day of the current month
    weekDaysBeforeFirstDayOfTheMonth () {
      const firstDayOfTheMonth = new Date(`${this.displayedYear}-${pad(this.displayedMonth + 1)}-01T00:00:00+00:00`)
      const weekDay = firstDayOfTheMonth.getUTCDay()

      return (weekDay - parseInt(this.firstDayOfWeek) + 7) % 7
    },
    getWeekNumber (dayInMonth: number) {
      return weekNumber(
        this.displayedYear,
        this.displayedMonth,
        dayInMonth,
        parseInt(this.firstDayOfWeek),
        parseInt(this.localeFirstDayOfYear)
      )
    },
    genWeekNumber (weekNumber: number) {
      return this.$createElement('td', [
        this.$createElement('small', {
          staticClass: 'v-date-picker-table--date__week',
        }, String(weekNumber).padStart(2, '0')),
      ])
    },
    // eslint-disable-next-line max-statements
    genTBody () {
      const children = []
      const daysInMonth = new Date(this.displayedYear, this.displayedMonth + 1, 0).getDate()
      let rows = []
      let day = this.weekDaysBeforeFirstDayOfTheMonth()

      if (this.showWeek) {
        rows.push(this.genWeekNumber(this.getWeekNumber(1)))
      }

      const prevMonthYear = this.displayedMonth ? this.displayedYear : this.displayedYear - 1
      const prevMonth = (this.displayedMonth + 11) % 12
      const firstDayFromPreviousMonth = new Date(this.displayedYear, this.displayedMonth, 0).getDate()

      while (day--) {
        const date = `${prevMonthYear}-${pad(prevMonth + 1)}-${pad(firstDayFromPreviousMonth - day)}`

        rows.push(this.$createElement('td', this.showAdjacentMonths ? [
          this.genButton(date, true, 'date', this.formatter, true),
        ] : []))
      }

      for (day = 1; day <= daysInMonth; day++) {
        const date = `${this.displayedYear}-${pad(this.displayedMonth + 1)}-${pad(day)}`

        rows.push(this.$createElement('td', [
          this.genButton(date, true, 'date', this.formatter),
        ]))

        if (rows.length % (this.showWeek ? 8 : 7) === 0) {
          children.push(this.genTR(rows))
          rows = []
          if (this.showWeek && (day < daysInMonth)) {
            rows.push(this.genWeekNumber(this.getWeekNumber(day + 7)))
          }
        }
      }

      const nextMonthYear = this.displayedMonth === 11 ? this.displayedYear + 1 : this.displayedYear
      const nextMonth = (this.displayedMonth + 1) % 12
      let nextMonthDay = 1

      while (rows.length < 7) {
        const date = `${nextMonthYear}-${pad(nextMonth + 1)}-${pad(nextMonthDay++)}`

        rows.push(this.$createElement('td', this.showAdjacentMonths ? [
          this.genButton(date, true, 'date', this.formatter, true),
        ] : []))
      }

      if (rows.length) {
        children.push(this.genTR(rows))
      }

      return this.$createElement('tbody', children)
    },
    genTR (children: VNodeChildren) {
      return [this.$createElement('tr', children)]
    },
  },

  render (): VNode {
    return this.genTable('v-date-picker-table v-date-picker-table--date', [
      this.genTHead(),
      this.genTBody(),
    ], this.calculateTableDate)
  },
})
