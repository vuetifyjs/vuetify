// Styles
import './VSheet.sass'

// Utilities
import { defineComponent, h } from 'vue'
import makeProps from '@/util/makeProps'

// Composables
import {
  makeBorderProps,
  makeBorderRadiusProps,
  makeDimensionProps,
  makeElevationProps,
  makePositionProps,
  makeTagProps,
  useBorder,
  useBorderRadius,
  useDimension,
  useElevation,
  usePosition,
  useTheme,
} from '@/composables'

export default defineComponent({
  name: 'VSheet',

  props: makeProps({
    ...makeBorderProps(),
    ...makeBorderRadiusProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeTagProps(),
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme()
    const { borderClasses } = useBorder(props)
    const { borderRadiusClasses } = useBorderRadius(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props)

    return () => (
      h(props.tag, {
        class: [
          'v-sheet',
          themeClasses.value,
          borderClasses.value,
          borderRadiusClasses.value,
          elevationClasses.value,
          positionClasses.value,
        ],
        style: [
          dimensionStyles.value,
          positionStyles.value,
        ],
      }, slots)
    )
  },
})
