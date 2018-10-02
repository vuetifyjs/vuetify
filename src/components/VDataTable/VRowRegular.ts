// Components
import { VDataTable, VRowFunctional } from '.'

// Types
import Vue, { VNode } from 'vue'
import mixins from '../../util/mixins'
import { VSimpleCheckbox } from '../VCheckbox'

type VDataTableInstance = InstanceType<typeof VDataTable>

interface options extends Vue {
  dataTable: VDataTableInstance
}

export default mixins<options>().extend({
  name: 'v-row-full',

  inject: ['dataTable'],

  props: {
    item: Object,
    value: Boolean
  },

  render (h): VNode {
    const scopedSlots: any = {}

    if (!this.$scopedSlots['dataTableSelect']) {
      scopedSlots['dataTableSelect'] = (props: any) => h(VSimpleCheckbox, {
        props: {
          value: this.dataTable.isSelected(this.item)
        },
        on: {
          input: (v: boolean) => this.dataTable.select(this.item, v)
        }
      }) as any
    }

    return h(VRowFunctional, {
      props: {
        item: this.item,
        headers: this.dataTable.computedHeaders
      },
      scopedSlots: Object.assign({}, scopedSlots, this.$scopedSlots)
    })
  }
})
