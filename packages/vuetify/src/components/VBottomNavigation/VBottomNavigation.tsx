// Styles
import './VBottomNavigation.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useTheme } from '@/composables/theme'

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
    horizontal: Boolean,
    modelValue: {
      type: Boolean,
      default: true,
    },
    mode: {
      type: String,
      validator: (v: any) => !v || ['horizontal', 'shift'].includes(v),
    },
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeLayoutItemProps({
      name: 'bottom-navigation',
      size: 56,
    }),
    ...makeTagProps({ tag: 'header' }),
  }),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme()
    const { borderClasses } = useBorder(props, 'v-bottom-navigation')
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(computed(() => props.bgColor))
    const { textColorClasses, textColorStyles } = useTextColor(computed(() => props.color))
    const { densityClasses } = useDensity(props, 'v-bottom-navigation')
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-bottom-navigation')
    const { roundedClasses } = useRounded(props, 'v-bottom-navigation')
    const height = computed(() => (
      Number(props.size) +
      (props.density === 'comfortable' ? 8 : 0) -
      (props.density === 'compact' ? 16 : 0)
    ))
    const isActive = useProxiedModel(props, 'modelValue', props.modelValue)
    const layoutStyles = useLayoutItem(
      props.name,
      computed(() => props.priority),
      computed(() => 'bottom'),
      computed(() => isActive.value ? height.value : 0),
    )

    return () => {
      const translate = !isActive.value ? 100 : 0

      return (
        <props.tag
          class={[
            'v-bottom-navigation',
            {
              'v-bottom-navigation--grow': props.grow,
              'v-bottom-navigation--horizontal': props.mode === 'horizontal',
              'v-bottom-navigation--is-active': isActive.value,
              'v-bottom-navigation--shift': props.mode === 'shift',
            },
            themeClasses.value,
            backgroundColorClasses.value,
            borderClasses.value,
            textColorClasses.value,
            densityClasses.value,
            elevationClasses.value,
            positionClasses.value,
            roundedClasses.value,
          ]}
          style={[
            backgroundColorStyles.value,
            textColorStyles.value,
            layoutStyles.value,
            positionStyles.value,
            {
              height: convertToUnit(height.value),
              transform: `translateY(${convertToUnit(translate, '%')})`,
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
