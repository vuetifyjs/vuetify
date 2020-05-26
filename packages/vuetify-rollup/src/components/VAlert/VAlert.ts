import './VAlert.sass'

import { defineComponent, h } from 'vue'
import { publicComponent } from '../../util/helpers'

const VAlertImpl = defineComponent({
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

export const VAlert = publicComponent(VAlertImpl)
