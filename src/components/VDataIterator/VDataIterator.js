
import { getObjectValueByPath } from '../../util/helpers'

export default {
  name: 'v-data-iterator',
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    classPrefix: {
      type: String,
      default: 'v-data-iterator'
    },
    itemKey: {
      type: String
    },
    sort: {
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
      type: String
    },
    rowsPerPage: {
      type: Number,
      default: 10
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      selection: {},
      sorting: { sortBy: this.sortBy, sortDesc: this.sortDesc },
      pagination: { rowsPerPage: this.rowsPerPage, page: this.page }
    }
  },
  computed: {
    computedItems () {
      // TODO: Handle this differently (server-side-processing prop?)
      // if (this.totalItems) return this.items

      let items = this.items.slice()

      // const hasSearch = typeof this.search !== 'undefined' &&
      //   this.search !== null

      // if (hasSearch) {
      //   items = this.customFilter(items, this.search, this.filter, ...additionalFilterArgs)
      //   this.searchLength = items.length
      // }

      items = this.sort(
        items,
        this.sorting.sortBy,
        this.sorting.sortDesc
      )

      // return this.hideActions &&
      //   !this.hasPagination
      //   ? items
      //   : items.slice(this.pageStart, this.pageStop)

      return items.slice(this.pageStart, this.pageStop)
    },
    pageStart () {
      return this.pagination.rowsPerPage === -1
        ? 0
        : (this.pagination.page - 1) * this.pagination.rowsPerPage
    },
    pageStop () {
      return this.pagination.rowsPerPage === -1
        ? this.computedItems.length // TODO: Does this need to be something other (server-side, etc?)
        : this.pagination.page * this.pagination.rowsPerPage
    },
    pageCount () {
      // We can't simply use computedItems.length here since it's already sliced
      return Math.ceil(this.itemsLength / this.pagination.rowsPerPage)
    },
    itemsLength () {
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
    isSelected (item) {
      return this.selection[item[this.itemKey]]
    },
    select (item, value = true) {
      this.$set(this.selection, item[this.itemKey], value)
    },
    selectAll (value = true) {
      const selection = {}

      this.computedItems.forEach(item => {
        selection[item[this.itemKey]] = value
      })

      this.selection = Object.assign({}, this.selection, selection)
    },
    createProps () {
      const props = {
        columns: this.columns,
        items: this.computedItems,
        everyItem: this.everyItem,
        someItems: this.someItems,
        selectAll: this.selectAll,
        itemsLength: this.itemsLength,
        pageCount: this.pageCount,
        pageStart: this.pageStart,
        pageStop: this.pageStop
      }

      Object.defineProperty(props, 'sortBy', {
        get: () => this.sorting.sortBy,
        set: v => this.sorting.sortBy = v,
        enumerable: true
      })

      Object.defineProperty(props, 'sortDesc', {
        get: () => this.sorting.sortDesc,
        set: v => this.sorting.sortDesc = v,
        enumerable: true
      })

      Object.defineProperty(props, 'rowsPerPage', {
        get: () => this.pagination.rowsPerPage,
        set: v => this.pagination.rowsPerPage = v,
        enumerable: true
      })

      Object.defineProperty(props, 'page', {
        get: () => this.pagination.page,
        set: v => this.pagination.page = v,
        enumerable: true
      })

      return props
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

      return props
    },
    computeSlots (name) {
      const slots = []

      if (this.$slots[name]) slots.push(...this.$slots[name])
      if (this.$scopedSlots[name]) {
        const scoped = this.$scopedSlots[name](this.createProps())
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
      return h('div', {
        // TODO: How to customize this?
      }, items)
    }
  },
  render (h) {
    return h('div', {
      staticClass: this.classPrefix
    }, [
      ...this.genHeaders(h),
      ...this.genBodies(h),
      ...this.genFooters(h)
    ])
  }
}
