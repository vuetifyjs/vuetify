// Components
import { VIconBtn } from '@/labs/VIconBtn'

// Composables
import { makeCalendarBaseProps, useCalendarBase } from './composables/calendarBase'
import { useTheme } from '@/composables'

// Utilities
import { computed } from 'vue'
import { weekNumber } from './util/dateTimeUtils'
import {
  createDayList,
  createNativeLocaleFormatter,
  getDayIdentifier,
  validateNumber,
} from './util/timestamp'
import { defineComponent, getPrefixedEventHandlers, noop, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { CalendarFormatter, CalendarTimestamp } from './types'

export const VCalendarWeekly = defineComponent({
  name: 'VCalendarWeekly',

  props: {
    minWeeks: {
      validate: validateNumber,
      default: 1,
    },
    monthFormat: Function as PropType<CalendarFormatter>,
    showWeek: Boolean,
    color: String,
    shortWeekdays: {
      type: Boolean,
      default: true,
    },
    localeFirstDayOfYear: {
      type: [String, Number],
      default: 0,
    },
    showMonthOnFirst: {
      type: Boolean,
      default: true,
    },
    shortMonths: {
      type: Boolean,
      default: true,
    },
    hideHeader: Boolean,

    ...makeCalendarBaseProps(),
  },

  setup (props, { slots, attrs }) {
    const base = useCalendarBase(props)

    const theme = useTheme()

    const parsedMinWeeks = computed((): number => {
      return parseInt(String(props.minWeeks))
    })

    const days = computed((): CalendarTimestamp[] => {
      const minDays = parsedMinWeeks.value * base.parsedWeekdays.value.length
      const start = base.getStartOfWeek(base.parsedStart.value)
      const end = base.getEndOfWeek(base.parsedEnd.value)

      return createDayList(
        start,
        end,
        base.times.today,
        base.weekdaySkips.value,
        Number.MAX_SAFE_INTEGER,
        minDays
      )
    })

    const todayWeek = computed((): CalendarTimestamp[] => {
      const today = base.times.today
      const start = base.getStartOfWeek(today)
      const end = base.getEndOfWeek(today)

      return createDayList(
        start,
        end,
        today,
        base.weekdaySkips.value,
        base.parsedWeekdays.value.length,
        base.parsedWeekdays.value.length
      )
    })

    const monthFormatter = computed((): CalendarFormatter => {
      if (props.monthFormat) {
        // TODO: what happens when this is a string?
        return props.monthFormat as CalendarFormatter
      }

      return createNativeLocaleFormatter(
        base.locale.current.value,
        (_tms, short) => ({ timeZone: 'UTC', month: short ? 'short' : 'long' })
      )
    })

    function isOutside (day: CalendarTimestamp): boolean {
      const dayIdentifier = getDayIdentifier(day)

      return dayIdentifier < getDayIdentifier(base.parsedStart.value) ||
             dayIdentifier > getDayIdentifier(base.parsedEnd.value)
    }

    function genHead () {
      return (
        <div class="v-calendar-weekly__head" role="row">
          { genHeadDays() }
        </div>
      )
    }

    function genHeadDays () {
      const header = todayWeek.value.map(genHeadDay)

      if (props.showWeek) {
        header.unshift(
          <div class="v-calendar-weekly__head-weeknumber" />
        )
      }

      return header
    }

    function genHeadDay (day: CalendarTimestamp, index: number) {
      const outside = isOutside(days.value[index])
      const color = day.present ? props.color : undefined

      return (
        <div
          { ...base.getColorProps({ text: color }) }
          key={ day.date }
          class={['v-calendar-weekly__head-weekday', base.getRelativeClasses(day, outside)]}
          role="columnheader"
        >
          { base.weekdayFormatter.value(day, props.shortWeekdays) }
        </div>
      )
    }

    function genWeeks () {
      const daysValue = days.value
      const weekDays = base.parsedWeekdays.value.length
      const weeks: any[] = []

      for (let i = 0; i < daysValue.length; i += weekDays) {
        weeks.push(genWeek(daysValue.slice(i, i + weekDays), getWeekNumber(daysValue[i])))
      }

      return weeks
    }

    function genWeek (week: CalendarTimestamp[], weekNumber: number) {
      const weekNodes = week.map((day, index) => genDay(day, index, week))

      if (props.showWeek) {
        weekNodes.unshift(genWeekNumber(weekNumber))
      }

      return (
        <div
          key={ week[0].date }
          class="v-calendar-weekly__week"
          role="row"
        >
          { weekNodes }
        </div>
      )
    }

    function getWeekNumber (determineDay: CalendarTimestamp) {
      return weekNumber(
        determineDay.year,
        determineDay.month - 1,
        determineDay.day,
        base.parsedWeekdays.value[0],
        parseInt(String(props.localeFirstDayOfYear))
      )
    }

    function genWeekNumber (weekNumber: number) {
      return (
        <div class="v-calendar-weekly__weeknumber">
          <small>{ String(weekNumber) }</small>
        </div>
      )
    }

    function genDay (day: CalendarTimestamp, index: number, week: CalendarTimestamp[]) {
      const outside = isOutside(day)
      const events = getPrefixedEventHandlers(attrs, ':day', nativeEvent => {
        return { nativeEvent, ...day }
      })

      return (
        <div
          key={ day.date }
          class={['v-calendar-weekly__day', base.getRelativeClasses(day, outside)]}
          role="cell"
          { ...events }
        >
          { genDayLabel(day) }
          { slots.day?.({ outside, index, week, ...day }) }
        </div>
      )
    }

    function genDayLabel (day: CalendarTimestamp) {
      return (
        <div class="v-calendar-weekly__day-label">
          { slots['day-label']?.(day) ?? genDayLabelButton(day) }
        </div>
      )
    }

    function genDayLabelButton (day: CalendarTimestamp) {
      const hasMonth = day.day === 1 && props.showMonthOnFirst
      const events = getPrefixedEventHandlers(attrs, ':date', nativeEvent => ({ nativeEvent, ...day }))

      return (
        <VIconBtn
          active={ day.present }
          activeColor={ props.color }
          variant="outlined"
          baseVariant="text"
          onUpdate:active={ noop }
          { ...events }
        >
          { hasMonth
            ? monthFormatter.value(day, props.shortMonths) + ' ' + base.dayFormatter.value(day, false)
            : base.dayFormatter.value(day, false)
          }
        </VIconBtn>
      )
    }

    useRender(() => (
      <div
        class={['v-calendar-weekly', theme.themeClasses.value]}
        onDragstart={ (e: MouseEvent) => e.preventDefault() }
      >
        { !props.hideHeader ? genHead() : undefined }
        { genWeeks() }
      </div>
    ))

    return {
      ...base,
      days,
      todayWeek,
      monthFormatter,
      isOutside,
    }
  },
})

export type VCalendarWeekly = InstanceType<typeof VCalendarWeekly>
