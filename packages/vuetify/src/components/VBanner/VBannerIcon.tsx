// Components
import { makeVAvatarProps, VAvatar } from '@/components/VAvatar/VAvatar'

// Utilities
import { defineComponent } from '@/util'

export const VBannerIcon = defineComponent({
  name: 'VBannerIcon',

  props: makeVAvatarProps(),

  setup (props, { slots }) {
    return () => (
      <VAvatar
        class={[
          'v-banner-icon',
          {
            'v-banner-icon--start': props.start,
            'v-banner-icon--end': props.end,
          },
        ]}
        { ...props }
        v-slots={ slots }
      />
    )
  },
})
