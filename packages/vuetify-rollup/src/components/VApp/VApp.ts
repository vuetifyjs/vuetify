import './VApp.sass'

import { h, defineComponent } from 'vue'

export const VApp = defineComponent({
  setup (props, { slots, ...ctx }) {
    const obj = Object.assign({}, { padding: '10px' })
    return () => h('div', {
      class: 'v-application',
      styles: obj,
    }, slots.default!())
  },
})
