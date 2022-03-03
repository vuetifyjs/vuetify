import { CalendarFormatter, CalendarTimestamp, createDayList, createNativeLocaleFormatter, getDayIdentifier } from "@/composables/calendar/timestamp"
import { genericComponent, MakeSlots } from "@/util"
import type { ComputedRef, VNode } from "vue"
import { computed } from 'vue'
import { useBaseCalendar } from "./composables/base"
import { makeBaseProps, makeWeeksProps } from "./composables/props"
import { makeTimesProps, useTimes } from "./composables/times"

import { makeThemeProps, provideTheme } from '@/composables/theme'
import { weekNumber } from "@/util/dateTimeUtils"

export const VCalendarWeekly = genericComponent<new <T>() => {
  $props: {}
  $slots: MakeSlots<{}>
}>()({
  name: 'VCalendarWeekly',

  props: {
    ...makeTimesProps(),
    ...makeBaseProps(),
    ...makeWeeksProps(),
    ...makeThemeProps(),
  },

  setup(props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const {
      times,
      parsedNow,
      setPresent,
      getNow,
      updateDay,
      updateTime,
      updateTimes,
    } = useTimes(props.now)
    const {
      parsedWeekdays,
      weekdaySkips,
      weekdaySkipsReverse,
      parsedStart,
      parsedEnd,
      days: doDays,
      dayFormatter,
      weekdayFormatter,
      getRelativeClasses,
      getStartOfWeek,
      getEndOfWeek,
      getFormatter
    } = useBaseCalendar({currentLocale: null, dayFormat: null, end: props.end, start: props.start, times,weekdayFormat: null, weekdays: null})

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
        currentLocale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    })
    
    // methods
    const isOutside =  (day: CalendarTimestamp): boolean => {
      const dayIdentifier = getDayIdentifier(day)

      return dayIdentifier < getDayIdentifier(parsedStart.value) ||
             dayIdentifier > getDayIdentifier(parsedEnd.value)
    }

    const genHead = (): VNode => {
      return this.$createElement('div', {
        staticClass: 'v-calendar-weekly__head',
      }, genHeadDays())
    }

    const genHeadDays = (): VNode[] => {
      const header = todayWeek.value.map(genHeadDay)

      if (props.showWeek) {
        header.unshift(this.$createElement('div', {
          staticClass: 'v-calendar-weekly__head-weeknumber',
        }))
      }

      return header
    }

    const genHeadDay = (day: CalendarTimestamp, index: number): VNode => {
      const outside = isOutside(days.value[index])
      const color = day.present ? color : undefined

      return this.$createElement('div', this.setTextColor(color, {
        key: day.date,
        staticClass: 'v-calendar-weekly__head-weekday',
        class: getRelativeClasses(day, outside),
      }), weekdayFormatter.value(day, props.shortWeekdays))
    }

    const genWeeks = (): VNode[] => {
      const weekDays = parsedWeekdays.value.length
      const weeks: VNode[] = []

      for (let i = 0; i < days.value.length; i += weekDays) {
        weeks.push(genWeek(days.value.slice(i, i + weekDays), getWeekNumber(days.value[i])))
      }

      return weeks
    }

    const genWeek = (week: CalendarTimestamp[], weekNumber: number): VNode => {
      const weekNodes = week.map((day, index) => genDay(day, index, week))

      if (props.showWeek) {
        weekNodes.unshift(genWeekNumber(weekNumber))
      }

      return this.$createElement('div', {
        key: week[0].date,
        staticClass: 'v-calendar-weekly__week',
      }, weekNodes)
    }

    const getWeekNumber = (determineDay: CalendarTimestamp) => {
      return weekNumber(
        determineDay.year,
        determineDay.month - 1,
        determineDay.day,
        parsedWeekdays.value[0],
        parseInt(localeFirstDayOfYear)
      )
    }

    const genWeekNumber = (weekNumber: number) => {
      return this.$createElement('div', {
        staticClass: 'v-calendar-weekly__weeknumber',
      }, [
        this.$createElement('small', String(weekNumber)),
      ])
    }

    const genDay = (day: CalendarTimestamp, index: number, week: CalendarTimestamp[]): VNode => {
      const outside = isOutside(day)

      return this.$createElement('div', {
        key: day.date,
        staticClass: 'v-calendar-weekly__day',
        class: getRelativeClasses(day, outside),
        on: getDefaultMouseEventHandlers(':day', _e => day),
      }, [
        genDayLabel(day),
        ...(getSlot(this, 'day', () => ({ outside, index, week, ...day })) || []),
      ])
    }

    const genDayLabel = (day: CalendarTimestamp): VNode => {
      return this.$createElement('div', {
        staticClass: 'v-calendar-weekly__day-label',
      }, getSlot(this, 'day-label', day) || [genDayLabelButton(day)])
    }

    const genDayLabelButton = (day: CalendarTimestamp): VNode => {
      const color = day.present ? color : 'transparent'
      const hasMonth = day.day === 1 && props.showMonthOnFirst

      return this.$createElement(VBtn, {
        props: {
          color,
          fab: true,
          depressed: true,
          small: true,
        },
        on: getMouseEventHandlers({
          'click:date': { event: 'click', stop: true },
          'contextmenu:date': { event: 'contextmenu', stop: true, prevent: true, result: false },
        }, _e => day),
      }, hasMonth
        ? monthFormatter.value(day, props.shortMonths) + ' ' + dayFormatter.value(day, false)
        : dayFormatter.value(day, false)
      )
    }

    const genDayMonth = (day: CalendarTimestamp): VNode | string => {
      const color = day.present ? color : undefined

      return this.$createElement('div', this.setTextColor(color, {
        staticClass: 'v-calendar-weekly__day-month',
      }), getSlot(this, 'day-month', day) || monthFormatter.value(day, props.shortMonths))
    }

    useRender(() => {
      return (
        <div
          class={[
            staticClass.value, classes.value
          ]}
        >
          { slots.default?.() }
        </div>
      )
    })
  }
})

export type VCalendarWeekly = InstanceType<typeof VCalendarWeekly>
