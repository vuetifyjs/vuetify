// Mixins
import DatePickerTable from './mixins/date-picker-table'

// Utils
import { pad, createNativeLocaleFormatter, monthChange } from './util'
import { createRange } from '../../util/helpers'
import mixins from '../../util/mixins'

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
      this.showWeek && days.unshift(this.$createElement('th'))
      return this.$createElement('thead', this.genTR(days))
    },
    // Returns number of the days from the firstDayOfWeek to the first day of the current month
    weekDaysBeforeFirstDayOfTheMonth () {
      const firstDayOfTheMonth = new Date(`${this.displayedYear}-${pad(this.displayedMonth + 1)}-01T00:00:00+00:00`)
      const weekDay = firstDayOfTheMonth.getUTCDay()
      return (weekDay - parseInt(this.firstDayOfWeek) + 7) % 7
    },
    getWeekNumber () {
      let dayOfYear = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][this.displayedMonth]
      if (this.displayedMonth > 1 &&
        (((this.displayedYear % 4 === 0) && (this.displayedYear % 100 !== 0)) || (this.displayedYear % 400 === 0))
      ) {
        dayOfYear++
      }
      const offset = (
        this.displayedYear +
        ((this.displayedYear - 1) >> 2) -
        Math.floor((this.displayedYear - 1) / 100) +
        Math.floor((this.displayedYear - 1) / 400) -
        Number(this.firstDayOfWeek)
      ) % 7 // https://en.wikipedia.org/wiki/Zeller%27s_congruence
      return Math.floor((dayOfYear + offset) / 7) + 1
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
      const daysInMonth = new Date(this.displayedYear, this.displayedMonth + 1, 0).getDate()
      let rows = []
      let day = this.weekDaysBeforeFirstDayOfTheMonth()
      let weekNumber = this.getWeekNumber()

      this.showWeek && rows.push(this.genWeekNumber(weekNumber++))

      while (day--) rows.push(this.$createElement('td'))
      for (day = 1; day <= daysInMonth; day++) {
        const date = `${this.displayedYear}-${pad(this.displayedMonth + 1)}-${pad(day)}`

        rows.push(this.$createElement('td', [
          this.genButton(date, true, 'date', this.formatter),
        ]))

        if (rows.length % (this.showWeek ? 8 : 7) === 0) {
          children.push(this.genTR(rows))
          rows = []
          day < daysInMonth && this.showWeek && rows.push(this.genWeekNumber(weekNumber++))
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
