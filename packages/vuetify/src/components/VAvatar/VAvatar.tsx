// Styles
import './VAvatar.sass'

// Components
import { VBadge } from '@/components/VBadge/VBadge'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VImg } from '@/components/VImg'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { IconValue } from '@/composables/icons'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'

// Utilities
import { computed } from 'vue'
import { genericComponent, isObject, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVAvatarProps = propsFactory({
  badge: {
    type: [Boolean, Object] as PropType<boolean | VBadge['$props']>,
    default: false,
  },
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  image: String,
  text: String,

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'flat' } as const),
}, 'VAvatar')

export type VAvatarSlots = {
  badge: never
}

export const VAvatar = genericComponent<VAvatarSlots>()({
  name: 'VAvatar',

  props: makeVAvatarProps(),

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props)
    const { colorClasses, colorStyles, variantClasses } = useVariant(props)
    const { densityClasses } = useDensity(props)
    const { roundedClasses } = useRounded(props)
    const { sizeClasses, sizeStyles } = useSize(props)

    const badgeDotSize = computed(() => {
      switch (props.size) {
        case 'x-small': return 8
        case 'small': return 10
        case 'large': return 14
        case 'x-large': return 16
        default: return 12
      }
    })

    const badgeOffset = computed(() => {
      const { floating } = isObject(props.badge) ? props.badge : {}
      return (floating ? badgeDotSize.value / 2 : 0) - 1.5
    })

    const badgeProps = computed(() => {
      return {
        bordered: true,
        dot: !slots.badge,
        dotSize: badgeDotSize.value,
        offsetX: badgeOffset.value,
        offsetY: badgeOffset.value,
        color: typeof props.badge === 'string' ? props.badge : 'primary',
        ...isObject(props.badge) ? props.badge : {},
      }
    })

    useRender(() => {
      const avatar = (
        <props.tag
          class={[
            'v-avatar',
            {
              'v-avatar--start': props.start,
              'v-avatar--end': props.end,
            },
            themeClasses.value,
            borderClasses.value,
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
          { !slots.default ? (
            props.image
              ? (<VImg key="image" src={ props.image } alt="" cover />)
              : props.icon
                ? (<VIcon key="icon" icon={ props.icon } />)
                : props.text
          ) : (
            <VDefaultsProvider
              key="content-defaults"
              defaults={{
                VImg: {
                  cover: true,
                  src: props.image,
                },
                VIcon: {
                  icon: props.icon,
                },
              }}
            >
              { slots.default() }
            </VDefaultsProvider>
          )}

          { genOverlays(false, 'v-avatar') }
        </props.tag>
      )

      return props.badge
        ? (
          <VBadge
            { ...badgeProps.value }
            v-slots={{
              default: () => avatar,
              badge: slots.badge,
            }}
          />
        )
        : avatar
    })

    return {}
  },
})

export type VAvatar = InstanceType<typeof VAvatar>
