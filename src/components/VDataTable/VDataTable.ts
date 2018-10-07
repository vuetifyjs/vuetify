import '../../stylus/components/_data-table.styl'

// Components
import { VTable, VTableVirtual } from '.'
import { VDataIterator } from '../VDataIterator'

// Utils
import { getObjectValueByPath, convertToUnit, computeSlots } from '../../util/helpers'

// Types
import Vue, { VNodeChildrenArrayContents, VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import mixins from '../../util/mixins'
import TableHeader from './TableHeader'

// Helpers
import { defaultSort } from './helpers'
import VTableRegular from './VTableRegular'

export default mixins(VDataIterator).extend({
  name: 'v-data-table',

  inheritAttrs: false,

  provide (): any {
    return { dataTable: this } // TODO: only provide used things
  },

  props: {
    customSort: {
      type: Function,
      default: defaultSort
    },
    dense: Boolean,
    groupBy: String,
    headers: {
      type: Array,
      default: () => ([])
    } as PropValidator<TableHeader[]>,
    height: [String, Number],
    hideDefaultHeader: Boolean,
    loading: Boolean,
    showSelect: Boolean,
    static: Boolean,
    calculateWidths: Boolean,
    caption: String,
    showExpand: Boolean,
    virtualRows: Boolean
  },

  data () {
    return {
      openCache: {} as { [key: string]: boolean },
      widths: [] as number[],
      options: {
        groupBy: this.groupBy
      },
      scrollTop: 0
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

      this.showSelect && headers.unshift({ text: '', value: 'dataTableSelect', sortable: false, width: '1px' })
      this.showExpand && headers.unshift({ text: '', value: 'dataTableExpand', sortable: false, width: '1px' })

      return headers
    },
    computedWidths (): (string | undefined)[] {
      return this.computedHeaders.map((h, i) => {
        return convertToUnit(h.width || this.widths[i])
      })
    },
    isMobile (): boolean {
      return !!this.$vuetify.breakpoint[this.mobileBreakpoint]
    }
  },

  mounted () {
    if ((!this.sortBy || !this.sortBy.length) && (!this.options.sortBy || !this.options.sortBy.length)) {
      const firstSortable = this.headers.find(h => !('sortable' in h) || !!h.sortable)
      if (firstSortable) this.updateOptions({ sortBy: [firstSortable.value], sortDesc: [false] })
    }

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
      let table: Element
      if (this.$refs.table instanceof Vue) {
        table = (this.$refs.table as Vue).$el
      } else {
        table = this.$refs.table as Element
      }

      this.widths = Array.from(table.querySelectorAll('th')).map(e => e.clientWidth)
    },
    searchItems (items: any[]): any[] {
      // If we have column-specific filters, run them here
      // Right now an item has to pass all filters, this might not be ideal
      const filterableHeaders = this.headers.filter(h => !!h.filter)
      if (filterableHeaders.length) {
        items = items.filter(i => filterableHeaders.every(h => h.filter!(getObjectValueByPath(i, h.value), this.search, i)))
        this.searchItemsLength = items.length
      }

      return VDataIterator.options.methods.searchItems.call(this, items)
    },
    sortItems (items: any[], sortBy: string[], sortDesc: boolean[], locale: string): any[] {
      sortBy = this.options.groupBy ? [this.options.groupBy, ...sortBy] : sortBy
      sortDesc = this.options.groupBy ? [false, ...sortDesc] : sortDesc

      return this.customSort(items, sortBy, sortDesc, locale, this.headersWithCustomSort)
    },
    createItemProps (item: any) {
      const props = VDataIterator.options.methods.createItemProps.call(this, item)
      props.headers = this.computedHeaders

      return props
    },
    createSlotProps () {
      const props = VDataIterator.options.methods.createSlotProps.call(this)
      props.headers = this.computedHeaders
      props.widths = this.computedWidths

      return props
    },
    genEmptyWrapper (content: VNodeChildrenArrayContents) {
      return this.$createElement('tr', [this.$createElement('td', { attrs: { colspan: this.computedHeaders.length } }, content)])
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
      const children = [
        this.$createElement('template', { slot: 'prepend' }, [this.genColGroup()])
      ]

      this.caption && children.unshift(this.$createElement('template', { slot: 'prepend' }, [this.$createElement('caption', [this.caption])]))

      if (this.static) {
        return this.$createElement(VTable, {
          ref: 'table'
        }, children.concat(...this.$slots.default))
      }

      if (this.virtualRows) {
        return this.$createElement(VTableVirtual, {
          ref: 'table',
          scopedSlots: this.$scopedSlots
        }, children)
      }

      return this.$createElement(VTableRegular, {
        ref: 'table',
        scopedSlots: this.$scopedSlots
      }, children)
    }
  },

  render (h): VNode {
    const children: VNodeChildrenArrayContents = [this.genTable()]

    if (!this.static) {
      const footers = computeSlots(this, 'footer', this.createSlotProps())
      children.push(...footers, ...this.genFooter())
    }

    return h('div', {
      staticClass: 'v-data-table',
      class: {
        'v-data-table--dense': this.dense,
        // 'v-data-table--fixed': !!this.height,
        'v-data-table--mobile': this.isMobile,
        ...this.themeClasses
      }
    }, children)
  }
})
