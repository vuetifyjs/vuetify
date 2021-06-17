// Styles
import './VBanner.sass'

// Components
import { VAvatar } from '@/components/VAvatar'
import { VBannerActions, VBannerAvatar, VBannerContent, VBannerText } from './'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { useDisplay } from '@/composables/display'
import { useTextColor } from '@/composables/color'

// Utilities
import { defineComponent, toRef } from 'vue'
import { makeProps } from '@/util'

export default defineComponent({
  name: 'VBanner',

  props: makeProps({
    avatar: String,
    color: String,
    icon: String,
    lines: {
      type: String,
      default: 'one',
    },
    sticky: Boolean,
    text: String,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { borderClasses } = useBorder(props, 'v-banner')
    const { densityClasses } = useDensity(props, 'v-banner')
    const { dimensionStyles } = useDimension(props)
    const { mobile } = useDisplay()
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-banner')
    const { roundedClasses } = useRounded(props, 'v-banner')
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'color'))

    return () => {
      const hasAvatar = !!(props.avatar || props.icon || slots.avatar || slots.icon)
      const hasText = !!(props.text || slots.text)
      const hasContent = hasAvatar || hasText || slots.default

      return (
        <props.tag
          class={[
            'v-banner',
            {
              'v-banner--is-mobile': mobile.value,
              'v-banner--sticky': props.sticky,
              [`v-banner--${props.lines}-line`]: true,
            },
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            positionClasses.value,
            roundedClasses.value,
            textColorClasses.value,
            themeClasses.value,
          ]}
          style={[
            dimensionStyles.value,
            positionStyles.value,
            textColorStyles.value,
          ]}
          role="banner"
        >
          { hasContent && (
            <VBannerContent>
              { hasAvatar && (
                <VBannerAvatar>
                  <VAvatar
                    density={ props.density }
                    icon={ props.icon }
                    image={ props.avatar }
                  />
                </VBannerAvatar>
              ) }

              { hasText && (
                <VBannerText>
                  { slots.text ? slots.text() : props.text }
                </VBannerText>
              ) }

              { slots.default?.() }
            </VBannerContent>
          ) }

          { slots.actions && (
            <VBannerActions v-slots={{ default: slots.actions }} />
          ) }
        </props.tag>
      )
    }
  },
})
