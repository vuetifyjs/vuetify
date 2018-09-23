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
    console.log(computedSlots)
    if (computedSlots.header) children.push(...computedSlots.header)
    if (computedSlots.content && props.open) children.push(...computedSlots.content)
    if (computedSlots.summary) children.push(...computedSlots.summary)

    return children as any
  }
})
