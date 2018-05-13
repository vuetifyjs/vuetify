import { getObjectValueByPath } from '../../util/helpers'

const wrapInArray = v => Array.isArray(v) ? v : [v]

export default {
  name: 'v-data-iterator',

  provide () {
    const dataIterator = {
      toggleSelected: this.toggleSelected,
      resetExpanded: this.resetExpanded,
      sort: this.sort
    }

    Object.defineProperty(dataIterator, 'items', {
      get: () => this.computedItems
    })

    Object.defineProperty(dataIterator, 'page', {
      get: () => this.options.page,
      set: v => this.options.page = v,
      enumerable: true
    })

    Object.defineProperty(dataIterator, 'rowsPerPage', {
      get: () => this.options.rowsPerPage,
      set: v => this.options.rowsPerPage = v,
      enumerable: true
    })

    Object.defineProperty(dataIterator, 'pageCount', {
      get: () => this.pageCount,
      enumerable: true
    })

    Object.defineProperty(dataIterator, 'pageStart', {
      get: () => this.pageStart,
      enumerable: true
    })

    Object.defineProperty(dataIterator, 'pageStop', {
      get: () => this.pageStop,
      enumerable: true
    })

    Object.defineProperty(dataIterator, 'itemsLength', {
      get: () => this.itemsLength,
      enumerable: true
    })

    Object.defineProperty(dataIterator, 'everyItem', {
      get: () => this.everyItem,
      enumerable: true
    })

    Object.defineProperty(dataIterator, 'someItems', {
      get: () => this.someItems,
      enumerable: true
    })

    Object.defineProperty(dataIterator, 'sortBy', {
      get: () => this.options.sortBy,
      set: v => this.options.sortBy = v,
      enumerable: true
    })

    Object.defineProperty(dataIterator, 'sortDesc', {
      get: () => this.options.sortDesc,
      set: v => this.options.sortDesc = v,
      enumerable: true
    })

    Object.defineProperty(dataIterator, 'multiSort', {
      get: () => this.multiSort,
      enumerable: true
    })

    return { dataIterator }
  },

  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    itemKey: {
      type: String
    },
    customSort: {
      type: Function,
      default: (items, sortBy, sortDesc) => {
        if (sortBy === null) return items

        if (!Array.isArray(sortBy)) {
          sortBy = [sortBy]
          sortDesc = [sortDesc]
        }

        return items.sort((a, b) => {
          for (let i = 0; i < sortBy.length; i++) {
            const sortKey = sortBy[i]

            let sortA = getObjectValueByPath(a, sortKey)
            let sortB = getObjectValueByPath(b, sortKey)

            if (sortDesc[i]) {
              [sortA, sortB] = [sortB, sortA]
            }

            // Check if both cannot be evaluated
            if (sortA === null && sortB === null) {
              return 0
            }

            [sortA, sortB] = [sortA, sortB].map(s => (s || '').toString().toLocaleLowerCase())

            if (sortA !== sortB) {
              if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB)
              if (sortA > sortB) return 1
              if (sortA < sortB) return -1
            }
          }
        })
      }
    },
    // TODO: should probably not combine customFilter and filter
    // but having both of them is confusing and overly complex.
    // Also should we do built-in column filter in headers?
    customFilter: {
      type: Function,
      default: (items, search, filter) => {
        search = search.toString().toLowerCase()
        if (search.trim() === '') return items

        return items.filter(i => Object.keys(i).some(j => {
          const val = i[j]
          return val != null &&
            typeof val !== 'boolean' &&
            val.toString().toLowerCase().indexOf(search) !== -1
        }))
      }
    },
    search: {
      type: String
    },
    sortBy: {
      type: [Array, String],
      default: () => ([])
    },
    sortDesc: {
      type: [Array, Boolean],
      default: () => ([])
    },
    rowsPerPage: {
      type: Number,
      default: 10
    },
    page: {
      type: Number,
      default: 1
    },
    serverItemsLength: {
      type: Number
    },
    noResultsText: {
      type: String,
      default: 'No matching records found'
    },
    noDataText: {
      type: String,
      default: 'No data available'
    },
    loadingText: {
      type: String,
      default: 'Please wait...'
    },
    multiSort: {
      type: Boolean
    },
    mustSort: {
      type: Boolean
    }
  },

  data () {
    return {
      searchItemsLength: 0,
      selection: {},
      expansion: {},
      options: {
        sortBy: wrapInArray(this.sortBy),
        sortDesc: wrapInArray(this.sortDesc),
        rowsPerPage: this.rowsPerPage,
        page: this.page
      }
    }
  },

  watch: {
    'options.sortBy': function (v) {
      this.$emit('update:sortBy', !this.multiSort && !Array.isArray(this.sortBy) ? v[0] : v)
    },
    'options.sortDesc': function (v) {
      this.$emit('update:sortDesc', !this.multiSort && !Array.isArray(this.sortBy) ? v[0] : v)
    },
    'options.page': function (v) {
      this.$emit('update:page', v)
    },
    'options.rowsPerPage': function (v) {
      this.$emit('update:rowsPerPage', v)
    },
    sortBy (v) {
      this.options.sortBy = wrapInArray(v)
    },
    sortDesc (v) {
      this.options.sortDesc = wrapInArray(v)
    },
    page (v) {
      this.options.page = v
    },
    rowsPerPage (v) {
      this.options.rowsPerPage = v
    }
  },

  computed: {
    hasSearch () {
      return typeof this.search !== 'undefined' && this.search !== null
    },
    computedItems () {
      let items = this.items.slice()

      if (this.serverItemsLength) return items

      items = this.searchItems(items)

      items = this.sortItems(items, this.options.sortBy, this.options.sortDesc)

      return this.paginateItems(items)
    },
    pageStart () {
      return this.options.rowsPerPage === -1
        ? 0
        : (this.options.page - 1) * this.options.rowsPerPage
    },
    pageStop () {
      return this.options.rowsPerPage === -1
        ? this.itemsLength // TODO: Does this need to be something other (server-side, etc?)
        : this.options.page * this.options.rowsPerPage
    },
    pageCount () {
      // We can't simply use computedItems.length here since it's already sliced
      return this.options.rowsPerPage <= 0 ? 1 : Math.ceil(this.itemsLength / this.options.rowsPerPage)
    },
    itemsLength () {
      if (typeof this.serverItemsLength !== 'undefined' && !isNaN(this.serverItemsLength)) return this.serverItemsLength
      if (this.hasSearch) return this.searchItemsLength
      return this.items.length
    },
    everyItem () {
      return this.computedItems.length && this.computedItems.every(i => this.isSelected(i))
    },
    someItems () {
      return this.computedItems.some(i => this.isSelected(i))
    }
  },

  methods: {
    sortItems (items, sortBy, sortDesc) {
      return this.customSort(items, sortBy, sortDesc)
    },
    paginateItems (items) {
      return items.slice(this.pageStart, this.pageStop)
    },
    searchItems (items) {
      if (this.hasSearch) {
        items = this.customFilter(items, this.search)
        this.searchItemsLength = items.length
      }

      return items
    },
    sort (key) {
      let sortBy = this.options.sortBy.slice()
      let sortDesc = this.options.sortDesc.slice()
      const sortByIndex = sortBy.findIndex(k => k === key)

      if (sortByIndex < 0) {
        if (!this.multiSort) {
          sortBy = []
          sortDesc = []
        }
        sortBy.push(key)
        sortDesc.push(false)
      } else if (sortByIndex >= 0 && !sortDesc[sortByIndex]) {
        sortDesc[sortByIndex] = true
      } else if (!this.mustSort) {
        sortBy.splice(sortByIndex, 1)
        sortDesc.splice(sortByIndex, 1)
      } else {
        sortDesc[sortByIndex] = false
      }

      this.options = Object.assign(this.options, { sortBy, sortDesc })
    },
    isSelected (item) {
      return this.selection[item[this.itemKey]]
    },
    select (item, value = true) {
      this.$set(this.selection, item[this.itemKey], value)
    },
    isExpanded (item) {
      return this.expansion[item[this.itemKey]]
    },
    expand (item, value = true) {
      this.$set(this.expansion, item[this.itemKey], value)
    },
    resetExpanded () {
      this.expansion = {}
    },
    toggleSelected (value) {
      const selection = {}

      this.computedItems.forEach(item => {
        selection[item[this.itemKey]] = !this.everyItem
      })

      this.selection = Object.assign({}, this.selection, selection)
    },
    createItemProps (item) {
      const props = {
        item
      }

      Object.defineProperty(props, 'selected', {
        get: () => this.isSelected(item),
        set: v => this.select(item, v),
        enumerable: true
      })

      Object.defineProperty(props, 'expanded', {
        get: () => this.isExpanded(item),
        set: v => this.expand(item, v),
        enumerable: true
      })

      return props
    },
    computeSlots (name) {
      const slots = []

      if (this.$slots[name]) slots.push(...this.$slots[name])
      if (this.$scopedSlots[name]) {
        const scoped = this.$scopedSlots[name](this._provided.dataIterator)
        Array.isArray(scoped) ? slots.push(...scoped) : slots.push(scoped)
      }

      return slots
    },
    genHeaders (h) {
      return this.computeSlots('header')
    },
    genEmpty (h, content) {
      return h('div', content)
    },
    genBodies (h) {
      const bodies = []
      if (!this.serverItemsLength && this.loading) {
        const loading = this.$slots['loading'] || this.loadingText
        bodies.push(this.genEmpty(h, loading))
      } else if (!this.itemsLength && !this.items.length) {
        const noData = this.$slots['no-data'] || this.noDataText
        bodies.push(this.genEmpty(h, noData))
      } else if (!this.computedItems.length) {
        const noResults = this.$slots['no-results'] || this.noResultsText
        bodies.push(this.genEmpty(h, noResults))
      }

      bodies.push(this.$slots.default)
      bodies.push(...this.computeSlots('body'))
      bodies.push(this.genItems(h))

      return bodies
    },
    genItems (h) {
      const items = []

      if (this.$scopedSlots.item) {
        const items = this.computedItems.map(item => this.$scopedSlots.item(this.createItemProps(item)))
        items.push(this.genBodyWrapper(h, items))
      }

      return items
    },
    genFooters (h) {
      return this.computeSlots('footer')
    },
    genBodyWrapper (h, items) {
      return h('div', items)
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'v-data-iterator'
    }, [
      ...this.genHeaders(h),
      ...this.genBodies(h),
      ...this.genFooters(h)
    ])
  }
}
