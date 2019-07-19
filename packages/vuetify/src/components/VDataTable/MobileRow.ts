import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { TableHeader } from './mixins/header'
import { getObjectValueByPath } from '../../util/helpers'

export default Vue.extend({
  name: 'row',

  functional: true,

  props: {
    headers: Array as PropValidator<TableHeader[]>,
    item: Object,
    rtl: Boolean,
  },

  render (h, { props, slots, data }): VNode {
    const computedSlots = slots()

    const columns: VNode[] = props.headers.map((header: TableHeader) => {
      const classes = {
        'v-data-table__mobile-row': true,
      }

      const children = []
      const value = getObjectValueByPath(props.item, header.value)

      const slotName = header.value
      const scopedSlot = data.scopedSlots && data.scopedSlots[slotName]
      const regularSlot = computedSlots[slotName]

      if (scopedSlot) {
        children.push(scopedSlot({ item: props.item, header, value }))
      } else if (regularSlot) {
        children.push(regularSlot)
      } else {
        children.push(value)
      }

      return h('td', {
        class: classes,
      }, [
        h('div', { staticClass: 'v-data-table__mobile-row__wrapper' }, [
          header.value !== 'dataTableSelect' && h('div', { staticClass: 'v-data-table__mobile-row__header' }, [header.text]),
          h('div', { staticClass: 'v-data-table__mobile-row__cell' }, children),
        ]),
      ])
    })

    return h('tr', data, columns)
  },
})
