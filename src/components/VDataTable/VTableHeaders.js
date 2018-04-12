import VCheckbox from '../VCheckbox'
import VRow from './VRow'
import VCell from './VCell'
import VIcon from '../VIcon'

export default {
  name: 'v-table-headers',
  inject: ['dataIterator', 'dataTable'],
  props: {
    showSelectAll: {
      type: Boolean
    },
    sortIcon: {
      type: String,
      default: 'arrow_upward'
    }
  },
  methods: {
    genSelectAll (h) {
      return h(VCheckbox, {
        attrs: {
          inputValue: this.dataIterator.everyItem,
          indeterminate: !this.dataIterator.everyItem && this.dataIterator.someItems
        },
        on: {
          change: () => this.dataIterator.toggleSelected()
        }
      })
    },
    genSortIcon (h, column) {
      return h(VIcon, [this.sortIcon])
    }
  },
  render (h) {
    const headers = this.dataTable.headers.map(c => {
      const sortable = c.sortable == null || c.sortable

      const classes = {
        'column': true,
        [c.align || 'text-xs-left']: true
      }

      const listeners = {}

      if (sortable) {
        listeners['click'] = () => {
          this.dataIterator.resetExpanded()
          this.dataIterator.sort(c.value)
        }

        const beingSorted = this.dataIterator.sortBy === c.value

        classes[c.align || 'text-xs-left'] = true
        classes['sortable'] = true
        classes['active'] = beingSorted
        classes['asc'] = beingSorted && !this.dataIterator.sortDesc
        classes['desc'] = beingSorted && this.dataIterator.sortDesc
      }

      return h(VCell, {
        class: classes,
        nativeOn: listeners
      }, [
        h('span', [c.text]),
        sortable && this.genSortIcon(h)
      ])
    })

    if (this.showSelectAll) headers.unshift(this.genSelectAll(h))

    return h(VRow, headers)
  }
}
