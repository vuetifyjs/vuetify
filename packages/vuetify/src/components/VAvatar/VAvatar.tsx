// Styles
import './VAvatar.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { VImg } from '@/components/VImg'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { defineComponent, useRender } from '@/util'
import { toRef } from 'vue'

export const VAvatar = defineComponent({
  name: 'VAvatar',

  props: {
    color: String,
    left: Boolean,
    right: Boolean,
    icon: String,
    image: String,

    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
  },

  setup (props, { slots }) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { densityClasses } = useDensity(props)
    const { roundedClasses } = useRounded(props)
    const { sizeClasses, sizeStyles } = useSize(props)

    useRender(() => (
      <props.tag
        class={[
          'v-avatar',
          {
            'v-avatar--left': props.left,
            'v-avatar--right': props.right,
          },
          backgroundColorClasses.value,
          densityClasses.value,
          roundedClasses.value,
          sizeClasses.value,
        ]}
        style={[
          backgroundColorStyles.value,
          sizeStyles.value,
        ]}
      >

        { props.image
          ? (<VImg src={ props.image } alt="" />)
          : props.icon
            ? (<VIcon icon={ props.icon } />)
            : slots.default?.()
        }
      </props.tag>
    ))

    return {}
  },
})

export type VAvatar = InstanceType<typeof VAvatar>
