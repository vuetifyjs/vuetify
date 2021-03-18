// Styles
import './VAvatar.sass'

// Composables
import { makeBorderRadiusProps, useBorderRadius } from '@/composables/border-radius'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { defineComponent, toRef } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VAvatar',

  props: makeProps({
    ...makeBorderRadiusProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
    color: String,
    left: Boolean,
    right: Boolean,
  }),

  setup (props, { slots }) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { borderRadiusClasses } = useBorderRadius(props)
    const { sizeClasses, sizeStyles } = useSize(props, 'v-avatar')

    return () => (
      <props.tag
        class={[
          'v-avatar',
          {
            'v-avatar--left': props.left,
            'v-avatar--right': props.right,
          },
          backgroundColorClasses.value,
          borderRadiusClasses.value,
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
