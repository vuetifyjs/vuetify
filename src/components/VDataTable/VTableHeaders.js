import VCellCheckbox from './VCellCheckbox'
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
      return h(VCellCheckbox, {
        props: {
          head: true
        },
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
        [`justify-${c.align || 'start'}`]: true
      }

      const children = [
        h('span', [c.text])
      ]

      const listeners = {}

      if (sortable) {
        listeners['click'] = () => {
          this.dataIterator.resetExpanded()
          this.dataIterator.sort(c.value)
        }

        const sortIndex = this.dataIterator.sortBy.findIndex(k => k === c.value)
        const beingSorted = sortIndex >= 0
        const isDesc = this.dataIterator.sortDesc[sortIndex]

        classes['sortable'] = true
        classes['active'] = beingSorted
        classes['asc'] = beingSorted && !isDesc
        classes['desc'] = beingSorted && isDesc

        children.push(this.genSortIcon(h))

        this.dataIterator.multiSort && beingSorted && children.push(h('span', [sortIndex + 1]))
      }

      return h(VCell, {
        props: {
          head: true
        },
        class: classes,
        nativeOn: listeners
      }, children)
    })

    if (this.showSelectAll) headers.unshift(this.genSelectAll(h))

    return h('div', {
      class: 'v-table__header'
    }, [h(VRow, headers)])
  }
}
