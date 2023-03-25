// Styles
import './VDateRangePicker.sass'

// Components
import { VPicker } from '@/components/VPicker'
import { VTextField } from '@/components/VTextField'

// Composables
import { makeTransitionProps } from '@/composables/transition'
import { createDatePicker } from '../VDatePicker/composables'

// Utilites
import { ref, watch } from 'vue'
import { defineComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import { VBtn } from '@/components/VBtn'
import { VDateRangePickerHeader } from './VDateRangePickerHeader'
import { VDateRangePickerMonth } from './VDateRangePickerMonth'
import { useDate } from '@/composables/date'

export const VDateRangePicker = defineComponent({
  name: 'VDateRangePicker',

  props: {
    color: String,
    inputMode: {
      type: String as PropType<'keyboard' | 'calendar'>,
      default: 'calendar',
    },
    viewMode: {
      type: String as PropType<'month' | 'years'>,
      default: 'month',
    },
    modelValue: null,
    displayDate: null,
    ...makeTransitionProps({
      transition: 'fade',
    }),
  },

  emits: {
    'update:modelValue': (date: any) => true,
    'update:viewMode': (mode: 'month' | 'years') => true,
    'update:inputMode': (input: string) => true,
    'update:displayDate': (date: any) => true,
    save: (date: any) => true,
    cancel: () => true,
  },

  setup (props, { emit }) {
    const adapter = useDate()
    createDatePicker(props)

    const selected = ref(props.modelValue)
    const inputModel = ref(props.modelValue[0] ? adapter.value.format(props.modelValue[0], 'keyboardDate') : '')

    // watch(() => props.modelValue, newValue => {
    //   if (!newValue?.length) return

    //   inputModel.value = adapter.value.format(newValue[0], 'keyboardDate')
    // })

    watch(inputModel, () => {
      const { isValid, date } = adapter.value

      selected.value = isValid(inputModel.value) ? [date(inputModel.value)] : []
    })

    // watch(selected, () => {
    //   if (!props.showActions) {
    //     emit('update:modelValue', selected.value)
    //   }
    // })

    // function handleInput (value: any, index: number) {
    //   if (value.length === 10 && adapter.value.isValid(value)) {
    //     const modelValue = props.modelValue.slice()
    //     modelValue.splice(index, value)
    //     emit('update:modelValue', modelValue)
    //   }
    // }

    const handleCancel = () => emit('cancel')
    const handleSave = () => {
      emit('update:modelValue', selected.value)
      emit('save', selected.value)
    }

    useRender(() => {
      return (
        <VPicker
          key={props.inputMode}
          class={[
            'v-date-range-picker',
            `v-date-range-picker--${props.inputMode}`,
          ]}
          width={328}
          v-slots={{
            header: () => (
              <VDateRangePickerHeader
                modelValue={ selected.value }
                displayDate={ props.displayDate }
                onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                inputMode={ props.inputMode }
                onUpdate:inputMode={ inputMode => emit('update:inputMode', inputMode) }
                color={ props.color }
                onCancel={ handleCancel }
                onSave={ handleSave }
              />
            ),
            default: () => props.inputMode === 'calendar' ? (
              <VDateRangePickerMonth
                v-model={ selected.value }
                displayDate={ props.displayDate }
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
            actions: props.inputMode === 'keyboard' ? () => (
              <div>
                <VBtn variant="text" color={ props.color } onClick={ handleCancel }>Cancel</VBtn>
                <VBtn variant="text" color={ props.color } onClick={ handleSave }>Ok</VBtn>
              </div>
            ) : null,
          }}
        />
      )
    })
  },
})
