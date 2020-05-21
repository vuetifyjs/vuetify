// import './VAlert.sass'

import { defineComponent, h } from 'vue'
import { publicComponent } from '../../util/helpers'

const VAlertImpl = defineComponent({
  props: {
    type: String,
  },
  setup (props, context) {
    return () => h('div', {
      class: 'foo',
    }, context.slots.default!())
  },
})

export const VAlert = publicComponent(VAlertImpl)
