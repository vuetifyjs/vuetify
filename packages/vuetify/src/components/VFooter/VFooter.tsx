// Styles
import './VFooter.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { computed, toRef } from 'vue'
import { defineComponent } from '@/util'

export const VFooter = defineComponent({
  name: 'VFooter',

  props: {
    app: Boolean,
    color: String,
    inset: Boolean,

    ...makeBorderProps(),
    ...makeDimensionProps({ height: 'auto' }),
    ...makeElevationProps(),
    ...makeLayoutItemProps({
      name: 'bottom',
      priority: -1,
    }),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps({ tag: 'footer' }),
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

    const height = toRef(props, 'height')
    const { layoutItemStyles } = useLayoutItem({
      id: props.name,
      priority: computed(() => props.inset ? 0 : parseInt(props.priority, 10)),
      position: computed(() => 'bottom'),
      layoutSize: height,
      elementSize: height,
      active: computed(() => props.app),
      absolute: toRef(props, 'absolute'),
    })

    return () => (
      <props.tag
        class={[
          'v-footer',
          themeClasses.value,
          backgroundColorClasses.value,
          borderClasses.value,
          elevationClasses.value,
          positionClasses.value,
          roundedClasses.value,
        ]}
        style={[
          backgroundColorStyles,
          dimensionStyles.value,
          positionStyles.value,
          props.app ? layoutItemStyles.value : undefined,
        ]}
        v-slots={ slots }
      />
    )
  },
})
