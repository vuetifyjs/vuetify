// Styles
import './VExpansionPanel.sass'

// Components
import { VExpansionPanelSymbol } from './shared'
import { makeVExpansionPanelProps } from './VExpansionPanel'

// Composables
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, toRef } from 'vue'
import { genericComponent, pick, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

const allowedVariants = ['default', 'accordion', 'inset', 'popout'] as const

type Variant = typeof allowedVariants[number]

export type VExpansionPanelSlot = {
  prev: () => void
  next: () => void
}

export type VExpansionPanelSlots = {
  default: VExpansionPanelSlot
}

export const makeVExpansionPanelsProps = propsFactory({
  flat: Boolean,

  ...makeGroupProps(),
  ...pick(makeVExpansionPanelProps(), [
    'bgColor',
    'collapseIcon',
    'color',
    'eager',
    'elevation',
    'expandIcon',
    'focusable',
    'hideActions',
    'readonly',
    'ripple',
    'rounded',
    'tile',
    'static',
  ]),
  ...makeThemeProps(),
  ...makeComponentProps(),
  ...makeTagProps(),

  variant: {
    type: String as PropType<Variant>,
    default: 'default',
    validator: (v: any) => allowedVariants.includes(v),
  },
}, 'VExpansionPanels')

export const VExpansionPanels = genericComponent<VExpansionPanelSlots>()({
  name: 'VExpansionPanels',

  props: makeVExpansionPanelsProps(),

  emits: {
    'update:modelValue': (val: unknown) => true,
  },

  setup (props, { slots }) {
    const { next, prev } = useGroup(props, VExpansionPanelSymbol)

    const { themeClasses } = provideTheme(props)

    const variantClass = computed(() => props.variant && `v-expansion-panels--variant-${props.variant}`)

    provideDefaults({
      VExpansionPanel: {
        bgColor: toRef(props, 'bgColor'),
        collapseIcon: toRef(props, 'collapseIcon'),
        color: toRef(props, 'color'),
        eager: toRef(props, 'eager'),
        elevation: toRef(props, 'elevation'),
        expandIcon: toRef(props, 'expandIcon'),
        focusable: toRef(props, 'focusable'),
        hideActions: toRef(props, 'hideActions'),
        readonly: toRef(props, 'readonly'),
        ripple: toRef(props, 'ripple'),
        rounded: toRef(props, 'rounded'),
        static: toRef(props, 'static'),
      },
    })

    useRender(() => (
      <props.tag
        class={[
          'v-expansion-panels',
          {
            'v-expansion-panels--flat': props.flat,
            'v-expansion-panels--tile': props.tile,
          },
          themeClasses.value,
          variantClass.value,
          props.class,
        ]}
        style={ props.style }
      >
        { slots.default?.({ prev, next }) }
      </props.tag>
    ))

    return {
      next,
      prev,
    }
  },
})

export type VExpansionPanels = InstanceType<typeof VExpansionPanels>
