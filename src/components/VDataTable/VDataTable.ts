// import '../../stylus/components/_tables.styl'
import '../../stylus/components/_data-table.styl'

import VDataIterator from '../VDataIterator'
import VTableHeaders from './VTableHeaders'
import VTableActions from './VTableActions'
import VRowGroup from './VRowGroup'
import VTableProgress from './VTableProgress'
import VRow from './VRow'
import VCell from './VCell'

import { groupByProperty, getObjectValueByPath } from '../../util/helpers'
import mixins from '../../util/mixins'
import { VNode, CreateElement, VNodeData, VNodeChildrenArrayContents } from 'vue'
import { PropValidator } from 'vue/types/options'

export interface TableHeader {
  text: string
  value: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  class?: string | string[]
  width?: string | number
  filter?: (v: any) => boolean
  type?: 'select-all'
  sort?: (a: any, b: any) => number
}

const VDataTable = mixins(VDataIterator).extend({
  name: 'v-data-table',

  inheritAttrs: false,

  provide () {
    const dataTable = {}

    Object.defineProperties(dataTable, {
      headers: { get: () => this.headers },
      loading: { get: () => this.loading },
      isFlexWidth: { get: () => this.isFlexWidth },
      widths: { get: () => this.widths },
      isPixelWidth: { get: () => this.isPixelWidth },
      tableWidth: { get: () => this.tableWidth },
      showSelectAll: { get: () => this.showSelectAll }
    })

    return { dataTable }
  },

  props: {
    customSort: {
      type: Function,
      default: (items: any[], sortBy: string[], sortDesc: boolean[], headers: Record<string, TableHeader>): any[] => {
        if (sortBy === null) return items

        return items.sort((a: any, b: any): number => {
          for (let i = 0; i < sortBy.length; i++) {
            const sortKey = sortBy[i]

            let sortA = getObjectValueByPath(a, sortKey)
            let sortB = getObjectValueByPath(b, sortKey)

            if (sortDesc[i]) {
              [sortA, sortB] = [sortB, sortA]
            }

            if (headers[sortKey]) return headers[sortKey].sort!(sortA, sortB)

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
    dense: Boolean,
    groupBy: String,
    headers: Array as PropValidator<TableHeader[]>,
    height: String,
    hideActions: Boolean,
    hideHeader: Boolean,
    loading: Boolean,
    showSelectAll: Boolean,
    static: Boolean
  },

  computed: {
    tableWidth (): string | number | null {
      return this.isPixelWidth ? this.widths.reduce((acc, curr) => Number(acc) + Number(String(curr).slice(0, -2)), 0) : null
    },
    isFlexWidth (): boolean {
      return this.static ? false : this.headers.some((h: TableHeader) => !!h.width && !isNaN(Number(h.width)))
    },
    isPixelWidth (): boolean {
      return this.static ? false : this.headers.some((h: TableHeader) => !!h.width && String(h.width).indexOf('px') >= 0)
    },
    widths (): (string | number | null)[] {
      return this.static ? [] : this.headers.map((h: TableHeader) => h.width || (this.isFlexWidth && h.type !== 'select-all' ? 1 : null))
    },
    headersWithCustomSort (): Record<string, TableHeader> {
      const headers: Record<string, TableHeader> = {}
      for (let i = 0; i < this.headers.length; i++) {
        const header = this.headers[i]
        if (header.sort) headers[header.value] = header
      }
      return headers
    }
  },

  created () {
    if (typeof this.sortBy === 'undefined') {
      const firstSortable = this.headers.find(h => !('sortable' in h) || !!h.sortable)
      if (firstSortable) this.options.sortBy = [firstSortable.value]
    }
  },

  methods: {
    searchItems (items: any[]): any[] {
      // If we have column-specific filters, run them here
      // Right now an item has to pass all filters, this might not be ideal
      const filterableHeaders = this.headers.filter(h => !!h.filter)
      if (filterableHeaders.length) {
        items = items.filter(i => filterableHeaders.every(h => h.filter!(i[h.value])))
        this.searchItemsLength = items.length
      }

      items = VDataIterator.options.methods.searchItems.call(this, items)

      return items
    },
    sortItems (items: any[], sortBy: string[], sortDesc: boolean[]): any[] {
      sortBy = this.groupBy ? [this.groupBy, ...sortBy] : sortBy
      sortDesc = this.groupBy ? [false, ...sortDesc] : sortDesc

      return this.customSort(items, sortBy, sortDesc, this.headersWithCustomSort)
    },
    genHeaders (h: CreateElement): VNodeChildrenArrayContents {
      const headers = this.computeSlots('header')

      if (!this.hideHeader && !this.static) {
        headers.push(h(VTableHeaders, {
          props: {
            showSelectAll: this.showSelectAll
          }
        }))
        headers.push(h(VTableProgress))
      }

      return headers
    },
    genItems (h: CreateElement): VNodeChildrenArrayContents {
      const items = []

      if (this.$scopedSlots.item) {
        if (this.groupBy) {
          items.push(this.genGroupedRows(h, this.computedItems, this.groupBy))
        } else {
          items.push(this.genRows(this.computedItems))
        }
      }

      return items
    },
    genRows (items: any[]): VNodeChildrenArrayContents {
      return items.map((item: any) => this.$scopedSlots.item(this.createItemProps(item)))
    },
    genGroupedRows (h: CreateElement, items: any[], groupBy: string): VNodeChildrenArrayContents {
      const grouped = groupByProperty(items, groupBy)
      const groups = Object.keys(grouped)

      const rows: VNodeChildrenArrayContents = []
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i]

        rows.push(
          this.$scopedSlots.group
            ? this.$scopedSlots.group({ groupBy, group, items: grouped[group] })
            : h(VRowGroup, {
              key: `${group}_${i}`
            }, [
              h('span', { slot: 'cell' }, [group]),
              h('template', { slot: 'expansion' }, this.genRows(grouped[group]))
            ])
        )
      }

      return rows
    },
    genFooters (h: CreateElement): VNodeChildrenArrayContents {
      const footers = this.computeSlots('footer')

      if (!this.hideActions && !this.static) {
        footers.push(h(VTableActions, {
          props: {
            rowsPerPageItems: this.rowsPerPageItems
          },
          on: {
            'update:page': (v: number) => this.options.page = v,
            'update:rowsPerPage': (v: number) => this.options.rowsPerPage = v
          }
        }))
      }

      return footers
    },
    genBodies (h: CreateElement) {
      if (this.static) return this.$slots.default
      else return VDataIterator.options.methods.genBodies.call(this, h)
    },
    genBodyWrapper (h: CreateElement, items: any[]) {
      return h('div', {
        staticClass: 'v-data-table__body',
        class: {
          'v-data-table__body--fixed': !!this.height
        },
        style: {
          height: this.height
        }
      }, items)
    },
    genEmpty (h: CreateElement, content: VNodeData) {
      return h(VRow, [h(VCell, content)])
    }
  },

  render (h): VNode {
    const children: VNodeChildrenArrayContents = [
      ...this.genHeaders(h),
      this.genBodies(h),
      ...this.genFooters(h)
    ]

    return h('div', {
      staticClass: 'v-data-table',
      class: {
        'v-data-table--dense': this.dense,
        'v-data-table--fixed': !!this.height,
        ...this.themeClasses
      }
    }, children)
  }
})

export type DataTableProvide = Pick<InstanceType<typeof VDataTable>,
  'headers' | 'loading' | 'isFlexWidth' | 'isPixelWidth' | 'widths' | 'tableWidth' | 'showSelectAll'>

export default VDataTable
