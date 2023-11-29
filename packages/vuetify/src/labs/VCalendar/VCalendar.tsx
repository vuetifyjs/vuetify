// Styles
import './VCalendar.sass'

// Composables
import { getWeek, useDate } from '@/composables/date/date'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed } from 'vue'
import { VCalendarDay } from './VCalendarDay'
import { VCalendarHeader } from './VCalendarHeader'
import { VCalendarMonthDay } from './VCalendarMonthDay'
import { chunkArray, genericComponent, useRender } from '@/util'

export const VCalendar = genericComponent()({
  name: 'VCalendar',

  props: {
    disabled: Array<Date>,
    events: Array<any>,
    hideDayHeader: Boolean,
    hideHeader: Boolean,
    hideWeekNumber: Boolean,
    intervalDivisions: {
      type: Number,
      default: 2,
    },
    intervalDuration: {
      type: Number,
      default: 60,
    },
    intervalHeight: {
      type: Number,
      default: 48,
    },
    intervalLabel: [String, Function],
    intervals: {
      type: Number,
      default: 24,
    },
    intervalStart: {
      type: Number,
      default: 0,
    },
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

  emits: {
    next: null,
    prev: null,
    'update:modelValue': null,
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()

    const model = useProxiedModel(
      props,
      'modelValue',
      new Date(),
      v => v,
    )

    const dayNames = adapter.getWeekdays()
    const weeksIn = computed(() => {
      if (props.type === 'day') {
        return [[model.value]]
      }
      if (props.type === 'week') {
        // get Start of week
        const lastDay = adapter.startOfWeek(model.value)
        const week = []
        for (let day = 0; day <= 6; day++) {
          week.push(adapter.addDays(lastDay, day))
        }

        return [week]
      }
      const weeks = adapter.getWeekArray(model.value)

      const days = weeks.flat()

      // Make sure there's always 5 weeks in month (5 * 7 days)
      // But only do it if we're not hiding adjacent months?
      const daysInMonth = 5 * 7
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

    function onClickPrev () {
      if (props.type === 'month') {
        model.value = adapter.addMonths(model.value, -1)
      }
      if (props.type === 'week') {
        model.value = adapter.addDays(model.value, -7)
      }
      if (props.type === 'day') {
        model.value = adapter.addDays(model.value, -1)
      }
    }

    function onClickNext () {
      if (props.type === 'month') {
        model.value = adapter.addMonths(model.value, 1)
      }
      if (props.type === 'week') {
        model.value = adapter.addDays(model.value, 7)
      }
      if (props.type === 'day') {
        model.value = adapter.addDays(model.value, 1)
      }
    }

    const validDates = computed(() => [
      adapter.startOfMonth(model.value),
      adapter.endOfMonth(model.value),
    ])
    const daysIn = computed(() => {
      const isRange = validDates.value.length > 1

      const days = weeksIn.value.flat()
      const today = adapter.date()

      const startDate = computed(() => validDates.value[0])
      const endDate = computed(() => validDates.value[1])

      return days
        .filter((date: any) => props.weekdays.includes(date.getDay()))
        .map((date, index) => {
          const isStart = startDate.value && adapter.isSameDay(date, startDate.value)
          const isEnd = endDate.value && adapter.isSameDay(date, endDate.value)
          const isAdjacent = !adapter.isSameMonth(date, model.value)
          const isSame = validDates.value.length === 2 && adapter.isSameDay(startDate.value, endDate.value)

          return {
            date,
            isoDate: adapter.toISO(date),
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
      return weeksIn.value.map(week => {
        return week.length ? getWeek(adapter, week[0]) : null
      })
    })

    const title = computed(() => {
      return adapter.format(model.value, 'monthAndYear')
    })

    useRender(() => (
      <div class={[
        'v-calendar',
        {
          'v-calendar-monthly': props.type === 'month',
          'v-calendar-weekly': props.type === 'week',
          'v-calendar-day': props.type === 'day',
        },
      ]}
      >
        <div>
          { !props.hideHeader && (
            <VCalendarHeader
              key="calendar-header"
              title={ title.value }
              onClick:next={ onClickNext }
              onClick:prev={ onClickPrev }
            />
          )}
        </div>

        <div class="v-calendar__container">
          { props.type === 'month' && !props.hideDayHeader && (
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
                  <div class={ `v-calendar-weekly__head-weekday${!props.hideWeekNumber ? '-with-weeknumber' : ''}` }>
                    { dayNames[weekday] }
                  </div>
                ))
              }
            </div>
          )}

          { props.type === 'month' && (
            <div
              key="VCalendarMonth"
              class={
                [
                  'v-calendar-month__days',
                  `days${!props.hideWeekNumber ? '-with-weeknumbers' : ''}__${props.weekdays.length}`,
                  ...(!props.hideWeekNumber ? ['v-calendar-month__weeknumbers'] : []),
                ]
              }
            >
              { chunkArray(daysIn.value, props.weekdays.length).map((week, wi) => (
                [
                  !props.hideWeekNumber ? <div class="v-calendar-month__weeknumber">{ weeks.value[wi] }</div> : '',
                  week.map(day => (
                    <VCalendarMonthDay
                      color={ adapter.isSameDay(new Date(), day.date) ? 'primary' : undefined }
                      day={ day }
                      disabled={ day ? props.disabled?.includes(day.date) : false }
                      title={ day ? adapter.format(day.date, 'dayOfMonth') : 'NaN' }
                      events={ day.events }
                    ></VCalendarMonthDay>
                  )),
                ]
              ))}
            </div>
          )}

          { props.type === 'week' && (
            daysIn.value.map((day, i) => (
              <VCalendarDay
                day={ day }
                dayIndex={ i }
                events={ day.events }
                hideDayHeader={ props.hideDayHeader }
                intervalDivisions={ props.intervalDivisions }
                intervalDuration={ props.intervalDuration }
                intervalHeight={ props.intervalHeight }
                intervalLabel={ props.intervalLabel }
                intervals={ props.intervals }
                intervalStart={ props.intervalStart }
              ></VCalendarDay>
            ))
          )}

          { props.type === 'day' && (
            <VCalendarDay
              day={ daysIn.value[0] }
              events={ daysIn.value[0].events }
              hideDayHeader={ props.hideDayHeader }
              intervalDivisions={ props.intervalDivisions }
              intervalDuration={ props.intervalDuration }
              intervalHeight={ props.intervalHeight }
              intervalLabel={ props.intervalLabel }
              intervals={ props.intervals }
              intervalStart={ props.intervalStart }
            ></VCalendarDay>
          )}
        </div>
      </div>
    ))

    return { daysIn, weeksIn, weeks }
  },
})

export type VCalendar = InstanceType<typeof VCalendar>
