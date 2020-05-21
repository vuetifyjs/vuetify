import './VApp.sass'

import { h, defineComponent } from 'vue'
import { publicComponent } from '../../util/helpers'

const VAppImpl = defineComponent({
  setup (props, { slots, ...ctx }) {
    const obj = Object.assign({}, { padding: '10px' })
    return () => h('div', {
      class: 'v-application',
      styles: obj,
    }, slots.default!())
  },
})

export const VApp = publicComponent(VAppImpl)
