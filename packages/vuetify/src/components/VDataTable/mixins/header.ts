import { VDataTable } from '../'
import VIcon from '../../VIcon'
import VSimpleCheckbox from '../../VCheckbox/VSimpleCheckbox'
import ripple from '../../../directives/ripple'

import Vue, { PropType } from 'vue'
import mixins from '../../../util/mixins'
import { DataOptions, DataTableHeader } from 'types'

type VDataTableInstance = InstanceType<typeof VDataTable>

interface options extends Vue {
  dataTable: VDataTableInstance
}

export default mixins<options>().extend({
  // https://github.com/vuejs/vue/issues/6872
  directives: {
    ripple,
  },

  props: {
    headers: {
      type: Array as PropType<DataTableHeader[]>,
      required: true,
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
        mustSort: false,
      }),
    },
    sortIcon: {
      type: String,
      default: '$sort',
    },
    everyItem: Boolean,
    someItems: Boolean,
    showGroupBy: Boolean,
    singleSelect: Boolean,
    disableSort: Boolean,
  },

  methods: {
    genSelectAll () {
      const data = {
        props: {
          value: this.everyItem,
          indeterminate: !this.everyItem && this.someItems,
        },
        on: {
          input: (v: boolean) => this.$emit('toggle-select-all', v),
        },
      }

      if (this.$scopedSlots['data-table-select']) {
        return this.$scopedSlots['data-table-select']!(data)
      }

      return this.$createElement(VSimpleCheckbox, {
        staticClass: 'v-data-table__checkbox',
        ...data,
      })
    },
    genSortIcon () {
      return this.$createElement(VIcon, {
        staticClass: 'v-data-table-header__icon',
        props: {
          size: 18,
        },
      }, [this.sortIcon])
    },
  },
})
