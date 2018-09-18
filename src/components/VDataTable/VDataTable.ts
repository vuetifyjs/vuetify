import '../../stylus/components/_data-table.styl'

// Components
import { VDataIterator } from '../VDataIterator'
import { VDataHeader, VRowGroup, VRowSimple } from '.'

// Utils
import { getObjectValueByPath, wrapInArray, groupByProperty } from '../../util/helpers'

// Types
import { VNodeChildrenArrayContents, VNode, VNodeData } from 'vue'
import { PropValidator } from 'vue/types/options'
import mixins from '../../util/mixins'
import VCellCheckbox from './VCellCheckbox'

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
    hideHeader: Boolean,
    loading: Boolean,
    showSelect: Boolean,
    static: Boolean,
    calculateWidths: Boolean
  },

  data: () => ({
    openCache: {} as { [key: string]: boolean },
    widths: [] as number[]
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

  mounted () {
    if (this.calculateWidths) {
      window.addEventListener('resize', this.calcWidths)
      this.calcWidths()
    }
  },

  beforeDestroy () {
    if (this.calculateWidths) {
      window.removeEventListener('resize', this.calcWidths)
    }
  },

  methods: {
    calcWidths () {
      const table = this.$refs.table as Element
      this.widths = Array.from(table.querySelectorAll('th')).map(e => e.clientWidth)
    },
    searchItems (items: any[]): any[] {
      // If we have column-specific filters, run them here
      // Right now an item has to pass all filters, this might not be ideal
      const filterableHeaders = this.headers.filter(h => !!h.filter)
      if (filterableHeaders.length) {
        items = items.filter(i => filterableHeaders.every(h => h.filter!(getObjectValueByPath(i, h.value))))
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
            showSelect: this.showSelect
          }
        }))
        // headers.push(h(VTableProgress))
      }

      return headers
    },
    genItems (): VNodeChildrenArrayContents | VNode {
      const items: any[] = []

      if (this.groupBy) {
        items.push(this.genGroupedRows(this.computedItems, this.groupBy))
      } else {
        items.push(this.genRows(this.computedItems))
      }

      return this.genBodyWrapper(items)
    },
    genDefaultRows (items: any[]): VNodeChildrenArrayContents {
      return items.map(item => {
        const children = []
        if (this.showSelect) {
          children.push(this.$createElement(VCellCheckbox, {
            slot: 'select',
            props: {
              inputValue: this.isSelected(item)
            },
            on: {
              change: (v: any) => this.select(item, v)
            }
          }))
        }

        return this.$createElement(VRowSimple, {
          props: {
            item,
            headers: this.headers
          }
        }, children)
      })
    },
    genScopedRows (items: any[]): VNodeChildrenArrayContents {
      return items.map((item: any, i: number) => {
        const row = this.$scopedSlots.item(this.createItemProps(item)) as any

        if (this.hasRow(row)) return row
        else return this.genRow({ key: getObjectValueByPath(item, this.itemKey) }, row)
      })
    },
    genRows (items: any[]): VNodeChildrenArrayContents {
      if (this.$scopedSlots.item) {
        return this.genScopedRows(items)
      } else {
        return this.genDefaultRows(items)
      }
    },
    genDefaultGroupedRow (group: string, items: any[]) {
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
        this.$createElement('template', { slot: 'items' }, this.genDefaultRows(items))
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
          rows.push(this.genDefaultGroupedRow(group, grouped[group]))
        }
      }

      return rows
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
      }, [this.$createElement('table', { ref: 'table' }, children)])
    }
  },

  render (h): VNode {
    const children: VNodeChildrenArrayContents = [this.genTable()]

    if (!this.static) children.push(...this.computeSlots('footer'), ...this.genFooter())

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
