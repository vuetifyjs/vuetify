// Styles
import './VCard.sass'

// Components
import {
  VCardActions,
  VCardAvatar,
  VCardHeader,
  VCardHeaderText,
  VCardImg,
  VCardMedia,
  VCardSubtitle,
  VCardText,
  VCardTitle,
} from './'
import { VAvatar } from '@/components/VAvatar'
import { VImg } from '@/components/VImg'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { useBackgroundColor } from '@/composables/color'
import { makeThemeProps, useTheme } from '@/composables/theme'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { defineComponent, toRef } from 'vue'
import { makeProps } from '@/util'

export default defineComponent({
  name: 'VCard',

  directives: { Ripple },

  props: makeProps({
    appendAvatar: String,
    appendIcon: String,
    color: String,
    disabled: Boolean,
    flat: Boolean,
    hover: Boolean,
    image: String,
    link: Boolean,
    prependAvatar: String,
    prependIcon: String,
    ripple: Boolean,
    subtitle: String,
    text: String,
    title: String,
    ...makeThemeProps(),
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { borderClasses } = useBorder(props, 'v-card')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-card')
    const { roundedClasses } = useRounded(props, 'v-card')
    const { densityClasses } = useDensity(props, 'v-card')

    return () => {
      const hasTitle = !!(slots.title || props.title)
      const hasSubtitle = !!(slots.subtitle || props.subtitle)
      const hasHeaderText = !!(hasTitle || hasSubtitle)
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon)
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon)
      const hasImage = !!(slots.image || props.image)
      const hasHeader = hasHeaderText || hasPrepend || hasAppend
      const hasText = !!(slots.text || props.text)
      const hasOverlay = props.link && !props.disabled

      return (
        <props.tag
          class={[
            'v-card',
            {
              'v-card--disabled': props.disabled,
              'v-card--flat': props.flat,
              'v-card--hover': props.hover && !(props.disabled || props.flat),
              'v-card--link': props.link,
            },
            themeClasses.value,
            backgroundColorClasses.value,
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            positionClasses.value,
            roundedClasses.value,
          ]}
          style={[
            backgroundColorStyles.value,
            dimensionStyles.value,
            positionStyles.value,
          ]}
          v-ripple={ hasOverlay }
        >
          { hasOverlay && (<div class="v-card__overlay" />) }

          { hasImage && (
            <VCardImg>
              { slots.image
                ? slots.image?.({ src: props.image })
                : (<VImg src={ props.image } alt="" />)
              }
            </VCardImg>
          ) }

          { slots.media && (
            <VCardMedia v-slots={{ default: slots.media }} />
          ) }

          { hasHeader && (
            <VCardHeader>
              { hasPrepend && (
                <VCardAvatar>
                  { slots.prepend
                    ? slots.prepend()
                    : (
                      <VAvatar
                        density={ props.density }
                        icon={ props.prependIcon }
                        image={ props.prependAvatar }
                      />
                    )
                  }
                </VCardAvatar>
              ) }

              { hasHeaderText && (
                <VCardHeaderText>
                  { hasTitle && (
                    <VCardTitle>
                      { slots.title
                        ? slots.title()
                        : props.title
                      }
                    </VCardTitle>
                  ) }

                  <VCardSubtitle>
                    { slots.subtitle
                      ? slots.subtitle()
                      : props.subtitle
                    }
                  </VCardSubtitle>
                </VCardHeaderText>
              ) }

              { hasAppend && (
                <VCardAvatar>
                  { slots.append
                    ? slots.append()
                    : (
                      <VAvatar
                        density={ props.density }
                        icon={ props.appendIcon }
                        image={ props.appendAvatar }
                      />
                    )
                  }
                </VCardAvatar>
              ) }
            </VCardHeader>
          ) }

          { hasText && (
            <VCardText>
              { slots.text ? slots.text() : props.text }
            </VCardText>
          ) }

          { slots.default?.() }

          { slots.actions && (
            <VCardActions v-slots={{ default: slots.actions }} />
          ) }
        </props.tag>
      )
    }
  },
})
