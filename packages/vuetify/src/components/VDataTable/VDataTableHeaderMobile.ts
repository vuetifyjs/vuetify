import Vue, { VNode, VNodeChildrenArrayContents } from 'vue'
import mixins from '../../util/mixins'
import { VDataTable } from '.'
import VSelect from '../VSelect/VSelect'
import VChip from '../VChip'
import VIcon from '../VIcon'
import { VSimpleCheckbox } from '../VCheckbox'
import { PropValidator } from 'vue/types/options'
import { DataOptions } from '../VData/VData'
import { TableHeader } from './VDataTableHeader'

type VDataTableInstance = InstanceType<typeof VDataTable>

interface options extends Vue {
  dataTable: VDataTableInstance
}

export default mixins<options>().extend({
  name: 'v-data-table-header-mobile',

  inject: ['dataTable'],

  props: {
    headers: {
      type: Array,
      required: true
    } as PropValidator<TableHeader[]>,
    options: {
      type: Object,
      default: () => ({
        page: 1,
        itemsPerPage: 10,
        sortBy: [],
        sortDesc: [],
        groupBy: [],
        groupDesc: []
      })
    } as PropValidator<DataOptions>,
    multiSort: Boolean,
    sortIcon: {
      type: String,
      default: '$vuetify.icons.sort'
    }
  },

  methods: {
    genSelectAll () {
      return this.$createElement(VSimpleCheckbox, {
        props: {
          value: this.dataTable.everyItem
        },
        attrs: {
          indeterminate: !this.dataTable.everyItem && this.dataTable.someItems
        },
        on: {
          input: () => this.dataTable.toggleSelectAll()
        }
      })
    },
    genSortIcon () {
      return this.$createElement(VIcon, [this.sortIcon])
    },
    genSortChip (props: any) {
      const children: VNodeChildrenArrayContents = [props.item.text]

      const sortIndex = this.options.sortBy.findIndex(k => k === props.item.value)
      const beingSorted = sortIndex >= 0
      const isDesc = this.options.sortDesc[sortIndex]

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
            this.$emit('sort', props.item.value)
            // this.dataTable.resetExpanded()
            // this.dataTable.sort(props.item.value)
          }
        }
      }, children)
    },
    genSortSelect () {
      return this.$createElement(VSelect, {
        props: {
          label: 'Sort by',
          items: this.headers.filter(h => h.value !== 'dataTableSelect'),
          hideDetails: true,
          multiple: this.multiSort,
          value: this.multiSort ? this.options.sortBy : this.options.sortBy[0]
        },
        on: {
          change: (v: string | string[]) => this.$emit('sort', v)
        },
        scopedSlots: {
          selection: props => this.genSortChip(props) as any // TODO: whyyy?
        }
      })
    }
  },

  render (h): VNode {
    const children: VNodeChildrenArrayContents = []

    if (this.headers.find(header => header.value === 'dataTableSelect')) {
      children.push(this.genSelectAll())
    }

    children.push(this.genSortSelect())

    const th = h('th', {
      attrs: {
        colspan: this.headers.length
      }
    }, [h('div', children)])

    const tr = h('tr', [th])

    return h('thead', {
      staticClass: 'v-data-table-header v-data-table-header--mobile'
    }, [tr])
  }
})
