// Styles
import './VSheet.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { useBackgroundColor } from '@/composables/color'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { toRef } from 'vue'
import { defineComponent } from '@/util'

export const VSheet = defineComponent({
  name: 'VSheet',

  props: {
    color: String,

    ...makeBorderProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { borderClasses } = useBorder(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props)
    const { roundedClasses } = useRounded(props)

    return () => (
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
          positionStyles.value,
        ]}
        v-slots={ slots }
      />
    )
  },
})
