// Styles
import './VStepper.sass'

// Components
import { makeVSheetProps, VSheet } from '@/components/VSheet/VSheet'

// Utilities
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { InjectionKey } from 'vue'
import { useGroup, type GroupItemProvide, makeGroupProps } from '@/composables/group'
import { VStepperHeader } from './VStepperHeader'
import { VStepperActions } from './VStepperActions'

export const VStepperSymbol: InjectionKey<GroupItemProvide> = Symbol.for('vuetify:v-stepper')

export type VStepperSlots = {
  default: never
  actions: {
    prev: () => void
    next: () => void
  }
  header: never
  content: never
}

export const makeVStepperProps = propsFactory({
  altLabels: Boolean,
  nonLinear: Boolean,
  flat: Boolean,
  hideActions: Boolean,
  backText: {
    type: String,
    default: 'Back'
  },
  continueText: {
    type: String,
    default: 'Continue'
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
            <VStepperHeader v-slots={{ default: slots.header }} />
          )}

          { slots.default?.() }

          { slots.content && (
            <div class="v-stepper__content">
              { slots.content() }
            </div>
          )}

          { slots.actions?.({ prev, next }) ?? (
            <VStepperActions
              onClick:back={ prev }
              onClick:continue={ next }
            />
          )}
        </VSheet>
      )
    })

    return {}
  }
})
