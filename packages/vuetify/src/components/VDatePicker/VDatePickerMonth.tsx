import { useBackgroundColor } from '@/composables/color'
import { createRange } from '@/util'
import { inject, PropType } from 'vue';
import { computed, defineComponent } from 'vue'
import { VBtn } from '../VBtn'
import { getWeek } from './utils'
import './VDatePickerMonth.sass'
import { useDate } from '@/composables/date'

export const VDatePickerMonth = defineComponent({
  name: 'VDatePickerMonth',

  props: {
    modelValue: {
      type: Array as PropType<any[]>,
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
    // firstDayOfWeek: {
    //   type: Number,
    //   default: 0,
    // },
    color: {
      type: String,
      default: 'primary',
    },
    locale: {
      type: null,
      default: 'en-US',
    },
    showAdjacentMonths: Boolean,
    showWeekdays: Boolean,
    showWeek: Boolean,
  },

  setup (props, { emit, slots }) {
    const { adapter } = useDate(props)

    const firstDayInMonth = computed(() => adapter.value.date(`${props.year}-${props.month}-01`))

    const weeksInMonth = computed(() => adapter.value.getWeekArray(firstDayInMonth.value))

    const daysInMonth = computed(() => {
      const { format, getYear, getMonth, isSameMonth, isSameYear, isSameDay, isWithinRange } = adapter.value
      const sortedModelValue = [...props.modelValue].sort((a: string, b: string) => a < b ? -1 : 1)
      const isRange = sortedModelValue.length > 1

      const daysInMonth = weeksInMonth.value.flat()

      return daysInMonth.map(date => {
        const index = sortedModelValue.findIndex(modelDate => {
          return isSameYear(date, modelDate) && isSameMonth(date, modelDate) && isSameDay(date, modelDate)
        })

        return {
          date,
          year: getYear(date),
          month: getMonth(date),
          isSelected: index > -1,
          isStart: index === 0,
          isEnd: index === 1,
          isAdjacent: !isSameMonth(date, firstDayInMonth.value),
          inRange: isRange && (index === 0 || isWithinRange(date, sortedModelValue as [any, any])),
          localized: format(date, 'dayOfMonth'),
        }
      })
    })

    // const daysInMonth = computed(() => {
    //   const { getDaysInMonth, addDays, format, date } = adapter.value
    //   const sortedModelValue = [...props.modelValue].sort((a: string, b: string) => a < b ? -1 : 1)
    //   const isRange = sortedModelValue.length > 1

    //   const firstDayInMonth = date(`${props.year}-${props.month}-01`)
    //   const daysInMonth = getDaysInMonth(firstDayInMonth)

    //   return createRange(daysInMonth).map(day => {
    //     const date = format(addDays(firstDayInMonth, day), 'keyboardDate')
    //     const index = sortedModelValue.indexOf(date)

    //     return {
    //       date,
    //       year: props.year,
    //       month: props.month,
    //       day: day + 1,
    //       isSelected: index > -1,
    //       isStart: index === 0,
    //       isEnd: index === 1,
    //       inRange: isRange && day + 1 >= sortedModelValue[0] && day + 1 < sortedModelValue[1],
    //       localized: format(addDays(firstDayInMonth, day), 'dayOfMonth'),
    //     }
    //   })

    //   // const dateTimeFormat = Intl.DateTimeFormat([props.locale], { day: 'numeric' })

    //   // return getDaysInMonth(props.year, props.month).map(day => {
    //   //   const index = sortedModelValue.indexOf(day.date)
    //   //   return {
    //   //     ...day,
    //   //     // localized: dateTimeFormat.format(new Date(day.date)),
    //   //     isSelected: index > -1,
    //   //     isStart: index === 0,
    //   //     isEnd: index === 1,
    //   //     inRange: isRange && day.date >= sortedModelValue[0] && day.date <= sortedModelValue[1],
    //   //   }
    //   // })
    // })

    // const daysBeforeFirst = computed(() => {
    //   const firstWeekdayOfMonth = getFirstWeekdayOfMonth(props.year, props.month)

    //   const [year, month] = changeMonth(props.year, props.month, -1)
    //   const daysInPreviousMonth = getDaysInMonth(year, month)
    //   const daysBeforeFirst = (props.firstDayOfWeek !== 0 ? 7 + firstWeekdayOfMonth - props.firstDayOfWeek : firstWeekdayOfMonth) % 7

    //   return daysBeforeFirst > 0 ? daysInPreviousMonth.slice(-daysBeforeFirst) : []
    // })

    // const daysAfterLast = computed(() => {
    //   const [year, month] = changeMonth(props.year, props.month, +1)
    //   const daysInNextMonth = getDaysInMonth(year, month)

    //   // If we want variable number of weeks
    //   // const daysInLastWeek = (daysBeforeFirst.value.length + daysInMonth.value.length) % 7
    //   // return daysInLastWeek > 0 ? daysInNextMonth.slice(0, 7 - daysInLastWeek) : []

    //   return daysInNextMonth.slice(0, 42 - daysBeforeFirst.value.length - daysInMonth.value.length)
    // })

    // const weekDays = computed(() => {
    //   const dateTimeFormat = Intl.DateTimeFormat([props.locale], { weekday: 'narrow' })

    //   // 2017-01-15 is a Sunday
    //   return createRange(7).map(i => dateTimeFormat.format(new Date(`2017-01-${15 + props.firstDayOfWeek + i}`)))
    // })

    const weeks = computed(() => {
      const { toJsDate } = adapter.value
      return weeksInMonth.value.map(week => {
        return getWeek(toJsDate(week[0]))
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
        </div>
      </div>
    )
  }
})
