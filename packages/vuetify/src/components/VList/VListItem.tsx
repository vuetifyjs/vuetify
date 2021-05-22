// Styles
import './VList.sass'

// Components
import {
  VListActions,
  VListAvatar,
  VListHeader,
  VListSubtitle,
  VListTitle,
} from './'
import { VAvatar } from '@/components/VAvatar'

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
  name: 'VListItem',

  props: makeProps({
    appendAvatar: String,
    appendIcon: String,
    appendImage: String,
    color: String,
    disabled: Boolean,
    image: String,
    prependAvatar: String,
    prependIcon: String,
    prependImage: String,
    subtitle: String,
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
    const { borderClasses } = useBorder(props, 'v-list-item')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-list-item')
    const { roundedClasses } = useRounded(props, 'v-list-item')
    const { densityClasses } = useDensity(props, 'v-list-item')

    return () => {
      const hasTitle = (slots.title || props.title)
      const hasSubtitle = (slots.subtitle || props.subtitle)
      const hasHeader = (hasTitle || hasSubtitle)
      const hasAppend = (slots.append || props.appendAvatar || props.appendIcon)
      const hasPrepend = (slots.prepend || props.prependAvatar || props.prependIcon)

      return (
        <props.tag
          class={[
            'v-list-item',
            {
              'v-list-item--disabled': props.disabled,
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
          { hasPrepend && (
            <VListAvatar>
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
            </VListAvatar>
          ) }

          { hasHeader && (
            <VListHeader>
              { hasTitle && (
                <VListTitle>
                  { slots.title
                    ? slots.title()
                    : props.title
                  }
                </VListTitle>
              ) }

              <VListSubtitle>
                { slots.subtitle
                  ? slots.subtitle()
                  : props.subtitle
                }
              </VListSubtitle>
            </VListHeader>
          ) }

          { hasAppend && (
            <VListAvatar>
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
            </VListAvatar>
          ) }

          { slots.default?.() }

          { slots.actions && (
            <VListActions v-slots={{ default: slots.actions }} />
          ) }
        </props.tag>
      )
    }
  },
})
