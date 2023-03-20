// Styles
import './VSheet.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLocationProps, useLocation } from '@/composables/location'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { genericComponent, pick, propsFactory, useRender } from '@/util'
import { toRef } from 'vue'

// Types
import type { ExtractPropTypes } from 'vue'

export const makeVSheetProps = propsFactory({
  color: String,

  ...makeBorderProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'v-sheet')

export const VSheet = genericComponent()({
  name: 'VSheet',

  props: {
    ...makeVSheetProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { borderClasses } = useBorder(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { locationStyles } = useLocation(props)
    const { positionClasses } = usePosition(props)
    const { roundedClasses } = useRounded(props)

    useRender(() => (
      <props.tag
        class={[
          'v-sheet',
          themeClasses.value,
          backgroundColorClasses.value,
          borderClasses.value,
          elevationClasses.value,
          positionClasses.value,
          roundedClasses.value,
        ]}
        style={[
          backgroundColorStyles.value,
          dimensionStyles.value,
          locationStyles.value,
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VSheet = InstanceType<typeof VSheet>

export function filterSheetProps (props: ExtractPropTypes<ReturnType<typeof makeVSheetProps>>) {
  return pick(props, Object.keys(VSheet?.props ?? {}) as any)
}
