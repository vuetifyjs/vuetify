// Styles
import './VDateRangePicker.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VTextField } from '@/components/VTextField'
import { VPicker } from '@/labs/VPicker'

// Composables
import { createDatePicker } from '../VDatePicker/composables'
import { makeTransitionProps } from '@/composables/transition'
import { useDate } from '@/labs/date'
import { makeVPickerProps } from '@/labs/VPicker/VPicker'

// Utilities
import { ref, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import { makeVDateRangePickerHeaderProps, VDateRangePickerHeader } from './VDateRangePickerHeader'
import { makeVDateRangePickerMonthProps, VDateRangePickerMonth } from './VDateRangePickerMonth'
import { makeDateProps } from '../VDateInput/composables'

export const makeVDateRangePickerProps = propsFactory({
  ...makeDateProps(),
  ...makeVPickerProps(),
  ...makeVDateRangePickerHeaderProps(),
  ...makeVDateRangePickerMonthProps(),
  ...makeTransitionProps({ transition: 'fade' }),
  mobile: Boolean,
}, 'VDateRangePicker')

export const VDateRangePicker = genericComponent()({
  name: 'VDateRangePicker',

  props: makeVDateRangePickerProps(),

  emits: {
    'update:modelValue': (date: any) => true,
    'update:viewMode': (mode: 'month' | 'year') => true,
    'update:inputMode': (input: string) => true,
    'update:displayDate': (date: any) => true,
    save: (date: any) => true,
    cancel: () => true,
  },

  setup (props, { emit }) {
    const adapter = useDate()
    const { model, displayDate, inputMode } = createDatePicker(props, true)

    const inputModel = ref(props.modelValue[0] ? adapter.format(props.modelValue[0], 'keyboardDate') : '')

    // watch(() => props.modelValue, newValue => {
    //   if (!newValue?.length) return

    //   inputModel.value = adapter.format(newValue[0], 'keyboardDate')
    // })

    // watch(inputModel, () => {
    //   const { isValid, date } = adapter

    //   selected.value = isValid(inputModel.value) ? [date(inputModel.value)] : []
    // })

    // watch(selected, () => {
    //   if (!props.showActions) {
    //     emit('update:modelValue', selected.value)
    //   }
    // })

    // function handleInput (value: any, index: number) {
    //   if (value.length === 10 && adapter.isValid(value)) {
    //     const modelValue = props.modelValue.slice()
    //     modelValue.splice(index, value)
    //     emit('update:modelValue', modelValue)
    //   }
    // }
    const handleCancel = () => emit('cancel')
    const handleSave = () => {
      emit('update:modelValue', model.value)
      emit('save', model.value)
    }

    useRender(() => {
      const [pickerProps] = VPicker.filterProps(props)
      const [dateRangePickerHeaderProps] = VDateRangePickerHeader.filterProps(props)
      const [dateRangePickerMonthProps] = VDateRangePickerMonth.filterProps(props)

      return (
        <VPicker
          { ...pickerProps }
          key={ inputMode.value }
          class={[
            'v-date-range-picker',
            `v-date-range-picker--${inputMode.value}`,
          ]}
          v-slots={{
            header: () => (
              <>
                <VDateRangePickerHeader
                  { ...dateRangePickerHeaderProps }
                  modelValue={ model.value }
                  inputMode={ inputMode.value}
                  displayDate={ displayDate.value }
                  onUpdate:displayDate={ v => displayDate.value = v }
                  onUpdate:inputMode={ v => inputMode.value = v }
                  onCancel={ handleCancel }
                  onSave={ handleSave }
                />
                { !props.hideWeekdays && (
                  <div class="v-date-picker-month">
                    <div class="v-date-picker-month__days">
                      {adapter.getWeekdays().map(weekDay => (
                        <div
                          class={[
                            'v-date-picker-month__day',
                            'v-date-picker-month__weekday',
                          ]}
                        >{ weekDay }</div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ),
            default: () => inputMode.value === 'calendar' ? (
              <VDateRangePickerMonth
                { ...dateRangePickerMonthProps }
                v-model={ model.value }
                v-model:displayDate={ displayDate.value }
              />
            ) : (
              <div class="v-date-range-picker__input">
                <VTextField
                  label="From"
                  placeholder="yyyy/mm/dd"
                  v-model={ inputModel.value }
                />
                <VTextField
                  label="To"
                  placeholder="yyyy/mm/dd"
                  v-model={ inputModel.value }
                />
              </div>
            ),
            actions: inputMode.value === 'keyboard' ? () => (
              <div>
                <VBtn variant="text" color={ props.color } onClick={ handleCancel }>Cancel</VBtn>
                <VBtn variant="text" color={ props.color } onClick={ handleSave }>Ok</VBtn>
              </div>
            ) : undefined,
          }}
        />
      )
    })
  },
})

export type VDateRangePicker = InstanceType<typeof VDateRangePicker>
