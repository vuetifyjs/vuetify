import './VBtnGroup.sass'

import { defineComponent } from '@/util'

export const VBtnGroup = defineComponent({
  name: 'VBtnGroup',

  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },

  setup (props, { slots }) {
    return () => (
      <props.tag class="v-btn-group">
        { slots.default?.() }
      </props.tag>
    )
  },
})
