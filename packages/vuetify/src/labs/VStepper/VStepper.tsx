// Styles
import './VStepper.sass'

// Components
import { VStepperActions } from './VStepperActions'
import { VStepperHeader } from './VStepperHeader'
import { makeVSheetProps, VSheet } from '@/components/VSheet/VSheet'

// Composables
import { makeGroupProps, useGroup } from '@/composables/group'

// Utilities
import { computed } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { InjectionKey } from 'vue'
import type { GroupItemProvide } from '@/composables/group'

export const VStepperSymbol: InjectionKey<GroupItemProvide> = Symbol.for('vuetify:v-stepper')

export type VStepperSlot = {
  prev: () => void
  next: () => void
}

export type VStepperSlots = {
  default: VStepperSlot
  actions: VStepperSlot
  header: never
}

export const makeVStepperProps = propsFactory({
  altLabels: Boolean,
  nonLinear: Boolean,
  flat: Boolean,
  showActions: Boolean,
  backText: {
    type: String,
    default: 'Back',
  },
  continueText: {
    type: String,
    default: 'Continue',
  },
  // vertical: Boolean,

  ...makeGroupProps({
    mandatory: 'force' as const,
    selectedClass: 'v-stepper-item--selected',
  }),
  ...omit(makeVSheetProps(), ['color']),
}, 'VStepper')

export const VStepper = genericComponent<VStepperSlots>()({
  name: 'VStepper',

  props: makeVStepperProps(),

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  setup (props, { slots }) {
    const { next, prev } = useGroup(props, VStepperSymbol)

    const slotProps = computed(() => ({ next, prev }))

    useRender(() => {
      const [sheetProps] = VSheet.filterProps(props)

      return (
        <VSheet
          { ...sheetProps }
          class={[
            'v-stepper',
            {
              'v-stepper--alt-labels': props.altLabels,
              'v-stepper--flat': props.flat,
              'v-stepper--non-linear': props.nonLinear,
              // 'v-stepper--vertical': props.vertical,
            },
            props.class,
          ]}
          style={ props.style }
        >
          { slots.header && (
            <VStepperHeader
              v-slots={{ default: slots.header }}
            />
          )}

          { slots.default?.(slotProps.value) }

          { props.showActions && (
            slots.actions?.(slotProps.value) ?? (
              <VStepperActions
                onClick:back={ prev }
                onClick:continue={ next }
              />
            )
          )}
        </VSheet>
      )
    })

    return {}
  },
})
