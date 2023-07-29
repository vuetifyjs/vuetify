// Styles
import './VDateRangePickerMonth.sass'

// Components
import { makeVDatePickerMonthProps, VDatePickerMonth } from '../VDatePicker/VDatePickerMonth'
import { VVirtualScroll } from '../../components/VVirtualScroll'

// Composables
import { useDatePicker } from '../VDatePicker/composables'

// Utilities
import { computed, onMounted, ref } from 'vue'
import { useDate } from '@/labs/date'
import { createRange, genericComponent, propsFactory, useRender } from '@/util'

export const makeVDateRangePickerMonthProps = propsFactory({
  ...makeVDatePickerMonthProps({
    multiple: true,
  }),
}, 'VDateRangePickerMonth')

export const VDateRangePickerMonth = genericComponent()({
  name: 'VDateRangePickerMonth',

  props: makeVDateRangePickerMonthProps(),

  emits: {
    'update:modelValue': (date: any) => true,
  },

  setup (props, { emit }) {
    const adapter = useDate()
    const { hasScrolled } = useDatePicker()

    const range = ref([50, -25])
    const months = computed(() => {
      const [length, start] = range.value
      return createRange(length, start).map(offset => adapter.addMonths(props.displayDate, offset))
    })

    function handleScroll () {
      hasScrolled.value = true
    }

    const virtualScrollRef = ref()

    onMounted(() => {
      if (virtualScrollRef.value) {
        virtualScrollRef.value.scrollToItem(item => adapter.isSameMonth(item, props.displayDate))
      }
    })

    useRender(() => {
      const [datePickerMonthProps] = VDatePickerMonth.filterProps(props)

      return (
        <VVirtualScroll items={months.value} class="v-date-range-picker-month" ref={virtualScrollRef} onScroll={handleScroll}>
          {{
            default: (({ item: month }) => (
              <>
                <div class="v-date-range-picker-month__header">{ adapter.format(month, 'monthAndYear') }</div>
                <VDatePickerMonth
                  { ...datePickerMonthProps }
                  modelValue={ props.modelValue }
                  onUpdate:modelValue={ modelValue => emit('update:modelValue', modelValue) }
                  displayDate={ month }
                  hideWeekdays
                />
              </>
            ))
          }}
        </VVirtualScroll>
      )
    })
  },
})

export type VDateRangePickerMonth = InstanceType<typeof VDateRangePickerMonth>
