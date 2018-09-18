// Components
import VDataFooter from './VDataFooter'

// Mixins
import Themeable from '../../mixins/themeable'

// Utils
import mixins from '../../util/mixins'
import { getObjectValueByPath, deepEqual, wrapInArray } from '../../util/helpers'

// Types
import { VNode, VNodeChildrenArrayContents } from 'vue'
import { PropValidator } from 'vue/types/options'

export default mixins(
  Themeable
  /* @vue/component */
).extend({
  name: 'v-data-iterator',

  provide (): any {
    return { dataIterator: this }
  },

  props: {
    items: {
      type: Array,
      default: () => ([])
    } as PropValidator<any[]>,
    itemKey: {
      type: String,
      default: 'id'
    },
    customSort: {
      type: Function,
      default: (items: any[], sortBy: string[], sortDesc: boolean[]) => {
        if (sortBy === null) return items

        return items.sort((a: any, b: any): number => {
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

          return 0
        })
      }
    },
    // TODO: should probably not combine customFilter and filter
    // but having both of them is confusing and overly complex.
    // Also should we do built-in column filter in headers?
    customFilter: {
      type: Function,
      default: (items: any[], search: string) => {
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
      type: [String, Array],
      default: () => ([])
    } as PropValidator<string | string[]>,
    sortDesc: {
      type: [Boolean, Array],
      default: () => ([])
    } as PropValidator<boolean | boolean[]>,
    itemsPerPage: {
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
      default: '$vuetify.dataIterator.noResultsText'
    },
    noDataText: {
      type: String,
      default: '$vuetify.noDataText'
    },
    loading: Boolean,
    loadingText: {
      type: String,
      default: '$vuetify.dataIterator.loadingText'
    },
    multiSort: {
      type: Boolean
    },
    mustSort: {
      type: Boolean
    },
    selected: Array as PropValidator<any[]>,
    singleSelect: Boolean, // TODO: Better name to fit in with similar functionality in other components?
    expanded: Array as PropValidator<any[]>,
    singleExpand: Boolean, // TODO: Better name to fit in with similar functionality in other components?
    hideFooter: Boolean,
    footerProps: {
      type: Object,
      default: () => ({})
    } as PropValidator<any> // TODO: Type VDataFooter props here
  },

  data () {
    return {
      searchItemsLength: 0,
      selection: {} as Record<string, boolean>,
      expansion: {} as Record<string, boolean>,
      options: {
        sortBy: wrapInArray(this.sortBy),
        sortDesc: wrapInArray(this.sortDesc),
        itemsPerPage: this.itemsPerPage,
        page: this.page
      }
    }
  },

  computed: {
    hasSearch (): boolean {
      return typeof this.search !== 'undefined' && this.search !== null
    },
    computedItems (): any[] {
      let items = this.items.slice()

      if (this.serverItemsLength) return items

      items = this.searchItems(items)

      items = this.sortItems(items, this.options.sortBy, this.options.sortDesc)

      return this.paginateItems(items)
    },
    pageStart (): number {
      return this.options.itemsPerPage === -1
        ? 0
        : (this.options.page - 1) * this.options.itemsPerPage
    },
    pageStop (): number {
      return this.options.itemsPerPage === -1
        ? this.itemsLength // TODO: Does this need to be something other (server-side, etc?)
        : this.options.page * this.options.itemsPerPage
    },
    pageCount (): number {
      // We can't simply use computedItems.length here since it's already sliced
      return this.options.itemsPerPage <= 0 ? 1 : Math.ceil(this.itemsLength / this.options.itemsPerPage)
    },
    itemsLength (): number {
      if (typeof this.serverItemsLength !== 'undefined' && !isNaN(this.serverItemsLength)) return this.serverItemsLength
      if (this.hasSearch) return this.searchItemsLength
      return this.items.length
    },
    everyItem (): boolean {
      return !!this.computedItems.length && this.computedItems.every((i: any) => this.isSelected(i))
    },
    someItems (): boolean {
      return this.computedItems.some((i: any) => this.isSelected(i))
    }
  },

  watch: {
    'options.sortBy' (v, old) {
      if (deepEqual(v, old)) return
      this.$emit('update:sortBy', !this.multiSort && !Array.isArray(this.sortBy) ? v[0] : v)
    },
    'options.sortDesc' (v, old) {
      if (deepEqual(v, old)) return
      this.$emit('update:sortDesc', !this.multiSort && !Array.isArray(this.sortBy) ? v[0] : v)
    },
    'options.page' (v) {
      this.$emit('update:page', v)
    },
    'options.itemsPerPage' (v) {
      this.$emit('update:itemsPerPage', v)
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
    itemsPerPage (v) {
      this.options.itemsPerPage = v
    },
    selected (v) {
      const selection: Record<string, boolean> = {}
      v.forEach((i: any) => selection[getObjectValueByPath(i, this.itemKey)] = true)
      this.selection = selection
    },
    expanded (v) {
      const expansion: Record<string, boolean> = {}
      v.forEach((i: any) => expansion[getObjectValueByPath(i, this.itemKey)] = true)
      this.expansion = expansion
    },
    selection: {
      handler (v, old) {
        if (deepEqual(v, old)) return
        const keys = Object.keys(this.selection).filter(k => this.selection[k])
        const selected = !keys.length ? [] : this.items.filter(i => keys.includes(String(getObjectValueByPath(i, this.itemKey))))
        this.$emit('update:selected', selected)
      },
      deep: true
    },
    expansion: {
      handler (v, old) {
        if (deepEqual(v, old)) return
        const keys = Object.keys(this.expansion)
        const expanded = !keys.length ? [] : this.items.filter(i => keys.includes(String(getObjectValueByPath(i, this.itemKey))))
        this.$emit('update:expanded', expanded)
      },
      deep: true
    }
  },

  methods: {
    sortItems (items: any[], sortBy: string[], sortDesc: boolean[]): any[] {
      return this.customSort(items, sortBy, sortDesc)
    },
    paginateItems (items: any[]): any[] {
      return items.slice(this.pageStart, this.pageStop)
    },
    searchItems (items: any[]): any[] {
      if (this.hasSearch) {
        items = this.customFilter(items, this.search)
        this.searchItemsLength = items.length
      }

      return items
    },
    sort (key: string): void {
      let sortBy = this.options.sortBy.slice()
      let sortDesc = this.options.sortDesc.slice()
      const sortByIndex = sortBy.findIndex((k: string) => k === key)

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
    isSelected (item: any): boolean {
      return this.selection[getObjectValueByPath(item, this.itemKey)] || false
    },
    select (item: any, value = true): void {
      const selection = this.singleSelect ? {} : Object.assign({}, this.selection)
      const key = getObjectValueByPath(item, this.itemKey)

      if (value) selection[key] = true
      else delete selection[key]

      this.selection = selection
      this.$emit('item-selected', { item, value })
    },
    isExpanded (item: any): boolean {
      return this.expansion[getObjectValueByPath(item, this.itemKey)] || false
    },
    expand (item: any, value = true): void {
      const expansion = this.singleExpand ? {} : Object.assign({}, this.expansion)
      const key = getObjectValueByPath(item, this.itemKey)

      if (value) expansion[key] = true
      else delete expansion[key]

      this.expansion = expansion
      this.$emit('item-expanded', { item, value })
    },
    resetExpanded (): void {
      this.expansion = {}
    },
    toggleSelectAll (): void {
      const selection: Record<string, boolean> = {}

      this.computedItems.forEach((item: any) => {
        const key = getObjectValueByPath(item, this.itemKey)
        selection[key] = !this.everyItem
      })

      this.selection = Object.assign({}, this.selection, selection)
    },
    createItemProps (item: any): any {
      const props = {
        item
      }

      Object.defineProperties(props, {
        selected: {
          get: () => this.isSelected(item),
          set: v => this.select(item, v),
          enumerable: true
        },
        expanded: {
          get: () => this.isExpanded(item),
          set: v => this.expand(item, v),
          enumerable: true
        }
      })

      return props
    },
    computeSlots (name: string): VNodeChildrenArrayContents {
      const slots: VNodeChildrenArrayContents = []

      if (this.$slots[name]) slots.push(...this.$slots[name])
      if (this.$scopedSlots[name]) {
        const scoped = this.$scopedSlots[name](this)
        Array.isArray(scoped) ? slots.push(...scoped) : slots.push(scoped)
      }

      return slots
    },
    genHeaders (): VNodeChildrenArrayContents {
      return this.computeSlots('header')
    },
    genEmpty (content: any) {
      return this.$createElement('div', content)
    },
    genBodies () {
      const bodies: VNodeChildrenArrayContents = []
      if (!this.serverItemsLength && this.loading) {
        const loading = this.$slots['loading'] || this.$vuetify.t(this.loadingText)
        return [this.genEmpty(loading)]
      } else if (!this.itemsLength && !this.items.length) {
        const noData = this.$slots['no-data'] || this.$vuetify.t(this.noDataText)
        return [this.genEmpty(noData)]
      } else if (!this.computedItems.length) {
        const noResults = this.$slots['no-results'] || this.$vuetify.t(this.noResultsText)
        return [this.genEmpty(noResults)]
      }

      bodies.push(this.$slots.default)

      const slots = this.computeSlots('body')
      if (slots.length) bodies.push(slots)

      const items = this.genItems()
      if (items) bodies.push(items)

      return bodies
    },
    genItems (): string | VNodeChildrenArrayContents | VNode | null {
      if (this.$scopedSlots.items) {
        return this.$scopedSlots.items({ items: this.computedItems })
      }

      if (this.$scopedSlots.item) {
        const slotItems = this.computedItems.map((item: any) => this.$scopedSlots.item(this.createItemProps(item)))
        return this.genBodyWrapper(slotItems)
      }

      return null
    },
    genFooter (): VNodeChildrenArrayContents {
      const footers = []

      if (!this.hideFooter) {
        footers.push(this.$createElement(VDataFooter, {
          props: {
            ...this.footerProps
          }
        }))
      }

      return footers
    },
    genBodyWrapper (items: any[]): VNode {
      return this.$createElement('div', items)
    }
  },

  render (h): VNode {
    const children: VNodeChildrenArrayContents = [
      ...this.genHeaders(),
      ...this.genBodies(),
      ...this.computeSlots('footer'),
      ...this.genFooter()
    ]

    return h('div', {
      staticClass: 'v-data-iterator',
      class: this.themeClasses
    }, children)
  }
})
