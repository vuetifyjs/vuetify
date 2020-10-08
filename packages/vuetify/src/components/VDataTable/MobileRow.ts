import Vue, { VNode, PropType } from 'vue'
import { getObjectValueByPath } from '../../util/helpers'
import { DataTableHeader } from 'vuetify/types'

export default Vue.extend({
  name: 'row',

  functional: true,

  props: {
    headers: Array as PropType<DataTableHeader[]>,
    hideDefaultHeader: Boolean,
    item: Object,
    rtl: Boolean,
  },

  render (h, { props, slots, data }): VNode {
    const computedSlots = slots()

    const columns: VNode[] = props.headers.map((header: DataTableHeader) => {
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
        children.push(value == null ? value : String(value))
      }

      const mobileRowChildren = [
        h('div', {
          staticClass: 'v-data-table__mobile-row__cell',
        }, children),
      ]

      if (header.value !== 'dataTableSelect' && !props.hideDefaultHeader) {
        mobileRowChildren.unshift(
          h('div', {
            staticClass: 'v-data-table__mobile-row__header',
          }, [header.text])
        )
      }

      return h('td', { class: classes }, mobileRowChildren)
    })

    return h('tr', { ...data, staticClass: 'v-data-table__mobile-table-row' }, columns)
  },
})
