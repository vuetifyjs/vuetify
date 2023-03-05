// Styles
import './VDateRangeCard.sass'

// Components
import { VCard } from '@/components/VCard'
import { VDatePickerControls } from '../VDatePicker/VDatePickerControls'
import { VDatePickerMonth } from '../VDatePicker/VDatePickerMonth'
import { VDatePickerYears } from '../VDatePicker/VDatePickerYears'

// Composables
import { makeTransitionProps } from '@/composables/transition'
import { createDatePicker } from '../VDatePicker/composables'

// Utilities
import { ref } from 'vue'
import { defineComponent, useRender } from '@/util'

// Types
import { useDate } from '@/composables/date'
import { dateEmits, makeDateProps } from '../VDateField/composables'

export const VDateRangeCard = defineComponent({
  name: 'VDateRangeCard',

  props: {
    color: String,
    ...makeDateProps(),
    ...makeTransitionProps({
      transition: 'fade',
    }),
  },

  emits: {
    ...dateEmits,
  },

  setup (props, { emit }) {
    const { adapter } = useDate()
    createDatePicker(props)

    const hoverDate = ref(null)

    useRender(() => {
      return (
        <VCard
          class="v-date-range-card"
        >
          { props.viewMode === 'month' ? (
            <>
              <div class="v-date-range-card__start">
                <VDatePickerControls
                  displayDate={ props.displayDate }
                  onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                  viewMode={ props.viewMode }
                  onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
                  range="start"
                />
                <VDatePickerMonth
                  modelValue={ props.modelValue }
                  onUpdate:modelValue={ modelValue => emit('update:modelValue', modelValue)}
                  displayDate={ props.displayDate }
                  v-model:hoverDate={ hoverDate.value }
                  multiple
                  side="start"
                />
              </div>
              <div class="v-date-range-card__divider" />
              <div class="v-date-range-card__end">
                <VDatePickerControls
                  displayDate={ props.displayDate }
                  onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                  viewMode={ props.viewMode }
                  onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
                  range="end"
                />
                <VDatePickerMonth
                  modelValue={ props.modelValue }
                  onUpdate:modelValue={ modelValue => emit('update:modelValue', modelValue)}
                  displayDate={ adapter.value.addMonths(props.displayDate, 1) }
                  v-model:hoverDate={ hoverDate.value }
                  multiple
                  side="end"
                />
              </div>
            </>
          ) : (
            <div class="v-date-range-card__years">
              <VDatePickerControls
                displayDate={ props.displayDate }
                onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                viewMode={ props.viewMode }
                onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
              />
              <VDatePickerYears
                displayDate={ props.displayDate }
                onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                viewMode={ props.viewMode }
                onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
              />
            </div>
          )}
        </VCard>
      )
    })

    return {}
  },
})
