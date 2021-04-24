import './VDataTable.sass'

// Types
import { VNode, VNodeChildrenArrayContents, VNodeChildren } from 'vue'
import { PropValidator } from 'vue/types/options'
import {
  DataTableHeader,
  DataTableFilterFunction,
  DataScopeProps,
  DataOptions,
  DataPagination,
  DataTableCompareFunction,
  DataItemsPerPageOption,
  ItemGroup,
  RowClassFunction,
  DataTableItemProps,
} from 'vuetify/types'

// Components
import { VData } from '../VData'
import { VDataFooter, VDataIterator } from '../VDataIterator'
import VBtn from '../VBtn'
import VDataTableHeader from './VDataTableHeader'
// import VVirtualTable from './VVirtualTable'
import VIcon from '../VIcon'
import Row from './Row'
import RowGroup from './RowGroup'
import VSimpleCheckbox from '../VCheckbox/VSimpleCheckbox'
import VSimpleTable from './VSimpleTable'
import MobileRow from './MobileRow'

// Mixins
import Loadable from '../../mixins/loadable'

// Directives
import ripple from '../../directives/ripple'

// Helpers
import mixins from '../../util/mixins'
import { deepEqual, getObjectValueByPath, getPrefixedScopedSlots, getSlot, defaultFilter, camelizeObjectKeys, getPropertyFromItem } from '../../util/helpers'
import { breaking } from '../../util/console'
import { mergeClasses } from '../../util/mergeData'

function filterFn (item: any, search: string | null, filter: DataTableFilterFunction) {
  return (header: DataTableHeader) => {
    const value = getObjectValueByPath(item, header.value)
    return header.filter ? header.filter(value, search, item) : filter(value, search, item)
  }
}

function searchTableItems (
  items: any[],
  search: string | null,
  headersWithCustomFilters: DataTableHeader[],
  headersWithoutCustomFilters: DataTableHeader[],
  customFilter: DataTableFilterFunction
) {
  search = typeof search === 'string' ? search.trim() : null

  return items.filter(item => {
    // Headers with custom filters are evaluated whether or not a search term has been provided.
    // We need to match every filter to be included in the results.
    const matchesColumnFilters = headersWithCustomFilters.every(filterFn(item, search, defaultFilter))

    // Headers without custom filters are only filtered by the `search` property if it is defined.
    // We only need a single column to match the search term to be included in the results.
    const matchesSearchTerm = !search || headersWithoutCustomFilters.some(filterFn(item, search, customFilter))

    return matchesColumnFilters && matchesSearchTerm
  })
}

/* @vue/component */
export default mixins(
  VDataIterator,
  Loadable,
).extend({
  name: 'v-data-table',

  // https://github.com/vuejs/vue/issues/6872
  directives: {
    ripple,
  },

  props: {
    headers: {
      type: Array,
      default: () => [],
    } as PropValidator<DataTableHeader[]>,
    showSelect: Boolean,
    checkboxColor: String,
    showExpand: Boolean,
    showGroupBy: Boolean,
    // TODO: Fix
    // virtualRows: Boolean,
    height: [Number, String],
    hideDefaultHeader: Boolean,
    caption: String,
    dense: Boolean,
    headerProps: Object,
    calculateWidths: Boolean,
    fixedHeader: Boolean,
    headersLength: Number,
    expandIcon: {
      type: String,
      default: '$expand',
    },
    customFilter: {
      type: Function,
      default: defaultFilter,
    } as PropValidator<typeof defaultFilter>,
    itemClass: {
      type: [String, Function],
      default: () => '',
    } as PropValidator<RowClassFunction | string>,
    loaderHeight: {
      type: [Number, String],
      default: 4,
    },
  },

  data () {
    return {
      internalGroupBy: [] as string[],
      openCache: {} as { [key: string]: boolean },
      widths: [] as number[],
    }
  },

  computed: {
    computedHeaders (): DataTableHeader[] {
      if (!this.headers) return []
      const headers = this.headers.filter(h => h.value === undefined || !this.internalGroupBy.find(v => v === h.value))
      const defaultHeader = { text: '', sortable: false, width: '1px' }

      if (this.showSelect) {
        const index = headers.findIndex(h => h.value === 'data-table-select')
        if (index < 0) headers.unshift({ ...defaultHeader, value: 'data-table-select' })
        else headers.splice(index, 1, { ...defaultHeader, ...headers[index] })
      }

      if (this.showExpand) {
        const index = headers.findIndex(h => h.value === 'data-table-expand')
        if (index < 0) headers.unshift({ ...defaultHeader, value: 'data-table-expand' })
        else headers.splice(index, 1, { ...defaultHeader, ...headers[index] })
      }

      return headers
    },
    colspanAttrs (): object | undefined {
      return this.isMobile ? undefined : {
        colspan: this.headersLength || this.computedHeaders.length,
      }
    },
    columnSorters (): Record<string, DataTableCompareFunction> {
      return this.computedHeaders.reduce<Record<string, DataTableCompareFunction>>((acc, header) => {
        if (header.sort) acc[header.value] = header.sort
        return acc
      }, {})
    },
    headersWithCustomFilters (): DataTableHeader[] {
      return this.headers.filter(header => header.filter && (!header.hasOwnProperty('filterable') || header.filterable === true))
    },
    headersWithoutCustomFilters (): DataTableHeader[] {
      return this.headers.filter(header => !header.filter && (!header.hasOwnProperty('filterable') || header.filterable === true))
    },
    sanitizedHeaderProps (): Record<string, any> {
      return camelizeObjectKeys(this.headerProps)
    },
    computedItemsPerPage (): number {
      const itemsPerPage = this.options && this.options.itemsPerPage ? this.options.itemsPerPage : this.itemsPerPage
      const itemsPerPageOptions: DataItemsPerPageOption[] | undefined = this.sanitizedFooterProps.itemsPerPageOptions

      if (
        itemsPerPageOptions &&
        !itemsPerPageOptions.find(item => typeof item === 'number' ? item === itemsPerPage : item.value === itemsPerPage)
      ) {
        const firstOption = itemsPerPageOptions[0]
        return typeof firstOption === 'object' ? firstOption.value : firstOption
      }

      return itemsPerPage
    },
  },

  created () {
    const breakingProps = [
      ['sort-icon', 'header-props.sort-icon'],
      ['hide-headers', 'hide-default-header'],
      ['select-all', 'show-select'],
    ]

    /* istanbul ignore next */
    breakingProps.forEach(([original, replacement]) => {
      if (this.$attrs.hasOwnProperty(original)) breaking(original, replacement, this)
    })
  },

  mounted () {
    // if ((!this.sortBy || !this.sortBy.length) && (!this.options.sortBy || !this.options.sortBy.length)) {
    //   const firstSortable = this.headers.find(h => !('sortable' in h) || !!h.sortable)
    //   if (firstSortable) this.updateOptions({ sortBy: [firstSortable.value], sortDesc: [false] })
    // }

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
      this.widths = Array.from(this.$el.querySelectorAll('th')).map(e => e.clientWidth)
    },
    customFilterWithColumns (items: any[], search: string) {
      return searchTableItems(items, search, this.headersWithCustomFilters, this.headersWithoutCustomFilters, this.customFilter)
    },
    customSortWithHeaders (items: any[], sortBy: string[], sortDesc: boolean[], locale: string) {
      return this.customSort(items, sortBy, sortDesc, locale, this.columnSorters)
    },
    createItemProps (item: any, index: number): DataTableItemProps {
      const props = VDataIterator.options.methods.createItemProps.call(this, item, index)

      return Object.assign(props, { headers: this.computedHeaders })
    },
    genCaption (props: DataScopeProps) {
      if (this.caption) return [this.$createElement('caption', [this.caption])]

      return getSlot(this, 'caption', props, true)
    },
    genColgroup (props: DataScopeProps) {
      return this.$createElement('colgroup', this.computedHeaders.map(header => {
        return this.$createElement('col', {
          class: {
            divider: header.divider,
          },
        })
      }))
    },
    genLoading () {
      const th = this.$createElement('th', {
        staticClass: 'column',
        attrs: this.colspanAttrs,
      }, [this.genProgress()])

      const tr = this.$createElement('tr', {
        staticClass: 'v-data-table__progress',
      }, [th])

      return this.$createElement('thead', [tr])
    },
    genHeaders (props: DataScopeProps) {
      const data = {
        props: {
          ...this.sanitizedHeaderProps,
          headers: this.computedHeaders,
          options: props.options,
          mobile: this.isMobile,
          showGroupBy: this.showGroupBy,
          checkboxColor: this.checkboxColor,
          someItems: this.someItems,
          everyItem: this.everyItem,
          singleSelect: this.singleSelect,
          disableSort: this.disableSort,
        },
        on: {
          sort: props.sort,
          group: props.group,
          'toggle-select-all': this.toggleSelectAll,
        },
      }

      // TODO: rename to 'head'? (thead, tbody, tfoot)
      const children: VNodeChildrenArrayContents = [getSlot(this, 'header', {
        ...data,
        isMobile: this.isMobile,
      })]

      if (!this.hideDefaultHeader) {
        const scopedSlots = getPrefixedScopedSlots('header.', this.$scopedSlots)
        children.push(this.$createElement(VDataTableHeader, {
          ...data,
          scopedSlots,
        }))
      }

      if (this.loading) children.push(this.genLoading())

      return children
    },
    genEmptyWrapper (content: VNodeChildrenArrayContents) {
      return this.$createElement('tr', {
        staticClass: 'v-data-table__empty-wrapper',
      }, [
        this.$createElement('td', {
          attrs: this.colspanAttrs,
        }, content),
      ])
    },
    genItems (items: any[], props: DataScopeProps) {
      const empty = this.genEmpty(props.originalItemsLength, props.pagination.itemsLength)
      if (empty) return [empty]

      return props.groupedItems
        ? this.genGroupedRows(props.groupedItems, props)
        : this.genRows(items, props)
    },
    genGroupedRows (groupedItems: ItemGroup<any>[], props: DataScopeProps) {
      return groupedItems.map(group => {
        if (!this.openCache.hasOwnProperty(group.name)) this.$set(this.openCache, group.name, true)

        if (this.$scopedSlots.group) {
          return this.$scopedSlots.group({
            group: group.name,
            options: props.options,
            isMobile: this.isMobile,
            items: group.items,
            headers: this.computedHeaders,
          })
        } else {
          return this.genDefaultGroupedRow(group.name, group.items, props)
        }
      })
    },
    genDefaultGroupedRow (group: string, items: any[], props: DataScopeProps) {
      const isOpen = !!this.openCache[group]
      const children: VNodeChildren = [
        this.$createElement('template', { slot: 'row.content' }, this.genRows(items, props)),
      ]
      const toggleFn = () => this.$set(this.openCache, group, !this.openCache[group])
      const removeFn = () => props.updateOptions({ groupBy: [], groupDesc: [] })

      if (this.$scopedSlots['group.header']) {
        children.unshift(this.$createElement('template', { slot: 'column.header' }, [
          this.$scopedSlots['group.header']!({
            group,
            groupBy: props.options.groupBy,
            isMobile: this.isMobile,
            items,
            headers: this.computedHeaders,
            isOpen,
            toggle: toggleFn,
            remove: removeFn,
          }),
        ]))
      } else {
        const toggle = this.$createElement(VBtn, {
          staticClass: 'ma-0',
          props: {
            icon: true,
            small: true,
          },
          on: {
            click: toggleFn,
          },
        }, [this.$createElement(VIcon, [isOpen ? '$minus' : '$plus'])])

        const remove = this.$createElement(VBtn, {
          staticClass: 'ma-0',
          props: {
            icon: true,
            small: true,
          },
          on: {
            click: removeFn,
          },
        }, [this.$createElement(VIcon, ['$close'])])

        const column = this.$createElement('td', {
          staticClass: 'text-start',
          attrs: this.colspanAttrs,
        }, [toggle, `${props.options.groupBy[0]}: ${group}`, remove])

        children.unshift(this.$createElement('template', { slot: 'column.header' }, [column]))
      }

      if (this.$scopedSlots['group.summary']) {
        children.push(this.$createElement('template', { slot: 'column.summary' }, [
          this.$scopedSlots['group.summary']!({
            group,
            groupBy: props.options.groupBy,
            isMobile: this.isMobile,
            items,
            headers: this.computedHeaders,
            isOpen,
            toggle: toggleFn,
          }),
        ]))
      }

      return this.$createElement(RowGroup, {
        key: group,
        props: {
          value: isOpen,
        },
      }, children)
    },
    genRows (items: any[], props: DataScopeProps) {
      return this.$scopedSlots.item ? this.genScopedRows(items, props) : this.genDefaultRows(items, props)
    },
    genScopedRows (items: any[], props: DataScopeProps) {
      const rows = []

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        rows.push(this.$scopedSlots.item!({
          ...this.createItemProps(item, i),
          isMobile: this.isMobile,
        }))

        if (this.isExpanded(item)) {
          rows.push(this.$scopedSlots['expanded-item']!({
            headers: this.computedHeaders,
            isMobile: this.isMobile,
            index: i,
            item,
          }))
        }
      }

      return rows
    },
    genDefaultRows (items: any[], props: DataScopeProps) {
      return this.$scopedSlots['expanded-item']
        ? items.map((item, index) => this.genDefaultExpandedRow(item, index))
        : items.map((item, index) => this.genDefaultSimpleRow(item, index))
    },
    genDefaultExpandedRow (item: any, index: number): VNode {
      const isExpanded = this.isExpanded(item)
      const classes = {
        'v-data-table__expanded v-data-table__expanded__row': isExpanded,
      }
      const headerRow = this.genDefaultSimpleRow(item, index, classes)
      const expandedRow = this.$createElement('tr', {
        staticClass: 'v-data-table__expanded v-data-table__expanded__content',
      }, [this.$scopedSlots['expanded-item']!({
        headers: this.computedHeaders,
        isMobile: this.isMobile,
        item,
      })])

      return this.$createElement(RowGroup, {
        props: {
          value: isExpanded,
        },
      }, [
        this.$createElement('template', { slot: 'row.header' }, [headerRow]),
        this.$createElement('template', { slot: 'row.content' }, [expandedRow]),
      ])
    },
    genDefaultSimpleRow (item: any, index: number, classes: Record<string, boolean> = {}): VNode {
      const scopedSlots = getPrefixedScopedSlots('item.', this.$scopedSlots)

      const data = this.createItemProps(item, index)

      if (this.showSelect) {
        const slot = scopedSlots['data-table-select']
        scopedSlots['data-table-select'] = slot ? () => slot({
          ...data,
          isMobile: this.isMobile,
        }) : () => this.$createElement(VSimpleCheckbox, {
          staticClass: 'v-data-table__checkbox',
          props: {
            value: data.isSelected,
            disabled: !this.isSelectable(item),
            color: this.checkboxColor ?? '',
          },
          on: {
            input: (val: boolean) => data.select(val),
          },
        })
      }

      if (this.showExpand) {
        const slot = scopedSlots['data-table-expand']
        scopedSlots['data-table-expand'] = slot ? () => slot(data) : () => this.$createElement(VIcon, {
          staticClass: 'v-data-table__expand-icon',
          class: {
            'v-data-table__expand-icon--active': data.isExpanded,
          },
          on: {
            click: (e: MouseEvent) => {
              e.stopPropagation()
              data.expand(!data.isExpanded)
            },
          },
        }, [this.expandIcon])
      }

      return this.$createElement(this.isMobile ? MobileRow : Row, {
        key: getObjectValueByPath(item, this.itemKey),
        class: mergeClasses(
          { ...classes, 'v-data-table__selected': data.isSelected },
          getPropertyFromItem(item, this.itemClass)
        ),
        props: {
          headers: this.computedHeaders,
          hideDefaultHeader: this.hideDefaultHeader,
          index,
          item,
          rtl: this.$vuetify.rtl,
        },
        scopedSlots,
        on: {
          // TODO: for click, the first argument should be the event, and the second argument should be data,
          // but this is a breaking change so it's for v3
          click: () => this.$emit('click:row', item, data),
          contextmenu: (event: MouseEvent) => this.$emit('contextmenu:row', event, data),
          dblclick: (event: MouseEvent) => this.$emit('dblclick:row', event, data),
        },
      })
    },
    genBody (props: DataScopeProps): VNode | string | VNodeChildren {
      const data = {
        ...props,
        expand: this.expand,
        headers: this.computedHeaders,
        isExpanded: this.isExpanded,
        isMobile: this.isMobile,
        isSelected: this.isSelected,
        select: this.select,
      }

      if (this.$scopedSlots.body) {
        return this.$scopedSlots.body!(data)
      }

      return this.$createElement('tbody', [
        getSlot(this, 'body.prepend', data, true),
        this.genItems(props.items, props),
        getSlot(this, 'body.append', data, true),
      ])
    },
    genFoot (props: DataScopeProps): VNode[] | undefined {
      return this.$scopedSlots.foot?.(props)
    },
    genFooters (props: DataScopeProps) {
      const data = {
        props: {
          options: props.options,
          pagination: props.pagination,
          itemsPerPageText: '$vuetify.dataTable.itemsPerPageText',
          ...this.sanitizedFooterProps,
        },
        on: {
          'update:options': (value: any) => props.updateOptions(value),
        },
        widths: this.widths,
        headers: this.computedHeaders,
      }

      const children: VNodeChildren = [
        getSlot(this, 'footer', data, true),
      ]

      if (!this.hideDefaultFooter) {
        children.push(this.$createElement(VDataFooter, {
          ...data,
          scopedSlots: getPrefixedScopedSlots('footer.', this.$scopedSlots),
        }))
      }

      return children
    },
    genDefaultScopedSlot (props: DataScopeProps): VNode {
      const simpleProps = {
        height: this.height,
        fixedHeader: this.fixedHeader,
        dense: this.dense,
      }

      // if (this.virtualRows) {
      //   return this.$createElement(VVirtualTable, {
      //     props: Object.assign(simpleProps, {
      //       items: props.items,
      //       height: this.height,
      //       rowHeight: this.dense ? 24 : 48,
      //       headerHeight: this.dense ? 32 : 48,
      //       // TODO: expose rest of props from virtual table?
      //     }),
      //     scopedSlots: {
      //       items: ({ items }) => this.genItems(items, props) as any,
      //     },
      //   }, [
      //     this.proxySlot('body.before', [this.genCaption(props), this.genHeaders(props)]),
      //     this.proxySlot('bottom', this.genFooters(props)),
      //   ])
      // }

      return this.$createElement(VSimpleTable, {
        props: simpleProps,
      }, [
        this.proxySlot('top', getSlot(this, 'top', {
          ...props,
          isMobile: this.isMobile,
        }, true)),
        this.genCaption(props),
        this.genColgroup(props),
        this.genHeaders(props),
        this.genBody(props),
        this.genFoot(props),
        this.proxySlot('bottom', this.genFooters(props)),
      ])
    },
    proxySlot (slot: string, content: VNodeChildren) {
      return this.$createElement('template', { slot }, content)
    },
  },

  render (): VNode {
    return this.$createElement(VData, {
      props: {
        ...this.$props,
        customFilter: this.customFilterWithColumns,
        customSort: this.customSortWithHeaders,
        itemsPerPage: this.computedItemsPerPage,
      },
      on: {
        'update:options': (v: DataOptions, old: DataOptions) => {
          this.internalGroupBy = v.groupBy || []
          !deepEqual(v, old) && this.$emit('update:options', v)
        },
        'update:page': (v: number) => this.$emit('update:page', v),
        'update:items-per-page': (v: number) => this.$emit('update:items-per-page', v),
        'update:sort-by': (v: string | string[]) => this.$emit('update:sort-by', v),
        'update:sort-desc': (v: boolean | boolean[]) => this.$emit('update:sort-desc', v),
        'update:group-by': (v: string | string[]) => this.$emit('update:group-by', v),
        'update:group-desc': (v: boolean | boolean[]) => this.$emit('update:group-desc', v),
        pagination: (v: DataPagination, old: DataPagination) => !deepEqual(v, old) && this.$emit('pagination', v),
        'current-items': (v: any[]) => {
          this.internalCurrentItems = v
          this.$emit('current-items', v)
        },
        'page-count': (v: number) => this.$emit('page-count', v),
      },
      scopedSlots: {
        default: this.genDefaultScopedSlot,
      },
    })
  },
})
