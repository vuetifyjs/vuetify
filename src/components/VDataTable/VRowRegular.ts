// Components
import { VDataTable, VCellCheckbox, VRowFunctional } from '.'

// Types
import Vue, { VNode, VNodeChildrenArrayContents } from 'vue'
import mixins from '../../util/mixins'

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
    const children: VNodeChildrenArrayContents = []

    if (this.dataTable.showSelect) {
      children.push(h(VCellCheckbox, {
        slot: 'select',
        props: {
          inputValue: this.dataTable.isSelected(this.item)
        },
        on: {
          change: (v: boolean) => this.dataTable.select(this.item, v)
        }
      }))
    }

    return h(VRowFunctional, {
      props: {
        item: this.item,
        headers: this.dataTable.computedHeaders
      },
      scopedSlots: this.$scopedSlots
    }, children)
  }
})
