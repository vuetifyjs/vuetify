import VDataIterator from '../VDataIterator'
import VTableHeader from './VTableHeader'
import VTablePagination from './VTablePagination'

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
    }
  }
}
