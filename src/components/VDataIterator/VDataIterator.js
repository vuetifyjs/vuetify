
import { getObjectValueByPath } from '../../util/helpers'

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

        return items.sort((a, b) => {
          let sortA = getObjectValueByPath(a, sortBy)
          let sortB = getObjectValueByPath(b, sortBy)

          if (sortDesc) {
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
    sortBy: {
      type: String
    },
    sortDesc: {
      type: Boolean,
      default: false
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
    disablePagination:  {
      type: Boolean
    }
  },

  data () {
    return {
      selection: {},
      expansion: {},
      options: {
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
        rowsPerPage: this.rowsPerPage,
        page: this.page
      }
    }
  },

  watch: {
    'options.sortBy': function (v) {
      this.$emit('update:sortBy', v)
    },
    sortBy (v) {
      this.options.sortBy = v
    }
  },

  computed: {
    classes () {
      return {
        'v-data-iterator': true
      }
    },
    computedItems () {
      // TODO: Handle this differently (server-side-processing prop?)
      // if (this.totalItems) return this.items

      let items = this.items.slice()

      if (this.serverItemsLength) return items

      // const hasSearch = typeof this.search !== 'undefined' &&
      //   this.search !== null

      // if (hasSearch) {
      //   items = this.customFilter(items, this.search, this.filter, ...additionalFilterArgs)
      //   this.searchLength = items.length
      // }

      items = this.customSort(
        items,
        this.options.sortBy,
        this.options.sortDesc
      )

      return this.disablePagination ? items : items.slice(this.pageStart, this.pageStop)
    },
    pageStart () {
      return this.options.rowsPerPage === -1
        ? 0
        : (this.options.page - 1) * this.options.rowsPerPage
    },
    pageStop () {
      return this.options.rowsPerPage === -1
        ? this.computedItems.length // TODO: Does this need to be something other (server-side, etc?)
        : this.options.page * this.options.rowsPerPage
    },
    pageCount () {
      // We can't simply use computedItems.length here since it's already sliced
      return Math.ceil(this.itemsLength / this.options.rowsPerPage)
    },
    itemsLength () {
      if (typeof this.serverItemsLength !== 'undefined' && !isNaN(this.serverItemsLength)) return this.serverItemsLength
      // TODO: needs to account for search
      return this.items.length
    },
    everyItem () {
      return this.computedItems.length &&
        this.computedItems.every(i => this.isSelected(i))
    },
    someItems () {
      return this.computedItems.some(i => this.isSelected(i))
    }
  },

  methods: {
    sort (index) {
      const { sortBy, sortDesc } = this.options
      let updated
      if (sortBy === null) {
        updated = { sortBy: index, sortDesc: false }
      } else if (sortBy === index && !sortDesc) {
        updated = { sortBy: index, sortDesc: true }
      } else if (sortBy !== index) {
        updated = { sortBy: index, sortDesc: false }
      } else if (!this.mustSort) {
        updated = { sortBy: null, sortDesc: null }
      } else {
        updated = { sortBy: index, sortDesc: false }
      }

      this.options = Object.assign(this.options, updated)
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
    genBodies (h) {
      const bodies = this.computeSlots('body')

      if (this.$scopedSlots.item) {
        const items = this.computedItems.map(item => this.$scopedSlots.item(this.createItemProps(item)))
        bodies.push(this.genBodyWrapper(h, items))
      }

      return bodies
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
      class: this.classes
    }, [
      ...this.genHeaders(h),
      ...this.genBodies(h),
      ...this.genFooters(h)
    ])
  }
}
