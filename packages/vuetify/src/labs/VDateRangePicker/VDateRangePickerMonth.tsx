// Styles
import './VDateRangePickerMonth.sass'

// Components
import { VDatePickerMonth } from '../VDatePicker/VDatePickerMonth'

// Composables
import { useDatePicker } from '../VDatePicker/composables'

// Utilities
import { computed, onMounted, ref } from 'vue'
import { createRange, defineComponent, useRender } from '@/util'

export const VDateRangePickerMonth = defineComponent({
  name: 'VDateRangePickerMonth',

  setup (props) {
    const { displayDate, adapter, model } = useDatePicker()

    const months = computed(() => {
      const range = createRange(12, -6)

      return range.map(offset => adapter.value.addMonths(displayDate.value, offset))
    })

    const monthRef = ref()
    onMounted(() => {
      monthRef.value?.$el.scrollIntoView({ block: 'center' })
    })

    useRender(() => (
      <div class="v-date-range-picker-month">
        { months.value.map(month => (
          <>
            <div class="v-date-range-picker-month__header">{adapter.value.format(month, 'monthAndYear')}</div>
            <VDatePickerMonth
              ref={ adapter.value.isSameMonth(month, displayDate.value) ? monthRef : undefined }
              displayDate={ month }
              v-model={ model.value }
              hideAdjacentMonths
              hideWeekdays
              range
            />
          </>
        ))}
      </div>
    ))
  },
})
