// Styles
import './VDatePickerMonth.sass'

// Components
import { VBtn } from '../VBtn'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { useDatePicker } from './composables'

// Utilities
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'

export const VDatePickerMonth = defineComponent({
  name: 'VDatePickerMonth',

  props: {
    color: {
      type: String,
      default: 'primary',
    },
    hideAdjacentMonths: Boolean,
    hideWeekdays: Boolean,
    showWeek: Boolean,
    range: {
      type: [String, Boolean] as PropType<'start' | 'end' | boolean>,
      validator: (v: any) => ['start', 'end'].includes(v),
    },
  },

  setup (props, { emit, slots }) {
    const { displayDate, adapter, model } = useDatePicker()

    const month = computed(() => props.range === 'end' ? adapter.value.addMonths(displayDate.value, 1) : displayDate.value)

    const weeksInMonth = computed(() => {
      const weeks = adapter.value.getWeekArray(month.value)

      const days = weeks.flat()

      // Make sure there's always 6 weeks in month (6 * 7 days)
      const daysInMonth = 6 * 7
      if (days.length < daysInMonth) {
        const lastDay = days[days.length - 1]

        let week = []
        for (let day = 1; day <= daysInMonth - days.length; day++) {
          week.push(adapter.value.addDays(lastDay, day))

          if (day % 7 === 0) {
            weeks.push(week)
            week = []
          }
        }
      }

      return weeks
    })

    const daysInMonth = computed(() => {
      const { format, getYear, getMonth, isSameMonth, isSameYear, isSameDay, isWithinRange } = adapter.value
      // const props.modelValue = [...props.modelValue].sort((a: string, b: string) => a < b ? -1 : 1)
      const validDates = model.value.filter(v => !!v)
      const isRange = validDates.length > 1

      const days = weeksInMonth.value.flat()
      const today = adapter.value.date()

      return days.map(date => {
        const index = model.value.findIndex(modelDate => {
          return isSameYear(date, modelDate) && isSameMonth(date, modelDate) && isSameDay(date, modelDate)
        })

        return {
          date,
          year: getYear(date),
          month: getMonth(date),
          isSelected: index > -1,
          isStart: index === 0,
          isEnd: index === 1,
          isToday: adapter.value.isSameDay(date, today),
          isAdjacent: !isSameMonth(date, month.value),
          inRange: isRange && (index === 0 || (validDates.length === 2 && isWithinRange(date, validDates as [any, any]))),
          localized: format(date, 'dayOfMonth'),
        }
      })
    })

    const weeks = computed(() => {
      return weeksInMonth.value.map(week => {
        return adapter.value.getWeek(week[0])
      })
    })

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    function selectDate (date: any): any[] {
      const value = model.value.slice()

      if (props.range) {
        if (props.range === 'start') {
          return [date, value[1] ?? null]
        } else if (props.range === 'end') {
          return [value[0] ?? null, date]
        } else if (value.length === 2) {
          const closest = model.value.reduce((prev, curr) => {
            const distCurr = Math.abs(adapter.value.getDiff(date, curr, 'days'))
            const distPrev = Math.abs(adapter.value.getDiff(date, prev, 'days'))

            return distCurr < distPrev ? curr : prev
          })

          const index = model.value.indexOf(closest)

          value.splice(index, 1, date)

          return value
        } else {
          value.push(date)
          return value
        }
      } else {
        return [date]
      }
    }

    return () => (
      <div class="v-date-picker-month">
        { props.showWeek && (
          <div class="v-date-picker-month__weeks">
            { !props.hideWeekdays && (
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
          { !props.hideWeekdays && adapter.value.getWeekdays().map(weekDay => (
            <div class="v-date-picker-month__day">{ weekDay }</div>
          )) }

          { daysInMonth.value.map(item => (
            <div
              class={[
                'v-date-picker-month__day',
                {
                  'v-date-picker-month__day--selected': item.isSelected,
                  'v-date-picker-month__day--start': item.isStart,
                  'v-date-picker-month__day--end': item.isEnd,
                  'v-date-picker-month__day--adjacent': item.isAdjacent,
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

              { (!props.hideAdjacentMonths || (props.hideAdjacentMonths && !item.isAdjacent)) && (
                <VBtn
                  icon
                  size="small"
                  variant={ item.isToday && !item.isSelected ? 'outlined' : 'contained-flat' }
                  color={ item.isSelected ? props.color : item.isToday ? undefined : 'transparent' }
                  onClick={ () => model.value = selectDate(item.date) }
                >
                  { item.localized }
                </VBtn>
              ) }
            </div>
          ))}
        </div>
      </div>
    )
  },
})
