import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'v-row-group',

  functional: true,

  props: {
    open: {
      type: Boolean,
      default: true
    }
  },

  render (h, { slots, props }): VNode {
    const computedSlots = slots()
    const children = []

    if (computedSlots.header) children.push(...computedSlots.header)
    if (computedSlots.items && props.open) children.push(...computedSlots.items)
    if (computedSlots.summary) children.push(...computedSlots.summary)

    return children as any
  }
})
