// Components
import { VBtn } from '@/components/VBtn/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'

// Composables
import { injectComponentDefaults, injectNestedDefaults } from '@/composables/defaults'
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
    const btnDefaults = injectNestedDefaults<VBtn['$props']>('VBtn')
    const prevDefaults = injectComponentDefaults<VBtn['$props']>('VStepperActionsPrevBtn')
    const nextDefaults = injectComponentDefaults<VBtn['$props']>('VStepperActionsNextBtn')

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
      const prevProps = {
        disabled: ['prev', true].includes(props.disabled),
        text: t(props.prevText),
        variant: prevDefaults.value?.variant ?? btnDefaults.value?.variant ?? 'text',
      }
      const nextProps = {
        color: props.color,
        disabled: ['next', true].includes(props.disabled),
        text: t(props.nextText),
        variant: nextDefaults.value?.variant ?? btnDefaults.value?.variant ?? 'tonal',
      }

      return (
        <div class="v-stepper-actions">
          <VDefaultsProvider
            defaults={{
              VBtn: prevProps,
              VStepperActionsPrevBtn: { ...btnDefaults.value, ...prevDefaults.value, ...prevProps },
            }}
          >
            { slots.prev?.({ props: prevSlotProps }) ?? (
              <VBtn _as="VStepperActionsPrevBtn" { ...prevSlotProps } />
            )}
          </VDefaultsProvider>

          <VDefaultsProvider
            defaults={{
              VBtn: nextProps,
              VStepperActionsNextBtn: { ...btnDefaults.value, ...nextDefaults.value, ...nextProps },
            }}
          >
            { slots.next?.({ props: nextSlotProps }) ?? (
              <VBtn _as="VStepperActionsNextBtn" { ...nextSlotProps } />
            )}
          </VDefaultsProvider>
        </div>
      )
    })

    return {}
  },
})

export type VStepperActions = InstanceType<typeof VStepperActions>
