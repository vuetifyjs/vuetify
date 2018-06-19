import { VNode, CreateElement } from 'vue'
import { injectOne } from '../../util/inject'
import { DataTableProvide } from './VDataTable'

import VProgressLinear from '../VProgressLinear'
import VRow from './VRow'

export default injectOne<DataTableProvide>()('dataTable').extend({
  name: 'v-table-progress',

  render (h: CreateElement): VNode {
    return h('div', {
      staticClass: 'thead v-data-table__progress'
    }, [this.dataTable.loading && h(VRow, [
      h((VProgressLinear as any), { // TODO: change when converted
        props: {
          height: 2,
          active: true,
          indeterminate: true
        }
      })
    ])])
  }
})
