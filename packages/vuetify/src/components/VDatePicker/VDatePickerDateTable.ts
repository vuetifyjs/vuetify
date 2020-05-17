// Mixins
import DatePickerTable from './mixins/date-picker-table'

// Utils
import { weekNumber } from '../../util/dateTimeUtils'
import { pad, createNativeLocaleFormatter, monthChange } from './util'
import { createRange } from '../../util/helpers'
import mixins from '../../util/mixins'
import { jalaliToGregorian, gregorianToJalali } from './util/jdf'

// Types
import { VNode, VNodeChildren, PropType } from 'vue'
import { DatePickerFormatter } from 'types'

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

      if (this.currentLocale === 'fa-IR') {
        return this.weekdayFormatter
          ? createRange(7).map(i => this.weekdayFormatter!(gregorianToJalali(2017, 1, first + i + 15).join('-'))) // 2017-01-15 is Sunday
          : createRange(7).map(i => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(i + first) % 7])
      }
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
      let firstDayOfTheMonth = new Date(`${this.displayedYear}-${pad(this.displayedMonth + 1)}-01T00:00:00+00:00`)
      if (this.currentLocale === 'fa-IR') {
        const gDate = jalaliToGregorian(this.displayedYear, this.displayedMonth + 1, 1)
        firstDayOfTheMonth = new Date(`${gDate[0]}-${pad(gDate[1])}-${pad(gDate[2])}T00:00:00+00:00`)
      }
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
    genTBody () {
      const children = []
      let daysInMonth = new Date(this.displayedYear, this.displayedMonth + 1, 0).getDate()
      if (this.currentLocale === 'fa-IR') {
        daysInMonth = this.displayedMonth + 1 > 6 ? 30 : 31
        if (this.displayedMonth + 1 === 12 && this.displayedYear % 4 !== 3) {
          daysInMonth = 29
        }
      }
      let rows = []
      let day = this.weekDaysBeforeFirstDayOfTheMonth()

      if (this.showWeek) {
        rows.push(this.genWeekNumber(this.getWeekNumber(1)))
      }

      while (day--) rows.push(this.$createElement('td'))
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
