// Components
import { VBtn } from '@/components/VBtn/VBtn'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVStepperActions = propsFactory({
  color: String,
  backText: {
    type: String,
    default: 'Back'
  },
  continueText: {
    type: String,
    default: 'Continue'
  },
}, 'VStepperActions')

export const VStepperActions = genericComponent()({
  name: 'VStepperActions',

  props: makeVStepperActions(),

  emits: {
    'click:back': () => true,
    'click:continue': () => true,
  },

  setup (props, { emit, slots }) {
    function onClickBack () {
      emit('click:back')
    }

    function onClickContinue () {
      emit('click:continue')
    }

    useRender(() => {
      return (
        <div class="v-stepper__actions">
          <VBtn
            text={ props.backText }
            variant="text"
            onClick={ onClickBack }
          />

          <VBtn
            color={ props.color }
            text={ props.continueText }
            variant="text"
            onClick={ onClickContinue }
          />
        </div>
      )
    })
    return {}
  }
})
