import Vue, { VNode, CreateElement } from 'vue'
import { DataTableProvide } from './VDataTable'
import { injectOne } from '../../util/inject'

export default injectOne<DataTableProvide>()('dataTable').extend({
  name: 'v-row',

  render (h: CreateElement): VNode {
    const content = this.$slots.default ? this.$slots.default : []
    const widths = this.dataTable.widths
    const isFlexWidth = this.dataTable.isFlexWidth

    content.forEach((c: any, i: number) => {
      if (!c.fnOptions || c.fnOptions.name !== 'v-cell' || !widths[i]) return

      if (isFlexWidth) {
        c.data.style = `flex-grow: ${widths[i]}`
      } else {
        c.data.style = `flex: none; width: ${widths[i]}`
      }
    })

    return h('div', {
      staticClass: 'v-row'
    }, content)
  }
})
