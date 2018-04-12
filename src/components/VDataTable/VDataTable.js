import VDataIterator from '../VDataIterator'
import VTableHeaders from './VTableHeaders'
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
  inheritAttrs: false,
  provide () {
    const dataTable = {
      test: 'hello'
    }

    Object.defineProperty(dataTable, 'headers', {
      get: () => this.headers,
      enumerable: true
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
        headers.push(h(VTableHeaders, {
          props: {
            showSelectAll: this.showSelectAll
          },
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
          h(VRowGroup, {
            key: `${group}_${i}`
          }, [
            h('span', { slot: 'cell' }, [group]),
            h('div', { slot: 'expansion' }, this.genRows(grouped[group]))
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
