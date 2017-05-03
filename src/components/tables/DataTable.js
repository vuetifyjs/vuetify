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
      desc: null,
      page: 1,
      sorting: null,
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
    itemValue: {
      default: 'value'
    },
    noDataText: {
      type: String,
      default: 'No data available in table'
    },
    noResultsText: {
      type: String,
      default: 'No matching records found'
    },
    rowsPerPage: {
      type: [Number, Object],
      default: 5
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
      default: (items, index, desc) => {
        return items.sort((a, b) => {
              const sortA = a[index]
              const sortB = b[index]

              if (desc) {
                  if (sortA < sortB) return 1
                  if (sortA > sortB) return -1
                  return 0
              } else {
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
    defaultSort: {
      type: Object,
      default: () => null
    }
  },

  computed: {
    itemsLength () {
      return this.totalItems || this.value.length
    },
    indeterminate () {
      return this.selectAll && this.someItems && !this.everyItem
    },
    everyItem () {
      return this.value.every(i => i[this.itemValue])
    },
    someItems () {
      return this.value.some(i => i[this.itemValue])
    },
    pageStart () {
      const page = this.rowsPerPage === Object(this.rowsPerPage)
        ? this.rowsPerPage.value
        : this.rowsPerPage
      return page === -1 ? 0 : (this.page - 1) * page
    },
    pageStop () {
      const page = this.rowsPerPage === Object(this.rowsPerPage)
        ? this.rowsPerPage.value
        : this.rowsPerPage
      return page === -1 ? this.itemsLength : this.page * page
    },
    filteredItems () {
      if (this.totalItems) return this.value

      let items = this.value.slice()
      const hasSearch = typeof this.search !== 'undefined' && this.search !== null

      if (hasSearch) {
          items = this.customFilter(items, this.search, this.filter);
      }
      
      items = this.customSort(items, this.sorting, this.desc);

      return this.hideActions ? items : items.slice(this.pageStart, this.pageStop)
    }
  },

  watch: {
    rowsPerPage () {
      this.page === 1 && this.update()

      this.page = 1
    },
    indeterminate (val) {
      if (val) this.all = true
    },
    someItems (val) {
      if (!val) this.all = false
    },
    search () {
      this.page = 1
    },
    page () {
      this.update()
    }
  },

  methods: {
    update () {
      this.$emit('update', {
        page: this.page,
        rowsPerPage: this.rowsPerPage,
        sorting: this.sorting,
        desc: this.desc,
      })
    },
    sort (index) {
      if (this.sorting === null) {
        this.sorting = index
        this.desc = false
      } else if (this.sorting === index && !this.desc) {
        this.desc = true
      } else if (this.sorting !== index) {
        this.sorting = index
        this.desc = false
      } else {
        this.sorting = null
        this.desc = null
      }

      this.update()
    },
    genTR (children, data = {}) {
      return this.$createElement('tr', data, children)
    },
    toggle (val) {
      this.all = val

      this.$emit('input', this.value.map(i => {
        i[this.itemValue] = this.filteredItems.includes(i) ? val : false

        return i
      }))
    }
  },

  mounted () {
    const header = this.headers.find(h => !('sortable' in h) || h.sortable)
    this.desc = this.defaultSort ? this.defaultSort.desc : this.desc
    this.sorting = this.defaultSort ? this.defaultSort.field : header.value

    this.update()
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
