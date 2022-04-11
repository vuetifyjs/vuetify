// Components
import { makeVAvatarProps, VAvatar } from '@/components/VAvatar/VAvatar'

// Utilities
import { defineComponent } from '@/util'

export const VBannerAvatar = defineComponent({
  name: 'VBannerAvatar',

  props: makeVAvatarProps(),

  setup (props, { slots }) {
    return () => (
      <VAvatar
        class="v-banner-avatar"
        { ...props }
        v-slots={ slots }
      />
    )
  },
})
