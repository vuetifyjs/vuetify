// Styles
// import '../../stylus/components/_calendar-daily.styl'

// Types
import { VNode, Component } from 'vue'

// Mixins
import CalendarWithEvents from './mixins/calendar-with-events'

// Util
import props from './util/props'
import {
  DAYS_IN_MONTH_MAX,
  DAY_MIN,
  DAYS_IN_WEEK,
  parseTimestamp,
  validateTimestamp,
  relativeDays,
  nextDay,
  prevDay,
  copyTimestamp,
  updateFormatted,
  updateWeekday,
  updateRelative,
  getStartOfMonth,
  getEndOfMonth,
  VTime,
  VTimestampInput,
  timestampToDate,
} from './util/timestamp'

// Calendars
import VCalendarMonthly from './VCalendarMonthly'
import VCalendarDaily from './VCalendarDaily'
import VCalendarWeekly from './VCalendarWeekly'
import VCalendarCategory from './VCalendarCategory'
import { CalendarTimestamp, CalendarFormatter, CalendarCategory } from 'vuetify/types'
import { getParsedCategories } from './util/parser'

// Types
interface VCalendarRenderProps {
  start: CalendarTimestamp
  end: CalendarTimestamp
  component: string | Component
  maxDays: number
  weekdays: number[]
  categories: CalendarCategory[]
}

/* @vue/component */
export default CalendarWithEvents.extend({
  name: 'v-calendar',

  props: {
    ...props.calendar,
    ...props.weeks,
    ...props.intervals,
    ...props.category,
  },

  data: () => ({
    lastStart: null as CalendarTimestamp | null,
    lastEnd: null as CalendarTimestamp | null,
  }),

  computed: {
    parsedValue (): CalendarTimestamp {
      return (validateTimestamp(this.value)
        ? parseTimestamp(this.value, true)
        : (this.parsedStart || this.times.today))
    },
    parsedCategoryDays (): number {
      return parseInt(this.categoryDays) || 1
    },
    renderProps (): VCalendarRenderProps {
      const around = this.parsedValue
      let component: any = null
      let maxDays = this.maxDays
      let weekdays = this.parsedWeekdays
      let categories = this.parsedCategories
      let start = around
      let end = around
      switch (this.type) {
        case 'month':
          component = VCalendarMonthly
          start = getStartOfMonth(around)
          end = getEndOfMonth(around)
          break
        case 'week':
          component = VCalendarDaily
          start = this.getStartOfWeek(around)
          end = this.getEndOfWeek(around)
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
          start = this.parsedStart || around
          end = this.parsedEnd
          break
        case 'custom-daily':
          component = VCalendarDaily
          start = this.parsedStart || around
          end = this.parsedEnd
          break
        case 'category':
          const days = this.parsedCategoryDays

          component = VCalendarCategory
          end = relativeDays(copyTimestamp(end), nextDay, days)
          updateFormatted(end)
          maxDays = days
          weekdays = []

          for (let i = 0; i < days; i++) {
            weekdays.push((start.weekday + i) % 7)
          }

          categories = this.getCategoryList(categories)
          break
        default:
          throw new Error(this.type + ' is not a valid Calendar type')
      }

      return { component, start, end, maxDays, weekdays, categories }
    },
    eventWeekdays (): number[] {
      return this.renderProps.weekdays
    },
    categoryMode (): boolean {
      return this.type === 'category'
    },
    title (): string {
      const { start, end } = this.renderProps
      const spanYears = start.year !== end.year
      const spanMonths = spanYears || start.month !== end.month

      if (spanYears) {
        return this.monthShortFormatter(start, true) + ' ' + start.year + ' - ' + this.monthShortFormatter(end, true) + ' ' + end.year
      }

      if (spanMonths) {
        return this.monthShortFormatter(start, true) + ' - ' + this.monthShortFormatter(end, true) + ' ' + end.year
      } else {
        return this.monthLongFormatter(start, false) + ' ' + start.year
      }
    },
    monthLongFormatter (): CalendarFormatter {
      return this.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    },
    monthShortFormatter (): CalendarFormatter {
      return this.getFormatter({
        timeZone: 'UTC', month: 'short',
      })
    },
    parsedCategories (): CalendarCategory[] {
      return getParsedCategories(this.categories, this.categoryText)
    },
  },

  watch: {
    renderProps: 'checkChange',
  },

  mounted () {
    this.updateEventVisibility()
    this.checkChange()
  },

  updated () {
    window.requestAnimationFrame(this.updateEventVisibility)
  },

  methods: {
    checkChange (): void {
      const { lastStart, lastEnd } = this
      const { start, end } = this.renderProps
      if (!lastStart || !lastEnd ||
        start.date !== lastStart.date ||
        end.date !== lastEnd.date) {
        this.lastStart = start
        this.lastEnd = end
        this.$emit('change', { start, end })
      }
    },
    move (amount = 1): void {
      const moved = copyTimestamp(this.parsedValue)
      const forward = amount > 0
      const mover = forward ? nextDay : prevDay
      const limit = forward ? DAYS_IN_MONTH_MAX : DAY_MIN
      let times = forward ? amount : -amount

      while (--times >= 0) {
        switch (this.type) {
          case 'month':
            moved.day = limit
            mover(moved)
            break
          case 'week':
            relativeDays(moved, mover, DAYS_IN_WEEK)
            break
          case 'day':
            relativeDays(moved, mover, 1)
            break
          case '4day':
            relativeDays(moved, mover, 4)
            break
          case 'category':
            relativeDays(moved, mover, this.parsedCategoryDays)
            break
        }
      }

      updateWeekday(moved)
      updateFormatted(moved)
      updateRelative(moved, this.times.now)

      if (this.value instanceof Date) {
        this.$emit('input', timestampToDate(moved))
      } else if (typeof this.value === 'number') {
        this.$emit('input', timestampToDate(moved).getTime())
      } else {
        this.$emit('input', moved.date)
      }

      this.$emit('moved', moved)
    },
    next (amount = 1): void {
      this.move(amount)
    },
    prev (amount = 1): void {
      this.move(-amount)
    },
    timeToY (time: VTime, clamp = true): number | false {
      const c = this.$children[0] as any

      if (c && c.timeToY) {
        return c.timeToY(time, clamp)
      } else {
        return false
      }
    },
    timeDelta (time: VTime): number | false {
      const c = this.$children[0] as any

      if (c && c.timeDelta) {
        return c.timeDelta(time)
      } else {
        return false
      }
    },
    minutesToPixels (minutes: number): number {
      const c = this.$children[0] as any

      if (c && c.minutesToPixels) {
        return c.minutesToPixels(minutes)
      } else {
        return -1
      }
    },
    scrollToTime (time: VTime): boolean {
      const c = this.$children[0] as any

      if (c && c.scrollToTime) {
        return c.scrollToTime(time)
      } else {
        return false
      }
    },
    parseTimestamp (input: VTimestampInput, required?: false): CalendarTimestamp | null {
      return parseTimestamp(input, required, this.times.now)
    },
    timestampToDate (timestamp: CalendarTimestamp): Date {
      return timestampToDate(timestamp)
    },
    getCategoryList (categories: CalendarCategory[]): CalendarCategory[] {
      if (!this.noEvents) {
        const categoryMap: any = categories.reduce((map: any, category, index) => {
          if (typeof category === 'object' && category.categoryName) map[category.categoryName] = { index, count: 0 }
          else if (typeof category === 'string') map[category] = { index, count: 0 }
          return map
        }, {})

        if (!this.categoryHideDynamic || !this.categoryShowAll) {
          let categoryLength = categories.length

          this.parsedEvents.forEach(ev => {
            let category = ev.category

            if (typeof category !== 'string') {
              category = this.categoryForInvalid
            }

            if (!category) {
              return
            }

            if (category in categoryMap) {
              categoryMap[category].count++
            } else if (!this.categoryHideDynamic) {
              categoryMap[category] = {
                index: categoryLength++,
                count: 1,
              }
            }
          })
        }

        if (!this.categoryShowAll) {
          for (const category in categoryMap) {
            if (categoryMap[category].count === 0) {
              delete categoryMap[category]
            }
          }
        }

        categories = categories.filter((category: CalendarCategory) => {
          if (typeof category === 'object' && category.categoryName) {
            return categoryMap.hasOwnProperty(category.categoryName)
          } else if (typeof category === 'string') {
            return categoryMap.hasOwnProperty(category)
          }
          return false
        })
      }
      return categories
    },
  },

  render (h): VNode {
    const { start, end, maxDays, component, weekdays, categories } = this.renderProps

    return h(component, {
      staticClass: 'v-calendar',
      class: {
        'v-calendar-events': !this.noEvents,
      },
      props: {
        ...this.$props,
        start: start.date,
        end: end.date,
        maxDays,
        weekdays,
        categories,
      },
      directives: [{
        modifiers: { quiet: true },
        name: 'resize',
        value: this.updateEventVisibility,
      }],
      on: {
        ...this.$listeners,
        'click:date': (day: CalendarTimestamp) => {
          if (this.$listeners.input) {
            this.$emit('input', day.date)
          }
          if (this.$listeners['click:date']) {
            this.$emit('click:date', day)
          }
        },
      },
      scopedSlots: this.getScopedSlots(),
    })
  },
})
