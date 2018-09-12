import { VNode, CreateElement } from 'vue'
import { DataTableProvide } from './VDataTable'
import { injectOne } from '../../util/inject'

export default injectOne<DataTableProvide>()('dataTable').extend({
  name: 'v-row',

  props: {
    active: {
      type: Boolean,
      default: false
    }
  },

  render (h: CreateElement): VNode {
    const content = this.$slots.default ? this.$slots.default : []
    const widths = this.dataTable.widths
    const isFlexWidth = this.dataTable.isFlexWidth

    let i = 0
    content.forEach((c: any) => {
      if (!widths[i] || !c.fnOptions || !c.fnOptions.name.startsWith('v-cell')) return
      if (i === 0 && c.fnOptions.name.startsWith('v-cell-checkbox') && this.dataTable.showSelectAll) return

      if (isFlexWidth) {
        c.data.style = `flex-grow: ${widths[i]} !important`
      } else {
        c.data.style = `flex: none; width: ${widths[i]}`
      }

      i += 1
    })

    return h('div', {
      staticClass: 'v-row',
      class: {
        active: this.active
      },
      style: {
        width: `${this.dataTable.tableWidth}px`
      }
    }, content)
  }
})
