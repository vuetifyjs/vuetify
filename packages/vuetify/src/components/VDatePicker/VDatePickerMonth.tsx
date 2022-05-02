import { useBackgroundColor } from '@/composables/color'
import { createRange } from '@/util'
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue'
import { VBtn } from '../VBtn'
import { addDays, changeMonth, getDate, getDaysInMonth, getFirstWeekdayOfMonth, getWeek, parseDate } from './utils'
import './VDatePickerMonth.sass'

export const VDatePickerMonth = defineComponent({
  name: 'VDatePickerMonth',

  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => ([]),
    },
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    firstDayOfWeek: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: 'primary',
    },
    locale: {
      type: String,
      default: 'en-US',
    },
    showAdjacentMonths: Boolean,
    showWeekdays: Boolean,
    showWeek: Boolean,
  },

  setup (props, { emit, slots }) {
    const daysInMonth = computed(() => {
      const sortedModelValue = [...props.modelValue].sort((a: string, b: string) => a < b ? -1 : 1)
      const isRange = sortedModelValue.length > 1

      const dateTimeFormat = Intl.DateTimeFormat([props.locale], { day: 'numeric' })

      return getDaysInMonth(props.year, props.month).map(day => {
        const index = sortedModelValue.indexOf(day.date)
        return {
          ...day,
          localized: dateTimeFormat.format(new Date(day.date)),
          isSelected: index > -1,
          isStart: index === 0,
          isEnd: index === 1,
          inRange: isRange && day.date >= sortedModelValue[0] && day.date <= sortedModelValue[1],
        }
      })
    })

    const daysBeforeFirst = computed(() => {
      const firstWeekdayOfMonth = getFirstWeekdayOfMonth(props.year, props.month)

      const [year, month] = changeMonth(props.year, props.month, -1)
      const daysInPreviousMonth = getDaysInMonth(year, month)
      const daysBeforeFirst = (props.firstDayOfWeek !== 0 ? 7 + firstWeekdayOfMonth - props.firstDayOfWeek : firstWeekdayOfMonth) % 7

      return daysBeforeFirst > 0 ? daysInPreviousMonth.slice(-daysBeforeFirst) : []
    })

    const daysAfterLast = computed(() => {
      const [year, month] = changeMonth(props.year, props.month, +1)
      const daysInNextMonth = getDaysInMonth(year, month)

      // If we want variable number of weeks
      // const daysInLastWeek = (daysBeforeFirst.value.length + daysInMonth.value.length) % 7
      // return daysInLastWeek > 0 ? daysInNextMonth.slice(0, 7 - daysInLastWeek) : []

      return daysInNextMonth.slice(0, 42 - daysBeforeFirst.value.length - daysInMonth.value.length)
    })

    const weekDays = computed(() => {
      const dateTimeFormat = Intl.DateTimeFormat([props.locale], { weekday: 'narrow' })

      // 2017-01-15 is a Sunday
      return createRange(7).map(i => dateTimeFormat.format(new Date(`2017-01-${15 + props.firstDayOfWeek + i}`)))
    })

    const weeks = computed(() => {
      // const firstWeek = getWeek(props.year, props.month, 1)
      const firstDayInMonth = getDate(props.year, props.month, 1)
      return createRange(6).map((_, i) => {
        const [year, month, day] = parseDate(addDays(firstDayInMonth, i * 7))
        return getWeek(year, month, day)
      })
    })

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    return () => (
      <div class="v-date-picker-month">
        { props.showWeek && (
          <div class="v-date-picker-month__weeks">
            { props.showWeekdays && (
              <div class="v-date-picker-month__day">&nbsp;</div>
            ) }
            { weeks.value.map(week => (
              <div
                class={[
                  'v-date-picker-month__day',
                  'v-date-picker-month__day--adjacent',
                ]}
              >{ week }</div>
            )) }
          </div>
        ) }

        <div class="v-date-picker-month__days">
          { props.showWeekdays && weekDays.value.map(weekDay => (
            <div class="v-date-picker-month__day">{ weekDay }</div>
          )) }

          { daysBeforeFirst.value.map(item => (
            <div
              class={[
                'v-date-picker-month__day',
                'v-date-picker-month__day--adjacent',
              ]}
            >{ props.showAdjacentMonths ? item.day : <>&nbsp;</> }</div>
          )) }

          { daysInMonth.value.map(item => (
            <div
              class={[
                'v-date-picker-month__day',
                {
                  'v-date-picker-month__day--selected': item.isSelected,
                  'v-date-picker-month__day--start': item.isStart,
                  'v-date-picker-month__day--end': item.isEnd,
                },
              ]}
            >
              { item.inRange && (
                <div
                  class={[
                    'v-date-picker-month__day--range',
                    backgroundColorClasses.value,
                  ]}
                  style={ backgroundColorStyles.value }
                />
              ) }

              <VBtn
                icon
                size="small"
                variant="contained-flat"
                color={ item.isSelected ? props.color : 'transparent' }
              >
                { item.localized }
              </VBtn>
            </div>
          ))}

          { daysAfterLast.value.map(item => (
            <div
              class={[
                'v-date-picker-month__day',
                'v-date-picker-month__day--adjacent',
              ]}
            >{ props.showAdjacentMonths ? item.day : <>&nbsp;</> }</div>
          )) }
        </div>
      </div>
    )
  }
})
