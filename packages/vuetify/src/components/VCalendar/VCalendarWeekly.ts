// Styles
import '../../stylus/components/_calendar-weekly.styl'

// Types
import { VNode, VNodeChildren } from 'vue'

// Mixins
import CalendarBase from './mixins/calendar-base'

// Util
import props from './util/props'
import {
  VTimestamp,
  VTimestampFormatter,
  createDayList,
  getDayIdentifier,
  createNativeLocaleFormatter
} from './util/timestamp'

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
    days (): VTimestamp[] {
      const minDays = this.parsedMinWeeks * this.weekdays.length
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
    todayWeek (): VTimestamp[] {
      const today = this.times.today
      const start = this.getStartOfWeek(today)
      const end = this.getEndOfWeek(today)

      return createDayList(
        start,
        end,
        today,
        this.weekdaySkips,
        this.weekdays.length,
        this.weekdays.length
      )
    },
    monthFormatter (): VTimestampFormatter {
      if (this.monthFormat) {
        return this.monthFormat as VTimestampFormatter
      }

      const longOptions = { timeZone: 'UTC', month: 'long' }
      const shortOptions = { timeZone: 'UTC', month: 'short' }

      return createNativeLocaleFormatter(
        this.locale,
        (_tms, short) => short ? shortOptions : longOptions
      )
    }
  },

  methods: {
    isOutside (day: VTimestamp): boolean {
      const dayIdentifier = getDayIdentifier(day)

      return dayIdentifier < getDayIdentifier(this.parsedStart) ||
             dayIdentifier > getDayIdentifier(this.parsedEnd)
    },
    genHead (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-weekly__head'
      }, this.genHeadDays())
    },
    genHeadDays (): VNode[] {
      return this.todayWeek.map(this.genHeadDay)
    },
    genHeadDay (day: VTimestamp, index: number): VNode {
      const outside = this.isOutside(this.days[index])
      const color = day.present ? this.color : undefined

      return this.$createElement('div', this.setTextColor(color, {
        key: day.date,
        staticClass: 'v-calendar-weekly__head-weekday',
        class: this.getRelativeClasses(day, outside)
      }), this.weekdayFormatter(day, this.shortWeekdays))
    },
    genWeeks (): VNode[] {
      const days = this.days
      const weekDays = this.weekdays.length
      const weeks: VNode[] = []
      for (let i = 0; i < days.length; i += weekDays) {
        weeks.push(this.genWeek(days.slice(i, i + weekDays)))
      }

      return weeks
    },
    genWeek (week: VTimestamp[]): VNode {
      return this.$createElement('div', {
        key: week[0].date,
        staticClass: 'v-calendar-weekly__week'
      }, week.map(this.genDay))
    },
    genDay (day: VTimestamp): VNode {
      const outside = this.isOutside(day)
      const slot = this.$scopedSlots.day
      const slotData = { outside, ...day }
      const hasMonth = day.day === 1 && this.showMonthOnFirst

      return this.$createElement('div', {
        key: day.date,
        staticClass: 'v-calendar-weekly__day',
        class: this.getRelativeClasses(day, outside),
        on: this.getDefaultMouseEventHandlers(':day', _e => day)
      }, [
        this.genDayLabel(day),
        hasMonth ? this.genDayMonth(day) : '',
        slot ? slot(slotData) : ''
      ])
    },
    genDayLabel (day: VTimestamp): VNode {
      const color = day.present ? this.color : undefined
      const slot = this.$scopedSlots.dayLabel

      return this.$createElement('div', this.setTextColor(color, {
        staticClass: 'v-calendar-weekly__day-label',
        on: this.getMouseEventHandlers({
          'click:date': { event: 'click', stop: true },
          'contextmenu:date': { event: 'contextmenu', stop: true, prevent: true, result: false }
        }, _e => day)
      }), slot ? slot(day) as VNodeChildren : this.dayFormatter(day, false))
    },
    genDayMonth (day: VTimestamp): VNode | string {
      const color = day.present ? this.color : undefined
      const slot = this.$scopedSlots.dayMonth

      return this.$createElement('div', this.setTextColor(color, {
        staticClass: 'v-calendar-weekly__day-month'
      }), slot ? slot(day) as VNodeChildren : this.monthFormatter(day, this.shortMonths))
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: this.staticClass,
      class: this.classes,
      nativeOn: {
        dragstart: (e: MouseEvent) => {
          e.preventDefault()
        }
      }
    }, [
      !this.hideHeader ? this.genHead() : '',
      ...this.genWeeks()
    ])
  }
})
