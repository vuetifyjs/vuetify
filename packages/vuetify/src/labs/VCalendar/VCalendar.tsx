// Styles
import './VCalendar.sass'

// Components
import { makeVCalendarDayProps, VCalendarDay } from './VCalendarDay'
import { makeVCalendarHeaderProps, VCalendarHeader } from './VCalendarHeader'
import { VCalendarMonthDay } from './VCalendarMonthDay'

// Composables
import { makeCalendarProps, useCalendar } from '@/composables/calendar'
import { useDate } from '@/composables/date/date'

// Utilities
import { computed, nextTick } from 'vue'
import { chunkArray, genericComponent, getPrefixedEventHandlers, pick, propsFactory, useRender } from '@/util'

// Types
import type { VCalendarDaySlots } from './VCalendarDay'
import type { CalendarDay } from '@/composables/calendar'

export const makeVCalendarProps = propsFactory({
  hideHeader: Boolean,
  hideWeekNumber: Boolean,

  ...makeCalendarProps(),
  ...makeVCalendarDayProps(),
  ...makeVCalendarHeaderProps(),
}, 'VCalendar')

export type VCalendarSlots = VCalendarDaySlots & {
  'day-body': { day?: CalendarDay, events?: Array<any> }
  'day-title': { title?: number | string }
  'day-event': { day?: CalendarDay, allDay: boolean, event?: Record<string, unknown> }
  header: { title: string, clickNext: Function, clickPrev: Function, clickToday: Function }
  'day-interval': { day?: CalendarDay, dayIndex: number, events?: Array<any> }
  title: { title?: string }
}

export const VCalendar = genericComponent<VCalendarSlots>()({
  name: 'VCalendar',

  props: makeVCalendarProps(),

  emits: {
    next: null,
    prev: null,
    today: null,
    'update:modelValue': null,
  },

  setup (props, { attrs, emit, slots }) {
    const adapter = useDate()

    const { daysInMonth, daysInWeek, genDays, model, displayValue, weekNumbers, weekdayLabels } = useCalendar(props as any)

    function onClickNext () {
      if (props.viewMode === 'month') {
        model.value = [adapter.addMonths(displayValue.value, 1)]
      } else if (props.viewMode === 'week') {
        model.value = [adapter.addDays(displayValue.value, 7)]
      } else if (props.viewMode === 'day') {
        model.value = [adapter.addDays(displayValue.value, 1)]
      }
      nextTick(() => {
        emit('next', model.value[0])
      })
    }

    function onClickPrev () {
      if (props.viewMode === 'month') {
        model.value = [adapter.addMonths(displayValue.value, -1)]
      } else if (props.viewMode === 'week') {
        model.value = [adapter.addDays(displayValue.value, -7)]
      } else if (props.viewMode === 'day') {
        model.value = [adapter.addDays(displayValue.value, -1)]
      }
      nextTick(() => {
        emit('prev', model.value[0])
      })
    }

    function onClickToday () {
      const date = adapter.date()
      model.value = [date]
      nextTick(() => {
        emit('today', model.value[0])
      })
    }

    const title = computed(() => {
      return adapter.format(displayValue.value, 'monthAndYear')
    })

    function eventFilter (date: Date, e: {start: Date, end: Date}) {
      return adapter.isSameDay(date, e.start) || adapter.isSameDay(date, e.end) ||
        adapter.isWithinRange(date, [adapter.endOfDay(e.start), adapter.startOfDay(e.end)])
    }

    useRender(() => {
      const calendarDayProps = VCalendarDay.filterProps(props)
      const calendarHeaderProps = VCalendarHeader.filterProps(props)

      const weekdaysCount = daysInWeek.value.length

      return (
        <div class={[
          'v-calendar',
          {
            'v-calendar-monthly': props.viewMode === 'month',
            'v-calendar-weekly': props.viewMode === 'week',
            'v-calendar-day': props.viewMode === 'day',
          },
        ]}
        >
          <div>
            { !props.hideHeader && (
              slots.header?.({
                title: title.value,
                clickNext: onClickNext,
                clickPrev: onClickPrev,
                clickToday: onClickToday,
              }) ?? (
                <VCalendarHeader
                  key="calendar-header"
                  { ...calendarHeaderProps }
                  title={ title.value }
                  onClick:next={ onClickNext }
                  onClick:prev={ onClickPrev }
                  onClick:toToday={ onClickToday }
                >
                  {{ title: slots.title }}
                </VCalendarHeader>
              )
            )}
          </div>

          <div class={['v-calendar__container', `days__${weekdaysCount}`]}>
            { props.viewMode === 'month' && !props.hideDayHeader && (
              <div
                class={
                  [
                    'v-calendar-weekly__head',
                    `days__${weekdaysCount}`,
                    ...(!props.hideWeekNumber ? ['v-calendar-weekly__head-weeknumbers'] : []),
                  ]
                }
                key="calendarWeeklyHead"
              >
                { !props.hideWeekNumber ? <div key="weekNumber0" class="v-calendar-weekly__head-weeknumber"></div> : '' }
                {
                  weekdayLabels.value.map(weekday => (
                    <div class={ `v-calendar-weekly__head-weekday${!props.hideWeekNumber ? '-with-weeknumber' : ''}` }>
                      { weekday }
                    </div>
                  ))
                }
              </div>
            )}

            { props.viewMode === 'month' && (
              <div
                key="VCalendarMonth"
                class={
                  [
                    'v-calendar-month__days',
                    `days${!props.hideWeekNumber ? '-with-weeknumbers' : ''}__${weekdaysCount}`,
                    ...(!props.hideWeekNumber ? ['v-calendar-month__weeknumbers'] : []),
                  ]
                }
              >
                { chunkArray(daysInMonth.value, weekdaysCount)
                  .map((week, wi) => (
                    [
                      !props.hideWeekNumber ? (
                        <div
                          class="v-calendar-month__weeknumber"
                          { ...getPrefixedEventHandlers(attrs, ':weekNumber', () => ({ weekNumber: weekNumbers.value[wi], week })) }
                        >{ weekNumbers.value[wi] }</div>
                      ) : '',
                      week.map(day => (
                          <VCalendarMonthDay
                            key={ adapter.toJsDate(day.date).getTime() }
                            { ...calendarDayProps }
                            day={ day }
                            title={ adapter.format(day.date, 'dayOfMonth') }
                            events={ props.events?.filter(e => eventFilter(day.date, e)) }
                            { ...attrs }
                          >
                            {{
                              ...pick(slots, ['day-body', 'day-event', 'day-title']),
                            }}
                          </VCalendarMonthDay>
                      )),
                    ]
                  ))
                }
              </div>
            )}
            { props.viewMode === 'week' && (
              daysInWeek.value.map((day, i) =>
                slots['day-interval'] ? slots['day-interval']?.({
                  ...calendarDayProps,
                  day,
                  dayIndex: i,
                  events: props.events?.filter(e => eventFilter(day.date, e)),
                }) : (
                  <VCalendarDay
                    { ...calendarDayProps }
                    day={ day }
                    dayIndex={ i }
                    events={ props.events?.filter(e => eventFilter(day.date, e)) }
                    { ...attrs }
                  >
                    {{ ...pick(slots, ['interval', 'interval-body', 'interval-event', 'interval-title']) }}
                  </VCalendarDay>
                )
              ))
            }

            { props.viewMode === 'day' && (
              slots['day-interval'] ? slots['day-interval']({
                day: genDays([displayValue.value as Date], adapter.date() as Date)[0],
                dayIndex: 0,
                events: props.events?.filter(e =>
                  adapter.isSameDay(e.start, genDays([displayValue.value as Date], adapter.date() as Date)[0].date) ||
                  adapter.isSameDay(e.end, genDays([displayValue.value as Date], adapter.date() as Date)[0].date)
                ),
              }) : (
                <VCalendarDay
                  { ...calendarDayProps }
                  day={ genDays([model.value[0] as Date], adapter.date() as Date)[0] }
                  dayIndex={ 0 }
                  events={
                    props.events?.filter(e =>
                      adapter.isSameDay(e.start, genDays([model.value[0] as Date], adapter.date() as Date)[0].date) ||
                      adapter.isSameDay(e.end, genDays([model.value[0] as Date], adapter.date() as Date)[0].date)
                    )
                  }
                  { ...attrs }
                ></VCalendarDay>
              )
            )}
          </div>
        </div>
      )
    })

    return { daysInMonth, daysInWeek, genDays }
  },
})

export type VCalendar = InstanceType<typeof VCalendar>
