// Styles
import './VBottomNavigation.sass'

// Composables
import { makeActiveProps, useActive } from '@/composables/active'
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { useBackgroundColor, useTextColor } from '@/composables/color'

// Utilities
import { computed } from 'vue'
import { convertToUnit, defineComponent } from '@/util'

export default defineComponent({
  name: 'VBottomNavigation',

  props: {
    bgColor: String,
    color: String,
    grow: Boolean,
    mode: {
      type: String,
      validator: (v: any) => !v || ['horizontal', 'shift'].includes(v),
    },
    height: {
      type: [Number, String],
      default: 56,
    },

    ...makeActiveProps({ active: true }),
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeLayoutItemProps({
      name: 'bottom-navigation',
    }),
    ...makeTagProps({ tag: 'header' }),
    ...makeThemeProps(),
  },

  emits: {
    'update:active': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { isActive, activeClasses } = useActive(props, 'v-bottom-navigation')
    const { borderClasses } = useBorder(props, 'v-bottom-navigation')
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(computed(() => props.bgColor))
    const { textColorClasses, textColorStyles } = useTextColor(computed(() => props.color))
    const { densityClasses } = useDensity(props, 'v-bottom-navigation')
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props, 'v-bottom-navigation')
    const height = computed(() => (
      Number(props.height) -
      (props.density === 'comfortable' ? 8 : 0) -
      (props.density === 'compact' ? 16 : 0)
    ))
    const layoutStyles = useLayoutItem(
      props.name,
      computed(() => props.priority),
      computed(() => 'bottom'),
      computed(() => isActive.value ? height.value : 0),
      height,
      isActive
    )

    return () => {
      return (
        <props.tag
          class={[
            'v-bottom-navigation',
            {
              'v-bottom-navigation--absolute': props.absolute,
              'v-bottom-navigation--grow': props.grow,
              'v-bottom-navigation--horizontal': props.mode === 'horizontal',
              'v-bottom-navigation--shift': props.mode === 'shift',
            },
            themeClasses.value,
            activeClasses.value,
            backgroundColorClasses.value,
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            roundedClasses.value,
            textColorClasses.value,
          ]}
          style={[
            backgroundColorStyles.value,
            layoutStyles.value,
            textColorStyles.value,
            {
              height: convertToUnit(height.value),
              transform: `translateY(${convertToUnit(!isActive.value ? 100 : 0, '%')})`,
            },
          ]}
        >
          { slots.default && (
            <div class="v-bottom-navigation__content">
              { slots.default() }
            </div>
          ) }
        </props.tag>
      )
    }
  },
})
