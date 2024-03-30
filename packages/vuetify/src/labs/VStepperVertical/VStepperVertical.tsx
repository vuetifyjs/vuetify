// Components
import { makeVExpansionPanelsProps, VExpansionPanels } from '@/components/VExpansionPanel/VExpansionPanels'
import { makeStepperProps } from '@/components/VStepper/VStepper'

// Utilities
import { ref } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types

export const makeVStepperVerticalProps = propsFactory({
  ...makeStepperProps(),
  ...makeVExpansionPanelsProps(),
}, 'VStepperVertical')

export const VStepperVertical = genericComponent()({
  name: 'VStepperVertical',

  props: makeVStepperVerticalProps(),

  setup (props, { slots }) {
    const vExpansionPanelsRef = ref<typeof VExpansionPanels>()

    useRender(() => {
      return (
        <VExpansionPanels
          ref={ vExpansionPanelsRef }
          { ...props }
          class={[
            'v-stepper',
            {
              'v-stepper--alt-labels': props.altLabels,
              'v-stepper--flat': props.flat,
              'v-stepper--non-linear': props.nonLinear,
              'v-stepper--mobile': props.mobile,
            },
            props.class,
          ]}
          style={ props.style }
        >
          {{
            default: ({ prev, next }) => {
              return slots.default?.({ prev, next })
            },
          }}
        </VExpansionPanels>
      )
    })

    return {}
  },
})

export type VStepperVertical = InstanceType<typeof VStepperVertical>
