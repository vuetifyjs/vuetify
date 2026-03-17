// Styles
import './VExpansionPanel.sass'

// Components
import { VExpansionPanelSymbol } from './shared'
import { makeVExpansionPanelProps } from './VExpansionPanel'

// Composables
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeGroupProps, useGroup } from '@/composables/group'
import { useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { toRef } from 'vue'
import { convertToUnit, genericComponent, pick, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { GenericProps } from '@/util'

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
  gap: [String, Number],
  noDivider: Boolean,
  rounded: [Boolean, Number, String, Array] as PropType<boolean | number | string | (number | string)[]>,

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
    'static',
    'tile',
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

export const VExpansionPanels = genericComponent<new <TModel>(
  props: {
    modelValue?: TModel
    'onUpdate:modelValue'?: (value: TModel) => void
  },
  slots: VExpansionPanelSlots
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VExpansionPanels',

  props: makeVExpansionPanelsProps(),

  emits: {
    'update:modelValue': (val: unknown) => true,
  },

  setup (props, { slots }) {
    const { next, prev } = useGroup(props, VExpansionPanelSymbol)

    const { themeClasses } = provideTheme(props)

    const outerRounded = toRef(() => Array.isArray(props.rounded) ? props.rounded[0] : props.rounded)
    const innerRounded = toRef(() => Array.isArray(props.rounded) ? props.rounded[1] : undefined)
    const { roundedClasses, roundedStyles } = useRounded(outerRounded)

    const variantClass = toRef(() => props.variant && `v-expansion-panels--variant-${props.variant}`)

    provideDefaults({
      VExpansionPanel: {
        bgColor: toRef(() => props.bgColor),
        collapseIcon: toRef(() => props.collapseIcon),
        color: toRef(() => props.color),
        eager: toRef(() => props.eager),
        elevation: toRef(() => props.elevation),
        expandIcon: toRef(() => props.expandIcon),
        focusable: toRef(() => props.focusable),
        hideActions: toRef(() => props.hideActions),
        readonly: toRef(() => props.readonly),
        ripple: toRef(() => props.ripple),
        static: toRef(() => props.static),
      },
    })

    useRender(() => (
      <props.tag
        class={[
          'v-expansion-panels',
          {
            'v-expansion-panels--flat': props.flat,
            'v-expansion-panels--tile': props.tile,
            'v-expansion-panels--no-divider': props.noDivider || !!props.gap,
          },
          themeClasses.value,
          roundedClasses.value,
          variantClass.value,
          props.class,
        ]}
        style={[
          roundedStyles.value,
          {
            '--v-expansion-panels-outer-radius': roundedStyles.value.borderRadius,
            '--v-expansion-panels-inner-radius': convertToUnit(innerRounded.value),
            gap: props.gap ? convertToUnit(props.gap) : undefined,
          },
          props.style,
        ]}
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
