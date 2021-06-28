// Styles
import './VBottomNavigation.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps, useTheme } from '@/composables/theme'

// Utilities
import { computed, defineComponent } from 'vue'
import { convertToUnit } from '@/util'
import { makeProps } from '@/util/makeProps'

export default defineComponent({
  name: 'VBottomNavigation',

  props: makeProps({
    bgColor: String,
    color: String,
    grow: Boolean,
    modelValue: {
      type: Boolean,
      default: true,
    },
    mode: {
      type: String,
      validator: (v: any) => !v || ['horizontal', 'shift'].includes(v),
    },
    height: {
      type: [Number, String],
      default: 56,
    },
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeLayoutItemProps({
      name: 'bottom-navigation',
    }),
    ...makeTagProps({ tag: 'header' }),
    ...makeThemeProps(),
  }),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
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
    const isActive = useProxiedModel(props, 'modelValue', props.modelValue)
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
              'v-bottom-navigation--grow': props.grow,
              'v-bottom-navigation--horizontal': props.mode === 'horizontal',
              'v-bottom-navigation--is-active': isActive.value,
              'v-bottom-navigation--shift': props.mode === 'shift',
              'v-bottom-navigation--absolute': props.absolute,
            },
            themeClasses.value,
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
