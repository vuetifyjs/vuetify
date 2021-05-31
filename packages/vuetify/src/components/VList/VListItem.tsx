// Styles
import './VListItem.sass'

// Components
import {
  VListItemAvatar,
  VListItemHeader,
  VListItemSubtitle,
  VListItemTitle,
} from './'
import { VAvatar } from '@/components/VAvatar'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { useBackgroundColor } from '@/composables/color'
import { useTheme } from '@/composables/theme'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { defineComponent, toRef } from 'vue'
import { makeProps } from '@/util'

export default defineComponent({
  name: 'VListItem',

  directives: { Ripple },

  props: makeProps({
    appendAvatar: String,
    appendIcon: String,
    color: String,
    disabled: Boolean,
    link: Boolean,
    prependAvatar: String,
    prependIcon: String,
    subtitle: String,
    title: String,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme()
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { borderClasses } = useBorder(props, 'v-list-item')
    const { densityClasses } = useDensity(props, 'v-list-item')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props, 'v-list-item')

    return () => {
      const hasTitle = (slots.title || props.title)
      const hasSubtitle = (slots.subtitle || props.subtitle)
      const hasHeader = !!(hasTitle || hasSubtitle)
      const hasAppend = (slots.append || props.appendAvatar || props.appendIcon)
      const hasPrepend = (slots.prepend || props.prependAvatar || props.prependIcon)
      const hasOverlay = props.link && !props.disabled

      return (
        <props.tag
          class={[
            'v-list-item',
            {
              'v-list-item--disabled': props.disabled,
              'v-list-item--link': props.link,
            },
            themeClasses.value,
            backgroundColorClasses.value,
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            roundedClasses.value,
          ]}
          style={[
            backgroundColorStyles.value,
            dimensionStyles.value,
          ]}
          v-ripple={ hasOverlay }
        >
          { hasOverlay && (<div class="v-list-item__overlay" />) }

          { hasPrepend && (
            <VListItemAvatar>
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
            </VListItemAvatar>
          ) }

          { hasHeader && (
            <VListItemHeader>
              { hasTitle && (
                <VListItemTitle>
                  { slots.title
                    ? slots.title()
                    : props.title
                  }
                </VListItemTitle>
              ) }

              { hasSubtitle && (
                <VListItemSubtitle>
                  { slots.subtitle
                    ? slots.subtitle()
                    : props.subtitle
                  }
                </VListItemSubtitle>
              ) }
            </VListItemHeader>
          ) }

          { hasAppend && (
            <VListItemAvatar>
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
            </VListItemAvatar>
          ) }

          { slots.default?.() }
        </props.tag>
      )
    }
  },
})
