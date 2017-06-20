import Head from './mixins/head'
import Body from './mixins/body'
import Foot from './mixins/foot'
import Progress from './mixins/progress'
import { getObjectValueByPath } from '../../util/helpers'

export default {
  name: 'datatable',

  mixins: [Head, Body, Foot, Progress],

  data () {
    return {
      all: false,
      defaultPagination: {
        page: 1,
        rowsPerPage: 5,
        descending: false,
        totalItems: 0
      }
    }
  },

  props: {
    headers: {
      type: Array,
      default: () => []
    },
    headerText: {
      type: String,
      default: 'text'
    },
    hideActions: Boolean,
    noDataText: {
      type: String,
      default: 'No data available in table'
    },
    noResultsText: {
      type: String,
      default: 'No matching records found'
    },
    rowsPerPageItems: {
      type: Array,
      default () {
        return [
          5,
          10,
          25,
          { text: 'All', value: -1 }
        ]
      }
    },
    rowsPerPageText: {
      type: String,
      default: 'Rows per page:'
    },
    selectAll: [Boolean, String],
    search: {
      required: false
    },
    filter: {
      type: Function,
      default: (val, search) => {
        return val !== null &&
          ['undefined', 'boolean'].indexOf(typeof val) === -1 &&
          val.toString().toLowerCase().indexOf(search) !== -1
      }
    },
    customFilter: {
      type: Function,
      default: (items, search, filter) => {
        search = search.toString().toLowerCase()
        return items.filter(i => Object.keys(i).some(j => filter(i[j], search)))
      }
    },
    customSort: {
      type: Function,
      default: (items, index, descending) => {
        return items.sort((a, b) => {
          const sortA = getObjectValueByPath(a, index)
          const sortB = getObjectValueByPath(b, index)

          if (descending) {
            if (!isNaN(sortA) && !isNaN(sortB)) return sortB - sortA
            if (sortA < sortB) return 1
            if (sortA > sortB) return -1
            return 0
          } else {
            if (!isNaN(sortA) && !isNaN(sortB)) return sortA - sortB
            if (sortA < sortB) return -1
            if (sortA > sortB) return 1
            return 0
          }
        })
      }
    },
    value: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    totalItems: {
      type: Number,
      default: null
    },
    loading: {
      type: [Boolean, String],
      default: false
    },
    selectedKey: {
      type: String,
      default: 'id'
    },
    pagination: {
      type: Object,
      default: null
    }
  },

  computed: {
    computedPagination () {
      return this.pagination || this.defaultPagination
    },
    itemsLength () {
      return this.totalItems || this.items.length
    },
    indeterminate () {
      return this.selectAll !== false && this.someItems && !this.everyItem
    },
    everyItem () {
      return this.filteredItems.length && this.filteredItems.every(i => this.isSelected(i))
    },
    someItems () {
      return this.filteredItems.some(i => this.isSelected(i))
    },
    pageStart () {
      const page = this.computedPagination.rowsPerPage === Object(this.computedPagination.rowsPerPage)
        ? this.computedPagination.rowsPerPage.value
        : this.computedPagination.rowsPerPage
      return page === -1 ? 0 : (this.computedPagination.page - 1) * page
    },
    pageStop () {
      const page = this.computedPagination.rowsPerPage === Object(this.computedPagination.rowsPerPage)
        ? this.computedPagination.rowsPerPage.value
        : this.computedPagination.rowsPerPage
      return page === -1 ? this.itemsLength : this.computedPagination.page * page
    },
    filteredItems () {
      if (this.totalItems) return this.items

      let items = this.items.slice()
      const hasSearch = typeof this.search !== 'undefined' && this.search !== null

      if (hasSearch) {
        items = this.customFilter(items, this.search, this.filter)
      }

      items = this.customSort(items, this.computedPagination.sortBy, this.computedPagination.descending)

      return this.hideActions && !this.pagination ? items : items.slice(this.pageStart, this.pageStop)
    },
    selected () {
      const selected = {}
      this.value.forEach(i => selected[i[this.selectedKey]] = true)
      return selected
    }
  },

  watch: {
    indeterminate (val) {
      if (val) this.all = true
    },
    someItems (val) {
      if (!val) this.all = false
    },
    search () {
      this.page = 1
    },
    everyItem (val) {
      if (val) this.all = true
    },
    itemsLength () {
      this.updatePagination({ totalItems: this.itemsLength })
    }
  },

  methods: {
    updatePagination (val) {
      if (this.pagination) return this.$emit('update:pagination', Object.assign({}, this.pagination, val))
      else (this.defaultPagination = Object.assign({}, this.defaultPagination, val))
    },
    isSelected (item) {
      return this.selected[item[this.selectedKey]]
    },
    sort (index) {
      if (this.computedPagination.sortBy === null) {
        this.updatePagination({ sortBy: index, descending: false })
      } else if (this.computedPagination.sortBy === index && !this.computedPagination.descending) {
        this.updatePagination({ descending: true })
      } else if (this.computedPagination.sortBy !== index) {
        this.updatePagination({ sortBy: index, descending: false })
      } else {
        this.updatePagination({ sortBy: null, descending: null })
      }
    },
    genTR (children, data = {}) {
      return this.$createElement('tr', data, children)
    },
    toggle (value) {
      const selected = Object.assign({}, this.selected)
      this.filteredItems.forEach(i => selected[i[this.selectedKey]] = value)

      this.$emit('input', this.items.filter(i => selected[i[this.selectedKey]]))
    }
  },

  created () {
    const firstSortable = this.headers.find(h => !('sortable' in h) || h.sortable)
    this.defaultPagination.sortBy = firstSortable ? firstSortable.value : null

    this.updatePagination(Object.assign({}, this.defaultPagination, this.pagination, { totalItems: this.itemsLength }))
  },

  render (h) {
    return h('v-table-overflow', {}, [
      h('table', {
        'class': {
          'datatable table': true,
          'datatable--select-all': this.selectAll !== false
        }
      }, [
        this.genTHead(),
        this.genTProgress(),
        this.genTBody(),
        this.hideActions ? null : this.genTFoot()
      ])
    ])
  }
}
