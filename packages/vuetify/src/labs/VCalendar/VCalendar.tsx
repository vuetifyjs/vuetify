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
  allDayContent: { day?: CalendarDay, events?: Array<any> }
  allDayEvent: { day?: CalendarDay, event?: Record<string, unknown> }
  dayBody: { day?: CalendarDay, events?: Array<any> }
  dayTitle: { title?: number | string }
  dayEvent: { day?: CalendarDay, allDay: Boolean, event?: Record<string, unknown> }
  header: { title: string, clickNext: Function, clickPrev: Function, clickToday: Function }
  weekDayCalendarCell: { day?: CalendarDay, dayIndex: Number, events?: Array<any> }
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
    'click:event': null,
    'contextmenu:date': null,
    'contentmenu:event': null,
  },

  setup (props, { attrs, emit, slots }) {
    const adapter = useDate()

    const { daysInMonth, daysInWeek, genDays, model, displayValue, weekNumbers, weekDays } = useCalendar(props as any)

    const dayNames = adapter.getWeekdays()

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

    function clickEvent (mouseEvent: any, event: any) {
      emit('click:event', mouseEvent, event)
    }

    function contextmenuDate (mouseEvent: any, date: any) {
      emit('contextmenu:date', mouseEvent, date)
    }

    function contextmenuEvent (mouseEvent: any, date: any, event: any) {
      emit('contextmenu:date', mouseEvent, date, event)
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

          <div class={['v-calendar__container', `days__${weekDays.value.length}`]}>
            { props.viewMode === 'month' && !props.hideDayHeader && (
              <div
                class={
                  [
                    'v-calendar-weekly__head',
                    `days__${weekDays.value.length}`,
                    ...(!props.hideWeekNumber ? ['v-calendar-weekly__head-weeknumbers'] : []),
                  ]
                }
                key="calenderWeeklyHead"
              >
                { !props.hideWeekNumber ? <div key="weekNumber0" class="v-calendar-weekly__head-weeknumber"></div> : '' }
                {
                  weekDays.value.map(weekday => (
                    <div class={ `v-calendar-weekly__head-weekday${!props.hideWeekNumber ? '-with-weeknumber' : ''}` }>
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
                    `days${!props.hideWeekNumber ? '-with-weeknumbers' : ''}__${weekDays.value.length}`,
                    ...(!props.hideWeekNumber ? ['v-calendar-month__weeknumbers'] : []),
                  ]
                }
              >
                { chunkArray(daysInMonth.value, weekDays.value.length)
                  .map((week, wi) => (
                    [
                      !props.hideWeekNumber ? <div class="v-calendar-month__weeknumber">{ weekNumbers.value[wi] }</div> : '',
                      week.map(day => (
                          <VCalendarMonthDay
                            key={ day.date.getTime() }
                            { ...calendarDayProps }
                            { ...getPrefixedEventHandlers(attrs, ':day', () => ({ day })) }
                            day={ day }
                            title={ adapter.format(day.date, 'dayOfMonth') }
                            events={ props.events?.filter(e => adapter.isSameDay(day.date, e.start) || adapter.isSameDay(day.date, e.end)) }
                            onClick:event={ clickEvent }
                            onContextmenu:date={ contextmenuDate }
                            onContextmenu:event={ contextmenuEvent }
                          >
                            {{
                              ...pick(slots, ['dayBody', 'dayEvent', 'dayTitle']),
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
                slots.weekDayCalendarCell ? slots.weekDayCalendarCell?.({
                  ...calendarDayProps,
                  day,
                  dayIndex: i,
                  events: props.events?.filter(e => adapter.isSameDay(e.start, day.date) || adapter.isSameDay(e.end, day.date)),
                }) : (
                  <VCalendarDay
                    { ...calendarDayProps }
                    day={ day }
                    dayIndex={ i }
                    events={ props.events?.filter(e => adapter.isSameDay(e.start, day.date) || adapter.isSameDay(e.end, day.date)) }
                    onClick:event={ clickEvent }
                    onContextmenu:date={ contextmenuDate }
                    onContextmenu:event={ contextmenuEvent }
                  >
                    {{ ...pick(slots, ['interval', 'intervalBody', 'intervalEvent', 'intervalTitle']) }}
                  </VCalendarDay>
                )
              ))
            }

            { props.viewMode === 'day' && (
              slots.weekDayCalendarCell ? slots.weekDayCalendarCell({
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
                  onClick:event={ clickEvent }
                  onContextmenu:date={ contextmenuDate }
                  onContextmenu:event={ contextmenuEvent }
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
