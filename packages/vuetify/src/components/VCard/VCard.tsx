// Styles
import './VCard.sass'

// Components
import {
  VCardActions,
  VCardAvatar,
  VCardHeader,
  VCardImg,
  VCardItem,
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
      const hasImage = (slots.image || props.image)
      const hasHeader = props.title || props.subtitle
      const hasPrepend = props.prependAvatar || props.prependIcon
      const hasAppend = props.appendAvatar || props.appendIcon
      const hasItem = hasHeader || hasPrepend || hasAppend

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

          { hasItem && (
            <VCardItem>
              { hasPrepend && (
                <VCardAvatar>
                  <VAvatar
                    density={ props.density }
                    icon={ props.prependIcon }
                    image={ props.prependAvatar }
                  />
                </VCardAvatar>
              ) }

              { hasHeader && (
                <VCardHeader>
                  { props.title && (
                    <VCardTitle>{ props.title }</VCardTitle>
                  ) }

                  { props.subtitle && (
                    <VCardSubtitle>{ props.subtitle }</VCardSubtitle>
                  ) }
                </VCardHeader>
              ) }

              { hasAppend && (
                <VCardAvatar>
                  <VAvatar
                    density={ props.density }
                    icon={ props.appendIcon }
                    image={ props.appendAvatar }
                  />
                </VCardAvatar>
              ) }
            </VCardItem>
          ) }

          { props.text && (
            <VCardText>{props.text}</VCardText>
          ) }

          { slots.default?.() }

          { slots.actions && (
            <VCardActions>{slots.actions()}</VCardActions>
          ) }
        </props.tag>
      )
    }
  },
})
