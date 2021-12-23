// Styles
import './VFooter.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { defineComponent } from '@/util'

export const VFooter = defineComponent({
  name: 'VFooter',

  props: {
    ...makeBorderProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeTagProps({ tag: 'footer' }),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props)
    const { roundedClasses } = useRounded(props)

    return () => (
      <props.tag
        class={[
          'v-footer',
          themeClasses.value,
          borderClasses.value,
          elevationClasses.value,
          positionClasses.value,
          roundedClasses.value,
        ]}
        style={[

          dimensionStyles.value,
          positionStyles.value,
        ]}
        v-slots={ slots }
      />
    )
  },
})
