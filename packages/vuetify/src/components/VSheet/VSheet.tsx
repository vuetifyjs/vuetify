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

// Types
import type { BorderProps } from '@/composables/border'
import type { BorderRadiusProps } from '@/composables/border-radius'
import type { DimensionProps } from '@/composables/dimensions'
import type { ElevationProps } from '@/composables/elevation'
import type { PositionProps } from '@/composables/position'

// Utilities
import { defineComponent, ref } from 'vue'
import makeProps from '@/util/makeProps'

export function makeSheetProps () {
  return {
    ...makeBorderProps(),
    ...makeBorderRadiusProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeTagProps(),
  }
}

export interface SheetProps extends BorderProps, BorderRadiusProps, DimensionProps, ElevationProps, PositionProps {}

export function useSheet (props: SheetProps, name: string) {
  const { themeClasses } = useTheme()
  const { borderClasses } = useBorder(props, name)
  const { borderRadiusClasses } = useBorderRadius(props)
  const { dimensionStyles } = useDimension(props)
  const { elevationClasses } = useElevation(props)
  const { positionClasses, positionStyles } = usePosition(props, name)

  return {
    sheetClasses: ref([
      themeClasses.value,
      borderClasses.value,
      borderRadiusClasses.value,
      elevationClasses.value,
      positionClasses.value,
    ]),
    sheetStyles: ref([
      dimensionStyles.value,
      positionStyles.value,
    ]),
  }
}

export default defineComponent({
  name: 'VSheet',

  props: makeProps(makeSheetProps()),

  setup (props, { slots }) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-sheet')

    return () => (
      <props.tag
        class={['v-sheet', sheetClasses.value]}
        style={ sheetStyles.value }
        v-slots={ slots }
      />
    )
  },
})
