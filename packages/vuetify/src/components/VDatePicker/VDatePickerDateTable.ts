// Mixins
import DatePickerTable from './mixins/date-picker-table'

// Utils
import { weekNumber } from '../../util/dateTimeUtils'
import { pad, createNativeLocaleFormatter, monthChange } from './util'
import { createRange, findLastIndex } from '../../util/helpers'
import mixins from '../../util/mixins'

// Types
import { VNode, VNodeChildren, PropType } from 'vue'
import { DatePickerFormatter } from 'vuetify/types'

type Directions = 'left' | 'right' | 'up' | 'down'

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

  data () {
    return {
      dateButtons: [] as HTMLTableCellElement[],
      isTableInTransition: false,
      transitionDirection: '' as Directions,
    }
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

  async mounted () {
    this.$on('keydown:arrowleft', () => this.moveHorizontal('left'))
    this.$on('keydown:arrowright', () => this.moveHorizontal('right'))
    this.$on('keydown:arrowup', () => this.moveVertical('up'))
    this.$on('keydown:arrowdown', () => this.moveVertical('down'))
    this.$on('keydown:pageup', () => this.moveTo('firstRow'))
    this.$on('keydown:pagedown', () => this.moveTo('lastRow'))
    this.$on('keydown:home', () => this.moveTo('firstColumn'))
    this.$on('keydown:end', () => this.moveTo('lastColumn'))
    this.$on('update-focused-cell', (index: number) => this.$emit('update:focused-date-index', index))
    this.$on('table-transitionend', () => this.handleTableTransitionEnd())

    if (!this.disabled) {
      await this.setStartIndex()
    }

    if (this.shouldAutofocus) {
      const element = this.dateButtons[this.focusedDateIndex].firstChild as HTMLButtonElement
      element.focus()
      this.$emit('update:should-autofocus', false)
    }
  },

  methods: {
    async moveTo (position: 'firstRow' | 'lastRow' | 'firstColumn' | 'lastColumn') {
      const rowElementsAmount = this.showWeek ? 8 : 7

      const positions = {
        firstRow: {
          index: this.focusedDateIndex % rowElementsAmount,
          oppositeDirection: 'down',
        },
        lastRow: {
          index: this.dateButtons.length - 1 - (rowElementsAmount - 1 - this.focusedDateIndex % rowElementsAmount),
          oppositeDirection: 'up',
        },
        firstColumn: {
          index: this.focusedDateIndex - (this.focusedDateIndex % rowElementsAmount),
          oppositeDirection: 'right',
        },
        lastColumn: {
          index: this.focusedDateIndex + (rowElementsAmount - 1 - this.focusedDateIndex % rowElementsAmount),
          oppositeDirection: 'left',
        },
      }

      const nextPosition = this.isElementEmpty(positions[position].index)
        ? this.setNextIndex(positions[position].index, positions[position].oppositeDirection as Directions)
        : positions[position].index

      this.$emit('update:focused-date-index', nextPosition)

      await this.$nextTick()
      const element = this.dateButtons[this.focusedDateIndex].firstChild as HTMLButtonElement
      element.focus()
    },
    async setStartIndex () {
      this.dateButtons = Array.from(this.$el.querySelectorAll('td'))
      this.$emit('update:focused-date-index', 0)
      await this.$nextTick()
      if (this.isElementEmpty(this.focusedDateIndex)) {
        const startIndex = this.setNextIndex(this.focusedDateIndex, 'right')
        startIndex !== -1 && this.$emit('update:focused-date-index', startIndex)
        await this.$nextTick()
      }
    },
    async moveHorizontal (direction: 'left' | 'right') {
      if (this.isTableInTransition) {
        return
      }

      const rowElementsAmount = this.showWeek ? 8 : 7
      const addition = direction === 'left' ? -1 : 1
      const nextPageItem = direction === 'left' ? rowElementsAmount - 1 : -(rowElementsAmount - 1)

      if (this.focusedDateIndex !== 0 && this.isElementEmpty(this.focusedDateIndex + addition)) {
        const isFirstRow = this.focusedDateIndex < rowElementsAmount
        const isLastRow = this.focusedDateIndex > this.dateButtons.length - 1 - rowElementsAmount

        if (direction === 'left') {
          isFirstRow
            ? this.$emit('update:focused-date-index', 0)
            : this.$emit('update:focused-date-index', this.focusedDateIndex + addition)
        }

        if (direction === 'right') {
          isLastRow
            ? this.$emit('update:focused-date-index', this.dateButtons.length - 1)
            : this.$emit('update:focused-date-index', this.focusedDateIndex)
        }

        await this.$nextTick()
      }

      const cantMove = {
        left: this.focusedDateIndex % rowElementsAmount === 0,
        right: (this.focusedDateIndex + 1) % rowElementsAmount === 0,
      }

      if (cantMove[direction]) {
        this.isTableInTransition = true
        this.transitionDirection = direction
        this.$emit('update:table-date', monthChange(this.tableDate, addition))
        this.$emit('update:focused-date-index', this.focusedDateIndex + nextPageItem)
      } else {
        this.$emit('update:focused-date-index', this.focusedDateIndex + addition)
        await this.$nextTick()
        const element = this.dateButtons[this.focusedDateIndex].firstChild as HTMLButtonElement
        element.focus()
      }
    },
    async moveVertical (direction: 'up' | 'down') {
      if (this.isTableInTransition) {
        return
      }

      const nextIndex = this.setNextIndex(this.focusedDateIndex, direction)

      this.$emit('update:focused-date-index', nextIndex)

      await this.$nextTick()
      const element = this.dateButtons[this.focusedDateIndex].firstChild as HTMLButtonElement
      element.focus()
    },
    setNextIndex (startIndex: number, direction: Directions): number {
      const rowElementsAmount = this.showWeek ? 8 : 7

      const nextIndex = {
        up: startIndex - rowElementsAmount < 0
          ? startIndex - rowElementsAmount + this.dateButtons.length
          : startIndex - rowElementsAmount,
        down: startIndex + rowElementsAmount > (this.dateButtons.length - 1)
          ? startIndex % rowElementsAmount
          : startIndex + rowElementsAmount,
        right: startIndex + 1,
        left: startIndex - 1,
      }

      let index = nextIndex[direction]

      if (index > this.dateButtons.length - 1) {
        return -1
      }

      if (this.isElementEmpty(index)) {
        index = this.setNextIndex(index, direction)
      }

      return index
    },
    isElementEmpty (index: number): boolean {
      const element = this.dateButtons[index].firstChild as HTMLButtonElement
      return element === null || element.disabled === true || element.tagName !== 'BUTTON'
    },
    async handleTableTransitionEnd () {
      this.dateButtons = Array.from(this.$el.querySelectorAll('td'))

      if (!this.isTableInTransition &&
        (this.focusedDateIndex > this.dateButtons.length - 1 || this.isElementEmpty(this.focusedDateIndex))) {
        this.setStartIndex()
      }

      if (this.isTableInTransition) {
        if (this.focusedDateIndex > this.dateButtons.length - 1) {
          this.$emit('update:focused-date-index', findLastIndex<HTMLElement>(this.dateButtons, (item, index) => !this.isElementEmpty(index)))
          await this.$nextTick()
        }

        if (this.isElementEmpty(this.focusedDateIndex)) {
          const nextIndex = this.setNextIndex(this.focusedDateIndex, this.transitionDirection)
          this.$emit('update:focused-date-index', nextIndex)
          await this.$nextTick()
        }

        const element = this.dateButtons[this.focusedDateIndex].firstChild as HTMLButtonElement
        element.focus()
        this.isTableInTransition = false
      }
    },
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
      let cellIndex = 0

      if (this.showWeek) {
        rows.push(this.genWeekNumber(this.getWeekNumber(1)))
        cellIndex++
      }

      const prevMonthYear = this.displayedMonth ? this.displayedYear : this.displayedYear - 1
      const prevMonth = (this.displayedMonth + 11) % 12
      const firstDayFromPreviousMonth = new Date(this.displayedYear, this.displayedMonth, 0).getDate()
      const cellsInRow = this.showWeek ? 8 : 7

      while (day--) {
        const date = `${prevMonthYear}-${pad(prevMonth + 1)}-${pad(firstDayFromPreviousMonth - day)}`

        rows.push(this.$createElement('td', this.showAdjacentMonths ? [
          this.genButton(date, true, 'date', this.formatter, true),
        ] : []))
        cellIndex++
      }

      for (day = 1; day <= daysInMonth; day++) {
        const date = `${this.displayedYear}-${pad(this.displayedMonth + 1)}-${pad(day)}`

        rows.push(this.$createElement('td', [
          this.genButton(date, true, 'date', this.formatter, false, cellIndex),
        ]))
        cellIndex++

        if (rows.length % cellsInRow === 0) {
          children.push(this.genTR(rows))
          rows = []
          if (this.showWeek && (day < daysInMonth || this.showAdjacentMonths)) {
            rows.push(this.genWeekNumber(this.getWeekNumber(day + 7)))
            cellIndex++
          }
        }
      }

      const nextMonthYear = this.displayedMonth === 11 ? this.displayedYear + 1 : this.displayedYear
      const nextMonth = (this.displayedMonth + 1) % 12
      let nextMonthDay = 1

      while (rows.length < cellsInRow) {
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
