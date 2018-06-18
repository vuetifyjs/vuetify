import '../../stylus/components/_tables.styl'
import '../../stylus/components/_data-table.styl'

import VDataIterator from '../VDataIterator'
import VTableHeaders from './VTableHeaders'
import VTableActions from './VTableActions'
import VRowGroup from './VRowGroup'
import VTableProgress from './VTableProgress'
import VRow from './VRow'
import VCell from './VCell'

import { groupByProperty } from '../../util/helpers'
import mixins from '../../util/mixins'
import { VNode, CreateElement, VNodeData, VNodeChildren, VNodeChildrenArrayContents } from 'vue'
import { PropValidator } from 'vue/types/options'

export interface TableHeader {
  text: string
  value: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  class?: string | string[]
  width?: string | number | null
  filter?: (v: any) => boolean
}

export default mixins(VDataIterator).extend({
  name: 'v-data-table',

  inheritAttrs: false,

  provide () {
    const dataTable = {}

    Object.defineProperty(dataTable, 'headers', {
      get: () => this.headers,
      enumerable: true
    })

    Object.defineProperty(dataTable, 'loading', {
      get: () => this.loading,
      enumerable: true
    })

    Object.defineProperty(dataTable, 'isFlexWidth', {
      get: () => this.isFlexWidth
    })

    Object.defineProperty(dataTable, 'widths', {
      get: () => this.widths
    })

    return { dataTable }
  },

  props: {
    static: Boolean,
    headers: Array as PropValidator<TableHeader[]>,
    showSelectAll: Boolean,
    hideActions: Boolean,
    hideHeader: Boolean,
    groupBy: String,
    fixedHeight: String,
    loading: Boolean
  },

  computed: {
    isFlexWidth (): boolean {
      return this.static ? false : this.headers.some((h: TableHeader) => !!h.width && !isNaN(Number(h.width)))
    },
    widths (): any[] {
      return this.static ? [] : this.headers.map((h: TableHeader) => h.width || (this.isFlexWidth ? 1 : null))
    }
  },

  methods: {
    searchItems (items: any[]) {
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
    sortItems (items: any[], sortBy: string[], sortDesc: boolean[]) {
      sortBy = this.groupBy ? [this.groupBy, ...sortBy] : sortBy
      sortDesc = this.groupBy ? [false, ...sortDesc] : sortDesc

      return VDataIterator.options.methods.sortItems.call(this, items, sortBy, sortDesc)
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
          items.push(this.genBodyWrapper(h, this.genGroupedRows(h, this.computedItems, this.groupBy)))
        } else {
          items.push(this.genBodyWrapper(h, this.genRows(this.computedItems)))
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

      const rows = []
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
            itemsLength: this.itemsLength,
            pageStart: this.pageStart,
            pageStop: this.pageStop,
            page: this.options.page,
            rowsPerPage: this.options.rowsPerPage,
            rowsPerPageItems: this.rowsPerPageItems
          },
          on: {
            'update:page': (v: number) => this.options.page = v,
            'update:rowsPerPage': (v: number) => this.options.rowsPerPage = v
          }
        }))
      }

      return [this.genBodyWrapper(h, footers)]
    },
    genBodies (h: CreateElement): VNodeChildrenArrayContents {
      if (this.static) return this.$slots.default

      return VDataIterator.options.methods.genBodies.call(this, h)
    },
    genBodyWrapper (h: CreateElement, items: VNode[]): VNode {
      return h('div', {
        staticClass: 'v-table__body',
        class: {
          'v-table__body--fixed': this.fixedHeight
        },
        style: {
          height: this.fixedHeight
        }
      }, items)
    },
    genEmpty (h: CreateElement, content: VNodeData): VNode {
      return h(VRow, [h(VCell, content)])
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-table v-data-table'
    }, [
      ...this.genHeaders(h),
      ...this.genBodies(h),
      ...this.genFooters(h)
    ])
  }
})
