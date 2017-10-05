require('../../stylus/components/_tables.styl')
require('../../stylus/components/_data-table.styl')

import VBtn from '../VBtn'
import VIcon from '../VIcon'
import VProgressLinear from '../VProgressLinear'
import VSelect from '../VSelect'

import Filterable from '../../mixins/filterable'
import Themeable from '../../mixins/themeable'
import Loadable from '../../mixins/loadable'
import Head from './mixins/head'
import Body from './mixins/body'
import Foot from './mixins/foot'
import Progress from './mixins/progress'

import {
  createSimpleFunctional,
  getObjectValueByPath
} from '../../util/helpers'

export default {
  name: 'v-data-table',

  components: {
    VBtn,
    VIcon,
    VProgressLinear,
    VSelect,
    // Importing does not work properly
    'v-table-overflow': createSimpleFunctional('table__overflow')
  },

  data () {
    return {
      all: false,
      searchLength: 0,
      defaultPagination: {
        descending: false,
        page: 1,
        rowsPerPage: 5,
        sortBy: null,
        totalItems: 0
      },
      expanded: {}
    }
  },

  mixins: [Head, Body, Filterable, Foot, Loadable, Progress, Themeable],

  props: {
    expand: {
      type: Boolean
    },
    headers: {
      type: Array,
      default: () => []
    },
    headerText: {
      type: String,
      default: 'text'
    },
    hideActions: Boolean,
    hideHeaders: Boolean,
    mustSort: Boolean,
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
        return items.filter(i => (
          Object.keys(i).some(j => filter(i[j], search))
        ))
      }
    },
    customSort: {
      type: Function,
      default: (items, index, isDescending) => {
        if (index === null) return items

        return items.sort((a, b) => {
          let sortA = getObjectValueByPath(a, index)
          let sortB = getObjectValueByPath(b, index)

          if (isDescending) {
            [sortA, sortB] = [sortB, sortA]
          }

          // Check if both are numbers
          if (!isNaN(sortA) && !isNaN(sortB)) {
            return sortA - sortB
          }

          // Check if both cannot be evaluated
          if (sortA === null && sortB === null) {
            return 0
          }

          [sortA, sortB] = [sortA, sortB]
            .map(s => (
              (s || '').toString().toLocaleLowerCase()
            ))

          if (sortA > sortB) return 1
          if (sortA < sortB) return -1

          return 0
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
    itemKey: {
      type: String,
      default: 'id'
    },
    pagination: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    classes () {
      return {
        'datatable table': true,
        'datatable--select-all': this.selectAll !== false,
        'theme--dark': this.dark,
        'theme--light': this.light
      }
    },
    computedPagination () {
      return this.hasPagination
        ? this.pagination
        : this.defaultPagination
    },
    hasPagination () {
      const pagination = this.pagination || {}

      return Object.keys(pagination).length > 0
    },
    hasSelectAll () {
      return this.selectAll !== undefined && this.selectAll !== false
    },
    itemsLength () {
      if (this.search) return this.searchLength
      return this.totalItems || this.items.length
    },
    indeterminate () {
      return this.hasSelectAll && this.someItems && !this.everyItem
    },
    everyItem () {
      return this.filteredItems.length &&
        this.filteredItems.every(i => this.isSelected(i))
    },
    someItems () {
      return this.filteredItems.some(i => this.isSelected(i))
    },
    getPage () {
      const { rowsPerPage } = this.computedPagination

      return rowsPerPage === Object(rowsPerPage)
        ? rowsPerPage.value
        : rowsPerPage
    },
    pageStart () {
      return this.getPage === -1
        ? 0
        : (this.computedPagination.page - 1) * this.getPage
    },
    pageStop () {
      return this.getPage === -1
        ? this.itemsLength
        : this.computedPagination.page * this.getPage
    },
    filteredItems () {
      if (this.totalItems) return this.items

      let items = this.items.slice()
      const hasSearch = typeof this.search !== 'undefined' &&
        this.search !== null

      if (hasSearch) {
        items = this.customFilter(items, this.search, this.filter)
        this.searchLength = items.length
      }

      items = this.customSort(
        items,
        this.computedPagination.sortBy,
        this.computedPagination.descending
      )

      return this.hideActions &&
        !this.hasPagination
        ? items
        : items.slice(this.pageStart, this.pageStop)
    },
    selected () {
      const selected = {}
      this.value.forEach(i => (selected[i[this.itemKey]] = true))
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
      this.updatePagination({ page: 1, totalItems: this.itemsLength })
    },
    everyItem (val) {
      if (val) this.all = true
    }
  },

  methods: {
    updatePagination (val) {
      const pagination = this.hasPagination
        ? this.pagination
        : this.defaultPagination
      const updatedPagination = Object.assign({}, pagination, val)
      this.$emit('update:pagination', updatedPagination)

      if (!this.hasPagination) {
        this.defaultPagination = updatedPagination
      }
    },
    isSelected (item) {
      return this.selected[item[this.itemKey]]
    },
    isExpanded (item) {
      return this.expanded[item[this.itemKey]]
    },
    sort (index) {
      const { sortBy, descending } = this.computedPagination
      if (sortBy === null) {
        this.updatePagination({ sortBy: index, descending: false })
      } else if (sortBy === index && !descending) {
        this.updatePagination({ descending: true })
      } else if (sortBy !== index) {
        this.updatePagination({ sortBy: index, descending: false })
      } else if (!this.mustSort) {
        this.updatePagination({ sortBy: null, descending: null })
      } else {
        this.updatePagination({ sortBy: index, descending: false })
      }
    },
    needsTR (row) {
      return row.length && row.find(c => c.tag === 'td')
    },
    genTR (children, data = {}) {
      return this.$createElement('tr', data, children)
    },
    toggle (value) {
      const selected = Object.assign({}, this.selected)
      this.filteredItems.forEach(i => (
        selected[i[this.itemKey]] = value)
      )

      this.$emit('input', this.items.filter(i => (
        selected[i[this.itemKey]]))
      )
    }
  },

  created () {
    const firstSortable = this.headers.find(h => (
      !('sortable' in h) || h.sortable)
    )

    this.defaultPagination.sortBy = firstSortable
      ? firstSortable.value
      : null

    if (!this.rowsPerPageItems.length) {
      console.warn('The prop \'rows-per-page-items\' in v-data-table can not be empty.')
    } else {
      this.defaultPagination.rowsPerPage = this.rowsPerPageItems[0]
    }

    this.defaultPagination.totalItems = this.itemsLength

    this.updatePagination(
      Object.assign({}, this.defaultPagination, this.pagination)
    )
  },

  render (h) {
    return h('v-table-overflow', {}, [
      h('table', {
        'class': this.classes
      }, [
        this.genTHead(),
        this.genTProgress(),
        this.genTBody(),
        this.genTFoot()
      ])
    ])
  }
}
