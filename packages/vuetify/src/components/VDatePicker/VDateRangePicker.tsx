// Styles
import './VDateRangePicker.sass'

// Components
import { VDatePickerControls } from './VDatePickerControls'
import { VDatePickerHeader } from './VDatePickerHeader'
import { VDatePickerMonth } from './VDatePickerMonth'
import { VDatePickerYears } from './VDatePickerYears'
import { VPicker } from '../VPicker'
import { VTextField } from '../VTextField'

// Composables
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { createDatePicker } from './composables'

// Utilites
import { ref, watch } from 'vue'
import { defineComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import { VBtn } from '../VBtn'
import { VDateRangePickerHeader } from './VDateRangePickerHeader'
import { VDateRangePickerMonth } from './VDateRangePickerMonth'

export const VDateRangePicker = defineComponent({
  name: 'VDateRangePicker',

  props: {
    color: String,
    input: {
      type: String as PropType<'keyboard' | 'calendar'>,
      default: 'calendar',
    },
    mode: {
      type: String as PropType<'month' | 'years'>,
      default: 'month',
    },
    modelValue: null,
    displayDate: null,
    locale: null,
    ...makeTransitionProps({
      transition: 'fade',
    }),
  },

  emits: {
    'update:modelValue': (date: any) => true,
    'update:mode': (mode: 'month' | 'years') => true,
    'update:input': (input: string) => true,
    'update:displayDate': (date: any) => true,
    save: () => true,
    cancel: () => true,
  },

  setup (props, { emit }) {
    const { mode, input, model, adapter } = createDatePicker(props, true)

    const inputModel = ref(model.value[0] ? adapter.value.format(model.value[0], 'keyboardDate') : '')

    watch(model, newValue => {
      if (!newValue?.length) return

      inputModel.value = adapter.value.format(newValue[0], 'keyboardDate')
    })

    useRender(() => {
      return (
        <VPicker
          key={input.value}
          class={[
            'v-date-range-picker',
            `v-date-range-picker--${input.value}`,
          ]}
          width={328}
          v-slots={{
            header: () => (
              // <VDatePickerHeader
              //   color={ props.color }
              //   range
              //   // title={ props.title }
              //   // header={ props.header }
              // />
              <VDateRangePickerHeader
                color={ props.color }
                onCancel={ () => emit('cancel') }
                onSave={ () => emit('save') }
              />
            ),
            default: () => input.value === 'calendar' ? (
              <VDateRangePickerMonth />
            ) : (
              <div class="v-date-range-picker__input">
                <VTextField
                  label="From"
                  placeholder="yyyy/mm/dd"
                  modelValue={ inputModel.value }
                  onUpdate:modelValue={ (value: any) => {
                    if (value.length === 10 && adapter.value.isValid(value)) {
                      model.value = [adapter.value.date(value)]
                    }
                  } }
                />
                <VTextField
                  label="To"
                  placeholder="yyyy/mm/dd"
                  modelValue={ inputModel.value }
                  onUpdate:modelValue={ (value: any) => {
                    if (value.length === 10 && adapter.value.isValid(value)) {
                      model.value = [adapter.value.date(value)]
                    }
                  } }
                />
              </div>
            ),
            actions: input.value === 'keyboard' ? () => (
              <div>
                <VBtn variant="text" color={props.color} onClick={() => emit('cancel')}>Cancel</VBtn>
                <VBtn variant="text" color={props.color} onClick={() => emit('save')}>Ok</VBtn>
              </div>
            ) : null,
          }}
        />
      )
    })
  },
})
