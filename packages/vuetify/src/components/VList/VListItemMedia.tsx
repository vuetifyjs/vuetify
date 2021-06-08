// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { defineComponent } from 'vue'
import { makeProps } from '@/util'

export default defineComponent({
  name: 'VListItemMedia',

  props: makeProps({
    left: Boolean,
    right: Boolean,
    ...makeTagProps(),
  }),

  setup (props, { slots }) {
    return () => {
      return (
        <props.tag
          class={[
            'v-list-item-media',
            {
              'v-list-item-media--left': props.left,
              'v-list-item-media--right': props.right,
            },
          ]}
          v-slots={ slots }
        />
      )
    }
  },
})
