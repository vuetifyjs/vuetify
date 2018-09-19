import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { getObjectValueByPath } from '../../util/helpers'
import { TableHeader } from './VDataTable'

export default Vue.extend({
  name: 'v-row-simple',

  functional: true,

  props: {
    item: Object,
    headers: Array as PropValidator<TableHeader[]>
  },

  render (h, { props, slots, data }): VNode {
    const computedSlots = slots()

    const columns = props.headers.map(header => {
      const classes = {
        [`text-xs-${header.align || 'left'}`]: true
      }

      const children = []
      const value = getObjectValueByPath(props.item, header.value)

      if (data.scopedSlots && data.scopedSlots[header.value]) {
        children.push(data.scopedSlots[header.value]({ item: props.item, header, value }))
      } else {
        children.push(value)
      }

      return h('td', {
        class: classes
      }, children)
    }) as any

    if (computedSlots.select) {
      columns.unshift(computedSlots.select)
    }

    return h('tr', {
    }, columns)
  }
})
