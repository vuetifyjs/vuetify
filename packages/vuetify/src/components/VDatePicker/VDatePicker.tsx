// Styles
import './VDatePicker.sass'

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

export const VDatePicker = defineComponent({
  name: 'VDatePicker',

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
    showActions: Boolean,
  },

  emits: {
    save: () => true,
    cancel: () => true,
  },

  setup (props, { emit }) {
    const { mode, input, model, adapter, displayDate } = createDatePicker(props)

    const inputModel = ref(model.value[0] ? adapter.value.format(model.value[0], 'keyboardDate') : '')

    watch(model, newValue => {
      if (!newValue?.length) return

      inputModel.value = adapter.value.format(newValue[0], 'keyboardDate')
    })

    useRender(() => (
      <VPicker
        class="v-date-picker"
        v-slots={{
          header: () => (
            <VDatePickerHeader
              color={ props.color }
              // title={ props.title }
              // header={ props.header }
            />
          ),
          default: () => input.value === 'calendar' ? (
            <>
              <VDatePickerControls />
              <MaybeTransition transition={ props.transition } mode="out-in">
                { mode.value === 'month' ? (
                  <VDatePickerMonth
                    locale={ props.locale }
                    v-model:displayDate={ displayDate.value }
                    v-model={ model.value }
                  />
                ) : (
                  <VDatePickerYears
                    height="300"
                    locale={ props.locale }
                  />
                ) }
              </MaybeTransition>
            </>
          ) : (
            <div class="v-date-picker__input">
              <VTextField
                modelValue={ inputModel.value }
                onUpdate:modelValue={ (value: any) => {
                  if (value.length === 10 && adapter.value.isValid(value)) {
                    model.value = [adapter.value.date(value)]
                  }
                } }
                label="Enter date"
                placeholder="yyyy/mm/dd"
              />
            </div>
          ),
          actions: props.showActions && (() => (
            <div>
              <VBtn variant="text" color={props.color} onClick={() => emit('cancel')}>Cancel</VBtn>
              <VBtn variant="text" color={props.color} onClick={() => emit('save')}>Ok</VBtn>
            </div>
          )),
        }}
      />
    ))

    return {}
  },
})
