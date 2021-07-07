// Styles
import './VList.sass'

// Components
// import { VListItem } from '.'
import VListSubheader from './VListSubheader'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { useBackgroundColor } from '@/composables/color'
import { makeThemeProps, useTheme } from '@/composables/theme'

// Utilities
import { toRef } from 'vue'
import { defineComponent } from '@/util'

export default defineComponent({
  name: 'VList',

  props: {
    color: String,
    disabled: Boolean,
    lines: {
      type: String,
      default: 'one',
    },
    nav: Boolean,
    subheader: {
      type: [Boolean, String],
      default: false,
    },

    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { borderClasses } = useBorder(props, 'v-list')
    const { densityClasses } = useDensity(props, 'v-list')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props, 'v-list')

    return () => {
      const hasHeader = typeof props.subheader === 'string' || slots.subheader

      return (
        <props.tag
          class={[
            'v-list',
            {
              'v-list--disabled': props.disabled,
              'v-list--nav': props.nav,
              'v-list--subheader': props.subheader,
              'v-list--subheader-sticky': props.subheader === 'sticky',
              [`v-list--${props.lines}-line`]: true,
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
        >
          { hasHeader && (
            slots.subheader
              ? slots.subheader()
              : <VListSubheader>{ props.subheader }</VListSubheader>
          ) }

          { slots.default?.() }
        </props.tag>
      )
    }
  },
})
