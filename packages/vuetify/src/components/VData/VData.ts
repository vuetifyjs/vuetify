// Helpers
import { wrapInArray, sortItems, deepEqual, groupItems, searchItems } from '../../util/helpers'
import Vue, { VNode } from 'vue'

// Types
import {
  DataOptions,
  DataPagination,
  DataScopeProps,
  DataSortFunction,
  DataGroupFunction,
  DataSearchFunction,
} from 'types'
import { PropValidator, PropType } from 'vue/types/options'

export default Vue.extend({
  name: 'v-data',

  inheritAttrs: false,

  props: {
    items: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({}),
    } as PropValidator<Partial<DataOptions>>,
    sortBy: {
      type: [String, Array] as PropType<string | string[]>,
      default: () => [],
    },
    sortDesc: {
      type: [Boolean, Array] as PropType<boolean | boolean[]>,
      default: () => [],
    },
    customSort: {
      type: Function as PropType<DataSortFunction>,
      default: sortItems,
    },
    mustSort: Boolean,
    multiSort: Boolean,
    page: {
      type: Number,
      default: 1,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    groupBy: {
      type: [String, Array] as PropType<string | string[]>,
      default: () => [],
    },
    groupDesc: {
      type: [Boolean, Array] as PropType<boolean | boolean[]>,
      default: () => [],
    },
    customGroup: {
      type: Function as PropType<DataGroupFunction>,
      default: groupItems,
    },
    locale: {
      type: String,
      default: 'en-US',
    },
    disableSort: Boolean,
    disablePagination: Boolean,
    disableFiltering: Boolean,
    search: String,
    customFilter: {
      type: Function as PropType<DataSearchFunction>,
      default: searchItems,
    },
    serverItemsLength: {
      type: Number,
      default: -1,
    },
  },

  data () {
    let internalOptions: DataOptions = {
      page: this.page,
      itemsPerPage: this.itemsPerPage,
      sortBy: wrapInArray(this.sortBy),
      sortDesc: wrapInArray(this.sortDesc),
      groupBy: wrapInArray(this.groupBy),
      groupDesc: wrapInArray(this.groupDesc),
      mustSort: this.mustSort,
      multiSort: this.multiSort,
    }

    if (this.options) {
      internalOptions = Object.assign(internalOptions, this.options)
    }

    return {
      internalOptions,
    }
  },

  computed: {
    itemsLength (): number {
      return this.serverItemsLength >= 0 ? this.serverItemsLength : this.filteredItems.length
    },
    pageCount (): number {
      return this.internalOptions.itemsPerPage === -1
        ? 1
        : Math.ceil(this.itemsLength / this.internalOptions.itemsPerPage) // TODO: can't use items.length here
    },
    pageStart (): number {
      if (this.internalOptions.itemsPerPage === -1 || !this.items.length) return 0

      return (this.internalOptions.page - 1) * this.internalOptions.itemsPerPage
    },
    pageStop (): number {
      if (this.internalOptions.itemsPerPage === -1) return this.itemsLength
      if (!this.items.length) return 0

      return Math.min(this.itemsLength, this.internalOptions.page * this.internalOptions.itemsPerPage)
    },
    isGrouped (): boolean {
      return !!this.internalOptions.groupBy.length
    },
    pagination (): DataPagination {
      return {
        page: this.internalOptions.page,
        itemsPerPage: this.internalOptions.itemsPerPage,
        pageStart: this.pageStart,
        pageStop: this.pageStop,
        pageCount: this.pageCount,
        itemsLength: this.itemsLength,
      }
    },
    filteredItems (): any[] {
      let items = this.items.slice()

      if (!this.disableFiltering && this.serverItemsLength <= 0) {
        items = this.customFilter(items, this.search)
      }

      return items
    },
    computedItems (): any[] {
      let items = this.filteredItems.slice()

      if (!this.disableSort && this.serverItemsLength <= 0) {
        items = this.sortItems(items)
      }

      if (!this.disablePagination && this.serverItemsLength <= 0) {
        items = this.paginateItems(items)
      }

      return items
    },
    groupedItems (): Record<string, any[]> | null {
      return this.isGrouped ? this.groupItems(this.computedItems) : null
    },
    scopedProps (): DataScopeProps {
      const props = {
        sort: this.sort,
        sortArray: this.sortArray,
        group: this.group,
        items: this.computedItems,
        options: this.internalOptions,
        updateOptions: this.updateOptions,
        pagination: this.pagination,
        groupedItems: this.groupedItems,
        originalItemsLength: this.items.length,
      }

      return props
    },
    computedOptions (): DataOptions {
      return { ...this.options } as DataOptions
    },
  },

  watch: {
    computedOptions: {
      handler (options: DataOptions, old: DataOptions) {
        if (deepEqual(options, old)) return

        this.updateOptions(options)
      },
      deep: true,
      immediate: true,
    },
    internalOptions: {
      handler (options: DataOptions, old: DataOptions) {
        if (deepEqual(options, old)) return
        this.$emit('update:options', options)
        this.$emit('pagination', this.pagination)
      },
      deep: true,
      immediate: true,
    },
    page (page: number) {
      this.updateOptions({ page })
    },
    'internalOptions.page' (page: number) {
      this.$emit('update:page', page)
    },
    itemsPerPage (itemsPerPage: number) {
      this.updateOptions({ itemsPerPage })
    },
    'internalOptions.itemsPerPage' (itemsPerPage: number) {
      this.$emit('update:items-per-page', itemsPerPage)
    },
    sortBy (sortBy: string | string[]) {
      this.updateOptions({ sortBy: wrapInArray(sortBy) })
    },
    'internalOptions.sortBy' (sortBy: string[], old: string[]) {
      !deepEqual(sortBy, old) && this.$emit('update:sort-by', Array.isArray(this.sortBy) ? sortBy : sortBy[0])
    },
    sortDesc (sortDesc: boolean | boolean[]) {
      this.updateOptions({ sortDesc: wrapInArray(sortDesc) })
    },
    'internalOptions.sortDesc' (sortDesc: boolean[], old: boolean[]) {
      !deepEqual(sortDesc, old) && this.$emit('update:sort-desc', Array.isArray(this.sortDesc) ? sortDesc : sortDesc[0])
    },
    groupBy (groupBy: string | string[]) {
      this.updateOptions({ groupBy: wrapInArray(groupBy) })
    },
    'internalOptions.groupBy' (groupBy: string[], old: string[]) {
      !deepEqual(groupBy, old) && this.$emit('update:group-by', Array.isArray(this.groupBy) ? groupBy : groupBy[0])
    },
    groupDesc (groupDesc: boolean | boolean[]) {
      this.updateOptions({ groupDesc: wrapInArray(groupDesc) })
    },
    'internalOptions.groupDesc' (groupDesc: boolean[], old: boolean[]) {
      !deepEqual(groupDesc, old) && this.$emit('update:group-desc', Array.isArray(this.groupDesc) ? groupDesc : groupDesc[0])
    },
    multiSort (multiSort: boolean) {
      this.updateOptions({ multiSort })
    },
    'internalOptions.multiSort' (multiSort: boolean) {
      this.$emit('update:multi-sort', multiSort)
    },
    mustSort (mustSort: boolean) {
      this.updateOptions({ mustSort })
    },
    'internalOptions.mustSort' (mustSort: boolean) {
      this.$emit('update:must-sort', mustSort)
    },
    pageCount: {
      handler (pageCount: number) {
        this.$emit('page-count', pageCount)
      },
      immediate: true,
    },
    computedItems: {
      handler (computedItems: any[]) {
        this.$emit('current-items', computedItems)
      },
      immediate: true,
    },
  },

  methods: {
    toggle (key: string, oldBy: string[], oldDesc: boolean[], page: number, mustSort: boolean, multiSort: boolean) {
      let by = oldBy.slice()
      let desc = oldDesc.slice()
      const byIndex = by.findIndex((k: string) => k === key)

      if (byIndex < 0) {
        if (!multiSort) {
          by = []
          desc = []
        }

        by.push(key)
        desc.push(false)
      } else if (byIndex >= 0 && !desc[byIndex]) {
        desc[byIndex] = true
      } else if (!mustSort) {
        by.splice(byIndex, 1)
        desc.splice(byIndex, 1)
      } else {
        desc[byIndex] = false
      }

      // Reset page to 1 if sortBy or sortDesc have changed
      if (!deepEqual(by, oldBy) || !deepEqual(desc, oldDesc)) {
        page = 1
      }

      return { by, desc, page }
    },
    group (key: string): void {
      const { by: groupBy, desc: groupDesc, page } = this.toggle(
        key,
        this.internalOptions.groupBy,
        this.internalOptions.groupDesc,
        this.internalOptions.page,
        true,
        false
      )
      this.updateOptions({ groupBy, groupDesc, page })
    },
    sort (key: string | string[]): void {
      if (Array.isArray(key)) return this.sortArray(key)

      const { by: sortBy, desc: sortDesc, page } = this.toggle(
        key,
        this.internalOptions.sortBy,
        this.internalOptions.sortDesc,
        this.internalOptions.page,
        this.mustSort,
        this.multiSort
      )
      this.updateOptions({ sortBy, sortDesc, page })
    },
    sortArray (sortBy: string[]) {
      const sortDesc = sortBy.map(s => {
        const i = this.internalOptions.sortBy.findIndex((k: string) => k === s)
        return i > -1 ? this.internalOptions.sortDesc[i] : false
      })

      this.updateOptions({ sortBy, sortDesc })
    },
    updateOptions (options: any) {
      this.internalOptions = {
        ...this.internalOptions,
        ...options,
        page: this.serverItemsLength < 0
          ? Math.max(1, Math.min(options.page || this.internalOptions.page, this.pageCount))
          : options.page || this.internalOptions.page,
      }
    },
    sortItems (items: any[]) {
      const sortBy = this.internalOptions.groupBy.concat(this.internalOptions.sortBy)
      const sortDesc = this.internalOptions.groupDesc.concat(this.internalOptions.sortDesc)
      return this.customSort(items, sortBy, sortDesc, this.locale)
    },
    groupItems (items: any[]) {
      return this.customGroup(items, this.internalOptions.groupBy, this.internalOptions.groupDesc)
    },
    paginateItems (items: any[]) {
      // Make sure we don't try to display non-existant page if items suddenly change
      // TODO: Could possibly move this to pageStart/pageStop?
      if (this.serverItemsLength === -1 && items.length <= this.pageStart) {
        this.internalOptions.page = Math.max(1, this.internalOptions.page - 1)
      }

      return items.slice(this.pageStart, this.pageStop)
    },
  },

  render (): VNode {
    return this.$scopedSlots.default && this.$scopedSlots.default(this.scopedProps) as any
  },
})
