// Mixins
import DatePickerTable from './mixins/date-picker-table'

// Utils
import { pad, createNativeLocaleFormatter } from './util'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'
import { DatePickerFormatter } from 'vuetify/types'

export default mixins(
  DatePickerTable
/* @vue/component */
).extend({
  name: 'v-date-picker-month-table',

  data () {
    return {
      monthButtons: [] as HTMLElement[],
      isTableInTransition: false,
    }
  },

  computed: {
    formatter (): DatePickerFormatter {
      return this.format || createNativeLocaleFormatter(this.currentLocale, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 })
    },
  },

  mounted () {
    this.$on('keydown:arrowleft', () => this.moveHorizontal('left'))
    this.$on('keydown:arrowright', () => this.moveHorizontal('right'))
    this.$on('keydown:arrowup', () => this.moveVertical('up'))
    this.$on('keydown:arrowdown', () => this.moveVertical('down'))
    this.$on('keydown:pageup', () => this.moveTo('firstRow'))
    this.$on('keydown:pagedown', () => this.moveTo('lastRow'))
    this.$on('keydown:home', () => this.moveTo('firstColumn'))
    this.$on('keydown:end', () => this.moveTo('lastColumn'))
    this.$on('update-focused-cell', (index: number) => this.$emit('update:focused-month-index', index))
    this.$on('table-transitionend', () => this.handleTableTransitionEnd())

    this.monthButtons = Array.from(this.$el.querySelectorAll('button'))

    if (this.shouldAutofocus) {
      this.monthButtons[this.focusedMonthIndex].focus()
      this.$emit('update:should-autofocus', false)
    }
  },

  methods: {
    async moveTo (position: 'firstRow' | 'lastRow' | 'firstColumn' | 'lastColumn') {
      const positions = {
        firstRow: this.focusedMonthIndex % 3,
        lastRow: this.focusedMonthIndex % 3 + 9,
        firstColumn: this.focusedMonthIndex - (this.focusedMonthIndex % 3),
        lastColumn: this.focusedMonthIndex + (2 - this.focusedMonthIndex % 3),
      }

      const nextPosition = positions[position]

      this.$emit('update:focused-month-index', nextPosition)

      await this.$nextTick()
      this.monthButtons[this.focusedMonthIndex].focus()
    },
    async moveVertical (direction: 'up' | 'down') {
      const nextIndex = {
        up: this.focusedMonthIndex - 3 < 0 ? this.focusedMonthIndex - 3 + 12 : this.focusedMonthIndex - 3,
        down: this.focusedMonthIndex + 3 > 11 ? this.focusedMonthIndex + 3 - 12 : this.focusedMonthIndex + 3,
      }

      this.$emit('update:focused-month-index', nextIndex[direction])

      await this.$nextTick()
      this.monthButtons[this.focusedMonthIndex].focus()
    },
    async moveHorizontal (direction: 'left' | 'right') {
      if (this.isTableInTransition) {
        return
      }

      const cantMove = {
        left: this.focusedMonthIndex % 3 === 0,
        right: (this.focusedMonthIndex + 1) % 3 === 0,
      }
      const addition = direction === 'left' ? -1 : 1
      const nextPageItem = direction === 'left' ? 2 : -2

      if (cantMove[direction]) {
        this.isTableInTransition = true
        this.$emit('update:table-date', `${Number(this.tableDate) + addition}`)
        this.$emit('update:focused-month-index', this.focusedMonthIndex + nextPageItem)
      } else {
        this.$emit('update:focused-month-index', this.focusedMonthIndex + addition)
        await this.$nextTick()
        this.monthButtons[this.focusedMonthIndex].focus()
      }
    },
    handleTableTransitionEnd () {
      this.monthButtons = Array.from(this.$el.querySelectorAll('button'))

      if (this.isTableInTransition) {
        this.monthButtons[this.focusedMonthIndex].focus()
        this.isTableInTransition = false
      }
    },
    calculateTableDate (delta: number) {
      return `${parseInt(this.tableDate, 10) + Math.sign(delta || 1)}`
    },
    genTBody () {
      const children = []
      const cols = Array(3).fill(null)
      const rows = 12 / cols.length
      let cellIndex = -1

      for (let row = 0; row < rows; row++) {
        const tds = cols.map((_, col) => {
          const month = row * cols.length + col
          const date = `${this.displayedYear}-${pad(month + 1)}`
          cellIndex++
          return this.$createElement('td', {
            key: month,
          }, [
            this.genButton(date, false, 'month', this.formatter, false, cellIndex),
          ])
        })

        children.push(this.$createElement('tr', {
          key: row,
        }, tds))
      }

      return this.$createElement('tbody', children)
    },
  },

  render (): VNode {
    return this.genTable('v-date-picker-table v-date-picker-table--month', [
      this.genTBody(),
    ], this.calculateTableDate)
  },
})
