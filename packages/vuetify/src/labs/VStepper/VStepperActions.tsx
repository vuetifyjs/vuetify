// Components
import { VBtn } from '@/components/VBtn/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'

// Composables
import { useLocale } from '@/composables/locale'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VStepperActionsSlots = {
  prev: {
    props: { onClick: () => void }
  }
  next: {
    props: { onClick: () => void }
  }
}

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

export const VStepperActions = genericComponent<VStepperActionsSlots>()({
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
      const prevSlotProps = {
        onClick: onClickPrev,
      }
      const nextSlotProps = {
        onClick: onClickNext,
      }

      return (
        <div class="v-stepper-actions">
          <VDefaultsProvider
            defaults={{
              VBtn: {
                disabled: ['prev', true].includes(props.disabled),
                text: t(props.prevText),
                variant: 'text',
              },
            }}
          >
            { slots.prev?.({ props: prevSlotProps }) ?? (
              <VBtn { ...prevSlotProps } />
            )}
          </VDefaultsProvider>

          <VDefaultsProvider
            defaults={{
              VBtn: {
                color: props.color,
                disabled: ['next', true].includes(props.disabled),
                text: t(props.nextText),
                variant: 'tonal',
              },
            }}
          >
            { slots.next?.({ props: nextSlotProps }) ?? (
              <VBtn { ...nextSlotProps } />
            )}
          </VDefaultsProvider>
        </div>
      )
    })

    return {}
  },
})

export type VStepperActions = InstanceType<typeof VStepperActions>
