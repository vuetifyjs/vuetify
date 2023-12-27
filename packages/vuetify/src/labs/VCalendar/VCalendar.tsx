// Styles
import './VCalendar.sass'

// Components
import { makeVCalendarDayProps, VCalendarDay } from './VCalendarDay'
import { VCalendarHeader } from './VCalendarHeader'
import { VCalendarMonthDay } from './VCalendarMonthDay'

// Composables
import { makeCalendarProps, useCalendar } from '@/composables/calendar'
import { getDay, useDate } from '@/composables/date/date'

// Utilities
import { computed } from 'vue'
import { chunkArray, genericComponent, propsFactory, useRender } from '@/util'

export const makeVCalendarProps = propsFactory({
  hideHeader: Boolean,
  hideWeekNumber: Boolean,
  title: String,
  type: {
    type: String,
    default: 'month',
    validator (val: string) {
      return ['month', 'week', 'day'].includes(val)
    },
  },
  weekdays: {
    type: Array<number>,
    default: () => [0, 1, 2, 3, 4, 5, 6],
  },

  ...makeCalendarProps(),
  ...makeVCalendarDayProps(),
}, 'VCalender')

export type VCalendarSlots = {
  header: { title: string }
}

export const VCalendar = genericComponent<VCalendarSlots>()({
  name: 'VCalendar',

  props: makeVCalendarProps(),

  emits: {
    next: null,
    prev: null,
    'update:modelValue': null,
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()

    const { daysInMonth, daysInWeek, genDays, model, weekNumbers } = useCalendar(props as any)

    const dayNames = adapter.getWeekdays()

    function onClickNext () {
      if (props.type === 'month') {
        model.value = [adapter.addMonths(model.value[0], 1)]
      }
      if (props.type === 'week') {
        model.value = [adapter.addDays(model.value[0], 7)]
      }
      if (props.type === 'day') {
        model.value = [adapter.addDays(model.value[0], 1)]
      }
    }

    function onClickPrev () {
      if (props.type === 'month') {
        model.value = [adapter.addMonths(model.value[0], -1)]
      }
      if (props.type === 'week') {
        model.value = [adapter.addDays(model.value[0], -7)]
      }
      if (props.type === 'day') {
        model.value = [adapter.addDays(model.value[0], -1)]
      }
    }

    function onClickToday () {
      model.value = [new Date()]
    }

    const title = computed(() => {
      return adapter.format(model.value[0], 'monthAndYear')
    })

    useRender(() => {
      const calendarDayProps = VCalendarDay.filterProps(props)

      return (
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
              !slots.header ? (
                <VCalendarHeader
                  key="calendar-header"
                  title={ title.value }
                  onClick:next={ onClickNext }
                  onClick:prev={ onClickPrev }
                  onClick:toToday={ onClickToday }
                />
              ) : (
                slots.header({ title: title.value })
              )
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
                { chunkArray(daysInMonth.value
                  .filter(day => props.weekdays.includes(getDay(adapter, day.date))), props.weekdays.length)
                  .map((week, wi) => (
                    [
                      !props.hideWeekNumber ? <div class="v-calendar-month__weeknumber">{ weekNumbers.value[wi] }</div> : '',
                      week.filter(day => props.weekdays.includes(getDay(adapter, day.date))).map(day => (
                        <VCalendarMonthDay
                          color={ adapter.isSameDay(new Date(), day.date) ? 'primary' : undefined }
                          day={ day }
                          title={ day ? adapter.format(day.date, 'dayOfMonth') : 'NaN' }
                          events={ props.events?.filter(e => adapter.isSameDay(day.date, e.start) || adapter.isSameDay(day.date, e.end)) }
                        ></VCalendarMonthDay>
                      )),
                    ]
                  ))}
              </div>
            )}

            { props.type === 'week' && (
              daysInWeek.value.map((day, i) => (
                <VCalendarDay
                  { ...calendarDayProps }
                  day={ day }
                  dayIndex={ i }
                  events={ props.events?.filter(e => adapter.isSameDay(e.start, day.date) || adapter.isSameDay(e.end, day.date)) }
                ></VCalendarDay>
              ))
            )}

            { props.type === 'day' && (
              <VCalendarDay
                { ...calendarDayProps }
                day={ genDays([model.value[0] as Date], adapter.date() as Date)[0] }
                events={
                  props.events?.filter(e =>
                    adapter.isSameDay(e.start, genDays([model.value[0] as Date], adapter.date() as Date)[0].date) ||
                    adapter.isSameDay(e.end, genDays([model.value[0] as Date], adapter.date() as Date)[0].date)
                  )
                }
              ></VCalendarDay>
            )}
          </div>
        </div>
      )
    })

    return { daysInMonth, daysInWeek, genDays }
  },
})

export type VCalendar = InstanceType<typeof VCalendar>
