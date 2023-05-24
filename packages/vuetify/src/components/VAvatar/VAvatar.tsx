// Styles
import './VAvatar.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { VImg } from '@/components/VImg'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { IconValue } from '@/composables/icons'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVAvatarProps = propsFactory({
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  image: String,

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'flat' } as const),
}, 'v-avatar')

export const VAvatar = genericComponent()({
  name: 'VAvatar',

  props: makeVAvatarProps(),

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { colorClasses, colorStyles, variantClasses } = useVariant(props)
    const { densityClasses } = useDensity(props)
    const { roundedClasses } = useRounded(props)
    const { sizeClasses, sizeStyles } = useSize(props)

    useRender(() => (
      <props.tag
        class={[
          'v-avatar',
          {
            'v-avatar--start': props.start,
            'v-avatar--end': props.end,
          },
          themeClasses.value,
          colorClasses.value,
          densityClasses.value,
          roundedClasses.value,
          sizeClasses.value,
          variantClasses.value,
          props.class,
        ]}
        style={[
          colorStyles.value,
          sizeStyles.value,
          props.style,
        ]}
      >
        { props.image
          ? (<VImg key="image" src={ props.image } alt="" cover />)
          : props.icon
            ? (<VIcon key="icon" icon={ props.icon } />)
            : slots.default?.()
        }

        { genOverlays(false, 'v-avatar') }
      </props.tag>
    ))

    return {}
  },
})

export type VAvatar = InstanceType<typeof VAvatar>
