// Components
import { makeVExpansionPanelProps, VExpansionPanel } from '@/components/VExpansionPanel/VExpansionPanel'
import { makeStepperItemProps } from '@/components/VStepper/VStepperItem'

// Utilities
import { ref } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types

export const makeVStepperVerticalProps = propsFactory({
  ...makeStepperItemProps(),
  ...makeVExpansionPanelProps(),
}, 'VStepperVertical')

export const VStepperVertical = genericComponent()({
  name: 'VStepperVertical',

  props: makeVStepperVerticalProps(),

  setup (props, { slots }) {
    const vExpansionPanelRef = ref<typeof VExpansionPanel>()

    useRender(() => {
      return (
        <VExpansionPanel
          ref={ vExpansionPanelRef }
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
          { /* {{
            default: ({ prev, next }) => {
              return slots.default?.({ prev, next })
            },
          }} */ }
        </VExpansionPanel>
      )
    })

    return {}
  },
})

export type VStepperVertical = InstanceType<typeof VStepperVertical>
