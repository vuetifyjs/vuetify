// Styles
import './VGrid.sass'

// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { defineComponent } from '@/util'

export const VContainer = defineComponent({
  name: 'VContainer',

  props: {
    fluid: {
      type: Boolean,
      default: false,
    },
    ...makeTagProps(),
  },

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
