import { VNode, CreateElement } from 'vue'

export default {
  name: 'v-cell',

  functional: true,

  props: {
    head: {
      type: Boolean
    }
  },

  render (h: CreateElement, context: any): VNode {
    const { data, slots, props } = context
    const resolvedSlots = slots()

    return h('div', {
      staticClass: data.staticClass,
      class: {
        'v-head': props.head,
        'v-cell': !props.head,
        ...data.class
      },
      on: data.nativeOn
    }, resolvedSlots.default)
  }
}
