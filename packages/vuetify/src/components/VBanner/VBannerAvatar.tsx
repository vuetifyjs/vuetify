// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { defineComponent } from 'vue'
import { makeProps } from '@/util'

export default defineComponent({
  name: 'VBannerAvatar',

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
            'v-banner-avatar',
            {
              'v-banner-avatar--start': props.left,
              'v-banner-avatar--end': props.right,
            },
          ]}
          v-slots={ slots }
        />
      )
    }
  },
})
