import Vue, { VNode, VNodeChildrenArrayContents } from 'vue'
import VServerData from '../VData/VServerData'
import { DataProps, DataOptions } from '../VData/VLocalData'
import VDataHeader from './VDataHeader'
import { getObjectValueByPath } from '../../util/helpers'
import TableHeader from './TableHeader'
import { PropValidator } from 'vue/types/options'
import VRow from './VRow'
import { VDataFooter } from '../VDataIterator';

export default Vue.extend({
  name: 'v-data-table-server',

  props: {
    ...VServerData.options.props,
    headers: {
      type: Array,
      default: () => []
    } as PropValidator<TableHeader[]>
  },

  data () {
    return {
      internalOptions: this.options as DataOptions
    }
  },

  computed: {
    computedHeaders (): TableHeader[] {
      const headers = this.headers.filter(h => h.value === undefined || !this.internalOptions.groupBy.find(v => v === h.value))

      // this.showSelect && headers.unshift({ text: '', value: 'dataTableSelect', sortable: false, width: '1px' })
      // this.showExpand && headers.unshift({ text: '', value: 'dataTableExpand', sortable: false, width: '1px' })

      return headers
    }
  },

  watch: {

  },

  methods: {
    genLoading () {
      return this.$createElement('thead', [
        this.$createElement('tr', [
          this.$createElement('th', {
            attrs: {
              colspan: this.computedHeaders.length
            }
          }, [
            'loading...'
          ])
        ])
      ])
    },
    genHeaders (props: DataProps): VNodeChildrenArrayContents {
      const children = [
        this.$createElement(VDataHeader, {
          props: {
            headers: this.computedHeaders,
            options: props.options
          },
          on: {
            'update:options': (options: DataOptions) => props.options = options,
            'sort': (value: string) => props.sort(value)
          }
        })
      ]

      if (props.loading) children.push(this.genLoading())

      return children
      // return [
      // this.genColgroup(props),
      // this.genSlots('header', props),
      // !this.hideDefaultHeader && (
      //   <VDataHeader
      //     headers={this.computedHeaders}
      //     options={props.options}
      //     multi-sort={this.multiSort}
      //     { ...{
      //       on: {
      //         'update:options': (value: any) => props.options = value,
      //         'sort': (value: string) => props.sort(value)
      //       }
      //     }}
      //   ></VDataHeader>
      // ),
      // props.loading && this.genLoading()
      // ]
    },
    genRow (item: any, data: any = {}): VNode {
      // data.on = Object.assign(data.on || {}, {
      //   'update:selected': (item: any, selected: boolean) => this.select(item, selected),
      //   'update:expanded': (item: any, expanded: boolean) => this.expand(item, expanded)
      // })

      return this.$createElement(VRow, {
        // key: getObjectValueByPath(item, this.itemKey),
        props: {
          item,
          headers: this.computedHeaders
          // selected: this.isSelected(item),
          // expanded: this.isExpanded(item)
        }
      })
      // return (
      //   <VRow
      //     key={getObjectValueByPath(item, this.itemKey)}
      //     item={item}
      //     headers={this.computedHeaders}
      //     selected={this.isSelected(item)}
      //     expanded={this.isExpanded(item)}
      //     { ...data }
      //   ></VRow>
      // )
    },
    genRows (items: any[]): VNodeChildrenArrayContents {
      return items.map(item => {
        // if (this.$scopedSlots.row) return this.$scopedSlots.row(this.itemSlotProps(item))

        // if (this.showExpand) {
        //   return (
        //     <VRowGroup value={this.isExpanded(item)}>
        //       {this.genRow(item, { slot: 'row.header' })}
        //       <template slot="row.content">
        //         {this.genSlots('row.expanded', { item, headers: this.computedHeaders })}
        //       </template>
        //     </VRowGroup>
        //   )
        // }

        return this.genRow(item)
      })
    },
    genBody (props: DataProps): VNode | string | VNodeChildrenArrayContents {
      // if (this.$scopedSlots.body) return this.$scopedSlots.body(this.bodySlotProps(props))

      return this.$createElement('tbody', [
        this.genRows(props.items)
      ])
    },
    genFooters (props: DataProps) {
      const children = [
        // this.genSlots('footer', props)
      ]

      // if (!this.hideDefaultFooter) {
      children.push(this.$createElement(VDataFooter, {
        props: {
          options: props.options,
          pagination: props.pagination
        },
        on: {
          'update:options': (value: any) => props.options = value
        }
      }))
      // }

      return children
    },
    genTable (props: DataProps): VNode {
      return this.$createElement('div', {
        staticClass: 'v-data-table__wrapper'
      }, [
        this.$createElement('table', [
          this.genHeaders(props),
          this.genBody(props)
        ]),
        this.genFooters(props)
      ])
    },
    genDefaultScopedSlot (props: DataProps): VNode {
      const children: VNodeChildrenArrayContents = [this.genTable(props)]

      // const footers = computeSlots(this, 'footer', this.createSlotProps())
      // children.push(...footers, ...this.genFooter())

      return this.$createElement('div', {
        staticClass: 'v-data-table',
        class: {
          // 'v-data-table--dense': this.dense,
          // 'v-data-table--fixed': !!this.height,
          // 'v-data-table--mobile': this.isMobile,
          // ...this.themeClasses
        }
      }, children)
    }
  },

  render (h): VNode {
    return this.$createElement(VServerData, {
      props: {
        ...this.$props
      },
      on: {
        ...this.$listeners
      },
      scopedSlots: {
        default: this.genDefaultScopedSlot as any
      }
    })
  }
})
