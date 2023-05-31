// Styles
import './VDatePicker.sass'

// Components
import { VDatePickerControls } from './VDatePickerControls'
import { VDatePickerHeader } from './VDatePickerHeader'
import { VDatePickerMonth } from './VDatePickerMonth'
import { VDatePickerYears } from './VDatePickerYears'
import { VPicker } from '@/components/VPicker'
import { VTextField } from '@/components/VTextField'
import { VBtn } from '@/components/VBtn'

// Composables
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { useDate } from '@/labs/date'
import { dateEmits, makeDateProps } from '../VDateField/composables'
import { createDatePicker } from './composables'

// Utilites
import { ref, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVDatePickerProps = propsFactory({
  color: String,
  showActions: Boolean,

  ...makeDateProps(),
  ...makeTransitionProps({ transition: 'fade' }),
}, 'VDatePicker')

export const VDatePicker = genericComponent()({
  name: 'VDatePicker',

  props: makeVDatePickerProps(),

  emits: {
    save: (date: any) => true,
    cancel: () => true,
    ...dateEmits,
  },

  setup (props, { emit }) {
    const adapter = useDate()
    createDatePicker(props)

    const inputModel = ref(props.modelValue?.length ? adapter.format(props.modelValue[0], 'keyboardDate') : '')
    const selected = ref<any[]>(props.modelValue ?? [])

    watch(inputModel, () => {
      const { isValid, date } = adapter

      selected.value = isValid(inputModel.value) ? [date(inputModel.value)] : []
    })

    watch(selected, () => {
      if (!props.showActions) {
        emit('update:modelValue', selected.value)
      }
    })

    const handleCancel = () => emit('cancel')
    const handleSave = () => {
      emit('update:modelValue', selected.value)
      emit('save', selected.value)
    }

    useRender(() => {
      const [pickerProps] = VPicker.filterProps(props)
      const [datePickerHeaderProps] = VDatePickerHeader.filterProps(props)
      const [datePickerControlsProps] = VDatePickerControls.filterProps(props)
      const [datePickerMonthProps] = VDatePickerMonth.filterProps(props)
      const [datePickerYearsProps] = VDatePickerYears.filterProps(props)

      return (
        <VPicker
          { ...pickerProps }
          class="v-date-picker"
          v-slots={{
            header: () => (
              <VDatePickerHeader
                { ...datePickerHeaderProps }
                modelValue={ selected.value }
                onUpdate:inputMode={ inputMode => emit('update:inputMode', inputMode) }
                onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
              />
            ),
            default: () => props.inputMode === 'calendar' ? (
              <>
                <VDatePickerControls
                  { ...datePickerControlsProps }
                  onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                  onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
                />

                <MaybeTransition transition={ props.transition } mode="out-in">
                  { props.viewMode === 'month' ? (
                    <VDatePickerMonth
                      { ...datePickerMonthProps }
                      v-model={ selected.value }
                      onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                    />
                  ) : (
                    <VDatePickerYears
                      { ...datePickerYearsProps }
                      height="300"
                      displayDate={ props.displayDate }
                      onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                      viewMode={ props.viewMode }
                      onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
                    />
                  )}
                </MaybeTransition>
              </>
            ) : (
              <div class="v-date-picker__input">
                <VTextField
                  v-model={ inputModel.value }
                  label="Enter date"
                  placeholder="yyyy/mm/dd"
                />
              </div>
            ),
            actions: props.showActions && (() => (
              <div>
                <VBtn variant="text" color={ props.color } onClick={ handleCancel }>Cancel</VBtn>
                <VBtn variant="text" color={ props.color } onClick={ handleSave }>Ok</VBtn>
              </div>
            )),
          }}
        />
      )
    })

    return {}
  },
})
