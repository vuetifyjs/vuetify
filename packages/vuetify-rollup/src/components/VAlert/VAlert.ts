import './VAlert.sass'

import { defineComponent, h } from 'vue'

export const VAlert = defineComponent({
  name: 'VAlert',
  props: {
    type: {
      type: String,
      default: 'info',
    },
  },
  setup (props, context) {
    return () => h('div', {
      class: {
        foo: true,
        [props.type]: true,
      },
    }, [context.slots.default!()])
  },
})
