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
import type { PropType } from 'vue'
import { useDate } from '@/composables/date'

export const VDateRangeCard = defineComponent({
  name: 'VDateRangeCard',

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
    modelValue: {
      type: Array as PropType<any[]>,
      default: () => ([]),
    },
    displayDate: null,
    ...makeTransitionProps({
      transition: 'fade',
    }),
  },

  emits: {
    'update:modelValue': (date: any) => true,
    'update:displayDate': (date: any) => true,
    'update:viewMode': (mode: 'month' | 'years') => true,
    'update:inputMode': (mode: 'keyboard' | 'calendar') => true,
  },

  setup (props, { emit }) {
    const { adapter } = useDate()
    createDatePicker(props)

    const hoverDate = ref(null)

    useRender(() => (
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
    ))

    return {}
  },
})
