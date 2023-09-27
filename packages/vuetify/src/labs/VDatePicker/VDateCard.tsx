// @ts-nocheck
/* eslint-disable */

// Styles
import './VDateCard.sass'

// Components
import { makeVDatePickerControlsProps, VDatePickerControls } from './VDatePickerControls'
import { makeVDatePickerMonthProps, VDatePickerMonth } from './VDatePickerMonth'
import { makeVDatePickerYearsProps, VDatePickerYears } from './VDatePickerYears'
import { VFadeTransition } from '@/components/transitions'
import { VBtn } from '@/components/VBtn'
import { VCard } from '@/components/VCard/VCard'

// Composables
import { createDatePicker } from './composables'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VCardSlots } from '@/components/VCard/VCard'

export const makeVDateCardProps = propsFactory({
  cancelText: {
    type: String,
    default: '$vuetify.datePicker.cancel',
  },
  okText: {
    type: String,
    default: '$vuetify.datePicker.ok',
  },
  inputMode: {
    type: String as PropType<'keyboard' | 'calendar'>,
    default: 'calendar',
  },
  hideActions: Boolean,

  ...makeVDatePickerControlsProps(),
  ...makeVDatePickerMonthProps(),
  ...makeVDatePickerYearsProps(),
  ...makeTransitionProps({ transition: { component: VFadeTransition, leaveAbsolute: true } }),
}, 'VDateCard')

export const VDateCard = genericComponent<VCardSlots>()({
  name: 'VDateCard',

  props: makeVDateCardProps(),

  emits: {
    save: () => true,
    cancel: () => true,
    'update:displayDate': (value: any) => true,
    'update:inputMode': (value: any) => true,
    'update:modelValue': (value: any) => true,
    'update:viewMode': (mode: 'month' | 'year') => true,
  },

  setup (props, { emit, slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const { t } = useLocale()

    createDatePicker(props)

    function onDisplayUpdate (val: any) {
      emit('update:displayDate', val)
    }

    function onViewModeUpdate (val: any) {
      emit('update:viewMode', val)
    }

    function onSave () {
      emit('update:modelValue', model.value)
      emit('save')
    }

    function onCancel () {
      emit('cancel')
    }

    useRender(() => {
      const [cardProps] = VCard.filterProps(props)
      const [datePickerControlsProps] = VDatePickerControls.filterProps(props)
      const [datePickerMonthProps] = VDatePickerMonth.filterProps(props)
      const [datePickerYearsProps] = VDatePickerYears.filterProps(props)
      const hasActions = !props.hideActions || !!slots.actions

      return (
        <VCard
          { ...cardProps }
          class="v-date-card"
        >
          {{
            ...slots,
            default: () => (
              <>
                <VDatePickerControls
                  { ...datePickerControlsProps }
                  onUpdate:displayDate={ onDisplayUpdate }
                  onUpdate:viewMode={ onViewModeUpdate }
                />

                <MaybeTransition transition={ props.transition }>
                  { props.viewMode === 'month' ? (
                    <VDatePickerMonth
                      { ...datePickerMonthProps }
                      v-model={ model.value }
                      onUpdate:displayDate={ onDisplayUpdate }
                    />
                  ) : (
                    <VDatePickerYears
                      { ...datePickerYearsProps }
                      onUpdate:displayDate={ onDisplayUpdate }
                      onUpdate:viewMode={ onViewModeUpdate }
                    />
                  )}
                </MaybeTransition>
              </>
            ),
            actions: !hasActions ? undefined : () => (
              <>
                { slots.actions?.() ?? (
                  <>
                    <VBtn onClick={ onCancel } text={ t(props.cancelText) } />
                    <VBtn onClick={ onSave } text={ t(props.okText) } />
                  </>
                )}
              </>
            ),
          }}
        </VCard>
      )
    })

    return {}
  },
})

export type VDateCard = InstanceType<typeof VDateCard>
