import Vue from 'vue'
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
      defaultOptions: {
        desc: null,
        page: 1,
        sorting: null,
        rowsPerPage: 5,
        checkedValue: 'value',
        checked: {}
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
      default: (items, index, desc) => {
        return items.sort((a, b) => {
          const sortA = getObjectValueByPath(a, index)
          const sortB = getObjectValueByPath(b, index)

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
    options: {
      type: Object
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
      return this.value.every(i => this.isChecked(i))
    },
    someItems () {
      return this.value.some(i => this.isChecked(i))
    },
    pageStart () {
      const page = this.options.rowsPerPage === Object(this.options.rowsPerPage)
        ? this.options.rowsPerPage.value
        : this.options.rowsPerPage
      return page === -1 ? 0 : (this.options.page - 1) * page
    },
    pageStop () {
      const page = this.options.rowsPerPage === Object(this.options.rowsPerPage)
        ? this.options.rowsPerPage.value
        : this.options.rowsPerPage
      return page === -1 ? this.itemsLength : this.options.page * page
    },
    filteredItems () {
      if (this.totalItems) return this.value

      let items = this.value.slice()
      const hasSearch = typeof this.search !== 'undefined' && this.search !== null

      if (hasSearch) {
        items = this.customFilter(items, this.search, this.filter)
      }

      items = this.customSort(items, this.options.sorting, this.options.desc)

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
    options: {
      handler (value) {
        this.$emit('update:options', this.options)

        if (this.everyItem)
          this.all = true
      },
      deep: true
    }
  },

  methods: {
    isChecked (item) {
      const value = item[this.options.checkedValue]
      return value && value in this.options.checked && this.options.checked[value] ? true : false
    },
    sort (index) {
      if (this.options.sorting === null) {
        this.options.sorting = index
        this.options.desc = false
      } else if (this.options.sorting === index && !this.options.desc) {
        this.options.desc = true
      } else if (this.options.sorting !== index) {
        this.options.sorting = index
        this.options.desc = false
      } else {
        this.options.sorting = null
        this.options.desc = null
      }
    },
    genTR (children, data = {}) {
      return this.$createElement('tr', data, children)
    },
    toggle (value) {
      this.all = value

      this.value.forEach(i => {
        this.$set(this.options.checked, i[this.options.checkedValue], value)
      })
    }
  },

  mounted () {
    this.$emit('update:options', Object.assign({}, this.defaultOptions, this.options))
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
