import './VAlert.sass'

import { defineComponent, h } from 'vue'

export const VAlert = defineComponent({
  setup (props, context) {
    return () => h('div', {
      class: 'v-alert',
    }, context.slots.default!())
  },
})
