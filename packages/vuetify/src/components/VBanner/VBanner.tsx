// Styles
import './VBanner.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'

// Utilities
import { defineComponent } from 'vue'
import { makeProps } from '@/util'

export default defineComponent({
  name: 'VBanner',

  props: makeProps({
    avatar: String,
    icon: String,
    mobile: Boolean,
    singleLine: Boolean,
    sticky: Boolean,
    ...makeBorderProps(),
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
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-banner')
    const { roundedClasses } = useRounded(props, 'v-banner')

    return () => {
      const hasThumbnail = (!!props.avatar || !!props.icon || !!slots.thumbnail)

      return (
        <props.tag
          class={[
            'v-banner',
            {
              'v-banner--has-thumbnail': hasThumbnail,
              'v-banner--is-mobile': props.mobile,
              'v-banner--single-line': props.singleLine,
              'v-banner--sticky': props.sticky,
            },
            themeClasses.value,
            borderClasses.value,
            roundedClasses.value,
            elevationClasses.value,
            positionClasses.value,
          ]}
          style={[
            dimensionStyles.value,
            positionStyles.value,
          ]}
          role="banner"
        >
          <div class="v-banner__sizer">
            <div class="v-banner__content">
              { hasThumbnail && (
                <div class="v-banner__thumbnail">
                  { slots.thumbnail?.() }
                  { props.avatar && (
                    <img class="v-banner__avatar" src={ props.avatar } alt=""></img>
                  )}
                  { props.icon && <i class="v-banner__icon">{ props.icon }</i> }
                </div>
              )}
              <div class="v-banner__text">{ slots.default?.() }</div>
            </div>
            { slots.actions && (
              <div class="v-banner__actions">{ slots.actions?.() }</div>
            )}
          </div>
        </props.tag>
      )
    }
  },
})
