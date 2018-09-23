import '../../stylus/components/_data-table.styl'

// Components
import { VDataHeader, VRowFunctional, VRowGroup, VDataHeaderMobile } from '.'
import { VDataIterator } from '../VDataIterator'

// Utils
import { getObjectValueByPath, wrapInArray, groupByProperty, convertToUnit } from '../../util/helpers'

// Types
import { VNodeChildrenArrayContents, VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import mixins from '../../util/mixins'
import VCellCheckbox from './VCellCheckbox'
import { VBtn } from '../VBtn'
import { VIcon } from '../VIcon'

export interface TableHeader {
  text: string
  value: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  resizable?: boolean
  divider?: boolean
  class?: string | string[]
  width?: string | number
  type?: 'showExpand' | 'showSelect'
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
      default: (items: any[], sortBy: string[], sortDesc: boolean[], locale: string, headers: Record<string, TableHeader>): any[] => {
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

            [sortA, sortB] = [sortA, sortB].map(s => (s || '').toString())

            if (sortA !== sortB) {
              if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB)
              // if (sortA > sortB) return 1
              // if (sortA < sortB) return -1
              return sortA.localeCompare(sortB, locale)
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
    hideDefaultHeader: Boolean,
    loading: Boolean,
    showSelect: Boolean,
    static: Boolean,
    calculateWidths: Boolean,
    caption: String,
    showExpand: Boolean
  },

  data () {
    return {
      openCache: {} as { [key: string]: boolean },
      widths: [] as number[],
      options: {
        sortBy: wrapInArray(this.sortBy),
        sortDesc: wrapInArray(this.sortDesc),
        itemsPerPage: this.itemsPerPage,
        page: this.page,
        groupBy: this.groupBy
      } // TODO: Better way than to reproduce this whole object?
    }
  },

  computed: {
    headersWithCustomSort (): Record<string, TableHeader> {
      const headers: Record<string, TableHeader> = {}
      for (let i = 0; i < this.headers.length; i++) {
        const header = this.headers[i]
        if (header.sort) headers[header.value] = header
      }
      return headers
    },
    computedHeaders (): TableHeader[] {
      const headers = this.headers.filter(h => h.value === undefined || h.value !== this.options.groupBy)

      if (this.showSelect) {
        headers.unshift({ text: '', value: 'dataTable.select', sortable: false, width: '1px' })
      }

      if (this.showExpand) {
        headers.unshift({ text: '', value: 'dataTable.expand', sortable: false, width: '1px' })
      }

      return headers
    },
    headersLength () {
      return this.computedHeaders.length
    },
    computedWidths (): (string | undefined)[] {
      return this.computedHeaders.map((h, i) => {
        return convertToUnit(h.width || this.widths[i])
      })
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
    }

    this.calcWidths()
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
    sortItems (items: any[], sortBy: string[], sortDesc: boolean[], locale: string): any[] {
      sortBy = this.options.groupBy ? [this.options.groupBy, ...sortBy] : sortBy
      sortDesc = this.options.groupBy ? [false, ...sortDesc] : sortDesc

      return this.customSort(items, sortBy, sortDesc, locale, this.headersWithCustomSort)
    },
    createSlotProps () {
      return { items: this.computedItems, widths: this.widths }
    },
    genRow (data: any, content: string | VNodeChildrenArrayContents) {
      return this.$createElement('tr', data, content)
    },
    genHeaders (): VNodeChildrenArrayContents {
      const headers = this.computeSlots('header')

      if (!this.hideDefaultHeader && !this.static) {
        headers.push(this.$createElement(this.isMobile ? VDataHeaderMobile : VDataHeader))
      }

      return headers
    },
    genItems (): VNodeChildrenArrayContents | VNode {
      const items: any[] = []

      if (this.options.groupBy) {
        items.push(this.genGroupedRows(this.computedItems, this.options.groupBy))
      } else {
        items.push(this.genRows(this.computedItems))
      }

      return this.genBodyWrapper(items)
    },
    genDefaultRows (items: any[]): VNodeChildrenArrayContents {
      return items.map(item => {
        const scopedSlots: any = Object.keys(this.$scopedSlots).filter(k => k.startsWith('item.column.')).reduce((obj: any, k: string) => {
          obj[k] = this.$scopedSlots[k]
          return obj
        }, {})
        const children = []

        if (this.showSelect) {
          scopedSlots['item.column.dataTable.select'] = (props: any) => this.$createElement(VCellCheckbox, {
            props: {
              inputValue: this.isSelected(item)
            },
            on: {
              change: (v: any) => this.select(item, v)
            }
          })
        }

        const expanded = this.isExpanded(item)

        if (this.showExpand) {
          scopedSlots['item.column.dataTable.expand'] = (props: any) => this.$createElement(VIcon, {
            staticClass: 'expand__icon',
            class: {
              'expand__icon--active': expanded
            },
            on: {
              click: () => this.expand(item, !expanded)
            }
          }, [this.$vuetify.icons.expand]) // TODO: prop?
        }

        const itemExpanded = this.$scopedSlots['item.expanded']

        if (expanded && itemExpanded) {
          children.push(this.$createElement('tr', {
            staticClass: 'expanded expanded__content'
          }, [itemExpanded({ item, headers: this.computedHeaders })]))
        }

        return this.$createElement(VRowFunctional, {
          class: {
            'expanded expanded__row': expanded
          },
          props: {
            headers: this.computedHeaders,
            item,
            mobile: this.isMobile
          },
          scopedSlots
        }, children)
      })
    },
    genScopedRows (items: any[]): VNodeChildrenArrayContents {
      return items.map((item: any, i: number) => {
        const props = this.createItemProps(item)
        props.headers = this.computedHeaders
        return this.$scopedSlots.item(props)
      })
    },
    genRows (items: any[]): VNodeChildrenArrayContents {
      return this.$scopedSlots.item ? this.genScopedRows(items) : this.genDefaultRows(items)
    },
    genDefaultGroupedRow (groupBy: string, group: string, items: any[]) {
      const open = !!this.openCache[group]

      const toggle = this.$createElement(VBtn, {
        staticClass: 'ma-0',
        props: {
          icon: true,
          small: true
        },
        on: {
          click: () => this.$set(this.openCache, group, !this.openCache[group])
        }
      }, [this.$createElement(VIcon, [open ? 'remove' : 'add'])])

      const remove = this.$createElement(VBtn, {
        staticClass: 'ma-0',
        props: {
          icon: true,
          small: true
        },
        on: {
          click: () => this.options.groupBy = ''
        }
      }, [this.$createElement(VIcon, ['close'])])

      const column = this.$createElement('td', {
        staticClass: 'text-xs-left',
        attrs: {
          colspan: this.headersLength
        }
      }, [toggle, `${groupBy}: ${group}`, remove])

      return this.$createElement(VRowGroup, {
        props: {
          open
        }
      }, [
        this.$createElement('tr', { slot: 'header', staticClass: 'v-row-group__header' }, [column]),
        this.$createElement('template', { slot: 'content' }, this.genDefaultRows(items))
      ])
    },
    genGroupedRows (items: any[], groupBy: string): VNodeChildrenArrayContents {
      const grouped = groupByProperty(items, groupBy)
      const groups = Object.keys(grouped)

      // TODO: Better way to do this? Sorting on group
      const i = this.options.sortBy.findIndex(v => v === groupBy)
      if (i > -1 && this.options.sortDesc[i]) {
        groups.reverse()
      }

      const rows: VNodeChildrenArrayContents = []
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i]

        if (!this.openCache.hasOwnProperty(group)) this.$set(this.openCache, group, true)

        if (this.$scopedSlots.group) {
          rows.push(this.$scopedSlots.group({
            groupBy,
            group,
            items: grouped[group],
            colspan: this.headersLength,
            headers: this.computedHeaders
          }))
        } else {
          rows.push(this.genDefaultGroupedRow(groupBy, group, grouped[group]))
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
    genEmpty (content: VNodeChildrenArrayContents) {
      return this.$createElement('tr', [this.$createElement('td', { attrs: { colspan: this.headersLength } }, content)])
    },
    genColGroup () {
      const cols = this.computedHeaders.map((h, i) => this.$createElement('col', {
        class: {
          'divider': h.divider || h.resizable,
          'resizable': h.resizable
        },
        style: {
          width: this.computedWidths[i]
        }
      }))

      return this.$createElement('colgroup', cols)
    },
    genTable () {
      const children: VNodeChildrenArrayContents = []

      children.push(this.genColGroup(), ...this.genHeaders())

      children.push(...this.genBodies())

      if (this.caption) {
        children.unshift(this.$createElement('caption', [this.caption]))
      }

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
        'v-data-table--mobile': this.isMobile,
        ...this.themeClasses
      }
    }, children)
  }
})
