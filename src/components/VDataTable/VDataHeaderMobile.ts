import Vue, { VNode, VNodeChildrenArrayContents } from 'vue'
import mixins from '../../util/mixins'
import { VDataTable, VCellCheckbox } from '.'
import VSelect from '../VSelect/VSelect'
import VChip from '../VChip'
import VIcon from '../VIcon'

type VDataTableInstance = InstanceType<typeof VDataTable>

interface options extends Vue {
  dataTable: VDataTableInstance
}

export default mixins<options>().extend({
  name: 'v-data-header-mobile',

  inject: ['dataTable'],

  props: {
    sortIcon: {
      type: String,
      default: '$vuetify.icons.sort'
    }
  },

  methods: {
    genSelectAll () {
      return this.$createElement(VCellCheckbox, {
        props: {
          head: true,
          inputValue: this.dataTable.everyItem
        },
        attrs: {
          indeterminate: !this.dataTable.everyItem && this.dataTable.someItems
        },
        on: {
          change: () => this.dataTable.toggleSelectAll()
        }
      })
    },
    genSortIcon () {
      return this.$createElement(VIcon, [this.sortIcon])
    },
    genSortChip (props: any) {
      const children: VNodeChildrenArrayContents = [props.item.text]

      const sortIndex = this.dataTable.options.sortBy.findIndex(k => k === props.item.value)
      const beingSorted = sortIndex >= 0
      const isDesc = this.dataTable.options.sortDesc[sortIndex]

      children.push(this.$createElement('div', {
        staticClass: 'v-chip__close',
        class: {
          'sortable': true,
          'active': beingSorted,
          'asc': beingSorted && !isDesc,
          'desc': beingSorted && isDesc
        }
      }, [this.genSortIcon()]))

      return this.$createElement(VChip, {
        staticClass: 'sortable',
        nativeOn: {
          click: (e: MouseEvent) => {
            e.stopPropagation()
            this.dataTable.resetExpanded()
            this.dataTable.sort(props.item.value)
          }
        }
      }, children)
    },
    genSortSelect () {
      return this.$createElement(VSelect, {
        props: {
          label: 'Sort by',
          items: this.dataTable.computedHeaders,
          hideDetails: true,
          multiple: this.dataTable.multiSort,
          value: this.dataTable.multiSort ? this.dataTable.options.sortBy : this.dataTable.options.sortBy[0]
        },
        on: {
          change: (v: string | string[]) => {
            this.dataTable.resetExpanded()
            if (Array.isArray(v)) {
              this.dataTable.options.sortDesc = v.map(s => {
                const i = this.dataTable.options.sortBy.findIndex(k => k === s)
                return i > -1 ? this.dataTable.options.sortDesc[i] : false
              })
              this.dataTable.options.sortBy = v
            } else {
              this.dataTable.sort(v)
            }
          }
        },
        scopedSlots: {
          selection: props => this.genSortChip(props) as any // TODO: whyyy?
        }
      })
    }
  },

  render (h): VNode {
    const children: VNodeChildrenArrayContents = []

    if (this.dataTable.showSelect) {
      children.push(this.genSelectAll())
    }

    children.push(this.genSortSelect())

    const th = h('th', {
      attrs: {
        colspan: this.dataTable.computedHeaders.length
      }
    }, [h('div', { staticClass: 'd-flex' }, children)])

    const tr = h('tr', [th])

    return h('thead', {
      staticClass: 'v-data-header v-data-header--mobile'
    }, [tr])
  }
})
