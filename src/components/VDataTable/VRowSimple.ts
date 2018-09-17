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

  render (h, { props, listeners, slots }): VNode {
    const columns = props.headers.map(header => {
      const classes = {
        [`text-xs-${header.align || 'left'}`]: true
      }

      return h('td', {
        class: classes
      }, [getObjectValueByPath(props.item, header.value)])
    }) as any

    const computedSlots = slots()
    if (computedSlots.select) {
      columns.unshift(computedSlots.select)
    }

    return h('tr', {
    }, columns)
  }
})
