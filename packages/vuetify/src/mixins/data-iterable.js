import VBtn from '../components/VBtn'
import VIcon from '../components/VIcon'
import VSelect from '../components/VSelect'

import Filterable from './filterable'
import Themeable from './themeable'
import Loadable from './loadable'

import { getObjectValueByPath, isObject } from '../util/helpers'
import { consoleWarn } from '../util/console'

/**
 * DataIterable
 *
 * @mixin
 *
 * Base behavior for data table and data iterator
 * providing selection, pagination, sorting and filtering.
 *
 */
/* @vue/component */
export default {
  name: 'data-iterable',

  mixins: [Filterable, Loadable, Themeable],

  props: {
    expand: Boolean,
    hideActions: Boolean,
    disableInitialSort: Boolean,
    mustSort: Boolean,
    noResultsText: {
      type: String,
      default: '$vuetify.dataIterator.noResultsText'
    },
    nextIcon: {
      type: String,
      default: '$vuetify.icons.next'
    },
    prevIcon: {
      type: String,
      default: '$vuetify.icons.prev'
    },
    rowsPerPageItems: {
      type: Array,
      default () {
        return [
          5,
          10,
          25,
          {
            text: '$vuetify.dataIterator.rowsPerPageAll',
            value: -1
          }
        ]
      }
    },
    rowsPerPageText: {
      type: String,
      default: '$vuetify.dataIterator.rowsPerPageText'
    },
    selectAll: [Boolean, String],
    search: {
      required: false
    },
    filter: {
      type: Function,
      default: (val, search) => {
        return val != null &&
          typeof val !== 'boolean' &&
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

  data: () => ({
    searchLength: 0,
    defaultPagination: {
      descending: false,
      page: 1,
      rowsPerPage: 5,
      sortBy: null,
      totalItems: 0
    },
    expanded: {},
    actionsClasses: 'v-data-iterator__actions',
    actionsRangeControlsClasses: 'v-data-iterator__actions__range-controls',
    actionsSelectClasses: 'v-data-iterator__actions__select',
    actionsPaginationClasses: 'v-data-iterator__actions__pagination'
  }),

  computed: {
    computedPagination () {
      return this.hasPagination
        ? this.pagination
        : this.defaultPagination
    },
    computedRowsPerPageItems () {
      return this.rowsPerPageItems.map(item => {
        return isObject(item)
          ? Object.assign({}, item, {
            text: this.$vuetify.t(item.text)
          })
          : { value: item, text: Number(item).toLocaleString(this.$vuetify.lang.current) }
      })
    },
    hasPagination () {
      const pagination = this.pagination || {}

      return Object.keys(pagination).length > 0
    },
    hasSelectAll () {
      return this.selectAll !== undefined && this.selectAll !== false
    },
    itemsLength () {
      if (this.hasSearch) return this.searchLength
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
      for (let index = 0; index < this.value.length; index++) {
        const key = getObjectValueByPath(this.value[index], this.itemKey)
        selected[key] = true
      }
      return selected
    },
    hasSearch () {
      return this.search != null
    }
  },

  watch: {
    items () {
      if (this.pageStart >= this.itemsLength) {
        this.resetPagination()
      }
      const newItemKeys = new Set(this.items.map(item => getObjectValueByPath(item, this.itemKey)))
      const selection = this.value.filter(item => newItemKeys.has(getObjectValueByPath(item, this.itemKey)))

      if (selection.length !== this.value.length) {
        this.$emit('input', selection)
      }
    },
    search () {
      this.$nextTick(() => {
        this.updatePagination({ page: 1, totalItems: this.itemsLength })
      })
    },
    'computedPagination.sortBy': 'resetPagination',
    'computedPagination.descending': 'resetPagination'
  },

  methods: {
    initPagination () {
      if (!this.rowsPerPageItems.length) {
        consoleWarn(`The prop 'rows-per-page-items' can not be empty`, this)
      } else {
        this.defaultPagination.rowsPerPage = this.rowsPerPageItems[0]
      }

      this.defaultPagination.totalItems = this.items.length

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
      return this.selected[getObjectValueByPath(item, this.itemKey)]
    },
    isExpanded (item) {
      return this.expanded[getObjectValueByPath(item, this.itemKey)]
    },
    filteredItemsImpl (...additionalFilterArgs) {
      if (this.totalItems) return this.items

      let items = this.items.slice()

      if (this.hasSearch) {
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
    resetPagination () {
      this.computedPagination.page !== 1 &&
        this.updatePagination({ page: 1 })
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
      for (let index = 0; index < this.filteredItems.length; index++) {
        const key = getObjectValueByPath(this.filteredItems[index], this.itemKey)
        selected[key] = value
      }

      this.$emit('input', this.items.filter(i => {
        const key = getObjectValueByPath(i, this.itemKey)
        return selected[key]
      }))
    },
    createProps (item, index) {
      const props = { item, index }
      const keyProp = this.itemKey
      const itemKey = getObjectValueByPath(item, keyProp)

      Object.defineProperty(props, 'selected', {
        get: () => this.selected[itemKey],
        set: value => {
          if (itemKey == null) {
            consoleWarn(`"${keyProp}" attribute must be defined for item`, this)
          }

          let selected = this.value.slice()
          if (value) selected.push(item)
          else selected = selected.filter(i => getObjectValueByPath(i, keyProp) !== itemKey)
          this.$emit('input', selected)
        }
      })

      Object.defineProperty(props, 'expanded', {
        get: () => this.expanded[itemKey],
        set: value => {
          if (itemKey == null) {
            consoleWarn(`"${keyProp}" attribute must be defined for item`, this)
          }

          if (!this.expand) {
            for (const key in this.expanded) {
              this.expanded.hasOwnProperty(key) && this.$set(this.expanded, key, false)
            }
          }
          this.$set(this.expanded, itemKey, value)
        }
      })

      return props
    },
    genItems () {
      if (!this.itemsLength && !this.items.length) {
        const noData = this.$slots['no-data'] || this.$vuetify.t(this.noDataText)
        return [this.genEmptyItems(noData)]
      }

      if (!this.filteredItems.length) {
        const noResults = this.$slots['no-results'] || this.$vuetify.t(this.noResultsText)
        return [this.genEmptyItems(noResults)]
      }

      return this.genFilteredItems()
    },
    genPrevIcon () {
      return this.$createElement(VBtn, {
        props: {
          disabled: this.computedPagination.page === 1,
          icon: true,
          flat: true
        },
        on: {
          click: () => {
            const page = this.computedPagination.page
            this.updatePagination({ page: page - 1 })
          }
        },
        attrs: {
          'aria-label': this.$vuetify.t('$vuetify.dataIterator.prevPage')
        }
      }, [this.$createElement(VIcon, this.$vuetify.rtl ? this.nextIcon : this.prevIcon)])
    },
    genNextIcon () {
      const pagination = this.computedPagination
      const disabled = pagination.rowsPerPage < 0 ||
        pagination.page * pagination.rowsPerPage >= this.itemsLength ||
        this.pageStop < 0

      return this.$createElement(VBtn, {
        props: {
          disabled,
          icon: true,
          flat: true
        },
        on: {
          click: () => {
            const page = this.computedPagination.page
            this.updatePagination({ page: page + 1 })
          }
        },
        attrs: {
          'aria-label': this.$vuetify.t('$vuetify.dataIterator.nextPage')
        }
      }, [this.$createElement(VIcon, this.$vuetify.rtl ? this.prevIcon : this.nextIcon)])
    },
    genSelect () {
      return this.$createElement('div', {
        'class': this.actionsSelectClasses
      }, [
        this.$vuetify.t(this.rowsPerPageText),
        this.$createElement(VSelect, {
          attrs: {
            'aria-label': this.$vuetify.t(this.rowsPerPageText)
          },
          props: {
            items: this.computedRowsPerPageItems,
            value: this.computedPagination.rowsPerPage,
            hideDetails: true,
            menuProps: {
              auto: true,
              dark: this.dark,
              light: this.light,
              minWidth: '75px'
            }
          },
          on: {
            input: val => {
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
          : this.$vuetify.t('$vuetify.dataIterator.pageText',
            ...([this.pageStart + 1, stop, this.itemsLength].map(n => Number(n).toLocaleString(this.$vuetify.lang.current))))
      }

      return this.$createElement('div', {
        'class': this.actionsPaginationClasses
      }, [pagination])
    },
    genActions () {
      const rangeControls = this.$createElement('div', {
        'class': this.actionsRangeControlsClasses
      }, [
        this.genPagination(),
        this.genPrevIcon(),
        this.genNextIcon()
      ])

      return [this.$createElement('div', {
        'class': this.actionsClasses
      }, [
        this.$slots['actions-prepend'] ? this.$createElement('div', {}, this.$slots['actions-prepend']) : null,
        this.rowsPerPageItems.length > 1 ? this.genSelect() : null,
        rangeControls,
        this.$slots['actions-append'] ? this.$createElement('div', {}, this.$slots['actions-append']) : null
      ])]
    }
  }
}
