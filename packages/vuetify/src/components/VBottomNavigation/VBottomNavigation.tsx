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
import { useBackgroundColor } from '@/composables/color'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, defineComponent, toRef } from 'vue'
import { convertToUnit } from '@/util'
import { makeProps } from '@/util/makeProps'

export default defineComponent({
  name: 'VBottomNavigation',

  props: makeProps({
    color: String,
    flat: Boolean,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: 56,
    },
    horizontal: Boolean,
    modelValue: {
      type: Boolean,
      default: true,
    },
    shift: Boolean,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeLayoutItemProps({ name: 'bottom-navigation' }),
    ...makeTagProps({ tag: 'header' }),
  }),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const { borderClasses } = useBorder(props, 'v-bottom-navigation')
    const { densityClasses } = useDensity(props, 'v-bottom-navigation')
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-bottom-navigation')
    const { roundedClasses } = useRounded(props, 'v-bottom-navigation')
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const height = computed(() => (
      Number(props.height) +
      (props.density === 'comfortable' ? 8 : 0) -
      (props.density === 'compact' ? 16 : 0)
    ))
    const isActive = useProxiedModel(props, 'modelValue', props.modelValue)
    const layoutStyles = useLayoutItem(
      props.name,
      toRef(props, 'priority'),
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
              'v-bottom-navigation--horizontal': props.horizontal,
              'v-bottom-navigation--is-active': isActive.value,
              'v-bottom-navigation--shift': props.shift,
            },
            backgroundColorClasses.value,
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            positionClasses.value,
            roundedClasses.value,
          ]}
          style={[
            backgroundColorStyles.value,
            layoutStyles.value,
            positionStyles.value,
            {
              height: convertToUnit(height.value),
              transform: `translateY(${convertToUnit(translate, '%')})`,
            },
          ]}
        >
          <div class="v-bottom-navigation__content">
            { slots.default?.() }
          </div>
        </props.tag>
      )
    }
  },
})
