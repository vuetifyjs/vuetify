// Styles
import './VDateRangePickerMonth.sass'

// Components
import { VDatePickerMonth } from '../VDatePicker/VDatePickerMonth'

// Composables
import { useDatePicker } from '../VDatePicker/composables'

// Utilities
import { computed, onMounted, ref } from 'vue'
import { useDate } from '@/labs/date'
import { createRange, defineComponent, useRender } from '@/util'

export const VDateRangePickerMonth = defineComponent({
  name: 'VDateRangePickerMonth',

  props: {
    modelValue: null,
    displayDate: null,
  },

  emits: {
    'update:modelValue': (date: any) => true,
  },

  setup (props, { emit }) {
    const adapter = useDate()
    const { hasScrolled } = useDatePicker()

    const months = computed(() => {
      const range = createRange(6, -3)

      return range.map(offset => adapter.addMonths(props.displayDate, offset))
    })

    const monthRef = ref()
    onMounted(() => {
      monthRef.value?.$el.scrollIntoView({ block: 'center' })
    })

    function handleScroll () {
      hasScrolled.value = true
    }

    useRender(() => (
      <div
        class="v-date-range-picker-month"
        onScrollPassive={ handleScroll }
      >
        { months.value.map(month => (
          <>
            <div class="v-date-range-picker-month__header">{ adapter.format(month, 'monthAndYear') }</div>
            <VDatePickerMonth
              ref={ adapter.isSameMonth(month, props.displayDate) ? monthRef : undefined }
              modelValue={ props.modelValue }
              onUpdate:modelValue={ modelValue => emit('update:modelValue', modelValue) }
              displayDate={ month }
              hideAdjacentMonths
              hideWeekdays
              multiple
            />
          </>
        ))}
      </div>
    ))
  },
})
