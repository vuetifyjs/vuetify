import Vue, { VNode, VNodeChildrenArrayContents } from 'vue'
import mixins from '../../util/mixins'
import VDataTable from './VDataTable'
import { PropValidator } from 'vue/types/options'
import { groupByProperty } from '../../util/helpers'
import { VRowGroup, VRowFunctional } from '.'
import VBtn from '../VBtn'
import VIcon from '../VIcon'
import { VSimpleCheckbox } from '../VCheckbox'
import TableHeader from './TableHeader'

type VDataTableInstance = InstanceType<typeof VDataTable>

interface options extends Vue {
  dataTable: VDataTableInstance
}

export default mixins<options>().extend({
  name: 'v-table-body',

  inject: ['dataTable'],

  props: {
    headers: Array as PropValidator<TableHeader[]>,
    items: Array as PropValidator<any[]>
  },

  methods: {
    genItems (): VNodeChildrenArrayContents {
      return this.dataTable.options.groupBy
        ? this.genGroupedRows(this.items, this.dataTable.options.groupBy)
        : this.genRows(this.items)
    },
    genGroupedRows (items: any[], groupBy: string): VNodeChildrenArrayContents {
      const grouped = groupByProperty(items, groupBy)
      const groups = Object.keys(grouped)

      // TODO: Better way to do this? Sorting on group
      const i = this.dataTable.options.sortBy.findIndex((v: string) => v === groupBy)
      if (i > -1 && this.dataTable.options.sortDesc[i]) {
        groups.reverse()
      }

      return groups.map(group => {
        if (!this.dataTable.openCache.hasOwnProperty(group)) this.$set(this.dataTable.openCache, group, true)

        if (this.$scopedSlots.group) {
          return this.$scopedSlots.group({
            groupBy,
            group,
            items: grouped[group],
            headers: this.headers
          })
        } else {
          return this.genDefaultGroupedRow(groupBy, group, grouped[group])
        }
      })
    },
    genDefaultGroupedRow (groupBy: string, group: string, items: any[]) {
      const isOpen = !!this.dataTable.openCache[group]
      const children: VNodeChildrenArrayContents = [
        this.$createElement('template', { slot: 'row.content' }, this.genDefaultRows(items))
      ]

      if (this.$scopedSlots['group.header']) {
        children.unshift(this.$createElement('template', { slot: 'column.header' }, [
          this.$scopedSlots['group.header']({ group, groupBy, items, headers: this.headers })
        ]))
      } else {
        const toggle = this.$createElement(VBtn, {
          staticClass: 'ma-0',
          props: {
            icon: true,
            small: true
          },
          on: {
            click: () => this.$set(this.dataTable.openCache, group, !this.dataTable.openCache[group])
          }
        }, [this.$createElement(VIcon, [isOpen ? 'remove' : 'add'])])

        const remove = this.$createElement(VBtn, {
          staticClass: 'ma-0',
          props: {
            icon: true,
            small: true
          },
          on: {
            click: () => this.dataTable.options.groupBy = ''
          }
        }, [this.$createElement(VIcon, ['close'])])

        const column = this.$createElement('td', {
          staticClass: 'text-xs-left',
          attrs: {
            colspan: this.headers.length
          }
        }, [toggle, `${groupBy}: ${group}`, remove])

        children.unshift(this.$createElement('template', { slot: 'column.header' }, [column]))
      }

      if (this.$scopedSlots['group.summary']) {
        children.push(this.$createElement('template', { slot: 'column.summary' }, [
          this.$scopedSlots['group.summary']({ group, groupBy, items, headers: this.headers })
        ]))
      }

      return this.$createElement(VRowGroup, {
        props: {
          value: isOpen
        }
      }, children)
    },
    genRows (items: any[]): VNodeChildrenArrayContents {
      return this.$scopedSlots.item ? this.genScopedRows(items) : this.genDefaultRows(items)
    },
    genScopedRows (items: any[]): VNodeChildrenArrayContents {
      return items.map((item: any) => {
        const props = this.dataTable.createItemProps(item)
        return this.$scopedSlots.item(props)
      })
    },
    genDefaultRows (items: any[]): VNodeChildrenArrayContents {
      return this.$scopedSlots['item.expanded']
        ? items.map(item => this.genDefaultExpandedRow(item))
        : items.map(item => this.genDefaultSimpleRow(item))
    },
    genDefaultExpandedRow (item: any): VNode {
      const isExpanded = this.dataTable.isExpanded(item)
      const headerRow = this.genDefaultSimpleRow(item, isExpanded ? 'expanded expanded__row' : null)
      const expandedRow = this.$createElement('tr', {
        staticClass: 'expanded expanded__content'
      }, [this.$scopedSlots['item.expanded']({ item, headers: this.headers })])

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

      if (this.dataTable.showSelect) {
        scopedSlots['dataTableSelect'] = () => this.$createElement(VSimpleCheckbox, {
          staticClass: 'v-data-table__checkbox',
          props: {
            value: this.dataTable.isSelected(item)
          },
          on: {
            input: (v: any) => this.dataTable.select(item, v)
          }
        })
      }

      const expanded = this.dataTable.isExpanded(item)

      if (this.dataTable.showExpand) {
        scopedSlots['dataTableExpand'] = () => this.$createElement(VIcon, {
          staticClass: 'expand__icon',
          class: {
            'expand__icon--active': expanded
          },
          on: {
            click: () => this.dataTable.expand(item, !expanded)
          }
        }, [this.$vuetify.icons.expand]) // TODO: prop?
      }

      return this.$createElement(VRowFunctional, {
        class: classes,
        props: {
          headers: this.headers,
          item,
          mobile: this.dataTable.isMobile
        },
        scopedSlots
      })
    }
  },

  render (h): VNode {
    return this.$createElement('tbody', {
      staticClass: 'v-data-table__body'
    }, [
      this.$slots.prepend,
      this.genItems(),
      this.$slots.append
    ])
  }
})
