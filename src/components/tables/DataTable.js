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
      all: false
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
    items: {
      type: Array,
      default: () => []
    },
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
    selectAll: Boolean,
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
    totalItems: {
      type: Number,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Array
    },
    selectedKey: {
      type: String,
      default: 'id'
    },
    pagination: {
      type: Object,
      default: () => ({
        sortBy: null,
        descending: null,
        page: 1,
        rowsPerPage: 5
      })
    }
  },

  computed: {
    computedOptions () {
      return !this.options ? this.defaultOptions : this.options
    },
    itemsLength () {
      return this.totalItems || this.value.length
    },
    indeterminate () {
      return this.selectAll && this.someItems && !this.everyItem
    },
    everyItem () {
      return this.filteredItems.length > 0 && this.filteredItems.every(i => this.selected.find(j => i[this.selectedKey] === j[this.selectedKey]))
    },
    someItems () {
      return this.filteredItems.some(i => this.isSelected(i))
    },
    pageStart () {
      const page = this.pagination.rowsPerPage === Object(this.pagination.rowsPerPage)
        ? this.pagination.rowsPerPage.value
        : this.pagination.rowsPerPage
      return page === -1 ? 0 : (this.pagination.page - 1) * page
    },
    pageStop () {
      const page = this.pagination.rowsPerPage === Object(this.pagination.rowsPerPage)
        ? this.pagination.rowsPerPage.value
        : this.pagination.rowsPerPage
      return page === -1 ? this.itemsLength : this.pagination.page * page
    },
    filteredItems () {
      if (this.totalItems) return this.value

      let items = this.value.slice()
      const hasSearch = typeof this.search !== 'undefined' && this.search !== null

      if (hasSearch) {
        items = this.customFilter(items, this.search, this.filter)
      }

      items = this.customSort(items, this.pagination.sortBy, this.pagination.descending)

      return this.hideActions ? items : items.slice(this.pageStart, this.pageStop)
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
    filteredItems: {
      handler: function () {
        if (this.everyItem) this.all = true
      },
      deep: true
    },
    selected () {
      if (this.everyItem) this.all = true
    }
  },

  methods: {
    isSelected (item) {
      return this.selected && this.selected.find(i => i[this.selectedKey] === item[this.selectedKey])
    },
    sort (index) {
      if (this.pagination.sortBy === null) {
        this.$emit('update:pagination', Object.assign({}, this.pagination, { sortBy: index, descending: false }))
      } else if (this.pagination.sortBy === index && !this.pagination.descending) {
        this.$emit('update:pagination', Object.assign({}, this.pagination, { descending: true }))
      } else if (this.pagination.sortBy !== index) {
        this.$emit('update:pagination', Object.assign({}, this.pagination, { sortBy: index, descending: false }))
      } else {
        this.$emit('update:pagination', Object.assign({}, this.pagination, { sortBy: null, descending: null }))
      }
    },
    genTR (children, data = {}) {
      return this.$createElement('tr', data, children)
    },
    toggle (value) {
      this.all = value

      let selected = this.selected.slice()
      if (value)
        selected.push(...this.filteredItems)
      else
        selected = selected.filter(i => !this.filteredItems.find(j => j[this.selectedKey] === i[this.selectedKey]))

      this.$emit('update:selected', selected)
    }
  },

  mounted () {
    const firstSortable = this.headers.find(h => !('sortable' in h) || h.sortable)

    let defaultPagination = {
      page: 1,
      rowsPerPage: 5,
      sortBy: firstSortable ? firstSortable.value : null,
      descending: null
    }

    this.$emit('update:pagination', Object.assign({}, defaultPagination, this.pagination))
  },

  render (h) {
    return h('v-table-overflow', {}, [
      h('table', {
        'class': {
          'datatable table': true,
          'datatable--select-all': this.selectAll
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
