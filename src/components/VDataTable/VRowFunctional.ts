// Components
import { TableHeader } from './VDataTable'

// Types
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

// Utils
import { getObjectValueByPath } from '../../util/helpers'

export default Vue.extend({
  name: 'v-row-functional',

  functional: true,

  props: {
    headers: Array as PropValidator<TableHeader[]>,
    item: Object,
    mobile: Boolean
  },

  render (h, { props, slots, data, children }): VNode {
    const computedSlots = slots()

    const columns = props.headers.map(header => {
      const classes = {
        [`text-xs-${header.align || 'left'}`]: true
      }

      const children = []
      const value = getObjectValueByPath(props.item, header.value)

      const scopedSlot = data.scopedSlots && data.scopedSlots[`item.column.${header.value}`]

      if (scopedSlot) {
        children.push(scopedSlot({ item: props.item, header, value, mobile: props.mobile }))
      } else {
        if (props.mobile) {
          children.push(h('div', { class: 'd-flex justify-content-between' }, [
            h('span', [header.text]),
            h('span', { class: 'text-xs-right' }, [value])
          ]))
        } else {
          children.push(value)
        }
      }

      return h('td', {
        class: classes
      }, children)
    }) as any

    if (computedSlots.prepend) {
      columns.unshift(computedSlots.prepend)
    }

    if (computedSlots.append) {
      columns.push(computedSlots.append)
    }

    const tr = h('tr', {
      staticClass: data.staticClass,
      class: data.class,
      key: data.key
    }, columns)

    if (children && children.length) {
      return [tr, ...children] as any
    }

    return tr
  }
})
