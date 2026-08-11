// Styles
import './VNavRail.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { useRtl } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { useSsrBoot } from '@/composables/ssrBoot'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'

// Utilities
import { computed, toRef } from 'vue'
import { convertToUnit, genericComponent, propsFactory, toPhysical, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

const locations = ['start', 'end', 'left', 'right'] as const

export type VNavRailSlots = {
  default: never
  prepend: never
  append: never
}

export const makeVNavRailProps = propsFactory({
  color: String,
  bgColor: String,
  location: {
    type: String as PropType<typeof locations[number]>,
    default: 'start',
    validator: (value: any) => locations.includes(value),
  },
  width: {
    type: [Number, String],
    default: 80,
  },
  align: {
    type: String as PropType<'start' | 'center' | 'end'>,
    default: 'center',
  },
  active: {
    type: Boolean,
    default: true,
  },

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeLayoutItemProps({ name: 'nav-rail' }),
  ...makeTagProps({ tag: 'nav' }),
  ...makeThemeProps(),
}, 'VNavRail')

export const VNavRail = genericComponent<VNavRailSlots>()({
  name: 'VNavRail',

  props: makeVNavRailProps(),

  emits: {
    'update:active': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const { isRtl } = useRtl()
    const { themeClasses } = useTheme()
    const { borderClasses } = useBorder(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.bgColor)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses, roundedStyles } = useRounded(props)
    const { ssrBootStyles } = useSsrBoot()

    const location = toRef(() => toPhysical(props.location, isRtl.value) as 'left' | 'right')
    const width = computed(() => Number(props.width))
    const isActive = useProxiedModel(props, 'active', props.active)

    const { layoutItemStyles } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: location,
      layoutSize: toRef(() => isActive.value ? width.value : 0),
      elementSize: width,
      active: isActive,
      absolute: toRef(() => props.absolute),
    })

    provideDefaults({
      VNavRailItem: {
        color: toRef(() => props.color),
      },
    })

    useRender(() => {
      return (
        <props.tag
          class={[
            'v-nav-rail',
            `v-nav-rail--${location.value}`,
            `v-nav-rail--align-${props.align}`,
            {
              'v-nav-rail--active': isActive.value,
            },
            themeClasses.value,
            backgroundColorClasses.value,
            borderClasses.value,
            elevationClasses.value,
            roundedClasses.value,
            props.class,
          ]}
          style={[
            backgroundColorStyles.value,
            layoutItemStyles.value,
            {
              width: convertToUnit(width.value),
            },
            ssrBootStyles.value,
            roundedStyles.value,
            props.style,
          ]}
        >
          { slots.prepend && (
            <div class="v-nav-rail__prepend">
              { slots.prepend() }
            </div>
          )}

          { slots.default && (
            <div class="v-nav-rail__content">
              { slots.default() }
            </div>
          )}

          { slots.append && (
            <div class="v-nav-rail__append">
              { slots.append() }
            </div>
          )}
        </props.tag>
      )
    })

    return {}
  },
})

export type VNavRail = InstanceType<typeof VNavRail>
