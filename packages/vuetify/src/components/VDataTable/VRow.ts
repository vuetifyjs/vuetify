// Types
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { TableHeader } from './mixins/header'

// Utils
import { getObjectValueByPath, getTextAlignment } from '../../util/helpers'

export default Vue.extend({
  name: 'v-row',

  functional: true,

  props: {
    headers: Array as PropValidator<TableHeader[]>,
    item: Object,
    mobile: Boolean,
    rtl: Boolean
  },

  render (h, { props, slots, data }): VNode {
    const computedSlots = slots()

    const columns = props.headers.map(header => {
      const classes = {
        [getTextAlignment(header.align, props.rtl)]: true
      }

      const children = []
      const value = getObjectValueByPath(props.item, header.value)

      const scopedSlot = data.scopedSlots && data.scopedSlots[header.value]
      const regularSlot = computedSlots[header.value]

      if (scopedSlot) {
        children.push(scopedSlot({ item: props.item, header, value, mobile: props.mobile }))
      } else if (regularSlot) {
        children.push(regularSlot)
      } else {
        if (props.mobile) {
          children.push(h('div', { class: 'd-flex justify-content-between' }, [
            h('span', { staticClass: 'v-row__header' }, [header.text]),
            h('span', { staticClass: 'v-row__value' }, [value])
          ]))
        } else {
          children.push(value)
        }
      }

      return h('td', {
        class: classes
      }, children)
    }) as any

    return h('tr', data, columns)
  }
})
