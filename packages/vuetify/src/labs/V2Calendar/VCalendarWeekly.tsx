// Styles
import './VCalendarWeekly.sass'

// Components
import { VIconBtn } from '@/labs/VIconBtn'

// Utilities
import { weekNumber } from './util/dateTimeUtils'
import props from './util/props'
import {
  createDayList,
  createNativeLocaleFormatter,
  getDayIdentifier,
} from './util/timestamp'
import { defineComponent, getPrefixedEventHandlers } from '@/util'

// Types
import type { VNode } from 'vue'
import type { CalendarFormatter, CalendarTimestamp } from './types'

// Mixins
import CalendarBase from './mixins/calendar-base'

export default defineComponent({
  name: 'VCalendarWeekly',

  extends: CalendarBase,

  props: props.weeks,

  computed: {
    staticClass (): string {
      return 'v-calendar-weekly'
    },
    classes (): any {
      return this.$vuetify.theme.themeClasses
    },
    parsedMinWeeks (): number {
      return parseInt(this.minWeeks)
    },
    days (): CalendarTimestamp[] {
      const minDays = this.parsedMinWeeks * this.parsedWeekdays.length
      const start = this.getStartOfWeek(this.parsedStart)
      const end = this.getEndOfWeek(this.parsedEnd)

      return createDayList(
        start,
        end,
        this.times.today,
        this.weekdaySkips,
        Number.MAX_SAFE_INTEGER,
        minDays
      )
    },
    todayWeek (): CalendarTimestamp[] {
      const today = this.times.today
      const start = this.getStartOfWeek(today)
      const end = this.getEndOfWeek(today)

      return createDayList(
        start,
        end,
        today,
        this.weekdaySkips,
        this.parsedWeekdays.length,
        this.parsedWeekdays.length
      )
    },
    monthFormatter (): CalendarFormatter {
      if (this.monthFormat) {
        return this.monthFormat as CalendarFormatter
      }

      const longOptions = { timeZone: 'UTC', month: 'long' }
      const shortOptions = { timeZone: 'UTC', month: 'short' }

      return createNativeLocaleFormatter(
        this.currentLocale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    },
  },

  methods: {
    isOutside (day: CalendarTimestamp): boolean {
      const dayIdentifier = getDayIdentifier(day)

      return dayIdentifier < getDayIdentifier(this.parsedStart) ||
             dayIdentifier > getDayIdentifier(this.parsedEnd)
    },
    genHead (): VNode {
      return (
        <div class="v-calendar-weekly__head" role="row">
          { this.genHeadDays() }
        </div>
      )
    },
    genHeadDays (): VNode[] {
      const header = this.todayWeek.map(this.genHeadDay)

      if (this.showWeek) {
        header.unshift(
          <div class="v-calendar-weekly__head-weeknumber" />
        )
      }

      return header
    },
    genHeadDay (day: CalendarTimestamp, index: number): VNode {
      const outside = this.isOutside(this.days[index])
      const color = day.present ? this.color : undefined

      return (
        <div
          { ...this.getColorProps({ text: color }) }
          key={ day.date }
          class={['v-calendar-weekly__head-weekday', this.getRelativeClasses(day, outside)]}
          role="columnheader"
        >
          { this.weekdayFormatter(day, this.shortWeekdays) }
        </div>
      )
    },
    genWeeks (): VNode[] {
      const days = this.days
      const weekDays = this.parsedWeekdays.length
      const weeks: VNode[] = []

      for (let i = 0; i < days.length; i += weekDays) {
        weeks.push(this.genWeek(days.slice(i, i + weekDays), this.getWeekNumber(days[i])))
      }

      return weeks
    },
    genWeek (week: CalendarTimestamp[], weekNumber: number): VNode {
      const weekNodes = week.map((day, index) => this.genDay(day, index, week))

      if (this.showWeek) {
        weekNodes.unshift(this.genWeekNumber(weekNumber))
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
    },
    getWeekNumber (determineDay: CalendarTimestamp) {
      return weekNumber(
        determineDay.year,
        determineDay.month - 1,
        determineDay.day,
        this.parsedWeekdays[0],
        parseInt(this.localeFirstDayOfYear)
      )
    },
    genWeekNumber (weekNumber: number) {
      return (
        <div class="v-calendar-weekly__weeknumber">
          <small>{ String(weekNumber) }</small>
        </div>
      )
    },
    genDay (day: CalendarTimestamp, index: number, week: CalendarTimestamp[]): VNode {
      const outside = this.isOutside(day)
      const events = getPrefixedEventHandlers(this.$attrs, ':day', nativeEvent => {
        return { nativeEvent, ...day }
      })

      return (
        <div
          key={ day.date }
          class={['v-calendar-weekly__day', this.getRelativeClasses(day, outside)]}
          role="cell"
          { ...events }
        >
          { this.genDayLabel(day) }
          { this.$slots.day?.({ outside, index, week, ...day }) }
        </div>
      )
    },
    genDayLabel (day: CalendarTimestamp): VNode {
      return (
        <div class="v-calendar-weekly__day-label">
          { this.$slots['day-label']?.(day) ?? this.genDayLabelButton(day) }
        </div>
      )
    },
    genDayLabelButton (day: CalendarTimestamp): VNode {
      const color = day.present ? this.color : 'transparent'
      const hasMonth = day.day === 1 && this.showMonthOnFirst
      const events = getPrefixedEventHandlers(this.$attrs, ':date', nativeEvent => ({ nativeEvent, ...day }))

      return (
        <VIconBtn
          color={ color }
          size="small"
          { ...events }
        >
          { hasMonth
            ? this.monthFormatter(day, this.shortMonths) + ' ' + this.dayFormatter(day, false)
            : this.dayFormatter(day, false)
          }
        </VIconBtn>
      )
    },
    genDayMonth (day: CalendarTimestamp): VNode {
      const color = day.present ? this.color : undefined

      return (
        <div
          { ...this.getColorProps({ text: color }) }
          class="v-calendar-weekly__day-month"
        >
          { this.$slots['day-month']?.(day) ?? this.monthFormatter(day, this.shortMonths) }
        </div>
      )
    },
  },

  render () {
    return (
      <div
        class={[this.staticClass, this.classes]}
        onDragstart={ (e: MouseEvent) => e.preventDefault() }
      >
        { !this.hideHeader ? this.genHead() : undefined }
        { this.genWeeks() }
      </div>
    )
  },
})
