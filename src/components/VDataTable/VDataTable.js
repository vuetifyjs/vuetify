import VDataIterator from '../VDataIterator'
import VTableHeader from './VTableHeader'
import VTablePagination from './VTablePagination'
import VRowGroup from './VRowGroup'

const groupByProperty = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

export default {
  name: 'v-data-table',
  extends: VDataIterator,
  props: {
    columns: {
      type: Array,
      default: () => ([])
    },
    showSelectAll: {
      type: Boolean
    },
    hidePagination: {
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
    }
  },
  computed: {
    classes () {
      return {
        'v-data-table': true
      }
    }
  },
  methods: {
    genHeaders (h) {
      const headers = this.computeSlots('header')

      if (!this.hideHeader) {
        headers.push(h(VTableHeader, {
          props: {
            columns: this.columns,
            showSelectAll: this.showSelectAll,
            everyItem: this.everyItem,
            someItems: this.someItems
          },
          on: {
            'update:sortBy': v => this.sorting.sortBy = v,
            'update:sortDesc': v => this.sorting.sortDesc = v,
            'toggleSelectAll': () => this.selectAll(!this.everyItem)
          }
        }))
      }

      return headers
    },
    genBodies (h) {
      const bodies = this.computeSlots('body')

      if (this.$scopedSlots.item) {
        if (this.groupBy) {
          bodies.push(...this.genGroupedRows(h, this.computedItems, this.groupBy))
        } else {
          bodies.push(this.genBodyWrapper(h, this.genRows(this.computedItems)))
        }
      }

      return bodies
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
          h(VRowGroup, [
            h('span', { slot: 'cell' }, [group]),
            this.genRows(grouped[group])
          ])
        )
      }

      return rows
    },
    genFooters (h) {
      const footers = this.computeSlots('footer')

      if (!this.hidePagination) {
        footers.push(h(VTablePagination, {
          props: {
            itemsLength: this.itemsLength,
            pageStart: this.pageStart,
            pageStop: this.pageStop,
            page: this.pagination.page,
            rowsPerPage: this.pagination.rowsPerPage,
            rowsPerPageItems: this.rowsPerPageItems
          },
          on: {
            'update:page': v => this.pagination.page = v,
            'update:rowsPerPage': v => this.pagination.rowsPerPage = v
          }
        }))
      }

      return footers
    },
    genBodyWrapper (h, items) {
      return h('div', {
        class: {
          'v-data-table__body': true,
          'v-data-table__body--fixed': this.fixedHeight
        },
        style: {
          'height': this.fixedHeight
        }
      }, items)
    }
  },
  render (h) {
    const children = [
      ...this.genHeaders(h),
      ...this.genBodies(h),
      ...this.genFooters(h)
    ]

    return h('div', {
      class: this.classes
    }, children)
  }
}
