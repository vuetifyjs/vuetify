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
import { genericComponent, useRender } from '@/util'

export const VFooter = genericComponent()({
  name: 'VFooter',

  props: {
    app: Boolean,
    color: String,
    height: {
      type: [Number, String],
      default: 'auto',
    },

    ...makeBorderProps(),
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
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
      order: computed(() => parseInt(props.order, 10)),
      position: computed(() => 'bottom'),
      layoutSize: height,
      elementSize: computed(() => props.height === 'auto' ? undefined : height.value),
      active: computed(() => props.app),
      absolute: toRef(props, 'absolute'),
    })

    useRender(() => (
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
          backgroundColorStyles.value,
          props.app ? layoutItemStyles.value : undefined,
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VFooter = InstanceType<typeof VFooter>
