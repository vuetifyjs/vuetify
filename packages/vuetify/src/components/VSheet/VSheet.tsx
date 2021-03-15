// Styles
import './VSheet.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeBorderRadiusProps, useBorderRadius } from '@/composables/border-radius'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeTagProps } from '@/composables/tag'
import { useBackgroundColor } from '@/composables/color'
import { useTheme } from '@/composables/theme'

// Types
import type { BorderProps } from '@/composables/border'
import type { BorderRadiusProps } from '@/composables/border-radius'
import type { DimensionProps } from '@/composables/dimensions'
import type { ElevationProps } from '@/composables/elevation'
import type { PositionProps } from '@/composables/position'

// Utilities
import { defineComponent, computed, toRef } from 'vue'
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

export interface SheetProps extends BorderProps, BorderRadiusProps, DimensionProps, ElevationProps, PositionProps {
  color?: string
}

export function useSheet (props: SheetProps, name: string) {
  const { themeClasses } = useTheme()
  const { borderClasses } = useBorder(props, name)
  const { borderRadiusClasses } = useBorderRadius(props)
  const { dimensionStyles } = useDimension(props)
  const { elevationClasses } = useElevation(props)
  const { positionClasses, positionStyles } = usePosition(props, name)
  const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))

  return {
    sheetClasses: computed(() => [
      themeClasses.value,
      borderClasses.value,
      borderRadiusClasses.value,
      elevationClasses.value,
      positionClasses.value,
      backgroundColorClasses.value,
    ]),
    sheetStyles: computed(() => [
      dimensionStyles.value,
      positionStyles.value,
      backgroundColorStyles.value,
    ]),
  }
}

export default defineComponent({
  name: 'VSheet',

  props: makeProps({
    color: String,
    ...makeSheetProps(),
  }),

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
