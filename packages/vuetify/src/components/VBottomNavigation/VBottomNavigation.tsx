// Styles
import './VBottomNavigation.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { provideDefaults } from '@/composables/defaults'
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, reactive, toRef } from 'vue'
import { convertToUnit, defineComponent } from '@/util'

// Types
import { VBtnToggleSymbol } from '../VBtnToggle/VBtnToggle'

export const VBottomNavigation = defineComponent({
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

    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeLayoutItemProps({ name: 'bottom-navigation' }),
    ...makeTagProps({ tag: 'header' }),
    ...makeGroupProps({
      modelValue: true,
      selectedClass: 'v-btn--selected',
    }),
    ...makeThemeProps(),
  },

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { borderClasses } = useBorder(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(computed(() => props.bgColor))
    const { textColorClasses, textColorStyles } = useTextColor(computed(() => props.color))
    const { densityClasses } = useDensity(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)
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

    useGroup(props, VBtnToggleSymbol)

    provideDefaults(reactive({
      defaults: {
        VBtn: {
          color: toRef(props, 'color'),
          density: toRef(props, 'density'),
          height: 'auto',
          maxWidth: 168,
          minWidth: 80,
          stacked: computed(() => props.mode !== 'horizontal'),
          variant: 'text',
          width: computed(() => props.grow ? '100%' : 'auto'),
        },
      },
    }))

    return () => {
      return (
        <props.tag
          class={[
            'v-bottom-navigation',
            {
              'v-bottom-navigation--absolute': props.absolute,
              'v-bottom-navigation--active': isActive.value,
              'v-bottom-navigation--shift': props.mode === 'shift',
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

export type VBottomNavigation = InstanceType<typeof VBottomNavigation>
