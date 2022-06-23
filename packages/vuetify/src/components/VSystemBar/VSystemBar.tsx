// Styles
import './VSystemBar.sass'

// Composables
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { computed, ref, toRef } from 'vue'
import { defineComponent, useRender } from '@/util'

export const VSystemBar = defineComponent({
  name: 'VSystemBar',

  props: {
    color: String,
    height: [Number, String],
    window: Boolean,

    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)
    const height = computed(() => props.height ?? props.window ? 32 : 24)
    const { layoutItemStyles } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: ref('top'),
      layoutSize: height,
      elementSize: height,
      active: computed(() => true),
      absolute: toRef(props, 'absolute'),
    })

    useRender(() => (
      <props.tag
        class={[
          'v-system-bar',
          { 'v-system-bar--window': props.window },
          themeClasses.value,
          backgroundColorClasses.value,
          elevationClasses.value,
          roundedClasses.value,
        ]}
        style={[
          backgroundColorStyles.value,
          layoutItemStyles.value,
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})
