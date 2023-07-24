// Styles
import './VDateRangePickerMonth.sass'

// Components
import { makeVDatePickerMonthProps, VDatePickerMonth } from '../VDatePicker/VDatePickerMonth'

// Composables
import { useDatePicker } from '../VDatePicker/composables'

// Utilities
import { computed, onMounted, ref } from 'vue'
import { useDate } from '@/labs/date'
import { createRange, genericComponent, propsFactory, useRender } from '@/util'

export const makeVDateRangePickerMonthProps = propsFactory({
  ...makeVDatePickerMonthProps({
    hideWeekdays: true,
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

    useRender(() => {
      const [datePickerMonthProps] = VDatePickerMonth.filterProps(props)

      return (
        <div
          class="v-date-range-picker-month"
          onScrollPassive={ handleScroll }
        >
          { months.value.map(month => (
            <>
              <div class="v-date-range-picker-month__header">{ adapter.format(month, 'monthAndYear') }</div>
              <VDatePickerMonth
                ref={ adapter.isSameMonth(month, props.displayDate) ? monthRef : undefined }
                { ...datePickerMonthProps }
                modelValue={ props.modelValue }
                onUpdate:modelValue={ modelValue => emit('update:modelValue', modelValue) }
                displayDate={ month }
              />
            </>
          ))}
        </div>
      )
    })
  },
})

export type VDateRangePickerMonth = InstanceType<typeof VDateRangePickerMonth>
