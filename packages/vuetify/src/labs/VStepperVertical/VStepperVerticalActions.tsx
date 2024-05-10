// Components
import { VBtn } from '@/components/VBtn/VBtn'
import { makeVStepperActionsProps, VStepperActions } from '@/components/VStepper/VStepperActions'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export type VStepperActionsSlots = {
  prev: {
    props: { onClick: () => void }
  }
  next: {
    props: { onClick: () => void }
  }
}

export const makeVStepperVerticalActionsProps = propsFactory({
  finishText: {
    type: String,
    default: '$vuetify.stepper.finish',
  },
  finish: Boolean,

  ...makeVStepperActionsProps(),
}, 'VStepperActions')

export const VStepperVerticalActions = genericComponent<VStepperActionsSlots>()({
  name: 'VStepperVerticalActions',

  props: makeVStepperVerticalActionsProps(),

  emits: {
    'click:prev': () => true,
    'click:next': () => true,
    'click:finish': () => true,
  },

  setup (props, { emit, slots }) {
    function onClickPrev () {
      emit('click:prev')
    }

    function onClickNext () {
      if (props.finish) emit('click:finish')
      else emit('click:next')
    }

    useRender(() => {
      const stepperActionsProps = VStepperActions.filterProps(props)

      return (
        <VStepperActions
          class="v-stepper-vertical-actions"
          { ...stepperActionsProps }
          nextText={ props.finish ? props.finishText : undefined }
        >
          {{
            prev: (slotProps: any) => {
              return slots.prev?.(slotProps) ?? (
                <VBtn { ...slotProps.props } onClick={ onClickPrev } />
              )
            },
            next: (slotProps: any) => {
              return slots.next?.(slotProps) ?? (
                <VBtn { ...slotProps.props } onClick={ onClickNext } />
              )
            },
          }}
        </VStepperActions>
      )
    })

    return {}
  },
})

export type VStepperVerticalActions = InstanceType<typeof VStepperVerticalActions>
