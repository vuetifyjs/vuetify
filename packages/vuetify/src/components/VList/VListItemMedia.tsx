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
              'v-list-item-media--start': props.left,
              'v-list-item-media--end': props.right,
            },
          ]}
          v-slots={ slots }
        />
      )
    }
  },
})
