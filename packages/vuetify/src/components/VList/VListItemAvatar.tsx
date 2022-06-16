// Components
import { makeVAvatarProps, VAvatar } from '@/components/VAvatar/VAvatar'

// Utilities
import { defineComponent } from '@/util'

export const VListItemAvatar = defineComponent({
  name: 'VListItemAvatar',

  props: makeVAvatarProps(),

  setup (props, { slots }) {
    return () => (
      <VAvatar
        class={[
          'v-list-item-avatar',
          {
            'v-list-item-avatar--start': props.start,
            'v-list-item-avatar--end': props.end,
          },
        ]}
        { ...props }
        v-slots={ slots }
      />
    )
  },
})
