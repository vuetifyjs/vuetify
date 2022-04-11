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
        class="v-banner-icon"
        { ...props }
        v-slots={ slots }
      />
    )
  },
})
