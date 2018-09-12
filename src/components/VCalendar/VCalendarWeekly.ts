// Styles
import '../../stylus/components/_calendar-weekly.styl'

// Types
import { VNode } from 'vue'

// Mixins
import CalendarBase from './mixins/calendar-base'

// Util
import { validateNumber } from './util/validate'
import { VTimestamp, findWeekday, createDayList, prevDay, copyTimestamp, getDayIdentifier } from './util/timestamp'

/* @vue/component */
export default CalendarBase.extend({
  name: 'v-calendar-weekly',

  props: {
    minWeeks: {
      validate: validateNumber,
      default: 1
    }
  },

  computed: {
    classes (): object {
      return {
        'v-calendar-weekly': true,
        ...this.themeClasses
      }
    },
    parsedMinWeeks (): number {
      return parseInt(this.minWeeks)
    },
    days (): VTimestamp[] {
      const weekdays = this.weekdays
      const startWeekday = weekdays[0]
      const endWeekday = weekdays[weekdays.length - 1]
      const minDays = this.parsedMinWeeks * weekdays.length
      const start = findWeekday(copyTimestamp(this.parsedStart), startWeekday, prevDay)
      const end = findWeekday(copyTimestamp(this.parsedEnd), endWeekday)

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
      const weekdays = this.weekdays
      const startWeekday = weekdays[0]
      const endWeekday = weekdays[weekdays.length - 1]
      const start = findWeekday(copyTimestamp(today), startWeekday, prevDay)
      const end = findWeekday(copyTimestamp(today), endWeekday)

      return createDayList(
        start,
        end,
        today,
        this.weekdaySkips,
        weekdays.length,
        weekdays.length
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
    genDay (day: VTimestamp, index: number): VNode {
      const outside = this.isOutside(day)
      const slot = this.$scopedSlots.day
      const slotData = { outside, ...day }

      return this.$createElement('div', {
        key: day.date,
        staticClass: 'v-calendar-weekly__day',
        class: this.getRelativeClasses(day, outside),
        on: this.getDefaultMouseEventHandlers(':day', e => day)
      }, [
        this.genDayLabel(day),
        slot ? slot(slotData) : ''
      ])
    },
    genDayLabel (day: VTimestamp): VNode {
      const color = day.present ? this.color : undefined

      return this.$createElement('div', this.setTextColor(color, {
        staticClass: 'v-calendar-weekly__day-label',
        on: this.getMouseEventHandlers({
          'click:date': { event: 'click', stop: true },
          'contextmenu:date': { event: 'contextmenu', stop: true, prevent: true, result: false }
        }, e => day)
      }), this.dayFormatter(day, false))
    }
  },

  render (h): VNode {
    return h('div', {
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
