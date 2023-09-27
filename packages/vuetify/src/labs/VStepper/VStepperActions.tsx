// Components
import { VBtn } from '@/components/VBtn/VBtn'

// Composables
import { useLocale } from '@/composables/locale'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVStepperActionsProps = propsFactory({
  color: String,
  disabled: {
    type: [Boolean, String] as PropType<boolean | 'next' | 'prev'>,
    default: false,
  },
  prevText: {
    type: String,
    default: '$vuetify.stepper.prev',
  },
  nextText: {
    type: String,
    default: '$vuetify.stepper.next',
  },
}, 'VStepperActions')

export const VStepperActions = genericComponent()({
  name: 'VStepperActions',

  props: makeVStepperActionsProps(),

  emits: {
    'click:prev': () => true,
    'click:next': () => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    function onClickPrev () {
      emit('click:prev')
    }

    function onClickNext () {
      emit('click:next')
    }

    useRender(() => {
      return (
        <div class="v-stepper-actions">
          <VBtn
            disabled={['prev', true].includes(props.disabled)}
            text={ t(props.prevText) }
            variant="text"
            onClick={ onClickPrev }
          />

          <VBtn
            disabled={['next', true].includes(props.disabled)}
            color={ props.color }
            text={ t(props.nextText) }
            variant="tonal"
            onClick={ onClickNext }
          />
        </div>
      )
    })
    return {}
  },
})
