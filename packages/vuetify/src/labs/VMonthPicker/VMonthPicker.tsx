// Styles
import './VMonthPicker.sass'

// Components
import { VFadeTransition } from '@/components/transitions'
import { VBtn } from '@/components/VBtn'
import { VDatePickerHeader } from '@/components/VDatePicker/VDatePickerHeader'
import { VDatePickerMonths } from '@/components/VDatePicker/VDatePickerMonths'
import { VDatePickerYears } from '@/components/VDatePicker/VDatePickerYears'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { makeVPickerProps, VPicker } from '@/labs/VPicker/VPicker'

// Composables
import { useMonthPicker } from './useMonthPicker'
import { useProxiedModel } from '@/composables/proxiedModel'
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VMonthPickerSlots = {
  header: never
  title: never
  actions: never
}

export const makeVMonthPickerProps = propsFactory({
  modelValue: {
    type: String as PropType<string | null>,
    default: null,
  },
  min: String,
  max: String,
  allowedMonths: [Array, Function] as PropType<number[] | ((date: number) => boolean)>,
  ...makeVPickerProps({
    title: 'Select month', // later: '$vuetify.monthPicker.title'
  }),
}, 'VMonthPicker')

export const VMonthPicker = genericComponent<VMonthPickerSlots>()({
  name: 'VMonthPicker',

  props: makeVMonthPickerProps(),

  emits: {
    'update:modelValue': (_value: string | null) => true,
  },

  setup (props, { slots }) {
    const model = useProxiedModel(props, 'modelValue')

    const {
      viewMode,
      month,
      year,
      yearTransitionName,
      headerText,
      prevYear,
      nextYear,
      toggleViewMode,
      setYear,
      setMonth,
    } = useMonthPicker(props, model)

    useRender(() => {
      return (
        <VPicker
          class="v-month-picker"
          color={ props.color }
          title={ props.title }
        >
          {{
            header: () => (
              <VDatePickerHeader header={ headerText.value } />
            ),
            default: () => (
              <>
                <VDefaultsProvider defaults={{ VBtn: { variant: 'text' } }}>
                  <div class="v-month-picker__controls pa-3 pb-0 d-flex justify-space-between align-center flex-grow-1">
                    <VBtn
                      icon="$prev"
                      onClick={ prevYear }
                    />
                    <VBtn
                      rounded
                      onClick={ toggleViewMode }
                      v-slots={{
                        default: () => (
                          <MaybeTransition name={ yearTransitionName.value } mode="out-in">
                            <span key={ year.value }>{ year.value }</span>
                          </MaybeTransition>
                        ),
                        append: () => (
                          <VIcon
                            icon="$dropdown"
                            style={{
                              transition: 'transform .2s ease-in-out',
                              transform: `rotate(${viewMode.value === 'years' ? 180 : 0}deg)`,
                            }}
                          />
                        ),
                      }}
                    />
                    <VBtn
                      icon="$next"
                      onClick={ nextYear }
                    />
                  </div>
                </VDefaultsProvider>

                <VFadeTransition hideOnLeave>
                  { viewMode.value === 'years' ? (
                    <VDatePickerYears
                      key="years"
                      class="flex-grow-1"
                      modelValue={ year.value }
                      min={ props.min }
                      max={ props.max }
                      onUpdate:modelValue={ setYear }
                    />
                  ) : (
                    <VDatePickerMonths
                      key="months"
                      class="flex-grow-1"
                      modelValue={ month.value ?? undefined }
                      year={ year.value }
                      min={ props.min }
                      max={ props.max }
                      allowedMonths={ props.allowedMonths }
                      onUpdate:modelValue={ setMonth }
                    />
                  )}
                </VFadeTransition>
              </>
            ),
            actions: slots.actions,
          }}
        </VPicker>
      )
    })

    return {}
  },
})

export type VMonthPicker = InstanceType<typeof VMonthPicker>
