// Styles
import './VFooter.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { useResizeObserver } from '@/composables/resizeObserver'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, shallowRef, toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVFooterProps = propsFactory({
  app: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 'auto',
  },

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({ tag: 'footer' }),
  ...makeThemeProps(),
}, 'v-footer')

export const VFooter = genericComponent()({
  name: 'VFooter',

  props: makeVFooterProps(),

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { borderClasses } = useBorder(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)

    const autoHeight = shallowRef(32)
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
          props.class,
        ]}
        style={[
          backgroundColorStyles.value,
          props.app ? layoutItemStyles.value : undefined,
          props.style,
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VFooter = InstanceType<typeof VFooter>
