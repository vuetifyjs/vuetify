// Styles
import './VCard.sass'

// Components
import { VImg } from '@/components'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
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
    color: String,
    flat: Boolean,
    hover: Boolean,
    image: String,
    raised: Boolean,
    subtitle: String,
    text: String,
    title: String,
    ...makeBorderProps(),
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

    return () => {
      const hasImage = (slots.image || props.image)

      return (
        <props.tag
          class={[
            'v-card',
            {
              'v-card--flat': props.flat,
              'v-card--hover': props.hover,
              // 'v-card--link': props.isClickable,
              // 'v-card--loading': props.loading,
              // 'v-card--disabled': props.disabled,
              'v-card--raised': props.raised,
            },
            themeClasses.value,
            backgroundColorClasses.value,
            borderClasses.value,
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
            <div class="v-card-image">
              { slots.image
                ? slots.image?.({ src: props.image })
                : (<img src={ props.image } />)
              }
            </div>
          ) }

          { props.title && (
            <div class="v-card-title">{props.title}</div>
          ) }

          { props.subtitle && (
            <div class="v-card-subtitle">{props.subtitle}</div>
          ) }

          { props.text && (
            <div class="v-card-text">{props.text}</div>
          ) }

          { slots.default?.() }

          { slots.actions && (
            <div class="v-card-actions">{slots.actions()}</div>
          ) }
        </props.tag>
      )
    }
  },
})
