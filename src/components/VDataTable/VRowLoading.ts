import Vue from 'vue'
import { VProgressLinear } from '../VProgressLinear'
import mixins from '../../util/mixins'
import VDataTable from './VDataTable'

type VDataTableInstance = InstanceType<typeof VDataTable>

interface options extends Vue {
  dataTable: VDataTableInstance
}

export default mixins<options>().extend({
  name: 'v-row-loading',

  inject: ['dataTable'],

  props: {
    color: String,
    colspan: Number,
    loading: [Boolean, String]
  },

  render (h) {
    const progress = h(VProgressLinear, {
      props: {
        color: (this.dataTable.loading === true || this.dataTable.loading === '')
          ? (this.color || 'primary')
          : this.dataTable.loading,
        height: 2,
        indeterminate: true
      }
    })

    const th = this.$createElement('th', {
      staticClass: 'column',
      attrs: {
        colspan: this.dataTable.headersLength
      }
    }, [progress])

    return h('tr', {
      staticClass: 'v-datatable__progress'
    }, [th])
  }
})
