import '../../stylus/components/_data-table.styl'

// Types
import { VNode, VNodeChildrenArrayContents } from 'vue'
import { PropValidator } from 'vue/types/options'
import { DataProps } from '../VData/VData'
import { TableHeader } from './mixins/header'

// Components
import { VData, VDataFooter } from '../VData'
import VBtn from '../VBtn'
import VDataIterator from '../VDataIterator'
import VDataTableHeader from './VDataTableHeader'
import VDataTableHeaderMobile from './VDataTableHeaderMobile'
import VDataTableVirtual from './VDataTableVirtual'
import VIcon from '../VIcon'
import VProgressLinear from '../VProgressLinear'
import VRow from './VRow'
import VRowGroup from './VRowGroup'
import VSimpleCheckbox from '../VCheckbox/VSimpleCheckbox'

// Helpers
import { deepEqual, getObjectValueByPath, convertToUnit } from '../../util/helpers'

/* @vue/component */
export default VDataIterator.extend({
  name: 'v-data-table',

  provide (): object {
    return { dataTable: this }
  },

  props: {
    headers: {
      type: Array,
      required: true
    } as PropValidator<TableHeader[]>,
    showSelect: Boolean,
    showExpand: Boolean,
    showGroupBy: Boolean,
    virtualRows: Boolean,
    mobileBreakpoint: {
      type: String,
      default: 'sm'
    },
    height: [Number, String],
    hideDefaultFooter: Boolean,
    hideDefaultHeader: Boolean
  },

  data () {
    return {
      internalGroupBy: [] as string[],
      openCache: {} as { [key: string]: boolean }
    }
  },

  computed: {
    computedHeaders (): TableHeader[] {
      const headers = this.headers.filter(h => h.value === undefined || !this.internalGroupBy.find(v => v === h.value))

      this.showSelect && headers.unshift({ text: '', value: 'dataTableSelect', sortable: false, width: '1px' })
      this.showExpand && headers.unshift({ text: '', value: 'dataTableExpand', sortable: false, width: '1px' })

      return headers
    },
    isMobile (): boolean {
      return !!this.$vuetify.breakpoint[this.mobileBreakpoint]
    }
  },

  methods: {
    customSearchWithColumns (items: any[], search: string) {
      const filterableHeaders = this.headers.filter(h => !!h.filter)
      if (filterableHeaders.length) {
        items = items.filter(i => filterableHeaders.every(h => h.filter!(getObjectValueByPath(i, h.value), this.search, i)))
      }

      return this.customSearch(items, search)
    },
    customSortWithHeaders (items: any[], sortBy: string[], sortDesc: boolean[], locale: string) {
      const customSorters = this.computedHeaders.reduce((obj: Record<string, Function>, header: TableHeader) => {
        if (header.sort) obj[header.value] = header.sort
        return obj
      }, {})

      return this.customSort(items, sortBy, sortDesc, locale, customSorters)
    },
    createItemProps (item: any) {
      const props = VDataIterator.options.methods.createItemProps.call(this, item)

      // TODO: Will {}, props mess up .syncing?
      return Object.assign(props, { headers: this.computedHeaders })
    },
    createSlotProps (props: any) {
      props.headers = this.computedHeaders

      return props
    },
    genColgroup (props: DataProps) {
      return this.$createElement('colgroup', this.computedHeaders.map(header => {
        return this.$createElement('col', {
          class: {
            'divider': header.divider || header.resizable,
            'resizable': header.resizable
          },
          style: {
            width: header.width
          }
        })
      }))
    },
    genLoading () {
      const progress = this.$createElement(VProgressLinear, {
        props: {
          color: this.loading === true ? 'primary' : this.loading,
          height: 2,
          indeterminate: true
        }
      })

      const th = this.$createElement('th', {
        staticClass: 'column',
        attrs: {
          colspan: this.computedHeaders.length
        }
      }, [progress])

      return this.$createElement('tr', {
        staticClass: 'v-data-table__progress'
      }, [th])
    },
    genHeaders (props: DataProps) {
      const children: VNodeChildrenArrayContents = [this.genSlots('header', this.createSlotProps(props))]

      if (!this.hideDefaultHeader) {
        children.push(this.$createElement(VDataTableHeader, {
          props: {
            headers: this.computedHeaders,
            options: props.options,
            mobile: this.isMobile
          },
          on: {
            'sort': props.sort,
            'group': props.group
          }
        }))
      }

      if (this.loading) children.push(this.genLoading())

      return children
    },
    genEmptyWrapper (content: VNodeChildrenArrayContents) {
      return this.$createElement('tr', [
        this.$createElement('td', {
          attrs: {
            colspan: this.computedHeaders.length
          }
        }, content)
      ])
    },
    genItems (items: any[], props: DataProps): VNodeChildrenArrayContents {
      const empty = this.genEmpty(props.pagination.itemsLength)
      if (empty) return [empty]

      return props.options.groupBy.length
        ? this.genGroupedRows(props.groupedItems!, props)
        : this.genRows(items, props)
    },
    genGroupedRows (groupedItems: Record<string, any[]>, props: DataProps): VNodeChildrenArrayContents {
      const groups = Object.keys(groupedItems || {})

      return groups.map(group => {
        if (!this.openCache.hasOwnProperty(group)) this.$set(this.openCache, group, true)

        if (this.$scopedSlots.group) {
          return this.$scopedSlots.group({
            group,
            options: props.options,
            items: groupedItems![group],
            headers: this.computedHeaders
          })
        } else {
          return this.genDefaultGroupedRow(group, groupedItems![group], props)
        }
      })
    },
    genDefaultGroupedRow (group: string, items: any[], props: DataProps) {
      const isOpen = !!this.openCache[group]
      const children: VNodeChildrenArrayContents = [
        this.$createElement('template', { slot: 'row.content' }, this.genDefaultRows(props.groupedItems![group], props))
      ]

      if (this.$scopedSlots['group.header']) {
        children.unshift(this.$createElement('template', { slot: 'column.header' }, [
          this.$scopedSlots['group.header']({ group, groupBy: props.options.groupBy, items, headers: this.computedHeaders })
        ]))
      } else {
        const toggle = this.$createElement(VBtn, {
          staticClass: 'ma-0',
          props: {
            icon: true,
            small: true
          },
          on: {
            click: () => this.$set(this.openCache, group, !this.openCache[group])
          }
        }, [this.$createElement(VIcon, [isOpen ? 'remove' : 'add'])])

        const remove = this.$createElement(VBtn, {
          staticClass: 'ma-0',
          props: {
            icon: true,
            small: true
          },
          on: {
            click: () => props.options = Object.assign({}, props.options, { groupBy: [], groupDesc: [] })
          }
        }, [this.$createElement(VIcon, ['close'])])

        const column = this.$createElement('td', {
          staticClass: 'text-xs-left',
          attrs: {
            colspan: this.computedHeaders.length
          }
        }, [toggle, `${props.options.groupBy[0]}: ${group}`, remove])

        children.unshift(this.$createElement('template', { slot: 'column.header' }, [column]))
      }

      if (this.$scopedSlots['group.summary']) {
        children.push(this.$createElement('template', { slot: 'column.summary' }, [
          this.$scopedSlots['group.summary']({ group, groupBy: props.options.groupBy, items, headers: this.computedHeaders })
        ]))
      }

      return this.$createElement(VRowGroup, {
        key: group,
        props: {
          value: isOpen
        }
      }, children)
    },
    genRows (items: any[], props: DataProps): VNodeChildrenArrayContents {
      return this.$scopedSlots.item ? this.genScopedRows(items, props) : this.genDefaultRows(items, props)
    },
    genScopedRows (items: any[], props: DataProps): VNodeChildrenArrayContents {
      return items.map((item: any) => this.$scopedSlots.item(this.createItemProps(item)))
    },
    genDefaultRows (items: any[], props: DataProps): VNodeChildrenArrayContents {
      return this.$scopedSlots['item.expanded']
        ? items.map(item => this.genDefaultExpandedRow(item))
        : items.map(item => this.genDefaultSimpleRow(item))
    },
    genDefaultExpandedRow (item: any): VNode {
      const isExpanded = this.isExpanded(item)
      const headerRow = this.genDefaultSimpleRow(item, isExpanded ? 'expanded expanded__row' : null)
      const expandedRow = this.$createElement('tr', {
        staticClass: 'expanded expanded__content'
      }, [this.$scopedSlots['item.expanded']({ item, headers: this.computedHeaders })])

      return this.$createElement(VRowGroup, {
        props: {
          value: isExpanded
        }
      }, [
        this.$createElement('template', { slot: 'row.header' }, [headerRow]),
        this.$createElement('template', { slot: 'row.content' }, [expandedRow])
      ])
    },
    genDefaultSimpleRow (item: any, classes: string | string[] | object | null = null): VNode {
      const scopedSlots: any = Object.keys(this.$scopedSlots).filter(k => k.startsWith('item.column.')).reduce((obj: any, k: string) => {
        obj[k.replace('item.column.', '')] = this.$scopedSlots[k]
        return obj
      }, {})

      if (this.showSelect) {
        scopedSlots['dataTableSelect'] = () => this.$createElement(VSimpleCheckbox, {
          staticClass: 'v-data-table__checkbox',
          props: {
            value: this.isSelected(item)
          },
          on: {
            input: (v: any) => this.select(item, v)
          }
        })
      }

      const expanded = this.isExpanded(item)

      if (this.showExpand) {
        scopedSlots['dataTableExpand'] = () => this.$createElement(VIcon, {
          staticClass: 'expand__icon',
          class: {
            'expand__icon--active': expanded
          },
          on: {
            click: () => this.expand(item, !expanded)
          }
        }, [this.$vuetify.icons.expand]) // TODO: prop?
      }

      return this.$createElement(VRow, {
        key: getObjectValueByPath(item, this.itemKey),
        class: classes,
        props: {
          headers: this.computedHeaders,
          item,
          mobile: this.isMobile,
          rtl: this.$vuetify.rtl
        },
        scopedSlots
      })
    },
    genBody (props: DataProps): VNode | string | VNodeChildrenArrayContents {
      if (this.$scopedSlots.body) return this.$scopedSlots.body(this.createSlotProps(props))

      return this.$createElement('tbody', [
        this.genSlots('body.prepend', props),
        this.genItems(props.items, props),
        this.genSlots('body.append', props)
      ])
    },
    genFooters (props: DataProps) {
      const children: VNodeChildrenArrayContents = [
        this.genSlots('footer', props)
      ]

      if (!this.hideDefaultFooter) {
        children.push(this.$createElement(VDataFooter, {
          props: {
            options: props.options,
            pagination: props.pagination
          },
          on: {
            'update:options': (value: any) => props.options = value
          }
        }))
      }

      return children
    },
    genTable (props: DataProps): VNode {
      return this.$createElement('div', {
        staticClass: 'v-data-table__wrapper',
        style: {
          height: convertToUnit(this.height)
        }
      }, [
        this.$createElement('table', [
          this.genColgroup(props),
          this.genHeaders(props),
          this.genBody(props)
        ])
      ])
    },
    genDefaultScopedSlot (props: DataProps): VNode {
      // TODO: Do we have to support static? Is there another way?
      // if (this.static) {
      //   return this.$createElement('div', ['static'])
      // }

      const classes = {
        // 'v-data-table--dense': this.dense,
        'v-data-table--fixed': !!this.height,
        'v-data-table--mobile': this.isMobile,
        ...this.themeClasses
      }

      if (this.virtualRows) {
        return this.$createElement(VDataTableVirtual, {
          class: classes,
          props: {
            itemsLength: props.items.length,
            height: Number(this.height)
          },
          scopedSlots: {
            items: ({ start, stop }) => this.genItems(props.items.slice(start, stop), props)
          }
        }, [
          this.$createElement('template', { slot: 'header' }, this.genHeaders(props)),
          this.$createElement('template', { slot: 'footer' }, this.genFooters(props))
        ])
      }

      return this.$createElement('div', {
        staticClass: 'v-data-table',
        class: classes
      }, [
        this.genTable(props),
        this.genFooters(props)
      ])
    }
  },

  render (): VNode {
    return this.$createElement(VData, {
      props: {
        ...this.$props,
        customSearch: this.customSearchWithColumns,
        customSort: this.customSortWithHeaders
      },
      on: {
        'update:options': (v: any, old: any) => {
          this.internalGroupBy = v.groupBy || []
          !deepEqual(v, old) && this.$emit('update:options', v)
        },
        'update:page': (v: any) => this.$emit('update:page', v),
        'update:itemsPerPage': (v: any) => this.$emit('update:itemsPerPage', v),
        'update:sortBy': (v: any) => this.$emit('update:sortBy', v),
        'update:sortDesc': (v: any) => this.$emit('update:sortDesc', v),
        'update:groupBy': (v: any) => this.$emit('update:groupBy', v),
        'update:groupDesc': (v: any) => this.$emit('update:groupDesc', v),
        'pagination': (v: any, old: any) => !deepEqual(v, old) && this.$emit('pagination', v),
        'current-items': (v: any[]) => this.$emit('current-items', v)
      },
      scopedSlots: {
        default: this.genDefaultScopedSlot as any
      }
    })
  }
})
