import '../../stylus/components/_tables.styl'
import '../../stylus/components/_data-table.styl'

import VDataIterator from '../VDataIterator'
import VTableHeaders from './VTableHeaders'
import VTableActions from './VTableActions'
import VRowGroup from './VRowGroup'
import VTableProgress from './VTableProgress'
import VRow from './VRow'
import VCell from './VCell'

import { groupByProperty } from '../../util/helpers'

export default {
  name: 'v-data-table',

  extends: VDataIterator,

  inheritAttrs: false,

  provide () {
    const dataTable = {}

    Object.defineProperty(dataTable, 'headers', {
      get: () => this.headers,
      enumerable: true
    })

    Object.defineProperty(dataTable, 'loading', {
      get: () => this.loading,
      enumerable: true
    })

    Object.defineProperty(dataTable, 'isFlexWidth', {
      get: () => this.isFlexWidth
    })

    Object.defineProperty(dataTable, 'widths', {
      get: () => this.widths
    })

    return { dataTable }
  },

  props: {
    headers: {
      type: Array,
      default: () => ([])
    },
    showSelectAll: {
      type: Boolean
    },
    hideActions: {
      type: Boolean
    },
    hideHeader: {
      type: Boolean
    },
    groupBy: {
      type: String
    },
    fixedHeight: {
      type: String
    },
    loading: {
      type: Boolean
    }
  },

  data () {
    return {
      groupByIndices: []
    }
  },

  computed: {
    classes () {
      return {
        'v-table': true,
        'v-data-table': true
      }
    },
    isFlexWidth () {
      return this.headers.some(h => h.width && !isNaN(h.width))
    },
    widths () {
      return this.headers.map(h => h.width || (this.isFlexWidth ? 1 : null))
    }
  },

  methods: {
    sortItems (items, sortBy, sortDesc) {
      return VDataIterator.methods.sortItems.call(this, items, [this.groupBy, ...sortBy], [false, ...sortDesc])
    },
    genHeaders (h) {
      const headers = this.computeSlots('header')

      if (!this.hideHeader) {
        headers.push(h(VTableHeaders, {
          props: {
            showSelectAll: this.showSelectAll
          },
        }))
        headers.push(h(VTableProgress))
      }

      return headers
    },
    genItems (h) {
      const items = []

      if (this.$scopedSlots.item) {
        if (this.groupBy) {
          items.push(this.genBodyWrapper(h, this.genGroupedRows(h, this.computedItems, this.groupBy)))
        } else {
          items.push(this.genBodyWrapper(h, this.genRows(this.computedItems)))
        }
      }

      return items
    },
    genRows (items) {
      return items.map(item => this.$scopedSlots.item(this.createItemProps(item)))
    },
    genGroupedRows (h, items, groupBy) {
      const grouped = groupByProperty(items, groupBy)
      const groups = Object.keys(grouped)

      const rows = []
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i]

        rows.push(
          this.$scopedSlots.group ?
          this.$scopedSlots.group({ groupBy, group, items: grouped[group] }) :
          h(VRowGroup, {
            key: `${group}_${i}`
          }, [
            h('span', { slot: 'cell' }, [group]),
            h('template', { slot: 'expansion' }, this.genRows(grouped[group]))
          ])
        )
      }

      return rows
    },
    genFooters (h) {
      const footers = this.computeSlots('footer')

      if (!this.hideActions) {
        footers.push(h(VTableActions, {
          props: {
            itemsLength: this.itemsLength,
            pageStart: this.pageStart,
            pageStop: this.pageStop,
            page: this.options.page,
            rowsPerPage: this.options.rowsPerPage,
            rowsPerPageItems: this.rowsPerPageItems
          },
          on: {
            'update:page': v => this.options.page = v,
            'update:rowsPerPage': v => this.options.rowsPerPage = v
          }
        }))
      }

      return footers
    },
    genBodyWrapper (h, items) {
      return h('div', {
        class: {
          'v-table__body': true,
          'v-table__body--fixed': this.fixedHeight
        },
        style: {
          'height': this.fixedHeight
        }
      }, items)
    },
    genEmpty (h, content) {
      return h(VRow, [h(VCell, content)])
    }
  }
}
