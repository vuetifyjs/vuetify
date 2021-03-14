import './VAvatar.sass'

// Composables
import { makeTagProps } from '@/composables/tag'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeBorderRadiusProps, useBorderRadius } from '@/composables/border-radius'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { defineComponent, toRef } from 'vue'

export default defineComponent({
  name: 'VAvatar',

  props: {
    color: String,
    left: Boolean,
    right: Boolean,
    ...makeTagProps(),
    ...makeSizeProps(),
    ...makeBorderRadiusProps(),
  },

  setup (props, { slots }) {
    const { borderRadiusClasses } = useBorderRadius(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { sizeClasses, sizeStyles } = useSize(props, 'v-avatar')

    return () => (
      <props.tag
        class={[
          'v-avatar',
          {
            'v-avatar--left': props.left,
            'v-avatar--right': props.right,
          },
          borderRadiusClasses.value,
          backgroundColorClasses.value,
          sizeClasses.value,
        ]}
        style={[
          backgroundColorStyles.value,
          sizeStyles.value,
        ]}
      >
        { slots.default?.() }
      </props.tag>
    )
  },
})
