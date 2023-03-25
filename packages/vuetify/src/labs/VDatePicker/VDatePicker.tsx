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
import { useDate } from '@/composables/date'
import { dateEmits, makeDateProps } from '../VDateField/composables'
import { createDatePicker } from './composables'

// Utilites
import { ref, watch } from 'vue'
import { defineComponent, useRender } from '@/util'

export const VDatePicker = defineComponent({
  name: 'VDatePicker',

  props: {
    color: String,
    ...makeTransitionProps({
      transition: 'fade',
    }),
    showActions: Boolean,
    ...makeDateProps(),
  },

  emits: {
    save: (date: any) => true,
    cancel: () => true,
    ...dateEmits,
  },

  setup (props, { emit }) {
    const adapter = useDate()
    createDatePicker(props)

    const inputModel = ref(props.modelValue?.length ? adapter.value.format(props.modelValue[0], 'keyboardDate') : '')
    const selected = ref<any[]>(props.modelValue ?? [])

    watch(inputModel, () => {
      const { isValid, date } = adapter.value

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
      return (
        <VPicker
          class="v-date-picker"
          v-slots={{
            header: () => (
              <VDatePickerHeader
                modelValue={ selected.value }
                inputMode={ props.inputMode }
                onUpdate:inputMode={ inputMode => emit('update:inputMode', inputMode) }
                onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                color={ props.color }
              />
            ),
            default: () => props.inputMode === 'calendar' ? (
              <>
                <VDatePickerControls
                  displayDate={ props.displayDate }
                  onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                  viewMode={ props.viewMode }
                  onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
                />
                <MaybeTransition transition={ props.transition } mode="out-in">
                  { props.viewMode === 'month' ? (
                    <VDatePickerMonth
                      v-model={ selected.value }
                      displayDate={ props.displayDate }
                      onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                    />
                  ) : (
                    <VDatePickerYears
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
