// Styles
import './VSystemBar.sass'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { useSsrBoot } from '@/composables/ssrBoot'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, shallowRef, toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVSystemBarProps = propsFactory({
  color: String,
  height: [Number, String],
  window: Boolean,

  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'v-system-bar')

export const VSystemBar = genericComponent()({
  name: 'VSystemBar',

  props: makeVSystemBarProps(),

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)
    const { ssrBootStyles } = useSsrBoot()
    const height = computed(() => props.height ?? (props.window ? 32 : 24))
    const { layoutItemStyles } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: shallowRef('top'),
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
          props.class,
        ]}
        style={[
          backgroundColorStyles.value,
          layoutItemStyles.value,
          ssrBootStyles.value,
          props.style,
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VSystemBar = InstanceType<typeof VSystemBar>
