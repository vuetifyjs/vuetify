import VBtn from '../components/VBtn'
import VIcon from '../components/VIcon'
import VSelect from '../components/VSelect'

import Filterable from './filterable'
import Themeable from './themeable'
import Loadable from './loadable'

import { getObjectValueByPath } from '../util/helpers'

/**
 * DataIterable
 *
 * @mixin
 *
 * Base behavior for data table and data iterator
 * providing selection, pagination, sorting and filtering.
 *
 */
export default {

  components: {
    VBtn,
    VIcon,
    VSelect
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
      expanded: {},
      actionsClasses: 'data-iterator__actions',
      actionsSelectClasses: 'data-iterator__actions__select',
      actionsPaginationClasses: 'data-iterator__actions__pagination'
    }
  },

  mixins: [Filterable, Loadable, Themeable],

  props: {
    expand: Boolean,
    hideActions: Boolean,
    disableInitialSort: Boolean,
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
      default: 'Items per page:'
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
        if (search.trim() === '') return items

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
      return this.filteredItemsImpl()
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
    initPagination () {
      if (!this.rowsPerPageItems.length) {
        console.warn(`The prop 'rows-per-page-items' in ${this.name} can not be empty.`)
      } else {
        this.defaultPagination.rowsPerPage = this.rowsPerPageItems[0]
      }

      this.defaultPagination.totalItems = this.itemsLength

      this.updatePagination(
        Object.assign({}, this.defaultPagination, this.pagination)
      )
    },
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
    filteredItemsImpl (...additionalFilterArgs) {
      if (this.totalItems) return this.items

      let items = this.items.slice()
      const hasSearch = typeof this.search !== 'undefined' &&
        this.search !== null

      if (hasSearch) {
        items = this.customFilter(items, this.search, this.filter, ...additionalFilterArgs)
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
    toggle (value) {
      const selected = Object.assign({}, this.selected)
      this.filteredItems.forEach(i => (
        selected[i[this.itemKey]] = value)
      )

      this.$emit('input', this.items.filter(i => (
        selected[i[this.itemKey]]))
      )
    },
    createProps (item, index) {
      const props = { item, index }
      const key = this.itemKey

      Object.defineProperty(props, 'selected', {
        get: () => this.selected[item[this.itemKey]],
        set: (value) => {
          let selected = this.value.slice()
          if (value) selected.push(item)
          else selected = selected.filter(i => i[key] !== item[key])
          this.$emit('input', selected)
        }
      })

      Object.defineProperty(props, 'expanded', {
        get: () => this.expanded[item[this.itemKey]],
        set: (value) => {
          if (!this.expand) {
            Object.keys(this.expanded).forEach((key) => {
              this.$set(this.expanded, key, false)
            })
          }
          this.$set(this.expanded, item[this.itemKey], value)
        }
      })

      return props
    },
    genItems () {
      if (!this.itemsLength && !this.items.length) {
        const noData = this.$slots['no-data'] || this.noDataText
        return [this.genEmptyItems(noData)]
      }

      if (!this.filteredItems.length) {
        const noResults = this.$slots['no-results'] || this.noResultsText
        return [this.genEmptyItems(noResults)]
      }

      return this.genFilteredItems()
    },
    genPrevIcon () {
      return this.$createElement('v-btn', {
        props: {
          disabled: this.computedPagination.page === 1,
          icon: true,
          flat: true,
          dark: this.dark,
          light: this.light
        },
        on: {
          click: () => {
            const page = this.computedPagination.page
            this.updatePagination({ page: page - 1 })
          }
        },
        attrs: {
          'aria-label': 'Previous page' // TODO: Localization
        }
      }, [this.$createElement('v-icon', 'chevron_left')])
    },
    genNextIcon () {
      const pagination = this.computedPagination
      const disabled = pagination.rowsPerPage < 0 ||
        pagination.page * pagination.rowsPerPage >= this.itemsLength ||
        this.pageStop < 0

      return this.$createElement('v-btn', {
        props: {
          disabled,
          icon: true,
          flat: true,
          dark: this.dark,
          light: this.light
        },
        on: {
          click: () => {
            const page = this.computedPagination.page
            this.updatePagination({ page: page + 1 })
          }
        },
        attrs: {
          'aria-label': 'Next page' // TODO: Localization
        }
      }, [this.$createElement('v-icon', 'chevron_right')])
    },
    genSelect () {
      return this.$createElement('div', {
        'class': this.actionsSelectClasses
      }, [
        this.rowsPerPageText,
        this.$createElement('v-select', {
          attrs: {
            'aria-label': this.rowsPerPageText
          },
          props: {
            items: this.rowsPerPageItems,
            value: this.computedPagination.rowsPerPage,
            hideDetails: true,
            auto: true,
            minWidth: '75px'
          },
          on: {
            input: (val) => {
              this.updatePagination({
                page: 1,
                rowsPerPage: val
              })
            }
          }
        })
      ])
    },
    genPagination () {
      let pagination = '–'

      if (this.itemsLength) {
        const stop = this.itemsLength < this.pageStop || this.pageStop < 0
          ? this.itemsLength
          : this.pageStop

        pagination = this.$scopedSlots.pageText
          ? this.$scopedSlots.pageText({
            pageStart: this.pageStart + 1,
            pageStop: stop,
            itemsLength: this.itemsLength
          })
          : `${this.pageStart + 1}-${stop} of ${this.itemsLength}`
      }

      return this.$createElement('div', {
        'class': this.actionsPaginationClasses
      }, [pagination])
    },
    genActions () {
      return [this.$createElement('div', {
        'class': this.actionsClasses
      }, [
        this.rowsPerPageItems.length > 1 ? this.genSelect() : null,
        this.genPagination(),
        this.genPrevIcon(),
        this.genNextIcon()
      ])]
    }
  }
}
