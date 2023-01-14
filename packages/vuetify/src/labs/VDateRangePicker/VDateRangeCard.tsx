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

export const VDateRangeCard = defineComponent({
  name: 'VDateRangeCard',

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
    modelValue: {
      type: Array as PropType<any[]>,
      default: () => ([]),
    },
    displayDate: null,
    locale: null,
    ...makeTransitionProps({
      transition: 'fade',
    }),
  },

  emits: {
    'update:modelValue': (date: any) => true,
    'update:displayDate': (date: any) => true,
    'update:mode': (mode: 'month' | 'years') => true,
    'update:input': (mode: 'keyboard' | 'calendar') => true,
  },

  setup (props) {
    const { mode, displayDate, adapter } = createDatePicker(props, true)

    const hoverDate = ref(null)

    useRender(() => (
      <VCard
        class="v-date-range-card"
      >
        { mode.value === 'month' ? (
          <>
            <div class="v-date-range-card__start">
              <VDatePickerControls range="start" />
              <VDatePickerMonth
                displayDate={ displayDate.value }
                locale={ props.locale }
                v-model:hoverDate={ hoverDate.value }
                range="start"
              />
            </div>
            <div class="v-date-range-card__divider" />
            <div class="v-date-range-card__end">
              <VDatePickerControls range="end" />
              <VDatePickerMonth
                displayDate={ adapter.value.addMonths(displayDate.value, 1) }
                locale={ props.locale }
                v-model:hoverDate={ hoverDate.value }
                range="end"
              />
            </div>
          </>
        ) : (
          <div class="v-date-range-card__years">
            <div>
              <VDatePickerControls range="start" />
              <div class="v-date-range-card__divider" />
              <VDatePickerControls range="end" />
            </div>
            <VDatePickerYears />
          </div>
        )}
      </VCard>
    ))

    return {}
  },
})
