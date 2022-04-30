// Styles
import './VFooter.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
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

export const VFooter = defineComponent({
  name: 'VFooter',

  props: {
    app: Boolean,
    color: String,
    inset: Boolean,
    height: {
      type: [Number, String],
      default: 'auto',
    },

    ...makeBorderProps(),
    ...makeElevationProps(),
    ...makeLayoutItemProps({
      priority: -1,
    }),
    ...makeRoundedProps(),
    ...makeTagProps({ tag: 'footer' }),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { borderClasses } = useBorder(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)

    const autoHeight = ref(32)
    const { resizeRef } = useResizeObserver(entries => {
      if (!entries.length) return
      autoHeight.value = entries[0].target.clientHeight
    })
    const height = computed(() => props.height === 'auto' ? autoHeight.value : parseInt(props.height, 10))
    const { layoutItemStyles } = useLayoutItem({
      id: props.name,
      priority: computed(() => props.inset ? 0 : parseInt(props.priority, 10)),
      position: computed(() => 'bottom'),
      layoutSize: height,
      elementSize: computed(() => props.height === 'auto' ? undefined : height.value),
      active: computed(() => props.app),
      absolute: toRef(props, 'absolute'),
    })

    return () => (
      <props.tag
        ref={ resizeRef }
        class={[
          'v-footer',
          themeClasses.value,
          backgroundColorClasses.value,
          borderClasses.value,
          elevationClasses.value,
          roundedClasses.value,
        ]}
        style={[
          backgroundColorStyles,
          props.app ? layoutItemStyles.value : undefined,
        ]}
        v-slots={ slots }
      />
    )
  },
})
