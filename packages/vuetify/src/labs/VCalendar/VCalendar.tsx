// Styles
import './VCalendar.sass'

// Utilities
import { computed, ref } from 'vue'
import { VCalendarDay } from './VCalendarDay'
import { VCalendarHeader } from './VCalendarHeader'
import { getWeek, toIso } from '../date/date'
import { useDate } from '@/labs/date'
import { chunkArray, genericComponent, useRender } from '@/util'

export const VCalendar = genericComponent()({
  name: 'VCalendar',

  props: {
    disabled: Array<Date>,
    events: Array<any>,
    hideDayHeader: Boolean,
    hideHeader: Boolean,
    hideWeekNumber: Boolean,
    showAdjacentMonths: Boolean,
    title: String,
    type: {
      type: String,
      default: 'month',
      validator (val: string) {
        return ['month', 'week', 'day'].includes(val)
      },
    },
    modelValue: {
      type: Date,
      default: new Date(),
    },
    weekdays: {
      type: Array<number>,
      default: () => [0, 1, 2, 3, 4, 5, 6],
    },
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()
    const dayNames = adapter.getWeekdays()
    const weeksInMonth = computed(() => {
      const weeks = adapter.getWeekArray(props.modelValue)

      const days = weeks.flat()

      // Make sure there's always 6 weeks in month (6 * 7 days)
      // But only do it if we're not hiding adjacent months?
      const daysInMonth = 6 * 7
      if (days.length < daysInMonth && props.showAdjacentMonths) {
        const lastDay = days[days.length - 1]

        let week = []
        for (let day = 1; day <= daysInMonth - days.length; day++) {
          week.push(adapter.addDays(lastDay, day))

          if (day % 7 === 0) {
            weeks.push(week)
            week = []
          }
        }
      }

      return weeks
    })

    const validDates = ref([
      adapter.startOfMonth(props.modelValue),
      adapter.endOfMonth(props.modelValue),
    ])
    const daysInMonth = computed(() => {
      const isRange = validDates.value.length > 1

      const days = weeksInMonth.value.flat()
      const today = adapter.date()

      const startDate = validDates.value[0]
      const endDate = validDates.value[1]

      return days.filter((date, index) => props.weekdays.includes(date.getDay())).map((date, index) => {
        const isStart = startDate && adapter.isSameDay(date, startDate)
        const isEnd = endDate && adapter.isSameDay(date, endDate)
        const isAdjacent = !adapter.isSameMonth(date, props.modelValue)
        const isSame = validDates.value.length === 2 && adapter.isSameDay(startDate, endDate)

        return {
          date,
          isoDate: toIso(adapter, date),
          formatted: adapter.format(date, 'keyboardDate'),
          year: adapter.getYear(date),
          month: adapter.getMonth(date),
          isWeekStart: index % 7 === 0,
          isWeekEnd: index % 7 === 6,
          isSelected: isStart || isEnd,
          isStart,
          isEnd,
          isToday: adapter.isSameDay(date, today),
          isAdjacent,
          isHidden: isAdjacent && !props.showAdjacentMonths,
          inRange: isRange &&
            !isSame &&
            (isStart || isEnd || (validDates.value.length === 2 && adapter.isWithinRange(date, validDates.value as [any, any]))),
          // isHovered: props.hoverDate === date,
          // inHover: hoverRange.value && isWithinRange(date, hoverRange.value),
          isHovered: false,
          inHover: false,
          localized: adapter.format(date, 'dayOfMonth'),
          events: props.events?.filter(event => adapter.isSameDay(event.start, date) || adapter.isSameDay(event.end, date)) ?? [],
        }
      })
    })

    const weeks = computed(() => {
      return weeksInMonth.value.map(week => {
        return getWeek(adapter, week[0])
      })
    })

    useRender(() => (
      <div class={['v-calendar', 'v-calendar-monthly', 'v-calendar-weekly']}>
        <div>
          { !props.hideHeader ? (
            <VCalendarHeader key="calendarHeader" title={ props.title } start={ validDates.value[0] } end={ validDates.value[1] } />
          ) : '' }
        </div>
        <div class="v-calendar__container">
        { !props.hideDayHeader
          ? (
            <div
              class={
                [
                  'v-calendar-weekly__head',
                  `days__${props.weekdays.length}`,
                  ...(!props.hideWeekNumber ? ['v-calendar-weekly__head-weeknumbers'] : []),
                ]
              }
              key="calenderWeeklyHead"
            >
              { !props.hideWeekNumber ? <div key="weekNumber0" class="v-calendar-weekly__head-weeknumber"></div> : '' }
              {
                props.weekdays.sort((a, b) => a - b).map(weekday => (
                  <div class="v-calendar-weekly__head-weekday">
                    { dayNames[weekday] }
                  </div>
                ))
              }
            </div>
          ) : '' }
          <div class={
            [
              'v-calendar-month__days',
              `days__${props.weekdays.length}`,
              ...(!props.hideWeekNumber ? ['v-calendar-month__weeknumbers'] : []),
            ]
          }
          >
            { chunkArray(daysInMonth.value, props.weekdays.length).map((week, wi) => (
              [
                !props.hideWeekNumber ? <div class="v-calendar-month__weeknumber">{ weeks.value[wi] }</div> : '',
                week.map(day => (
                  <VCalendarDay
                    color={ adapter.isSameDay(new Date(), day.date) ? 'primary' : undefined }
                    day={ day }
                    disabled={ day ? props.disabled?.includes(day.date) : false }
                    title={ day ? adapter.format(day.date, 'dayOfMonth') : 'NaN' }
                    events={ day.events }
                  ></VCalendarDay>
                )),
              ]
            ))}
        </div>
        </div>
      </div>
    ))

    return { daysInMonth, weeks }
  },
})

export type VCalendar = InstanceType<typeof VCalendar>
