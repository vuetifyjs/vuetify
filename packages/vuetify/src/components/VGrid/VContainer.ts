import './VGrid.sass'

import { defineComponent, h } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VContainer',

  props: makeProps({
    tag: {
      type: String,
      default: 'div',
    },
    fluid: {
      type: Boolean,
      default: false,
    },
  }),

  setup (props, { slots }) {
    return () => h(props.tag, {
      class: [
        'v-container',
        { 'v-container--fluid': props.fluid },
      ],
    }, slots.default?.())
  },
})
