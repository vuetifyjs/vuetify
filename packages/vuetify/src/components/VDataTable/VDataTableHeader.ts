// Helpers
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { DataOptions } from '../VData/VData'
import VIcon from '../VIcon'
import VSimpleCheckbox from '../VCheckbox/VSimpleCheckbox'
import mixins from '../../util/mixins'
import { VDataTable } from '.'

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
  filter?: (value: any, search: string, item: any) => boolean
  sort?: (a: any, b: any) => number
}

type VDataTableInstance = InstanceType<typeof VDataTable>

interface options extends Vue {
  dataTable: VDataTableInstance
}

export default mixins<options>().extend({
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
    // TODO: Move this to a scoped slot! Easier for us to allow customization as well!
    genSelectAll (classes: string | string[] = []) {
      return this.$createElement(VSimpleCheckbox, {
        staticClass: 'v-data-table__checkbox',
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
    genHeaders () {
      return this.headers.map(header => {
        const listeners: any = {}
        const children = []

        let classes = {
          [`text-xs-${header.align || 'left'}`]: true
        }

        if (header.value === 'dataTableSelect') {
          children.push(this.genSelectAll())
        } else {
          children.push(this.$createElement('span', [header.text]))

          if (header.sortable || !header.hasOwnProperty('sortable')) {
            listeners['click'] = () => {
              this.$emit('sort', header.value)
            }

            const sortIndex = this.options.sortBy.findIndex(k => k === header.value)
            const beingSorted = sortIndex >= 0
            const isDesc = this.options.sortDesc[sortIndex]

            classes = {
              ...classes,
              'sortable': true,
              'active': beingSorted,
              'asc': beingSorted && !isDesc,
              'desc': beingSorted && isDesc
            }

            if (header.align === 'end') children.unshift(this.genSortIcon())
            else children.push(this.genSortIcon())
          }
        }

        return this.$createElement('th', {
          class: classes,
          on: listeners
        }, children)
      })
    }
  },

  render (): VNode {
    return this.$createElement('thead', {
      staticClass: 'v-data-table-header'
    }, [
      this.$createElement('tr', this.genHeaders())
    ])
  }
})
