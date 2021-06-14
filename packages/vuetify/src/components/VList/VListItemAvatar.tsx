// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { defineComponent } from 'vue'
import { makeProps } from '@/util'

export default defineComponent({
  name: 'VListItemAvatar',

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
            'v-list-item-avatar',
            {
              'v-list-item-avatar--start': props.left,
              'v-list-item-avatar--end': props.right,
            },
          ]}
          v-slots={ slots }
        />
      )
    }
  },
})
