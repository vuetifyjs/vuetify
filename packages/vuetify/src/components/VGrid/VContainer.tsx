// Styles
import './VGrid.sass'

// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { defineComponent, useRender } from '@/util'

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
    useRender(() => (
      <props.tag
        class={[
          'v-container',
          { 'v-container--fluid': props.fluid },
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})
