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
import { computed } from 'vue'
import { chunkArray, genericComponent, getPrefixedEventHandlers, propsFactory, useRender } from '@/util'

// Types
import type { VCalendarIntervalSlots } from './VCalendarInterval'
import type { VCalendarMonthDaySlots } from './VCalendarMonthDay'
import type { CalendarDay } from '@/composables/calendar'

export const makeVCalendarProps = propsFactory({
  hideHeader: Boolean,
  hideWeekNumber: Boolean,

  ...makeCalendarProps(),
  ...makeVCalendarDayProps(),
  ...makeVCalendarHeaderProps(),
}, 'VCalender')

export type VCalendarSlots = {
  day: { day?: CalendarDay, events?: Array<any> }
  header: { title: string }
  intervalDay: { day?: CalendarDay, dayIndex: Number, showLabel: boolean, events?: Array<any> }
} & VCalendarIntervalSlots & VCalendarMonthDaySlots

export const VCalendar = genericComponent<VCalendarSlots>()({
  name: 'VCalendar',

  props: makeVCalendarProps(),

  emits: {
    next: null,
    prev: null,
    'update:modelValue': null,
  },

  setup (props, { attrs, emit, slots }) {
    const adapter = useDate()

    const { daysInMonth, daysInWeek, genDays, model, displayValue, weekNumbers } = useCalendar(props as any)

    const dayNames = adapter.getWeekdays()

    function onClickNext () {
      if (props.viewMode === 'month') {
        model.value = [adapter.addMonths(displayValue.value, 1)]
      }
      if (props.viewMode === 'week') {
        model.value = [adapter.addDays(displayValue.value, 7)]
      }
      if (props.viewMode === 'day') {
        model.value = [adapter.addDays(displayValue.value, 1)]
      }
    }

    function onClickPrev () {
      if (props.viewMode === 'month') {
        model.value = [adapter.addMonths(displayValue.value, -1)]
      }
      if (props.viewMode === 'week') {
        model.value = [adapter.addDays(displayValue.value, -7)]
      }
      if (props.viewMode === 'day') {
        model.value = [adapter.addDays(displayValue.value, -1)]
      }
    }

    function onClickToday () {
      model.value = [adapter.date()]
    }

    const title = computed(() => {
      return adapter.format(displayValue.value, 'monthAndYear')
    })

    useRender(() => {
      const calendarDayProps = VCalendarDay.filterProps(props)
      const calendarHeaderProps = VCalendarHeader.filterProps(props)

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
              slots.header?.({ title: title.value }) ?? (
                <VCalendarHeader
                  key="calendar-header"
                  { ...calendarHeaderProps }
                  title={ title.value }
                  onClick:next={ onClickNext }
                  onClick:prev={ onClickPrev }
                  onClick:toToday={ onClickToday }
                />
              )
            )}
          </div>

          <div class={['v-calendar__container', `days__${props.weekdays.length}`]}>
            { props.viewMode === 'month' && !props.hideDayHeader && (
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
                  props.weekdays.map(weekday => (
                    <div
                      class={ `v-calendar-weekly__head-weekday${!props.hideWeekNumber ? '-with-weeknumber' : ''}` }
                    >
                      { dayNames[weekday] }
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
                    `days${!props.hideWeekNumber ? '-with-weeknumbers' : ''}__${props.weekdays.length}`,
                    ...(!props.hideWeekNumber ? ['v-calendar-month__weeknumbers'] : []),
                  ]
                }
              >
                { chunkArray(daysInMonth.value, props.weekdays.length)
                  .map((week, wi) => (
                    [
                      !props.hideWeekNumber ? <div class="v-calendar-month__weeknumber">{ weekNumbers.value[wi] }</div> : '',
                      week.map(day => (
                        slots.day ? slots.day({
                          day,
                          events: props.events?.filter(e => adapter.isSameDay(day.date, e.start) || adapter.isSameDay(day.date, e.end)),
                        })
                        : (
                          <VCalendarMonthDay
                            key={ day.date.getTime() }
                            { ...calendarDayProps }
                            { ...getPrefixedEventHandlers(attrs, ':day', () => ({ day })) }
                            day={ day }
                            title={ day ? adapter.format(day.date, 'dayOfMonth') : 'NaN' }
                            events={ props.events?.filter(e => adapter.isSameDay(day.date, e.start) || adapter.isSameDay(day.date, e.end)) }
                            v-slots={{
                              dayBody: slots.dayBody,
                              event: slots.event,
                              title: slots.title,
                            }}
                          />
                        ))),
                    ]
                  ))
                }
              </div>
            )}

            { props.viewMode === 'week' && (
              daysInWeek.value.map((day, i) =>
                slots.intervalDay ? slots.intervalDay?.({
                  ...calendarDayProps,
                  day,
                  dayIndex: i,
                  showLabel: i === 0,
                  events: props.events?.filter(e => adapter.isSameDay(e.start, day.date) || adapter.isSameDay(e.end, day.date)),
                }) : (
                  <VCalendarDay
                    { ...calendarDayProps }
                    day={ day }
                    showLabel={ i === 0 }
                    events={ props.events?.filter(e => adapter.isSameDay(e.start, day.date) || adapter.isSameDay(e.end, day.date)) }
                    v-slots={{
                      intervalEvent: slots.intervalEvent,
                      intervalBody: slots.intervalBody,
                      intervalFormat: slots.intervalFormat,
                    }}
                  ></VCalendarDay>
                )
              ))
            }

            { props.viewMode === 'day' && (
              slots.intervalDay ? slots.intervalDay({
                day: genDays([displayValue.value], adapter.date())[0],
                dayIndex: 0,
                showLabel: true,
                events: props.events?.filter(e =>
                  adapter.isSameDay(e.start, genDays([displayValue.value], adapter.date())[0].date) ||
                  adapter.isSameDay(e.end, genDays([displayValue.value], adapter.date())[0].date)
                ),
              }) : (
                <VCalendarDay
                  { ...calendarDayProps }
                  showLabel
                  day={ genDays([displayValue.value], adapter.date())[0] }
                  events={
                    props.events?.filter(e =>
                      adapter.isSameDay(e.start, genDays([displayValue.value], adapter.date())[0].date) ||
                      adapter.isSameDay(e.end, genDays([displayValue.value], adapter.date())[0].date)
                    )
                  }
                  v-slots={{
                    intervalEvent: slots.intervalEvent,
                    intervalBody: slots.intervalBody,
                    intervalFormat: slots.intervalFormat,
                  }}
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
