// Helpers
import Vue from 'vue'
import { PropValidator } from 'vue/types/options'
import { DataOptions } from '../../VData/VData'
import VIcon from '../../VIcon'
import VSimpleCheckbox from '../../VCheckbox/VSimpleCheckbox'
import mixins from '../../../util/mixins'
import { VDataTable } from '../'

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
    sortIcon: {
      type: String,
      default: '$vuetify.icons.sort'
    }
  },

  methods: {
    genSelectAll () {
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
    }
  }
})
