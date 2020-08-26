import './VApp.sass'

import { h, defineComponent } from 'vue'

export const VApp = defineComponent({
  name: 'VApp',
  setup (props, { slots, ...ctx }) {
    return () => h('div', {
      class: 'v-application',
      style: { padding: '10px' },
    }, [slots.default!()])
  },
})
