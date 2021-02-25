// Styles
import './VGrid.sass'

// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { defineComponent } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VContainer',

  props: makeProps({
    fluid: {
      type: Boolean,
      default: false,
    },
    ...makeTagProps(),
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
