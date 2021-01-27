// Styles
import './VSheet.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeBorderRadiusProps, useBorderRadius } from '@/composables/border-radius'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeTagProps } from '@/composables/tag'
import { useTheme } from '@/composables/theme'

// Utilities
import { computed, defineComponent, h } from 'vue'
import makeProps from '@/util/makeProps'
import propsFactory from '@/util/propsFactory'

// Types
import type { BorderProps } from '@/composables/border'
import type { BorderRadiusProps } from '@/composables/border-radius'
import type { DimensionProps } from '@/composables/dimensions'
import type { ElevationProps } from '@/composables/elevation'
import type { PositionProps } from '@/composables/position'
import type { TagProps } from '@/composables/tag'

export interface SheetProps extends
  BorderProps,
  BorderRadiusProps,
  DimensionProps,
  ElevationProps,
  PositionProps,
  TagProps {}

export const makeSheetProps = propsFactory({
  ...makeBorderProps(),
  ...makeBorderRadiusProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makePositionProps(),
  ...makeTagProps(),
})

export function useSheet (props: SheetProps, name: string) {
  const { themeClasses } = useTheme()
  const { borderClasses } = useBorder(props)
  const { borderRadiusClasses } = useBorderRadius(props)
  const { dimensionStyles } = useDimension(props)
  const { elevationClasses } = useElevation(props)
  const { positionClasses, positionStyles } = usePosition(props, name)

  const sheetClasses = computed(() => {
    return [
      name,
      themeClasses.value,
      borderClasses.value,
      borderRadiusClasses.value,
      elevationClasses.value,
      positionClasses.value,
    ]
  })

  const sheetStyles = computed(() => {
    return [
      dimensionStyles.value,
      positionStyles.value,
    ]
  })

  return { sheetClasses, sheetStyles }
}

export default defineComponent({
  name: 'VSheet',

  props: makeProps(makeSheetProps()),

  setup (props, { slots }) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-sheet')

    return () => (
      h(props.tag, {
        class: sheetClasses.value,
        style: sheetStyles.value,
      }, slots)
    )
  },
})
