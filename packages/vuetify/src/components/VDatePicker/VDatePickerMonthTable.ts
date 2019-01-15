// Mixins
import DatePickerTable from './mixins/date-picker-table'

// Utils
import { pad, createNativeLocaleFormatter } from './util'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'
import { NativeLocaleFormatter } from './util/createNativeLocaleFormatter'

export default mixins(
  DatePickerTable
/* @vue/component */
).extend({
  name: 'v-date-picker-month-table',

  computed: {
    formatter (): NativeLocaleFormatter {
      return this.format || createNativeLocaleFormatter(this.locale, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 })
    }
  },

  methods: {
    calculateTableDate (delta: number) {
      return `${parseInt(this.tableDate, 10) + Math.sign(delta || 1)}`
    },
    genTBody () {
      const children = []
      const cols = Array(3).fill(null)
      const rows = 12 / cols.length

      for (let row = 0; row < rows; row++) {
        const tds = cols.map((_, col) => {
          const month = row * cols.length + col
          const date = `${this.displayedYear}-${pad(month + 1)}`
          return this.$createElement('td', {
            key: month
          }, [
            this.genButton(date, false, 'month', this.formatter)
          ])
        })

        children.push(this.$createElement('tr', {
          key: row
        }, tds))
      }

      return this.$createElement('tbody', children)
    }
  },

  render (): VNode {
    return this.genTable('v-date-picker-table v-date-picker-table--month', [
      this.genTBody()
    ], this.calculateTableDate)
  }
})
