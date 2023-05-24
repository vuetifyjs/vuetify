// Styles
import './VBottomNavigation.sass'

// Components
import { VBtnToggleSymbol } from '@/components/VBtnToggle/VBtnToggle'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { useSsrBoot } from '@/composables/ssrBoot'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'

// Utilities
import { computed, toRef } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

export const makeVBottomNavigationProps = propsFactory({
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
  active: {
    type: Boolean,
    default: true,
  },

  ...makeBorderProps(),
  ...makeComponentProps(),
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
}, 'v-bottom-navigation')

export const VBottomNavigation = genericComponent()({
  name: 'VBottomNavigation',

  props: makeVBottomNavigationProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme()
    const { borderClasses } = useBorder(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'bgColor'))
    const { densityClasses } = useDensity(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)
    const { ssrBootStyles } = useSsrBoot()
    const height = computed(() => (
      Number(props.height) -
      (props.density === 'comfortable' ? 8 : 0) -
      (props.density === 'compact' ? 16 : 0)
    ))
    const isActive = toRef(props, 'active')
    const { layoutItemStyles } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: computed(() => 'bottom'),
      layoutSize: computed(() => isActive.value ? height.value : 0),
      elementSize: height,
      active: isActive,
      absolute: toRef(props, 'absolute'),
    })

    useGroup(props, VBtnToggleSymbol)

    provideDefaults({
      VBtn: {
        color: toRef(props, 'color'),
        density: toRef(props, 'density'),
        stacked: computed(() => props.mode !== 'horizontal'),
        variant: 'text',
      },
    }, { scoped: true })

    useRender(() => {
      return (
        <props.tag
          class={[
            'v-bottom-navigation',
            {
              'v-bottom-navigation--active': isActive.value,
              'v-bottom-navigation--grow': props.grow,
              'v-bottom-navigation--shift': props.mode === 'shift',
            },
            themeClasses.value,
            backgroundColorClasses.value,
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            roundedClasses.value,
            props.class,
          ]}
          style={[
            backgroundColorStyles.value,
            layoutItemStyles.value,
            {
              height: convertToUnit(height.value),
              transform: `translateY(${convertToUnit(!isActive.value ? 100 : 0, '%')})`,
            },
            ssrBootStyles.value,
            props.style,
          ]}
        >
          { slots.default && (
            <div class="v-bottom-navigation__content">
              { slots.default() }
            </div>
          )}
        </props.tag>
      )
    })

    return {}
  },
})

export type VBottomNavigation = InstanceType<typeof VBottomNavigation>
