import Vue, { VNode, ComponentOptions, VNodeChildrenArrayContents } from 'vue'
import { injectOne } from '../../util/inject'
import { DataTableProvide } from './VDataTable'

import VProgressLinear from '../VProgressLinear'
import VRow from './VRow'

export default injectOne<DataTableProvide>()('dataTable').extend({
  name: 'v-table-progress',

  props: {
    height: {
      type: Number,
      default: 2
    }
  },

  render (h): VNode {
    const children: VNodeChildrenArrayContents = []

    if (this.dataTable.loading) {
      children.push(h(VRow, [
        h((VProgressLinear as ComponentOptions<Vue>), {
          props: {
            height: 2,
            active: true,
            indeterminate: true
          }
        })
      ]))
    }

    return h('div', {
      staticClass: 'thead v-data-table__progress'
    }, children)
  }
})
