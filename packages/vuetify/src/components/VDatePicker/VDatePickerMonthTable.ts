// Mixins
import DatePickerTable from './mixins/date-picker-table'

// Utils
import { pad } from './util'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

export default mixins(
  DatePickerTable
/* @vue/component */
).extend({
  name: 'v-date-picker-month-table',

  methods: {
    calculatePickerDate (delta: number) {
      return `${this.displayedYear + Math.sign(delta || 1)}-${pad(this.displayedMonth)}`
    },
    genButtonEvents (value: string, isAllowed: boolean) {
      if (this.disabled) return undefined

      return {
        click: () => {
          isAllowed && this.$emit('update:month', value)
          this.$emit(`click:month`, value)
        },
        dblclick: () => this.$emit(`dblclick:month`, value),
      }
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
            key: month,
          }, [
            this.genButton(date, false, this.dayFormat),
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
    ])
  },
})
