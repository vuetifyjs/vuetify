
// import './VCalendar.sass'

// import { VCalendarWithEvents } from './VCalendarWithEvents'

import { makeThemeProps, provideTheme } from '@/composables/theme'
import { 
  makeBaseProps,
  makeEventsProps,
  makeCalendarProps,
  makeCategoryProps,
  makeIntervalProps,
  makeWeeksProps,
} from './composables/props'
import { useBaseCalendar } from './composables/base'
import { useWithEvents } from './composables/withEvents'

// Utilities
// import { computed, toRef } from 'vue'
import { genericComponent, MakeSlots, useRender } from '@/util'

// Types1
import { computed, watch } from 'vue'
import type { ComputedRef } from 'vue'
import { makeTimesProps, useTimes } from './composables/times'
import { CalendarCategory, CalendarFormatter, CalendarTimestamp, copyTimestamp, getEndOfMonth, getStartOfMonth, nextDay, parseTimestamp, relativeDays, updateFormatted, validateTimestamp } from '@/composables/calendar/timestamp'
import { getParsedCategories } from './composables/parser'
import { VCalendarWeekly } from './VCalendarWeekly'
import { VCalendarMonthly } from './VCalendarMonthly'

export const VCalendar = genericComponent<new <T>() => {
  $props: {
  },
  $slots: MakeSlots<{}>
}>()({
  name: 'VCalendar',

  props: {
    ...makeTimesProps(),
    ...makeBaseProps(),
    ...makeEventsProps(),
    ...makeCalendarProps(),
    ...makeCategoryProps(),
    ...makeWeeksProps(),
    ...makeIntervalProps(),
    ...makeThemeProps()
  },

  setup(props, { attrs, slots }) {
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
      days,
      dayFormatter,
      weekdayFormatter,
      getRelativeClasses,
      getStartOfWeek,
      getEndOfWeek,
      getFormatter
    } = useBaseCalendar({currentLocale: null, dayFormat: null, end: props.end, start: props.start, times,weekdayFormat: null, weekdays: null})

    const {
      noEvents,
      parsedEvents,
      parsedEventOverlapThreshold,
      eventTimedFunction,
      eventCategoryFunction,
      eventTextColorFunction,
      eventNameFunction,
      eventModeFunction,
      eventWeekdays: doEventWeekdays,
      categoryMode: doCategoryMode,
      eventColorFunction,
      parseEvent,
      formatTime,
      updateEventVisibility,
      getEventsMap,
      genEvent,
      genDayEvent,
      genTimedEvent,
      genName,
      genPlaceholder,
      genMore,
      getVisibleEvents,
      isEventForCategory,
      getEventsForDay,
      getEventsForDayAll,
      getEventsForDayTimed,
      getScopedSlots,
    } = useWithEvents({ events: props.events, eventStart: props.eventStart, eventEnd: props.eventEnd, eventOverlapThreshold: props.eventOverlapThreshold, eventTimed: props.eventTimed, eventCategory: props.eventCategory, eventTextColor: props.eventTextColor, eventName: props.eventName, eventOverlapMode: props.eventOverlapMode, parsedWeekdays, type: props.type, eventColor: props.eventColor, getFormatter, eventMore: props.eventMore, eventMoreText: props.eventMoreText, eventHeight: props.eventHeight, eventMarginBottom: props.eventMarginBottom, eventRipple: props.eventRipple })

    updateTimes()
    setPresent()

    // computeds
    const parsedValue: ComputedRef<CalendarTimestamp> = computed(() => {
      return (validateTimestamp(this.value)
        ? parseTimestamp(this.value, true)
        : (parsedStart.value || times.today))
    })

    const parsedCategoryDays: ComputedRef<number> = computed(() => {
      return parseInt(categoryDays) || 1
    })
    
    const renderProps: ComputedRef<VCalendarRenderProps> = computed(() => {
      const around = parsedValue.value
      let component: any = null
      let maxDays = props.maxDays
      let weekdays = parsedWeekdays.value
      let categories = parsedCategories.value
      let start = around
      let end = around
      switch (props.type) {
        case 'month':
          component = VCalendarMonthly
          start = getStartOfMonth(around)
          end = getEndOfMonth(around)
          break
        case 'week':
          component = VCalendarDaily
          start = getStartOfWeek(around)
          end = getEndOfWeek(around)
          maxDays = 7
          break
        case 'day':
          component = VCalendarDaily
          maxDays = 1
          weekdays = [start.weekday]
          break
        case '4day':
          component = VCalendarDaily
          end = relativeDays(copyTimestamp(end), nextDay, 3)
          updateFormatted(end)
          maxDays = 4
          weekdays = [
            start.weekday,
            (start.weekday + 1) % 7,
            (start.weekday + 2) % 7,
            (start.weekday + 3) % 7,
          ]
          break
        case 'custom-weekly':
          component = VCalendarWeekly
          start = parsedStart.value || around
          end = parsedEnd.value
          break
        case 'custom-daily':
          component = VCalendarDaily
          start = parsedStart.value || around
          end = parsedEnd.value
          break
        case 'category':
          const days = parsedCategoryDays.value

          component = VCalendarCategory
          end = relativeDays(copyTimestamp(end), nextDay, days)
          updateFormatted(end)
          maxDays = days
          weekdays = []

          for (let i = 0; i < days; i++) {
            weekdays.push((start.weekday + i) % 7)
          }

          categories = getCategoryList(categories)
          break
        default:
          throw new Error(props.type + ' is not a valid Calendar type')
      }

      return { component, start: start.date, end: end.date, maxDays, weekdays, categories }
    })
    
    const eventWeekdays: ComputedRef<number[]> = computed(() => {
      return renderProps.value.weekdays
    })

    const categoryMode: ComputedRef<boolean> = computed(() => {
      return props.type === 'category'
    })
    
    const title: ComputedRef<string> = computed(() => {
      const { start, end } = renderProps.value
      const spanYears = start.year !== end.year
      const spanMonths = spanYears || start.month !== end.month

      if (spanYears) {
        return `${monthShortFormatter.value(start, true)} ${start.year} - ${monthShortFormatter.value(end, true)} ${end.year}`
      }

      if (spanMonths) {
        return `${monthShortFormatter.value(start, true)} - ${monthShortFormatter.value(end, true)} ${end.year}`
      } else {
        return `${monthLongFormatter.value(start, false)} ${start.year}`
      }
    })

    const monthLongFormatter: ComputedRef<CalendarFormatter> = computed(() => {
      return getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    })

    const monthShortFormatter: ComputedRef<CalendarFormatter> = computed(() => {
      return getFormatter({
        timeZone: 'UTC', month: 'short',
      })
    })
    
    const parsedCategories: ComputedRef<CalendarCategory[]> = computed(() => {
      return getParsedCategories(props.categories, props.categoryText)
    })

    // Methods

    watch(parsedNow, () => {
      updateTimes()
    })

    return () => (
      <div
        class={[
          themeClasses.value
        ]}
      >
        <renderProps.value.component { ...renderProps.value }></renderProps.value.component>
      </div>
    )

  }

})

export type VCalendar = InstanceType<typeof VCalendar>