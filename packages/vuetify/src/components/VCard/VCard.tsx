// Styles
import './VCard.sass'

// Components
import {
  VCardActions,
  VCardAvatar,
  VCardHeader,
  VCardImg,
  VCardItem,
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
import { useTheme } from '@/composables/theme'

// Utilities
import { defineComponent, toRef } from 'vue'
import { makeProps } from '@/util'

export default defineComponent({
  name: 'VCard',

  props: makeProps({
    appendAvatar: String,
    appendIcon: String,
    color: String,
    disabled: Boolean,
    flat: Boolean,
    hover: Boolean,
    image: String,
    prependAvatar: String,
    prependIcon: String,
    subtitle: String,
    text: String,
    title: String,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme()
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { borderClasses } = useBorder(props, 'v-card')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-card')
    const { roundedClasses } = useRounded(props, 'v-card')
    const { densityClasses } = useDensity(props, 'v-card')

    return () => {
      const hasTitle = (slots.title || props.title)
      const hasSubtitle = (slots.subtitle || props.subtitle)
      const hasHeader = (hasTitle || hasSubtitle)
      const hasAppend = (slots.append || props.appendAvatar || props.appendIcon)
      const hasPrepend = (slots.prepend || props.prependAvatar || props.prependIcon)
      const hasImage = (slots.image || props.image)
      const hasItem = hasHeader || hasPrepend || hasAppend
      const hasText = (slots.text || props.text)

      return (
        <props.tag
          class={[
            'v-card',
            {
              'v-card--flat': props.flat,
              'v-card--hover': props.hover && !(props.disabled || props.flat),
              'v-card--disabled': props.disabled,
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
        >
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

          { hasItem && (
            <VCardItem>
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

              { hasHeader && (
                <VCardHeader>
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
                </VCardHeader>
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
            </VCardItem>
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
