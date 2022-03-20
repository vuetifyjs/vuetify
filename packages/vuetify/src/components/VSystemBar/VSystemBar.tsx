// Styles
import './VSystemBar.sass'

// Composables
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useBackgroundColor } from '@/composables/color'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { computed, ref, toRef } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'

export const VSystemBar = defineComponent({
  name: 'VSystemBar',

  props: {
    color: String,
    height: [Number, String],
    position: {
      type: String as PropType<'top' | 'bottom'>,
      default: 'top',
      validator: (value: any) => ['top', 'bottom'].includes(value),
    },
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
    const resizeRef = ref<HTMLElement>()
    const { contentRect } = useResizeObserver(resizeRef)
    const { layoutItemStyles } = useLayoutItem({
      id: props.name,
      priority: computed(() => parseInt(props.priority, 10)),
      position: toRef(props, 'position'),
      layoutSize: computed(() => contentRect.value?.height ?? 0),
      elementSize: computed(() => props.height ?? props.window ? 32 : 24),
      active: computed(() => true),
      absolute: toRef(props, 'absolute'),
    })

    return () => (
      <props.tag
        ref={ resizeRef }
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
    )
  },
})
