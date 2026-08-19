// Components
import { makeVStepperActionsProps, VStepperActions } from '@/components/VStepper/VStepperActions'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { VStepperActionsSlots } from '@/components/VStepper/VStepperActions'

export const makeVStepperVerticalActionsProps = propsFactory({
  ...makeVStepperActionsProps(),
}, 'VStepperActions')

export const VStepperVerticalActions = genericComponent<VStepperActionsSlots>()({
  name: 'VStepperVerticalActions',

  props: makeVStepperVerticalActionsProps(),

  emits: {
    'click:prev': () => true,
    'click:next': () => true,
  },

  setup (props, { emit, slots }) {
    function onClickPrev () {
      emit('click:prev')
    }

    function onClickNext () {
      emit('click:next')
    }

    useRender(() => {
      const stepperActionsProps = VStepperActions.filterProps(props)

      return (
        <VStepperActions
          class="v-stepper-vertical-actions"
          { ...stepperActionsProps }
          onClick:prev={ onClickPrev }
          onClick:next={ onClickNext }
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type VStepperVerticalActions = InstanceType<typeof VStepperVerticalActions>
