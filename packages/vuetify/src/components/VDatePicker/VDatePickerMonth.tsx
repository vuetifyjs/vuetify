// Styles
import './VDatePickerMonth.sass'

// Components
import { VBtn } from '../VBtn'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { useDatePicker } from './composables'

// Utilities
import { computed, defineComponent } from 'vue'

export const VDatePickerMonth = defineComponent({
  name: 'VDatePickerMonth',

  props: {
    color: {
      type: String,
      default: 'primary',
    },
    showAdjacentMonths: Boolean,
    showWeekdays: Boolean,
    showWeek: Boolean,
    range: Boolean,
  },

  setup (props, { emit, slots }) {
    const { displayDate, adapter, model } = useDatePicker()

    const weeksInMonth = computed(() => {
      const weeks = adapter.value.getWeekArray(displayDate.value)

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
      const isRange = model.value.length > 1

      const days = weeksInMonth.value.flat()

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
          isAdjacent: !isSameMonth(date, displayDate.value),
          inRange: isRange && (index === 0 || isWithinRange(date, model.value as [any, any])),
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

    function selectDate (date: any) {
      let value = model.value.slice()
      if (value.length <= 1 && !props.range) {
        value = [date]
      } else if (value.length > 1 && props.range) {
        const closest = model.value.reduce((prev, curr) => {
          const distCurr = Math.abs(adapter.value.getDiff(date, curr, 'days'))
          const distPrev = Math.abs(adapter.value.getDiff(date, prev, 'days'))

          return distCurr < distPrev ? curr : prev
        })

        const index = model.value.indexOf(closest)

        value.splice(index, 1, date)
      }

      model.value = value
    }

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
          { props.showWeekdays && adapter.value.getWeekdays().map(weekDay => (
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

              { (props.showAdjacentMonths || (!props.showAdjacentMonths && !item.isAdjacent)) && (
                <VBtn
                  icon
                  size="small"
                  variant="contained-flat"
                  color={ item.isSelected ? props.color : 'transparent' }
                  onClick={ () => selectDate(item.date) }
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
