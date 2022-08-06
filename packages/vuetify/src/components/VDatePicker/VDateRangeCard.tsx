import './VDateRangeCard.sass'
import { makeTransitionProps } from '@/composables/transition'
import { defineComponent, useRender } from '@/util'
import { VCard } from '../VCard'
import { createDatePicker } from './composables'
import { VDatePickerControls } from './VDatePickerControls'
import { VDatePickerMonth } from './VDatePickerMonth'
import type { PropType } from 'vue'
import { VDatePickerYears } from './VDatePickerYears'

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

  setup (props) {
    const { mode, displayDate, adapter } = createDatePicker(props, true)

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
                range="start"
              />
            </div>
            <div class="v-date-range-card__divider" />
            <div class="v-date-range-card__end">
              <VDatePickerControls range="end" />
              <VDatePickerMonth
                displayDate={ adapter.value.addMonths(displayDate.value, 1) }
                locale={ props.locale }
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
