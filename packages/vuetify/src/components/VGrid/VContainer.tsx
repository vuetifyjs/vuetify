import './VGrid.sass'

import { defineComponent } from 'vue'
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
    return () => (
      <props.tag
        class={[
          'v-container',
          { 'v-container--fluid': props.fluid },
        ]}
        v-slots={ slots }
      />
    )
  },
})
