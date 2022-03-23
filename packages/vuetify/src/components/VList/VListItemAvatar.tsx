// Components
import { VAvatar } from '@/components/VAvatar'

// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { defineComponent } from '@/util'

export const VListItemAvatar = defineComponent({
  name: 'VListItemAvatar',

  props: {
    start: Boolean,
    end: Boolean,

    ...makeTagProps(),
  },

  setup (props, { slots }) {
    return () => {
      return (
        <VAvatar
          class={[
            'v-list-item-avatar',
            {
              'v-list-item-avatar--start': props.start,
              'v-list-item-avatar--end': props.end,
            },
          ]}
          v-slots={ slots }
        />
      )
    }
  },
})
