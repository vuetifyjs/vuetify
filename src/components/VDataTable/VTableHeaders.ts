import { VNode, CreateElement } from 'vue'
import { injectTwo } from '../../util/inject'
import { DataTableProvide } from './VDataTable'
import { DataIteratorProvide } from '../VDataIterator/VDataIterator'

import VCellCheckbox from './VCellCheckbox'
import VRow from './VRow'
import VCell from './VCell'
import VIcon from '../VIcon'

export default injectTwo<DataIteratorProvide, DataTableProvide>()('dataIterator', 'dataTable').extend({
  name: 'v-table-headers',

  props: {
    showSelectAll: Boolean,
    sortIcon: {
      type: String,
      default: '$vuetify.icons.sort'
    }
  },

  methods: {
    genSelectAll (h: CreateElement, classes: string | string[] = []) {
      return h(VCellCheckbox, {
        class: classes,
        props: {
          head: true,
          inputValue: this.dataIterator.everyItem
        },
        attrs: {
          indeterminate: !this.dataIterator.everyItem && this.dataIterator.someItems
        },
        on: {
          change: () => this.dataIterator.toggleSelectAll()
        }
      })
    },
    genSortIcon (h: CreateElement) {
      return h(VIcon, [this.sortIcon])
    }
  },

  render (h: CreateElement): VNode {
    const headers = this.dataTable.headers.map(c => {
      if (c.type === 'select-all') return this.genSelectAll(h, c.class)

      const sortable = c.sortable == null || c.sortable

      const classes = {
        [`justify-${c.align || 'start'}`]: true
      }

      const children = [
        h('span', [c.text])
      ]

      const listeners: any = {}

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

        this.dataIterator.multiSort && beingSorted && children.push(h('span', { class: 'badge' }, [String(sortIndex + 1)]))
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
})
