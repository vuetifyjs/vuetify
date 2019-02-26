import { VDataTable } from '../'
import { DataOptions } from '../../VData/VData'
import VIcon from '../../VIcon'
import VSimpleCheckbox from '../../VCheckbox/VSimpleCheckbox'

import Vue, { PropType } from 'vue'
import mixins from '../../../util/mixins'
import { compareFn } from '../../../util/helpers'

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
  sort?: compareFn
}

type VDataTableInstance = InstanceType<typeof VDataTable>

interface options extends Vue {
  dataTable: VDataTableInstance
}

export default mixins<options>().extend({
  inject: ['dataTable'],

  props: {
    headers: {
      type: Array as PropType<TableHeader[]>,
      required: true
    },
    options: {
      type: Object as PropType<DataOptions>,
      default: () => ({
        page: 1,
        itemsPerPage: 10,
        sortBy: [],
        sortDesc: [],
        groupBy: [],
        groupDesc: [],
        multiSort: false,
        mustSort: false
      })
    },
    sortIcon: {
      type: String,
      default: '$vuetify.icons.sort'
    }
  },

  methods: {
    genSelectAll () {
      const data = {
        props: {
          value: this.dataTable.everyItem,
          indeterminate: !this.dataTable.everyItem && this.dataTable.someItems
        },
        on: {
          input: (v: boolean) => this.dataTable.toggleSelectAll(v)
        }
      }

      if (this.$scopedSlots.dataTableSelect) {
        return this.$scopedSlots.dataTableSelect(data)
      }

      return this.$createElement(VSimpleCheckbox, {
        staticClass: 'v-data-table__checkbox',
        ...data
      })
    },
    genSortIcon () {
      return this.$createElement(VIcon, [this.sortIcon])
    }
  }
})
