// Mixins
import Colorable from '../../mixins/colorable'
import DatePickerTable from './mixins/date-picker-table'

// Utils
import { pad, createNativeLocaleFormatter } from './util'
import isValueAllowed from '../../util/isValueAllowed'

export default {
  name: 'v-date-picker-month-table',

  mixins: [
    Colorable,
    DatePickerTable
  ],

  computed: {
    formatter () {
      return this.format || createNativeLocaleFormatter(this.locale, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 })
    }
  },

  methods: {
    calculateTableDate (delta) {
      return `${parseInt(this.tableDate, 10) + Math.sign(delta || 1)}`
    },
    genMonthButtonClasses (month) {
      const isSelected = this.selectedYear === this.displayedYear && this.selectedMonth === month
      const isCurrent = this.currentYear === this.displayedYear && this.currentMonth === month
      const isDisabled = !isValueAllowed(`${this.displayedYear}-${pad(month + 1)}`, this.allowedDates)
      const classes = {
        'btn--flat': !isSelected,
        'btn--active': isSelected,
        'btn--outline': isCurrent && !isSelected,
        'btn--disabled': isDisabled
      }

      return (isSelected || isCurrent)
        ? this.addBackgroundColorClassChecks(classes)
        : classes
    },
    genMonthButton (month) {
      const value = `${this.displayedYear}-${pad(month + 1)}`
      const isDisabled = !isValueAllowed(value, this.allowedDates)
      const btnContent = this.$createElement('span', {
        staticClass: 'btn__content'
      }, [
        this.formatter(value)
      ])

      return this.$createElement('button', {
        staticClass: 'btn',
        'class': this.genMonthButtonClasses(month),
        attrs: { type: 'button' },
        on: isDisabled ? undefined : {
          click: () => this.$emit('input', `${value}`)
        }
      }, [btnContent])
    },
    genTBody () {
      const children = []
      const cols = Array(3).fill(null)
      const rows = 12 / cols.length

      for (let row = 0; row < rows; row++) {
        const tds = cols.map((_, col) => {
          const month = row * cols.length + col
          return this.$createElement('td', { key: month }, [this.genMonthButton(month)])
        })

        children.push(this.$createElement('tr', {
          key: row
        }, tds))
      }

      return this.$createElement('tbody', children)
    }
  },

  render (h) {
    return this.genTable('date-picker-table date-picker-table--month', [
      this.genTBody()
    ])
  }
}
