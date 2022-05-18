import { CalendarFormatter, CalendarTimestamp, createDayList, createNativeLocaleFormatter, getDayIdentifier } from "@/composables/calendar/timestamp"
import { genericComponent, MakeSlots } from "@/util"
import { ComputedRef } from "vue"
import { computed } from 'vue'
import { useLocale } from '@/composables/locale'
import { useBaseCalendar } from "./composables/base"
import { makeBaseProps, makeEventsProps, makeTimesProps, makeWeeksProps } from "./composables/props"
import { useTimes } from "./composables/times"

import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'
import { weekNumber } from "@/util/dateTimeUtils"
import { VBtn } from "../VBtn"

// Styles
import './VCalendarWeekly.sass'
import { VCalendarDaily } from "./VCalendarDaily"

export const VCalendarWeekly = genericComponent<new <T>() => {
  $props: {}
  $slots: MakeSlots<{}>
}>()({
  name: 'VCalendarWeekly',

  props: {
    ...makeBaseProps(),
    ...makeEventsProps(),
    ...makeThemeProps(),
    ...makeTimesProps(),
    ...makeVariantProps(),
    ...makeWeeksProps(),
  },

  setup(props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { current } = useLocale()
    const {
      times
    } = useTimes(props)
    const {
      parsedWeekdays,
      weekdaySkips,
      parsedStart,
      parsedEnd,
      dayFormatter,
      weekdayFormatter,
      getRelativeClasses,
      getStartOfWeek,
      getEndOfWeek
    } = useBaseCalendar(props, current.value, null, times, null)

    const staticClass: ComputedRef<string> = computed(() => {
      return 'v-calendar-weekly'
    })
    const classes: ComputedRef<object> = computed(() => {
      return themeClasses
    })
    const parsedMinWeeks: ComputedRef<number> = computed(() => {
      return parseInt(props.minWeeks)
    })
    const days: ComputedRef<CalendarTimestamp[]> = computed(() => {
      const minDays = parsedMinWeeks.value * parsedWeekdays.value.length
      const start = getStartOfWeek(parsedStart.value)
      const end = getEndOfWeek(parsedEnd.value)

      return createDayList(
        start,
        end,
        times.today,
        weekdaySkips.value,
        Number.MAX_SAFE_INTEGER,
        minDays
      )
    })

    const todayWeek: ComputedRef<CalendarTimestamp[]> = computed(() => {
      const today = times.today
      const start = getStartOfWeek(today)
      const end = getEndOfWeek(today)
      return createDayList(
        start,
        end,
        today,
        weekdaySkips.value,
        parsedWeekdays.value.length,
        parsedWeekdays.value.length
      )
    })

    const monthFormatter: ComputedRef<CalendarFormatter> = computed(() => {
      if (props.monthFormat) {
        return props.monthFormat as CalendarFormatter
      }

      const longOptions = { timeZone: 'UTC', month: 'long' }
      const shortOptions = { timeZone: 'UTC', month: 'short' }

      return createNativeLocaleFormatter(
        current.value,
        (_tms, short) => short ? shortOptions : longOptions
      )
    })
    
    // methods
    const isOutside = (day: CalendarTimestamp): boolean => {
      const dayIdentifier = getDayIdentifier(day)

      return dayIdentifier < getDayIdentifier(parsedStart.value) ||
             dayIdentifier > getDayIdentifier(parsedEnd.value)
    }

    interface WeekObject {
      days: CalendarTimestamp[],
      weekIndex: Number
    }

    const genWeeks: ComputedRef<WeekObject[]> = computed(() => {
      const weekDays = parsedWeekdays.value.length
      const weeks: WeekObject[] = []

      for (let i = 0; i < days.value.length; i += weekDays) {
        weeks.push({days: days.value.slice(i, i + weekDays), weekIndex: i})
      }

      return weeks
    })

    const getWeekNumber = (determineDay: CalendarTimestamp) => {
      return weekNumber(
        determineDay.year,
        determineDay.month - 1,
        determineDay.day,
        parseInt(parsedWeekdays.value[0]),
        parseInt(props.localeFirstDayOfYear)
      )
    }

    return (() => {
      return (
        <div
          class={[
            staticClass.value, classes.value
          ]}
        >
          {!props.hideHeader ? 
            <div class="v-calendar-weekly__head">
              { props.showWeek ? <div class="v-calendar-weekly__head-weeknumber"></div> : ''}
              { todayWeek.value.map((day, index) => {
                return <div
                  style={ `color: ${day.present ? props.color : undefined}` }
                  key={ day.date }
                  class={[
                    'v-calendar-weekly__head-weekday',
                    getRelativeClasses(day, isOutside(days.value[index]))
                  ]}
                >
                  { weekdayFormatter.value(day, props.shortWeekdays) }
                </div>
              })}
            </div> : '' }
            
            { genWeeks.value.map((week: WeekObject) => {
              return <div key={week.days[0].date} class="v-calendar-weekly__week">
                { props.showWeek ? <div class="v-calendar-weekly__weeknumber"><small>{ getWeekNumber(week.days[0]) }</small></div> : ''}
                { week.days.map((day, index: number) => {
                  return <div
                  key={ day.date }
                  class={['v-calendar-weekly__day', getRelativeClasses(day, isOutside(day))]}
                  // on: getDefaultMouseEventHandlers(':day', _e => day),
                >
                  <div class="v-calendar-weekly__day-label">
                    <slot name="day-label" day={ day }>
                        <VBtn
                          icon
                          color={day.present ? props.color : 'transparent'}
                          flat
                          small
                          // TODO: on: getMouseEventHandlers({
                          //   'click:date': { event: 'click', stop: true },
                          //   'contextmenu:date': { event: 'contextmenu', stop: true, prevent: true, result: false },
                          // }, _e => day),
                        >
                          { day.day === 1 && props.showMonthOnFirst ? `${monthFormatter.value(day, props.shortMonths)} ${dayFormatter.value(day, false)}` : `${dayFormatter.value(day, false)}`}
                        </VBtn>
                    </slot>
                  </div>
                  { slots.day && slots.day({outside: isOutside(day), index, ...day }) }
                </div>
                })}
              </div>
            })}
        </div>
      )
    })
  }
})

export type VCalendarWeekly = InstanceType<typeof VCalendarWeekly>
