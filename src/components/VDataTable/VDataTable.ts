import '../../stylus/components/_data-table.styl'

// Components
import { VDataIterator, VDataFooter } from '../VDataIterator'
import { VDataHeader, VRowGroup } from '.'

// Utils
import { getObjectValueByPath, wrapInArray, groupByProperty } from '../../util/helpers'

// Types
import { VNodeChildrenArrayContents, VNode, VNodeData } from 'vue'
import { PropValidator } from 'vue/types/options'
import mixins from '../../util/mixins'

export interface TableHeader {
  text: string
  value: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  class?: string | string[]
  width?: string | number
  type?: 'select-all'
  filter?: (v: any) => boolean
  sort?: (a: any, b: any) => number
}

export default mixins(VDataIterator).extend({
  name: 'v-data-table',

  inheritAttrs: false,

  provide (): any {
    return { dataTable: this }
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
    headers: {
      type: Array,
      default: () => ([])
    } as PropValidator<TableHeader[]>,
    height: String,
    hideActions: Boolean,
    hideHeader: Boolean,
    loading: Boolean,
    showSelectAll: Boolean,
    static: Boolean
  },

  data: () => ({
    openCache: {} as { [key: string]: boolean }
  }),

  computed: {
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
    if (!this.sortBy || !this.sortBy.length) {
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
    hasRow (content: string | VNodeChildrenArrayContents) {
      content = wrapInArray(content)
      return content.some((el: any) => {
        // return el.componentOptions && el.componentOptions.tag === 'v-row'
        return el.tag === 'tr'
      })
    },
    genRow (data: any, content: string | VNodeChildrenArrayContents) {
      return this.$createElement('tr', data, content)
    },
    genHeaders (): VNodeChildrenArrayContents {
      const headers = this.computeSlots('header')

      if (!this.hideHeader && !this.static) {
        headers.push(this.$createElement(VDataHeader, {
          props: {
            showSelectAll: this.showSelectAll
          }
        }))
        // headers.push(h(VTableProgress))
      }

      return headers
    },
    genItems (): VNodeChildrenArrayContents | VNode {
      const items: any[] = []

      if (this.$scopedSlots.item) {
        if (this.groupBy) {
          items.push(this.genGroupedRows(this.computedItems, this.groupBy))
        } else {
          items.push(this.genRows(this.computedItems))
        }
      }

      return this.genBodyWrapper(items)
    },
    genRows (items: any[]): VNodeChildrenArrayContents {
      return items.map((item: any, i: number) => {
        const row = this.$scopedSlots.item(this.createItemProps(item)) as any

        if (this.hasRow(row)) return row
        else return this.genRow({ key: getObjectValueByPath(item, this.itemKey) }, row)
      })
    },
    genGroupedRow (group: string, items: any[]) {
      return this.$createElement(VRowGroup, {
        props: {
          open: !!this.openCache[group]
        }
      }, [
        this.$createElement('tr', { slot: 'header', staticClass: 'v-row-group__header' }, [
          this.$createElement('td', {
            on: {
              click: () => this.$set(this.openCache, group, !this.openCache[group])
            }
          }, ['toggle']),
          this.$createElement('td', { attrs: { colspan: this.headers.length } }, [group])
        ]),
        this.$createElement('template', { slot: 'items' }, this.genRows(items))
      ])
    },
    genGroupedRows (items: any[], groupBy: string): VNodeChildrenArrayContents {
      const grouped = groupByProperty(items, groupBy)
      const groups = Object.keys(grouped)

      const rows: VNodeChildrenArrayContents = []
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i]

        if (!this.openCache.hasOwnProperty(group)) this.$set(this.openCache, group, true)

        if (this.$scopedSlots.group) {
          rows.push(this.$scopedSlots.group({ groupBy, group, items: grouped[group] }))
        } else {
          rows.push(this.genGroupedRow(group, grouped[group]))
        }
      }

      return rows
    },
    genFooters (): VNodeChildrenArrayContents {
      const footers = this.computeSlots('footer')

      if (!this.hideActions && !this.static) {
        footers.push(this.$createElement(VDataFooter, {
          props: {
            itemsPerPageOptions: this.itemsPerPageOptions
          }
        }))
      }

      return footers
    },
    genBodies () {
      if (this.static) return this.$slots.default
      else return VDataIterator.options.methods.genBodies.call(this)
    },
    genBodyWrapper (items: any[]) {
      return this.$createElement('tbody', {
        staticClass: 'v-data-table__body'
      }, items)
    },
    genEmpty (content: VNodeData) {
      return this.$createElement('tr', [this.$createElement('td', content)])
    },
    genTable () {
      const children: VNodeChildrenArrayContents = [
        ...this.genHeaders(),
        ...this.genBodies()
      ]

      return this.$createElement('div', {
        staticClass: 'v-data-table__wrapper',
        style: {
          height: this.height
        }
      }, [this.$createElement('table', children)])
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-data-table',
      class: {
        'v-data-table--dense': this.dense,
        'v-data-table--fixed': !!this.height,
        ...this.themeClasses
      }
    }, [
      this.genTable(),
      ...this.genFooters()
    ])
  }
})
