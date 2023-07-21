// Components
import { VBtn } from '@/components/VBtn/VBtn'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVStepperActions = propsFactory({
  color: String,
  disable: {
    type: [Boolean, String] as PropType<boolean | 'back' | 'continue'>,
    default: false,
  },
  backText: {
    type: String,
    default: 'Back',
  },
  continueText: {
    type: String,
    default: 'Continue',
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
        <div class="v-stepper-actions">
          <VBtn
            disabled={['back', true].includes(props.disable)}
            text={ props.backText }
            variant="text"
            onClick={ onClickBack }
          />

          <VBtn
            disabled={['continue', true].includes(props.disable)}
            color={ props.color }
            text={ props.continueText }
            variant="tonal"
            onClick={ onClickContinue }
          />
        </div>
      )
    })
    return {}
  },
})
