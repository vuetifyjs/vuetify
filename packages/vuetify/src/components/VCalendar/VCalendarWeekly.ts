// Styles
import './VCalendarWeekly.sass'

// Types
import { VNode } from 'vue'

// Components
import VBtn from '../VBtn'

// Mixins
import CalendarBase from './mixins/calendar-base'

// Util
import { getSlot } from '../../util/helpers'
import { weekNumber } from '../../util/dateTimeUtils'
import props from './util/props'
import {
  createDayList,
  getDayIdentifier,
  createNativeLocaleFormatter,
} from './util/timestamp'
import { CalendarTimestamp, CalendarFormatter } from 'vuetify/types'

/* @vue/component */
export default CalendarBase.extend({
  name: 'v-calendar-weekly',

  props: props.weeks,

  computed: {
    staticClass (): string {
      return 'v-calendar-weekly'
    },
    classes (): object {
      return this.themeClasses
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
      return this.$createElement('div', {
        staticClass: 'v-calendar-weekly__head',
      }, this.genHeadDays())
    },
    genHeadDays (): VNode[] {
      const header = this.todayWeek.map(this.genHeadDay)

      if (this.showWeek) {
        header.unshift(this.$createElement('div', {
          staticClass: 'v-calendar-weekly__head-weeknumber',
        }))
      }

      return header
    },
    genHeadDay (day: CalendarTimestamp, index: number): VNode {
      const outside = this.isOutside(this.days[index])
      const color = day.present ? this.color : undefined

      return this.$createElement('div', this.setTextColor(color, {
        key: day.date,
        staticClass: 'v-calendar-weekly__head-weekday',
        class: this.getRelativeClasses(day, outside),
      }), this.weekdayFormatter(day, this.shortWeekdays))
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

      return this.$createElement('div', {
        key: week[0].date,
        staticClass: 'v-calendar-weekly__week',
      }, weekNodes)
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
      return this.$createElement('div', {
        staticClass: 'v-calendar-weekly__weeknumber',
      }, [
        this.$createElement('small', String(weekNumber)),
      ])
    },
    genDay (day: CalendarTimestamp, index: number, week: CalendarTimestamp[]): VNode {
      const outside = this.isOutside(day)

      return this.$createElement('div', {
        key: day.date,
        staticClass: 'v-calendar-weekly__day',
        class: this.getRelativeClasses(day, outside),
        on: this.getDefaultMouseEventHandlers(':day', _e => day),
      }, [
        this.genDayLabel(day),
        ...(getSlot(this, 'day', () => ({ outside, index, week, ...day })) || []),
      ])
    },
    genDayLabel (day: CalendarTimestamp): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-weekly__day-label',
      }, getSlot(this, 'day-label', day) || [this.genDayLabelButton(day)])
    },
    genDayLabelButton (day: CalendarTimestamp): VNode {
      const color = day.present ? this.color : 'transparent'
      const hasMonth = day.day === 1 && this.showMonthOnFirst

      return this.$createElement(VBtn, {
        props: {
          color,
          fab: true,
          depressed: true,
          small: true,
        },
        on: this.getMouseEventHandlers({
          'click:date': { event: 'click', stop: true },
          'contextmenu:date': { event: 'contextmenu', stop: true, prevent: true, result: false },
        }, _e => day),
      }, hasMonth
        ? this.monthFormatter(day, this.shortMonths) + ' ' + this.dayFormatter(day, false)
        : this.dayFormatter(day, false)
      )
    },
    genDayMonth (day: CalendarTimestamp): VNode | string {
      const color = day.present ? this.color : undefined

      return this.$createElement('div', this.setTextColor(color, {
        staticClass: 'v-calendar-weekly__day-month',
      }), getSlot(this, 'day-month', day) || this.monthFormatter(day, this.shortMonths))
    },
  },

  render (h): VNode {
    return h('div', {
      staticClass: this.staticClass,
      class: this.classes,
      on: {
        dragstart: (e: MouseEvent) => {
          e.preventDefault()
        },
      },
    }, [
      !this.hideHeader ? this.genHead() : '',
      ...this.genWeeks(),
    ])
  },
})
