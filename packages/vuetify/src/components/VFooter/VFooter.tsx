// Styles
import './VFooter.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeTagProps } from '@/composables/tag'
import { useTheme } from '@/composables/theme'

// Utilities
import { defineComponent } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VFooter',

  props: makeProps({
    ...makeBorderProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeTagProps({ tag: 'footer' }),
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme()
    const { borderClasses } = useBorder(props, 'v-footer')
    const { roundedClasses } = useRounded(props, 'v-footer')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-footer')

    return () => (
      <props.tag
        class={[
          'v-footer',
          borderClasses.value,
          elevationClasses.value,
          positionClasses.value,
          roundedClasses.value,
          themeClasses.value,
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
