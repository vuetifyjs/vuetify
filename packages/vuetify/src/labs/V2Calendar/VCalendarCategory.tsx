// Styles
import './VCalendarCategory.sass'

// Mixins
import VCalendarDaily from './VCalendarDaily'

// Utilities
import { getParsedCategories } from './util/parser'
import props from './util/props'
import { convertToUnit, defineComponent, getPrefixedEventHandlers } from '@/util'

// Types
import type { VNode } from 'vue'
import type { CalendarCategory, CalendarTimestamp } from './types'

export default defineComponent({
  name: 'VCalendarCategory',

  extends: VCalendarDaily,

  props: props.category,

  computed: {
    classes (): object {
      return {
        'v-calendar-daily': true,
        'v-calendar-category': true,
        ...this.themeClasses,
      }
    },
    parsedCategories (): CalendarCategory[] {
      return getParsedCategories(this.categories, this.categoryText)
    },
  },
  methods: {
    genDayHeader (day: CalendarTimestamp, index: number): VNode {
      const scope = {
        week: this.days, ...day, index,
      }

      return (
        <div class="v-calendar-category__columns">
          { this.parsedCategories.map(category => {
            return this.genDayHeaderCategory(day, this.getCategoryScope(scope, category))
          })}
        </div>
      )
    },
    getCategoryScope (scope: any, category: CalendarCategory) {
      const cat = typeof category === 'object' && category &&
          category.categoryName === this.categoryForInvalid ? null : category
      return {
        ...scope,
        category: cat,
      }
    },
    genDayHeaderCategory (day: CalendarTimestamp, scope: any): VNode {
      const headerTitle = typeof scope.category === 'object' ? scope.category.categoryName : scope.category
      const events = getPrefixedEventHandlers(this.$attrs, ':day-category', () => {
        return this.getCategoryScope(this.getSlotScope(day), scope.category)
      })
      return (
        <div
          class="v-calendar-category__column-header"
          { ...events }
        >
          { this.$slots.category?.(scope) ?? this.genDayHeaderCategoryTitle(headerTitle) }
          { this.$slots['day-header']?.(scope) }
        </div>
      )
    },
    genDayHeaderCategoryTitle (categoryName: string | null) {
      return (
        <div class="v-calendar-category__category">
          { categoryName === null ? this.categoryForInvalid : categoryName }
        </div>
      )
    },
    genDays (): VNode[] {
      const days: VNode[] = []
      this.days.forEach((d, j) => {
        const day = new Array(this.parsedCategories.length || 1)
        day.fill(d)
        days.push(...day.map((v, i) => this.genDay(v, j, i)))
      })
      return days
    },
    genDay (day: CalendarTimestamp, index: number, categoryIndex: number): VNode {
      const category = this.parsedCategories[categoryIndex]
      const events = getPrefixedEventHandlers(this.$attrs, ':time', e => {
        return this.getSlotScope(this.getTimestampAtEvent(e, day))
      })
      return (
        <div
          key={ day.date + '-' + categoryIndex }
          class={['v-calendar-daily__day', this.getRelativeClasses(day)]}
          { ...events }
        >
          { this.genDayIntervals(index, category) }
          { this.genDayBody(day, category) }
        </div>
      )
    },
    genDayIntervals (index: number, category: CalendarCategory): VNode[] {
      return this.intervals[index].map(v => this.genDayInterval(v, category))
    },
    genDayInterval (interval: CalendarTimestamp, category: CalendarCategory): VNode {
      const height: string | undefined = convertToUnit(this.intervalHeight)
      const styler = this.intervalStyle || this.intervalStyleDefault

      return (
        <div
          key={ interval.time }
          class="v-calendar-daily__day-interval"
          style={[{ height }, styler({ ...interval, category })]}
        >
          { this.$slots.interval?.(
            this.getCategoryScope(this.getSlotScope(interval), category)
          )}
        </div>
      )
    },
    genDayBody (day: CalendarTimestamp, category: CalendarCategory): VNode {
      return (
        <div class="v-calendar-category__columns">
          { this.genDayBodyCategory(day, category) }
        </div>
      )
    },
    genDayBodyCategory (day: CalendarTimestamp, category: CalendarCategory): VNode {
      const events = getPrefixedEventHandlers(this.$attrs, ':time-category', e => {
        return this.getCategoryScope(this.getSlotScope(this.getTimestampAtEvent(e, day)), category)
      })

      return (
        <div class="v-calendar-category__column" { ...events }>
          { this.$slots['day-body']?.(this.getCategoryScope(this.getSlotScope(day), category)) }
        </div>
      )
    },
  },
})
