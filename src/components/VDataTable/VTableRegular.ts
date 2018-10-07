import mixins from '../../util/mixins'
import { VDataTable, VDataHeaderMobile, VDataHeader } from '.'
import Vue, { VNode, VNodeChildrenArrayContents } from 'vue'
import VTableBody from './VTableBody'
import VTable from './VTable'
import { computeSlots } from '../../util/helpers'

type VDataTableInstance = InstanceType<typeof VDataTable>

interface options extends Vue {
  dataTable: VDataTableInstance
}

export default mixins<options>().extend({
  name: 'v-table-regular',

  inject: ['dataTable'],

  methods: {
    genHeaders (): VNodeChildrenArrayContents {
      const headers = computeSlots(this, 'header', this.dataTable.createSlotProps())

      if (!this.dataTable.hideDefaultHeader) {
        headers.push(this.$createElement(this.dataTable.isMobile ? VDataHeaderMobile : VDataHeader))
      }

      return headers
    },
    genBody () {
      const empty = this.dataTable.genEmpty()

      if (empty) return empty

      return this.$createElement(VTableBody, {
        props: {
          headers: this.dataTable.computedHeaders,
          items: this.dataTable.computedItems
        },
        scopedSlots: this.$scopedSlots
      })
    }
  },

  render (h): VNode {
    return h(VTable, {
      staticClass: 'v-table-regular__wrapper',
      props: {
        height: this.dataTable.height
      }
    }, [
      this.$slots.prepend,
      this.genHeaders(),
      this.genBody(),
      this.$slots.append
    ])
  }
})
